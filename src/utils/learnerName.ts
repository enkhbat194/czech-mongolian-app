const DEFAULT_USER_NAME = 'Суралцагч';
const FALLBACK = '…';

export function resolveLearnerName(userName: string): string {
  const name = userName.trim();
  return name && name !== DEFAULT_USER_NAME ? name : FALLBACK;
}

// Lesson data uses "Eba"/"Эба" as the sample learner identity. It is replaced
// with the learner's own name at render time so stored data, SRS ids and
// audits stay untouched.
export function personalizeLearnerText(text: string, userName: string): string {
  if (!text) return text;
  const name = resolveLearnerName(userName);
  // \b is ASCII-only, so use Unicode letter lookarounds to cover Cyrillic too.
  return text
    .replace(/(?<!\p{L})Eba(?!\p{L})/gu, name)
    .replace(/(?<!\p{L})Эба(?!\p{L})/gu, name);
}
