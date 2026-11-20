import { context, redis, reddit } from '@devvit/web/server';
import type { LeaderboardResponse } from '../../shared/leaderboard';
import { evaluateStageClear, flairTierFor, type StageClearOutcome } from '../../shared/progress';

const BOARD_KEY = 'leaderboard:stage';
const TOP_COUNT = 5;

export type StageClearResult =
  | (StageClearOutcome & { reward?: string })
  | { result: 'logged-out' };

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
  const username = await reddit.getCurrentUsername();
  if (!username) return { loggedIn: false, top: [], me: null };

  const [rows, total, myStage, myRank] = await Promise.all([
    redis.zRange(BOARD_KEY, 0, TOP_COUNT - 1, { by: 'rank', reverse: true }),
    redis.zCard(BOARD_KEY),
    redis.zScore(BOARD_KEY, username),
    redis.zRank(BOARD_KEY, username),
  ]);

  const top = rows.map((row, i) => ({
    rank: i + 1,
    username: row.member,
    stage: row.score,
  }));

  const me =
    myStage === undefined || myRank === undefined
      ? null
      : { rank: total - myRank, username, stage: myStage };

  return { loggedIn: true, top, me };
};

export const recordStageCleared = async (): Promise<StageClearResult> => {
  const username = await reddit.getCurrentUsername();
  if (!username) return { result: 'logged-out' };

  const key = `progress:${username}`;
  const stage = Number((await redis.hGet(key, 'stage')) ?? 0);
  const lastAt = Number((await redis.hGet(key, 'lastAt')) ?? 0);
  const flairStage = Number((await redis.hGet(key, 'flairStage')) ?? 0);
  const now = Date.now();

  const outcome = evaluateStageClear({ stage, lastAt }, now);
  if (outcome.result !== 'saved') return outcome;

  await redis.hSet(key, { stage: String(outcome.stage), lastAt: String(now) });
  await redis.zAdd(BOARD_KEY, { member: username, score: outcome.stage });

  const tier = flairTierFor(outcome.stage);
  const { subredditName } = context;
  if (!tier || tier.minStage <= flairStage || !subredditName) return outcome;

  try {
    await reddit.setUserFlair({
      subredditName,
      username,
      text: tier.text,
      backgroundColor: tier.backgroundColor,
      textColor: 'light',
    });
    await redis.hSet(key, { flairStage: String(tier.minStage) });
    return { ...outcome, reward: tier.text };
  } catch (error) {
    console.error('Flair award failed for', username, error);
    return outcome;
  }
};
