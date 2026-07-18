import { repairA0WordLanguage } from './a0LanguageCorrections';
import { czechWords } from './czechWords';

export const allCzechWords = czechWords.map((word) => repairA0WordLanguage(word));
