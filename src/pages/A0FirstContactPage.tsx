import React from 'react';
import A0LessonEngine from '../components/lessons/A0LessonEngineV2';
import { a0FirstContactCards, a0FirstContactMicroLessons, getA0FirstContactCard } from '../data/a0FirstContact';
import { a0FirstContactFinalDialogue, a0FirstContactMicroDialogues } from '../data/a0Dialogues';

const A0FirstContactPage: React.FC = () => (
  <A0LessonEngine
    config={{
      lessonId: 'l001',
      titleMn: 'A0.1 — Анхны харилцаа',
      durationMinutes: 34,
      cards: a0FirstContactCards,
      microLessons: a0FirstContactMicroLessons,
      getCard: getA0FirstContactCard,
      microDialogues: a0FirstContactMicroDialogues,
      finalDialogue: a0FirstContactFinalDialogue,
      xpReward: 150,
      completionIcon: '🏆',
      completionSummaryMn: 'Та албан ёсоор мэндэлж, нэрээ болон хаанаас ирснээ хэлж, ойлгохгүй үед яриаг удаашруулах хүсэлт тавьж чадна.',
      completionPhrases: ['Dobrý den.','Jmenuji se …','Jsem z Mongolska.','Nerozumím. Mluvte prosím pomalu.','Na shledanou.'],
    }}
  />
);

export default A0FirstContactPage;