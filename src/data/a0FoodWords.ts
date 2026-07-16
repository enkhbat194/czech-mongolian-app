import { czechWords, type CzechWord } from './czechWords';

/** Canonical source: czechWords.ts */
export const a0FoodWords: CzechWord[] = czechWords.filter((card) => card.lessonId === 'l007');
