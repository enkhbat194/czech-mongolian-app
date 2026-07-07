export interface SpeakCzechOptions {
  rate?: number;
  onFinished?: () => void;
}

export function cancelCzechSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

function findCzechVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang.toLowerCase() === 'cs-cz')
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('cs'))
    ?? null;
}

/**
 * Temporary browser TTS fallback. Azure-generated MP3 playback will replace this
 * in the audio production phase. The API is shared by lessons, dialogues, and review.
 */
export function speakCzech(text: string, options: SpeakCzechOptions = {}) {
  const { rate = 0.84, onFinished } = options;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onFinished?.();
    return;
  }

  cancelCzechSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'cs-CZ';
  utterance.rate = rate;

  const czechVoice = findCzechVoice();
  if (czechVoice) utterance.voice = czechVoice;

  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    onFinished?.();
  };

  utterance.onend = finish;
  utterance.onerror = finish;

  try {
    window.speechSynthesis.speak(utterance);
  } catch {
    finish();
  }
}
