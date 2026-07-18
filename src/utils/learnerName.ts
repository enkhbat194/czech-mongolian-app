const DEFAULT_USER_NAME = 'Суралцагч';
const FALLBACK = '…';

export function resolveLearnerName(userName: string): string {
  const name = userName.trim();
  return name && name !== DEFAULT_USER_NAME ? name : FALLBACK;
}

// Canonical lesson data uses {userName}. The Eba/Эба replacements remain only
// as a temporary migration path for old persisted content and legacy aliases.
export function personalizeLearnerText(text: string, userName: string): string {
  if (!text) return text;
  const name = resolveLearnerName(userName);
  // \b is ASCII-only, so use Unicode letter lookarounds to cover Cyrillic too.
  return text
    .replace(/\{userName\}/g, name)
    .replace(/(?<!\p{L})Eba(?!\p{L})/gu, name)
    .replace(/(?<!\p{L})Эба(?!\p{L})/gu, name);
}
