import React, { useState } from 'react';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import A0CarryoverReview from '../components/lessons/A0CarryoverReview';
import { a0LocationCards, a0LocationMicroLessons, getA0LocationCard } from '../data/a0Location';
import { a0LocationFinalDialogue, a0LocationMicroDialogues } from '../data/a0LocationDialogues';

const A0LocationPage: React.FC = () => {
  const [carryoverComplete, setCarryoverComplete] = useState(false);

  if (!carryoverComplete) {
    return <A0CarryoverReview lessonId="l003" onComplete={() => setCarryoverComplete(true)} />;
  }

  return (
    <A0LessonEngine
      config={{
        lessonId: 'l003',
        titleMn: 'A0.3 — Хаана байна?',
        durationMinutes: 28,
        cards: a0LocationCards,
        microLessons: a0LocationMicroLessons,
        getCard: getA0LocationCard,
        microDialogues: a0LocationMicroDialogues,
        finalDialogue: a0LocationFinalDialogue,
        xpReward: 170,
        completionIcon: '📍',
        completionSummaryMn: 'Та танихгүй газарт ариун цэврийн өрөө, дэлгүүр, эмийн сан, галт тэрэгний буудал хаана байгааг асууж, “энд / тэнд” гэсэн хариуг тодруулж чадна.',
        completionPhrases: ['Prosím, kde je toaleta?', 'Kde je obchod?', 'Kde je lékárna?', 'Kde je nádraží?', 'Tady, nebo tam?'],
      }}
    />
  );
};

export default A0LocationPage;