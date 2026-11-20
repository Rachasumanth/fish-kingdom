export const MAX_STAGE = 10000;
export const MIN_STAGE_GAP_MS = 10_000;

export type ProgressState = {
  stage: number;
  lastAt: number;
};

export type StageClearOutcome =
  | { result: 'saved'; stage: number }
  | { result: 'too-fast'; stage: number }
  | { result: 'capped'; stage: number };

export const evaluateStageClear = (state: ProgressState, now: number): StageClearOutcome => {
  if (state.stage >= MAX_STAGE) return { result: 'capped', stage: state.stage };
  if (state.lastAt > 0 && now - state.lastAt < MIN_STAGE_GAP_MS) {
    return { result: 'too-fast', stage: state.stage };
  }
  return { result: 'saved', stage: state.stage + 1 };
};

export type FlairTier = {
  minStage: number;
  text: string;
  backgroundColor: string;
};

export const FLAIR_TIERS: FlairTier[] = [
  { minStage: 5, text: 'Pond Hunter', backgroundColor: '#0f766e' },
  { minStage: 10, text: 'Reef Champion', backgroundColor: '#b45309' },
];

export const flairTierFor = (stage: number): FlairTier | null => {
  let best: FlairTier | null = null;
  for (const tier of FLAIR_TIERS) {
    if (stage >= tier.minStage) best = tier;
  }
  return best;
};
