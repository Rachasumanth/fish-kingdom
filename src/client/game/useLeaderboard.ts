import { useCallback, useEffect, useState } from 'react';
import { showToast } from '@devvit/web/client';
import type { LeaderboardResponse, StageClearResponse } from '../../shared/leaderboard';

const fetchBoard = async (): Promise<LeaderboardResponse | null> => {
  try {
    const res = await fetch('/api/leaderboard');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: LeaderboardResponse = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to load leaderboard', err);
    return null;
  }
};

export const useLeaderboard = () => {
  const [board, setBoard] = useState<LeaderboardResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchBoard().then((data) => {
      if (!cancelled && data) setBoard(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const reportStageCleared = useCallback(async () => {
    try {
      const res = await fetch('/api/stage-cleared', { method: 'POST' });
      if (res.status === 401 || res.status === 429) return;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const progress: StageClearResponse = await res.json();
      if (progress.reward) showToast(`You earned the "${progress.reward}" flair!`);
      const data = await fetchBoard();
      if (data) setBoard(data);
    } catch (err) {
      console.error('Failed to save progress', err);
    }
  }, []);

  return { board, reportStageCleared } as const;
};
