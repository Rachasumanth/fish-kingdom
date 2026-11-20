export type LeaderboardEntry = {
  rank: number;
  username: string;
  stage: number;
};

export type LeaderboardResponse = {
  loggedIn: boolean;
  top: LeaderboardEntry[];
  me: LeaderboardEntry | null;
};

export type StageClearResponse = {
  status: 'ok' | 'error';
  result?: 'saved' | 'too-fast' | 'capped';
  stage?: number;
  reward?: string;
  message?: string;
};
