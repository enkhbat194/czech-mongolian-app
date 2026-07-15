export interface SpeakTextOptions {
  lang?: string;
  rate?: number;
  onStarted?: () => void;
  onFinished?: () => void;
}

export interface SpeakCzechOptions {
  rate?: number;
  onStarted?: () => void;
  onFinished?: () => void;
}

export interface SpeakMongolianOptions {
  rate?: number;
  onStarted?: () => void;
  onFinished?: () => void;
}

export function cancelSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export function cancelCzechSpeech() {
  cancelSpeech();
}

function findVoice(language: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const normalizedLanguage = language.toLowerCase();
  const languagePrefix = normalizedLanguage.split('-')[0] ?? normalizedLanguage;
  const voices = window.speechSynthesis.getVoices();

  return voices.find((voice) => voice.lang.toLowerCase() === normalizedLanguage)
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith(languagePrefix))
    ?? null;
}

/**
 * Shared temporary browser TTS fallback. Azure-generated MP3 playback will
 * replace this in the audio production phase. Lessons and practice pages use
 * this single implementation while production audio is being generated.
 */
export function speakText(text: string, options: SpeakTextOptions = {}) {
  const {
    lang = 'cs-CZ',
    rate = 0.84,
    onStarted,
    onFinished,
  } = options;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onFinished?.();
    return;
  }

  cancelSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;

  const matchingVoice = findVoice(lang);
  if (matchingVoice) utterance.voice = matchingVoice;

  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    onFinished?.();
  };

  utterance.onstart = () => onStarted?.();
  utterance.onend = finish;
  utterance.onerror = finish;

  try {
    window.speechSynthesis.speak(utterance);
  } catch {
    finish();
  }
}

export function speakCzech(text: string, options: SpeakCzechOptions = {}) {
  speakText(text, { ...options, lang: 'cs-CZ' });
}

export function speakMongolian(text: string, options: SpeakMongolianOptions = {}) {
  speakText(text, { ...options, lang: 'mn-MN' });
}
