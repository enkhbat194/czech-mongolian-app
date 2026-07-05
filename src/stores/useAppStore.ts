import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { czechWords } from '../data/czechWords';
import type { CzechWord } from '../data/czechWords';
import { lessons } from '../data/lessons';
import type { Lesson } from '../data/lessons';

export interface SRSCard {
  wordId: string;
  interval: number;       // days
  repetitions: number;
  easeFactor: number;
  nextReview: string;     // ISO date string
  lastReview: string;
  quality: 0 | 1 | 2 | 3 | 4 | 5; // 0-2 fail, 3-5 pass
}

export interface UserProgress {
  totalXP: number;
  streak: number;
  lastStudyDate: string;
  completedLessons: string[];
  learnedWords: string[];
  srsCards: Record<string, SRSCard>;
  dailyGoalMinutes: number;
  todayMinutes: number;
  totalMinutes: number;
  weeklyXP: number[];   // last 7 days
}

export interface AppState {
  // Data
  words: CzechWord[];
  lessons: Lesson[];
  
  // Navigation
  currentPage: string;
  currentLessonId: string | null;
  currentWordIndex: number;
  
  // User
  userName: string;
  progress: UserProgress;
  
  // UI State
  isDarkMode: boolean;
  isAudioPlaying: boolean;
  
  // Actions
  setPage: (page: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  setCurrentWordIndex: (index: number) => void;
  setUserName: (name: string) => void;
  markWordLearned: (wordId: string) => void;
  completeLesson: (lessonId: string) => void;
  addXP: (amount: number) => void;
  addMinutes: (minutes: number) => void;
  updateStreak: () => void;
  updateSRSCard: (wordId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  getDueReviewCards: () => SRSCard[];
  srsCards: SRSCard[];           // computed flat array
  dailyGoalMinutes: number;       // top-level alias - same as progress.dailyGoalMinutes
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
  learnedWords: [],
  srsCards: {},
  dailyGoalMinutes: 15,
  todayMinutes: 0,
  totalMinutes: 0,
  weeklyXP: [0, 0, 0, 0, 0, 0, 0],
};

// SM-2 SRS algorithm
function sm2(card: SRSCard, quality: 0 | 1 | 2 | 3 | 4 | 5): SRSCard {
  let { interval, repetitions, easeFactor } = card;
  
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
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

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      words: czechWords,
      lessons: lessons,
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

      markWordLearned: (wordId) => {
        const { progress } = get();
        if (!progress.learnedWords.includes(wordId)) {
          const newCard: SRSCard = {
            wordId,
            interval: 1,
            repetitions: 0,
            easeFactor: 2.5,
            nextReview: new Date(Date.now() + 86400000).toISOString(),
            lastReview: new Date().toISOString(),
            quality: 3,
          };
          set({
            progress: {
              ...progress,
              learnedWords: [...progress.learnedWords, wordId],
              srsCards: { ...progress.srsCards, [wordId]: newCard },
            },
            srsCards: [...Object.values({ ...progress.srsCards, [wordId]: newCard })],
          });
        }
      },

      completeLesson: (lessonId) => {
        const { progress } = get();
        if (!progress.completedLessons.includes(lessonId)) {
          set({
            progress: {
              ...progress,
              completedLessons: [...progress.completedLessons, lessonId],
            }
          });
        }
      },

      addXP: (amount) => {
        const { progress } = get();
        const weekly = [...progress.weeklyXP];
        const dayIndex = new Date().getDay();
        weekly[dayIndex] = (weekly[dayIndex] || 0) + amount;
        set({
          progress: {
            ...progress,
            totalXP: progress.totalXP + amount,
            weeklyXP: weekly,
          }
        });
      },

      addMinutes: (minutes) => {
        const { progress } = get();
        set({
          progress: {
            ...progress,
            todayMinutes: progress.todayMinutes + minutes,
            totalMinutes: (progress.totalMinutes || 0) + minutes,
          }
        });
      },

      updateStreak: () => {
        const { progress } = get();
        const today = new Date().toDateString();
        const lastDate = progress.lastStudyDate;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        let newStreak = progress.streak;
        if (lastDate === today) return;
        if (lastDate === yesterday) newStreak += 1;
        else if (lastDate !== today) newStreak = 1;
        
        set({
          progress: {
            ...progress,
            streak: newStreak,
            lastStudyDate: today,
          }
        });
      },

      updateSRSCard: (wordId, quality) => {
        const { progress } = get();
        const existing = progress.srsCards[wordId] || {
          wordId,
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReview: new Date().toISOString(),
          lastReview: new Date().toISOString(),
          quality: 0 as const,
        };
        const updated = sm2(existing, quality);
        const newCards = { ...progress.srsCards, [wordId]: updated };
        set({
          progress: {
            ...progress,
            srsCards: newCards,
          },
          srsCards: Object.values(newCards),
        });
      },

      getDueReviewCards: () => {
        const { progress } = get();
        const now = new Date();
        return Object.values(progress.srsCards).filter(card => 
          new Date(card.nextReview) <= now
        );
      },

      getWordsForLesson: (lessonId) => {
        return get().words.filter(w => w.lessonId === lessonId);
      },

      getLessonProgress: (lessonId) => {
        const { progress, words } = get();
        const lessonWords = words.filter(w => w.lessonId === lessonId);
        if (lessonWords.length === 0) return 0;
        const learned = lessonWords.filter(w => progress.learnedWords.includes(w.id)).length;
        return Math.round((learned / lessonWords.length) * 100);
      },

      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),

      setDailyGoal: (minutes) => {
        const { progress } = get();
        set({ progress: { ...progress, dailyGoalMinutes: minutes }, dailyGoalMinutes: minutes });
      },

      resetProgress: () => {
        set({ progress: initialProgress, lessons: lessons, currentWordIndex: 0, currentLessonId: null, srsCards: [] });
      },

      unlockNextLesson: (currentLessonId) => {
        const { lessons: ls } = get();
        const currentIndex = ls.findIndex(l => l.id === currentLessonId);
        if (currentIndex < ls.length - 1) {
          const updated = ls.map((lesson, idx) =>
            idx === currentIndex + 1 ? { ...lesson, isLocked: false } : lesson
          );
          set({ lessons: updated });
        }
      },
    }),
    {
      // A0 curriculum нь өмнөх demo data-тай нийцэхгүй тул шинэ storage ашиглана.
      // Ингэснээр w001 зэрэг хуучин картын ID шинэ 25 картын тоонд холилдохгүй.
      name: 'czech-mn-a0-storage-v2',
      partialize: (state) => ({
        userName: state.userName,
        progress: state.progress,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);