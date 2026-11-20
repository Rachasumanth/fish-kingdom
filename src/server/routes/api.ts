import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import type {
  DecrementResponse,
  IncrementResponse,
  InitResponse,
} from '../../shared/api';
import type { LeaderboardResponse, StageClearResponse } from '../../shared/leaderboard';
import { getLeaderboard, recordStageCleared } from '../core/leaderboard';
import { notificationsRoute } from './notifications';

type ErrorResponse = {
  status: 'error';
  message: string;
};

export const api = new Hono();

api.get('/init', async (c) => {
  const { postId } = context;

  if (!postId) {
    console.error('API Init Error: postId not found in devvit context');
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required but missing from context',
      },
      400
    );
  }

  try {
    const [count, username] = await Promise.all([
      redis.get('count'),
      reddit.getCurrentUsername(),
    ]);

    return c.json<InitResponse>({
      type: 'init',
      postId: postId,
      count: count ? parseInt(count) : 0,
      username: username ?? 'anonymous',
    });
  } catch (error) {
    console.error(`API Init Error for post ${postId}:`, error);
    let errorMessage = 'Unknown error during initialization';
    if (error instanceof Error) {
      errorMessage = `Initialization failed: ${error.message}`;
    }
    return c.json<ErrorResponse>(
      { status: 'error', message: errorMessage },
      400
    );
  }
});

api.post('/increment', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required',
      },
      400
    );
  }

  const count = await redis.incrBy('count', 1);
  return c.json<IncrementResponse>({
    count,
    postId,
    type: 'increment',
  });
});

api.post('/decrement', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required',
      },
      400
    );
  }

  const count = await redis.incrBy('count', -1);
  return c.json<DecrementResponse>({
    count,
    postId,
    type: 'decrement',
  });
});

api.route('/notifications', notificationsRoute);

api.get('/leaderboard', async (c) => {
  try {
    return c.json<LeaderboardResponse>(await getLeaderboard());
  } catch (error) {
    console.error('API Leaderboard Error:', error);
    return c.json({ status: 'error', message: 'Failed to load leaderboard' }, 500);
  }
});

api.post('/stage-cleared', async (c) => {
  try {
    const outcome = await recordStageCleared();
    if (outcome.result === 'logged-out') {
      return c.json<StageClearResponse>({ status: 'error', message: 'Log in to save your progress' }, 401);
    }
    if (outcome.result === 'too-fast') {
      return c.json<StageClearResponse>({ status: 'error', result: 'too-fast', stage: outcome.stage }, 429);
    }
    return c.json<StageClearResponse>({
      status: 'ok',
      result: outcome.result,
      stage: outcome.stage,
      reward: outcome.reward,
    });
  } catch (error) {
    console.error('API Stage Clear Error:', error);
    return c.json<StageClearResponse>({ status: 'error', message: 'Failed to save progress' }, 500);
  }
});
