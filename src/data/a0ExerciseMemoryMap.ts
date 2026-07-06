export const a0ExerciseMemoryTargetIds: Record<string, string> = {};

export function getA0ExerciseMemoryTargetId(exerciseId: string) {
  return a0ExerciseMemoryTargetIds[exerciseId];
}
