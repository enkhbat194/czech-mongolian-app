import { czechWords, type CzechWord } from './czechWords';

/** Canonical source: czechWords.ts */
export const a0PhoneWords: CzechWord[] = czechWords.filter((card) => card.lessonId === 'l011');
