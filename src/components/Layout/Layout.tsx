import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { BottomNav } from './Navigation';
import HomePage from '../../pages/HomePage';
import LearningPathPage from '../../pages/LearningPathPage';
import PracticePage from '../../pages/PracticePage';
import ProgressPage from '../../pages/ProgressPage';
import SettingsPage from '../../pages/SettingsPage';
import FlashcardPage from '../../pages/FlashcardPage';
import ListeningPage from '../../pages/ListeningPage';
import SpeakingPage from '../../pages/SpeakingPage';
import WordQuizPage from '../../pages/WordQuizPage';
import ReverseQuizPage from '../../pages/ReverseQuizPage';
import WritingPage from '../../pages/WritingPage';
import DictationPage from '../../pages/DictationPage';
import FillBlankPage from '../../pages/FillBlankPage';
import InteractiveLearningPage from '../../pages/InteractiveLearningPage';
import A0ReferenceLessonPage from '../../pages/A0ReferenceLessonPage';
import TodayReviewPage from '../../pages/TodayReviewPage';

const v: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

const pages: Record<string, React.FC> = {
  home: HomePage,
  path: LearningPathPage,
  practice: PracticePage,
  progress: ProgressPage,
  settings: SettingsPage,
  flashcard: FlashcardPage,
  listening: ListeningPage,
  speaking: SpeakingPage,
  wordQuiz: WordQuizPage,
  reverseQuiz: ReverseQuizPage,
  writing: WritingPage,
  dictation: DictationPage,
  fillBlank: FillBlankPage,
  interactiveLearning: InteractiveLearningPage,
  a0Lesson: A0ReferenceLessonPage,
  todayReview: TodayReviewPage,
};

const Layout: React.FC = () => {
  const { currentPage } = useAppStore();
  const Page = pages[currentPage] || HomePage;
  const isImmersiveLesson = ['a0Lesson', 'todayReview'].includes(currentPage);

  return (
    <div style={{ minHeight: '100dvh', background: '#080810', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 430, minHeight: '100dvh', background: '#0C0C0E', boxShadow: '0 0 80px rgba(200,149,42,.08)' }}>
        <div style={{ overflowY: 'auto', minHeight: '100dvh', paddingBottom: isImmersiveLesson ? 0 : 82 }}>
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} variants={v} initial="initial" animate="animate" exit="exit">
              <Page />
            </motion.div>
          </AnimatePresence>
        </div>
        {!isImmersiveLesson && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
