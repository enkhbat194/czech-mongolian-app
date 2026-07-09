import { czechWords, type CzechWord } from './czechWords';

export interface A0VocabularyAuditResult {
  totalCards: number;
  uniqueIds: number;
  uniqueNormalizedCzech: number;
}

function normalize(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    // Czech accent marks can distinguish different words: být = байх, byt = байр.
    // Keep diacritics in canonical-card uniqueness checks.
    .replace(/[.,!?—-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Нэг phrase зөвхөн нэг хичээл дээр "шинэ карт" байна.
 * Дараагийн хичээлд түүнийг зөвхөн review/dialogue reuse болгон ашиглана.
 */
export function auditA0Vocabulary(cards: CzechWord[] = czechWords): A0VocabularyAuditResult {
  const idOwners = new Map<string, CzechWord>();
  const phraseOwners = new Map<string, CzechWord>();

  for (const card of cards) {
    const duplicateId = idOwners.get(card.id);
    if (duplicateId) {
      throw new Error(`A0 vocabulary duplicate id: ${card.id} (${duplicateId.lessonId} / ${card.lessonId})`);
    }
    idOwners.set(card.id, card);

    const key = normalize(card.czech);
    const duplicatePhrase = phraseOwners.get(key);
    if (duplicatePhrase) {
      throw new Error(
        `A0 vocabulary phrase reintroduced as new card: "${card.czech}" (${duplicatePhrase.lessonId} / ${card.lessonId}). Use the earlier card only as review/reuse.`,
      );
    }
    phraseOwners.set(key, card);
  }

  return {
    totalCards: cards.length,
    uniqueIds: idOwners.size,
    uniqueNormalizedCzech: phraseOwners.size,
  };
}

export const a0VocabularyAudit = auditA0Vocabulary();
