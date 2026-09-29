export const MINIMUM_GROUP_SIZE = 10;

/** Return only the disclosure decision; suppressed group sizes are never returned to the UI. */
export function isGroupSuppressed(aggregateGroupSize: number): boolean {
  return aggregateGroupSize < MINIMUM_GROUP_SIZE;
}

export const PRIVACY_THRESHOLD_EXPLANATION =
  'Statistics for groups below the minimum threshold are suppressed to reduce the risk of re-identifying individuals.';
