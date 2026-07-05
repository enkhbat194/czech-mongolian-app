import React from 'react';
import A0LessonEngine from '../components/lessons/A0LessonEngineV4';
import { a0NeedsCards, a0NeedsMicroLessons, getA0NeedsCard } from '../data/a0Needs';
import { a0NeedsFinalDialogue, a0NeedsMicroDialogues } from '../data/a0Dialogues';

const A0NeedsPage: React.FC = () => (
  <A0LessonEngine
    config={{
      lessonId: 'l002',
      titleMn: 'A0.2 — Надад хэрэгтэй',
      durationMinutes: 32,
      cards: a0NeedsCards,
      microLessons: a0NeedsMicroLessons,
      getCard: getA0NeedsCard,
      microDialogues: a0NeedsMicroDialogues,
      finalDialogue: a0NeedsFinalDialogue,
      xpReward: 160,
      completionIcon: '🧾',
      completionSummaryMn: 'Та одоо тусламж, ус, утас хэрэгтэйгээ хэлж, хүсэлтээ илэрхийлж, мөнгө эсвэл карт байхгүйгээ тайлбарлаж чадна.',
      completionPhrases: ['Potřebuji pomoc.','Potřebuji vodu.','Chci něco k jídlu.','Nemám kartu.','Potřebuji pomoc, prosím.'],
    }}
  />
);

export default A0NeedsPage;