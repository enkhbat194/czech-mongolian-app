export const a0ExerciseMemoryTargetIds: Record<string, string> = {
  'a0-1-a-1': 'a0c0001',
  'a0-1-a-2': 'a0c0001',
  'a0-1-a-3': 'a0c0005',
  'a0-1-a-4': 'a0c0001',

  'a0-1-b-1': 'a0c0012',
  'a0-1-b-2': 'a0c0013',
  'a0-1-b-3': 'a0c0012',
  'a0-1-b-4': 'a0c0013',
  'a0-1-b-5': 'a0c0015',

  'a0-1-c-1': 'a0c0021',
  'a0-1-c-2': 'a0c0017',
  'a0-1-c-3': 'a0c0021',
  'a0-1-c-4': 'a0c0327',
  'a0-1-c-5': 'a0c0021',
  'a0-1-c-6': 'a0c0326',

  'a0-2-a-1': 'a0c0025',
  'a0-2-a-2': 'a0c0027',
  'a0-2-a-3': 'a0c0027',
  'a0-2-a-4': 'a0c0029',
  'a0-2-a-5': 'a0c0027',

  'a0-2-b-1': 'a0c0031',
  'a0-2-b-2': 'a0c0035',
  'a0-2-b-3': 'a0c0037',
  'a0-2-b-4': 'a0c0037',
  'a0-2-b-5': 'a0c0033',

  'a0-2-c-1': 'a0c0043',
  'a0-2-c-2': 'a0c0042',
  'a0-2-c-3': 'a0c0044',
  'a0-2-c-4': 'a0c0040',
  'a0-2-c-5': 'a0c0040',
};

export function getA0ExerciseMemoryTargetId(exerciseId: string) {
  return a0ExerciseMemoryTargetIds[exerciseId];
}