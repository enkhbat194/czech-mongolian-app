import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { BottomNav } from './Navigation';
import HomePage      from '../../pages/HomePage';
import LearningPathPage from '../../pages/LearningPathPage';
import PracticePage  from '../../pages/PracticePage';
import ProgressPage  from '../../pages/ProgressPage';
import SettingsPage  from '../../pages/SettingsPage';
import FlashcardPage from '../../pages/FlashcardPage';
import ListeningPage from '../../pages/ListeningPage';
import SpeakingPage  from '../../pages/SpeakingPage';
import WordQuizPage  from '../../pages/WordQuizPage';
import ReverseQuizPage from '../../pages/ReverseQuizPage';
import WritingPage   from '../../pages/WritingPage';
import DictationPage from '../../pages/DictationPage';
import SentenceBuilderPage from '../../pages/SentenceBuilderPage';
import FillBlankPage from '../../pages/FillBlankPage';
import InteractiveLearningPage from '../../pages/InteractiveLearningPage';

const v: Variants = {
  initial:  { opacity:0, y:10 },
  animate:  { opacity:1, y:0, transition:{ duration:.25 } },
  exit:     { opacity:0, y:-6, transition:{ duration:.15 } },
};

const pages: Record<string,React.FC> = {
  home:      HomePage,
  path:      LearningPathPage,
  practice:  PracticePage,
  progress:  ProgressPage,
  settings:  SettingsPage,
  flashcard: FlashcardPage,
  listening: ListeningPage,
  speaking:  SpeakingPage,
  wordQuiz:  WordQuizPage,
  reverseQuiz: ReverseQuizPage,
  writing:   WritingPage,
  dictation: DictationPage,
  sentenceBuilder: SentenceBuilderPage,
  fillBlank: FillBlankPage,
  interactiveLearning: InteractiveLearningPage,
};

const Layout: React.FC = () => {
  const { currentPage } = useAppStore();
  const Page = pages[currentPage] || HomePage;

  return (
    /* outer – gradient desktop bg */
    <div style={{ minHeight:'100vh', background:'#080810', display:'flex', justifyContent:'center' }}>
      {/* phone shell */}
      <div style={{
        position:'relative', width:'100%', maxWidth:430,
        minHeight:'100vh', background:'#0C0C0E',
        boxShadow:'0 0 80px rgba(200,149,42,.08)',
      }}>
        {/* content */}
        <div style={{ overflowY:'auto', paddingBottom:82 }}>
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} variants={v} initial="initial" animate="animate" exit="exit">
              <Page />
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
