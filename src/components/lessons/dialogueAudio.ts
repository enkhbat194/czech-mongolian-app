import {
  cancelCzechSpeech as cancelSharedCzechSpeech,
  speakCzech as speakSharedCzech,
  type SpeakCzechOptions,
} from '../audio/czechSpeech';

export type { SpeakCzechOptions } from '../audio/czechSpeech';

/**
 * Transitional compatibility adapter.
 * Existing lesson imports resolve to the single shared speech implementation.
 */
export function cancelCzechSpeech() {
  cancelSharedCzechSpeech();
}

export function speakCzech(text: string, options: SpeakCzechOptions = {}) {
  speakSharedCzech(text, options);
}
