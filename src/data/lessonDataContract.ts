export type A0SpeechType = 'word' | 'phrase' | 'sentence' | 'dialogueLine';

export interface A0CardContractFields {
  targetText?: string;
  speechType?: A0SpeechType;
  acceptedVariants?: readonly string[];
  audioPath?: string;
  memoryTargetIds?: readonly string[];
  reuseOnly?: boolean;
}

export interface A0CardContractSource extends A0CardContractFields {
  id: string;
  czech: string;
  audioFile?: string;
}

export interface A0EffectiveCardContract {
  targetText: string;
  speechType: A0SpeechType;
  acceptedVariants: readonly string[];
  audioPath: string;
  memoryTargetIds: readonly string[];
  reuseOnly: boolean;
}

export function normalizeCzechForContract(text: string) {
  return text
    .toLocaleLowerCase('cs-CZ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?—-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function inferSpeechType(targetText: string): A0SpeechType {
  const normalized = normalizeCzechForContract(targetText);
  const tokenCount = normalized ? normalized.split(' ').length : 0;
  if (/[.!?]/.test(targetText) || tokenCount >= 4) return 'sentence';
  if (tokenCount >= 2) return 'phrase';
  return 'word';
}

export function defaultAudioPath(cardId: string) {
  return `/audio/words/${cardId}.mp3`;
}

export function getA0CardContract(card: A0CardContractSource): A0EffectiveCardContract {
  const targetText = (card.targetText || card.czech).trim();
  const variants = card.acceptedVariants?.length ? card.acceptedVariants : [targetText];
  return {
    targetText,
    speechType: card.speechType || inferSpeechType(targetText),
    acceptedVariants: variants.map((variant) => variant.trim()).filter(Boolean),
    audioPath: card.audioPath || card.audioFile || defaultAudioPath(card.id),
    memoryTargetIds: card.memoryTargetIds?.length ? card.memoryTargetIds : [card.id],
    reuseOnly: card.reuseOnly ?? false,
  };
}

export function hasStrictSpeechTarget(card: A0CardContractSource) {
  const contract = getA0CardContract(card);
  return Boolean(contract.targetText && contract.acceptedVariants.length && contract.acceptedVariants.every(Boolean));
}
