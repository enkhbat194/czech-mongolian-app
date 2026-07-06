import type { A0Exercise } from './a0LessonSchema';

export type A0MatchExercise = Extract<A0Exercise, { type: 'match' }>;

/**
 * Compatibility shim for the legacy renderer. All A0.1–A0.3 match data now
 * lives directly inside its lesson definition under `type: 'match'`.
 */
export function getA0MatchExercise(_sourceExerciseId: string): A0MatchExercise | undefined {
  return undefined;
}