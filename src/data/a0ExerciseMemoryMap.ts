export const a0ExerciseMemoryTargetIds: Record<string, string> = {};

export function getA0ExerciseMemoryTargetId(exerciseId: string) {
  const parts = exerciseId.split('-');
  const lesson = `${parts[0]}-${parts[1]}`;
  if (lesson === 'a0-1') return 'a0c0001';
  if (lesson === 'a0-2') return 'a0c0025';
  if (lesson === 'a0-3') return 'a0c0047';
  if (lesson === 'a0-4') return 'a0c0061';
  if (lesson === 'a0-5') return 'a0c0073';
  if (lesson === 'a0-6') return 'a0c0087';
  return a0ExerciseMemoryTargetIds[exerciseId];
}
