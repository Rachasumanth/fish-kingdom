import { useEffect, useState } from 'react';
import { Diamond, Share2, Trophy } from 'lucide-react';
import { showShareSheet, showToast } from '@devvit/web/client';
import type { LeaderboardEntry, LeaderboardResponse } from '../../shared/leaderboard';

type LeaderboardPanelProps = {
  board: LeaderboardResponse;
};

const shareRank = async (me: LeaderboardEntry) => {
  try {
    await showShareSheet({
      title: 'Fish Kingdom',
      text: `I'm ranked #${me.rank} with ${me.stage} diamonds in Fish Kingdom. Can you beat me?`,
    });
  } catch (err) {
    console.error('Share failed', err);
    showToast('Could not share your rank');
  }
};

const EXTENDED_QUERY = '(min-width: 768px) and (min-height: 560px)';
const MOBILE_ROWS = 3;

const useExtendedLayout = () => {
  const [extended, setExtended] = useState(() => window.matchMedia(EXTENDED_QUERY).matches);
  useEffect(() => {
    const mql = window.matchMedia(EXTENDED_QUERY);
    const onChange = () => setExtended(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return extended;
};

const Row = ({
  entry,
  highlight,
}: {
  entry: LeaderboardEntry;
  highlight: boolean;
}) => (
  <li
    className={`flex items-center gap-2 px-2 py-0.5 rounded ${highlight ? 'bg-teal-300/25 text-amber-200' : 'text-white/85'}`}
  >
    <span className="w-5 text-right tabular-nums text-white/60">{entry.rank}</span>
    <span className="flex-1 truncate">u/{entry.username}</span>
    <span className="flex items-center gap-1 tabular-nums">
      <Diamond className="w-3 h-3 text-teal-200" />
      {entry.stage}
    </span>
  </li>
);

export const LeaderboardPanel = ({ board }: LeaderboardPanelProps) => {
  const extended = useExtendedLayout();
  if (!board.loggedIn) return null;

  const me = board.me;
  const visibleTop = extended ? board.top : board.top.slice(0, MOBILE_ROWS);
  const meHidden = me !== null && visibleTop.some((e) => e.username === me.username);

  return (
    <div className="pointer-events-none w-56 sm:w-72 rounded-lg p-2 text-[11px] font-semibold text-white/90 [text-shadow:0_0_2px_#000,0_0_5px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 px-1 pb-1 text-[12px] tracking-wide">
        <Trophy className="w-3.5 h-3.5 text-amber-300" />
        <span className="flex-1">Top Players</span>
        {me && (
          <button
            type="button"
            onClick={() => void shareRank(me)}
            aria-label="Share my rank"
            title="Share my rank"
            className="pointer-events-auto rounded p-1 text-teal-100 transition hover:bg-teal-400/25"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {board.top.length === 0 ? (
        <p className="px-2 py-1 text-white/60">No champions yet. Be the first!</p>
      ) : (
        <ol className="flex flex-col gap-0.5">
          {visibleTop.map((entry) => (
            <Row key={entry.rank} entry={entry} highlight={entry.username === me?.username} />
          ))}
        </ol>
      )}
      {me && !meHidden && (
        <div className="mt-1 border-t border-white/15 pt-1">
          <ol className="flex flex-col gap-0.5">
            <Row entry={me} highlight />
          </ol>
        </div>
      )}
      {me === null && (
        <p className="mt-1 border-t border-white/15 px-2 pt-1 text-white/60">Reach a new stage to get ranked.</p>
      )}
    </div>
  );
};
