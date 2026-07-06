import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { czechWords } from '../data/czechWords';
import type { CzechWord } from '../data/czechWords';
import { lessons } from '../data/lessons';
import type { Lesson } from '../data/lessons';

export interface SRSCard {
  wordId: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: string;
  lastReview: string;
  quality: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface UserProgress {
  totalXP: number;
  streak: number;
  lastStudyDate: string;
  completedLessons: string[];
  introducedWords: string[];
  learnedWords: string[];
  srsCards: Record<string, SRSCard>;
  dailyGoalMinutes: number;
  todayMinutes: number;
  totalMinutes: number;
  weeklyXP: number[];
}

export interface AppState {
  words: CzechWord[];
  lessons: Lesson[];
  currentPage: string;
  currentLessonId: string | null;
  currentWordIndex: number;
  userName: string;
  progress: UserProgress;
  isDarkMode: boolean;
  isAudioPlaying: boolean;
  setPage: (page: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  setCurrentWordIndex: (index: number) => void;
  setUserName: (name: string) => void;
  activateWordForReview: (wordId: string) => void;
  markWordLearned: (wordId: string) => void;
  completeLesson: (lessonId: string) => void;
  addXP: (amount: number) => void;
  addMinutes: (minutes: number) => void;
  updateStreak: () => void;
  updateSRSCard: (wordId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  getDueReviewCards: () => SRSCard[];
  srsCards: SRSCard[];
  dailyGoalMinutes: number;
  getWordsForLesson: (lessonId: string) => CzechWord[];
  getLessonProgress: (lessonId: string) => number;
  toggleDarkMode: () => void;
  unlockNextLesson: (currentLessonId: string) => void;
  setDailyGoal: (minutes: number) => void;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  totalXP: 0,
  streak: 0,
  lastStudyDate: '',
  completedLessons: [],
  introducedWords: [],
  learnedWords: [],
  srsCards: {},
  dailyGoalMinutes: 15,
  todayMinutes: 0,
  totalMinutes: 0,
  weeklyXP: [0, 0, 0, 0, 0, 0, 0],
};

function tomorrowIso() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString();
}

function createReviewCard(wordId: string): SRSCard {
  const now = new Date().toISOString();
  return {
    wordId,
    // The first lesson exposure schedules tomorrow's review. It is not mastery.
    repetitions: 1,
    interval: 1,
    easeFactor: 2.5,
    nextReview: tomorrowIso(),
    lastReview: now,
    quality: 3,
  };
}

function sm2(card: SRSCard, quality: 0 | 1 | 2 | 3 | 4 | 5): SRSCard {
  let { repetitions, easeFactor } = card;
  let interval = 0;

  if (quality >= 3) {
    repetitions += 1;
    interval = repetitions <= 1 ? 1 : repetitions === 2 ? 3 : repetitions === 3 ? 7 : repetitions === 4 ? 14 : 30;
  } else {
    repetitions = 0;
    interval = 0;
  }

  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...card,
    interval,
    repetitions,
    easeFactor,
    quality,
    nextReview: nextDate.toISOString(),
    lastReview: new Date().toISOString(),
  };
}

function withIntroducedWord(progress: UserProgress, wordId: string) {
  const introduced = progress.introducedWords || [];
  return introduced.includes(wordId) ? introduced : [...introduced, wordId];
}

function isDue(card: SRSCard) {
  return new Date(card.nextReview).getTime() <= Date.now();
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      words: czechWords,
      lessons,
      currentPage: 'home',
      currentLessonId: null,
      currentWordIndex: 0,
      userName: 'Суралцагч',
      progress: initialProgress,
      isDarkMode: true,
      isAudioPlaying: false,
      srsCards: [],
      dailyGoalMinutes: 15,

      setPage: (page) => set({ currentPage: page }),
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId, currentWordIndex: 0 }),
      setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
      setUserName: (name) => set({ userName: name }),

      activateWordForReview: (wordId) => {
        const { progress } = get();
        const existing = progress.srsCards[wordId];
        const newCards = existing ? progress.srsCards : { ...progress.srsCards, [wordId]: createReviewCard(wordId) };
        set({
          progress: {
            ...progress,
            introducedWords: withIntroducedWord(progress, wordId),
            srsCards: newCards,
          },
          srsCards: Object.values(newCards),
        });
      },

      markWordLearned: (wordId) => {
        // Legacy callers use this after a card is introduced. Mastery is only
        // granted through successful scheduled recall in updateSRSCard().
        get().activateWordForReview(wordId);
      },

      completeLesson: (lessonId) => {
        const { progress } = get();
        if (!progress.completedLessons.includes(lessonId)) {
          set({ progress: { ...progress, completedLessons: [...progress.completedLessons, lessonId] } });
        }
      },

      addXP: (amount) => {
        const { progress } = get();
        const weekly = [...progress.weeklyXP];
        const dayIndex = new Date().getDay();
        weekly[dayIndex] = (weekly[dayIndex] || 0) + amount;
        set({ progress: { ...progress, totalXP: progress.totalXP + amount, weeklyXP: weekly } });
      },

      addMinutes: (minutes) => {
        const { progress } = get();
        set({ progress: { ...progress, todayMinutes: progress.todayMinutes + minutes, totalMinutes: (progress.totalMinutes || 0) + minutes } });
      },

      updateStreak: () => {
        const { progress } = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (progress.lastStudyDate === today) return;
        const streak = progress.lastStudyDate === yesterday ? progress.streak + 1 : 1;
        set({ progress: { ...progress, streak, lastStudyDate: today } });
      },

      updateSRSCard: (wordId, quality) => {
        const { progress } = get();
        const existing = progress.srsCards[wordId] || createReviewCard(wordId);
        // Learning exercises may repeat a phrase several times in one sitting.
        // Only a due review is allowed to advance 1 → 3 → 7 → 14 → 30 days.
        // A wrong answer always resets it to the same-day queue.
        const updated = quality < 3
          ? sm2(existing, quality)
          : isDue(existing)
            ? sm2(existing, quality)
            : { ...existing, quality: Math.max(existing.quality, quality) as SRSCard['quality'] };
        const newCards = { ...progress.srsCards, [wordId]: updated };
        const currentMastered = progress.learnedWords || [];
        const learnedWords = quality < 3
          ? currentMastered.filter((id) => id !== wordId)
          : updated.repetitions >= 3 && updated.quality >= 4 && !currentMastered.includes(wordId)
            ? [...currentMastered, wordId]
            : currentMastered;

        set({
          progress: {
            ...progress,
            introducedWords: withIntroducedWord(progress, wordId),
            learnedWords,
            srsCards: newCards,
          },
          srsCards: Object.values(newCards),
        });
      },

      getDueReviewCards: () => Object.values(get().progress.srsCards).filter(isDue),
      getWordsForLesson: (lessonId) => get().words.filter((word) => word.lessonId === lessonId),

      getLessonProgress: (lessonId) => {
        const { progress, words } = get();
        const lessonWords = words.filter((word) => word.lessonId === lessonId);
        if (lessonWords.length === 0) return 0;
        const introduced = progress.introducedWords || progress.learnedWords || [];
        const count = lessonWords.filter((word) => introduced.includes(word.id)).length;
        return Math.round((count / lessonWords.length) * 100);
      },

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDailyGoal: (minutes) => {
        const { progress } = get();
        set({ progress: { ...progress, dailyGoalMinutes: minutes }, dailyGoalMinutes: minutes });
      },
      resetProgress: () => set({ progress: initialProgress, lessons, currentWordIndex: 0, currentLessonId: null, srsCards: [] }),

      unlockNextLesson: (currentLessonId) => {
        const { lessons: currentLessons } = get();
        const currentIndex = currentLessons.findIndex((lesson) => lesson.id === currentLessonId);
        if (currentIndex < 0 || currentIndex >= currentLessons.length - 1) return;
        const updated = currentLessons.map((lesson, index) => index === currentIndex + 1 ? { ...lesson, isLocked: false } : lesson);
        set({ lessons: updated });
      },
    }),
    {
      name: 'czech-mn-a0-storage-v2',
      partialize: (state) => ({ userName: state.userName, progress: state.progress, isDarkMode: state.isDarkMode }),
    },
  ),
);
