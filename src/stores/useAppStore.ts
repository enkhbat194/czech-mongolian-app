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
  exposures: number;
  correctAttempts: number;
  incorrectAttempts: number;
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
  return { wordId, repetitions: 1, interval: 1, easeFactor: 2.5, nextReview: tomorrowIso(), lastReview: now, quality: 3, exposures: 0, correctAttempts: 0, incorrectAttempts: 0 };
}

function normalizeCard(card: Partial<SRSCard> & Pick<SRSCard, 'wordId'>): SRSCard {
  return { ...createReviewCard(card.wordId), ...card, exposures: card.exposures ?? 0, correctAttempts: card.correctAttempts ?? 0, incorrectAttempts: card.incorrectAttempts ?? 0 };
}

function sm2(card: SRSCard, quality: 0 | 1 | 2 | 3 | 4 | 5): SRSCard {
  let { repetitions, easeFactor } = card;
  let interval = 0;
  if (quality >= 3) {
    repetitions += 1;
    interval = repetitions <= 1 ? 1 : repetitions === 2 ? 3 : repetitions === 3 ? 7 : repetitions === 4 ? 14 : 30;
  } else {
    repetitions = 0;
  }
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  return { ...card, interval, repetitions, easeFactor, quality, nextReview: nextDate.toISOString(), lastReview: new Date().toISOString() };
}

function withIntroducedWord(progress: UserProgress, wordId: string) {
  return progress.introducedWords.includes(wordId) ? progress.introducedWords : [...progress.introducedWords, wordId];
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
      setPage: (page) => set({ currentPage: page }),
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId, currentWordIndex: 0 }),
      setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
      setUserName: (name) => set({ userName: name }),
      activateWordForReview: (wordId) => {
        const { progress } = get();
        const current = progress.srsCards[wordId] ? normalizeCard(progress.srsCards[wordId]) : createReviewCard(wordId);
        const updated = { ...current, exposures: current.exposures + 1, lastReview: new Date().toISOString() };
        set({ progress: { ...progress, introducedWords: withIntroducedWord(progress, wordId), srsCards: { ...progress.srsCards, [wordId]: updated } } });
      },
      markWordLearned: (wordId) => get().activateWordForReview(wordId),
      completeLesson: (lessonId) => {
        const { progress } = get();
        if (!progress.completedLessons.includes(lessonId)) set({ progress: { ...progress, completedLessons: [...progress.completedLessons, lessonId] } });
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
        set({ progress: { ...progress, todayMinutes: progress.todayMinutes + minutes, totalMinutes: progress.totalMinutes + minutes } });
      },
      updateStreak: () => {
        const { progress } = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (progress.lastStudyDate === today) return;
        set({ progress: { ...progress, streak: progress.lastStudyDate === yesterday ? progress.streak + 1 : 1, lastStudyDate: today } });
      },
      updateSRSCard: (wordId, quality) => {
        const { progress } = get();
        const current = normalizeCard(progress.srsCards[wordId] || createReviewCard(wordId));
        const scheduled = quality < 3 ? sm2(current, quality) : isDue(current) ? sm2(current, quality) : { ...current, quality: Math.max(current.quality, quality) as SRSCard['quality'] };
        const updated = { ...scheduled, exposures: current.exposures + 1, correctAttempts: current.correctAttempts + (quality >= 3 ? 1 : 0), incorrectAttempts: current.incorrectAttempts + (quality < 3 ? 1 : 0), lastReview: new Date().toISOString() };
        const cards = { ...progress.srsCards, [wordId]: updated };
        const learnedWords = quality < 3 ? progress.learnedWords.filter((id) => id !== wordId) : updated.repetitions >= 3 && updated.quality >= 4 && !progress.learnedWords.includes(wordId) ? [...progress.learnedWords, wordId] : progress.learnedWords;
        set({ progress: { ...progress, introducedWords: withIntroducedWord(progress, wordId), learnedWords, srsCards: cards } });
      },
      getDueReviewCards: () => Object.values(get().progress.srsCards).map(normalizeCard).filter(isDue),
      getWordsForLesson: (lessonId) => get().words.filter((word) => word.lessonId === lessonId),
      getLessonProgress: (lessonId) => {
        const { progress, words } = get();
        const lessonWords = words.filter((word) => word.lessonId === lessonId);
        return lessonWords.length ? Math.round((lessonWords.filter((word) => progress.introducedWords.includes(word.id)).length / lessonWords.length) * 100) : 0;
      },
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDailyGoal: (minutes) => {
        const { progress } = get();
        set({ progress: { ...progress, dailyGoalMinutes: minutes } });
      },
      resetProgress: () => set({ progress: initialProgress, lessons, currentWordIndex: 0, currentLessonId: null }),
      unlockNextLesson: (currentLessonId) => {
        const { lessons: currentLessons } = get();
        const currentIndex = currentLessons.findIndex((lesson) => lesson.id === currentLessonId);
        if (currentIndex < 0 || currentIndex >= currentLessons.length - 1) return;
        set({ lessons: currentLessons.map((lesson, index) => index === currentIndex + 1 ? { ...lesson, isLocked: false } : lesson) });
      },
    }),
    {
      name: 'czech-mn-a0-storage-v2',
      partialize: (state) => ({ userName: state.userName, progress: state.progress, isDarkMode: state.isDarkMode }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<AppState>;
        const savedProgress = saved.progress as Partial<UserProgress> | undefined;
        const rawCards = savedProgress?.srsCards || {};
        const normalizedCards = Object.fromEntries(Object.entries(rawCards).map(([id, card]) => [id, normalizeCard({ ...(card as SRSCard), wordId: id })]));
        return { ...current, ...saved, lessons: current.lessons, words: current.words, progress: { ...initialProgress, ...savedProgress, srsCards: normalizedCards } };
      },
    },
  ),
);
