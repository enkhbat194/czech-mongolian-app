import { describe, expect, it } from 'vitest';
import {
  defaultAudioPath,
  getA0CardContract,
  inferSpeechType,
  normalizeCzechForContract,
} from '../../src/data/lessonDataContract';

describe('normalizeCzechForContract', () => {
  it('lowercases and strips diacritics', () => {
    expect(normalizeCzechForContract('Mám dítě.')).toBe('mam dite');
    expect(normalizeCzechForContract('Sněží')).toBe('snezi');
  });

  it('maps diacritic-only pairs to the same key (byt/být)', () => {
    expect(normalizeCzechForContract('být')).toBe(normalizeCzechForContract('byt'));
  });

  it('strips punctuation and collapses whitespace', () => {
    expect(normalizeCzechForContract('Pomoc!')).toBe('pomoc');
    expect(normalizeCzechForContract('  Kde   je –  toaleta? ')).toBe('kde je – toaleta');
    expect(normalizeCzechForContract('Dobrý den, jak se máte?')).toBe('dobry den jak se mate');
  });

  it('returns an empty string for punctuation-only input', () => {
    expect(normalizeCzechForContract('...!?')).toBe('');
  });
});

describe('inferSpeechType', () => {
  it('classifies a single word', () => {
    expect(inferSpeechType('káva')).toBe('word');
  });

  it('classifies two to three words as a phrase', () => {
    expect(inferSpeechType('dobrý den')).toBe('phrase');
    expect(inferSpeechType('ještě jednou prosím')).toBe('phrase');
  });

  it('classifies punctuation or four-plus words as a sentence', () => {
    expect(inferSpeechType('Prší.')).toBe('sentence');
    expect(inferSpeechType('kde je ta velká lékárna')).toBe('sentence');
  });
});

describe('getA0CardContract', () => {
  it('fills every field from defaults when only id and czech are given', () => {
    const contract = getA0CardContract({ id: 'a0c9999', czech: 'Mám klíč.' });
    expect(contract.targetText).toBe('Mám klíč.');
    expect(contract.speechType).toBe('sentence');
    expect(contract.acceptedVariants).toEqual(['Mám klíč.']);
    expect(contract.audioPath).toBe(defaultAudioPath('a0c9999'));
    expect(contract.memoryTargetIds).toEqual(['a0c9999']);
    expect(contract.reuseOnly).toBe(false);
  });

  it('prefers explicit fields over defaults', () => {
    const contract = getA0CardContract({
      id: 'a0c9998',
      czech: 'voda',
      targetText: 'Potřebuji vodu.',
      speechType: 'phrase',
      acceptedVariants: [' Potřebuji vodu. ', ''],
      audioPath: '/audio/custom.mp3',
      memoryTargetIds: ['a0c0001'],
      reuseOnly: true,
    });
    expect(contract.targetText).toBe('Potřebuji vodu.');
    expect(contract.speechType).toBe('phrase');
    expect(contract.acceptedVariants).toEqual(['Potřebuji vodu.']);
    expect(contract.audioPath).toBe('/audio/custom.mp3');
    expect(contract.memoryTargetIds).toEqual(['a0c0001']);
    expect(contract.reuseOnly).toBe(true);
  });

  it('falls back to the legacy audioFile field', () => {
    const contract = getA0CardContract({ id: 'a0c9997', czech: 'čaj', audioFile: '/audio/legacy.mp3' });
    expect(contract.audioPath).toBe('/audio/legacy.mp3');
  });
});
