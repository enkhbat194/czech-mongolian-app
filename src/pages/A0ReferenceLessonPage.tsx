import React from 'react';
import '../stores/a0WordBridge';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import { a0ReferenceLessons } from '../data/a0ReferenceLessons';
import { useAppStore } from '../stores/useAppStore';

const A0ReferenceLessonPage: React.FC = () => {
  const currentLessonId = useAppStore((state) => state.currentLessonId);
  const setPage = useAppStore((state) => state.setPage);
  const lesson = currentLessonId
    ? a0ReferenceLessons[currentLessonId as keyof typeof a0ReferenceLessons]
    : undefined;

  if (!lesson) {
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 430, margin: '0 auto', background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 22, padding: 20, textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#C8952A', fontWeight: 800, fontSize: 12 }}>A0 ХИЧЭЭЛ</p>
          <h1 style={{ margin: '8px 0', fontSize: 22 }}>Энэ хичээлийн өгөгдөл бэлэн болоогүй байна</h1>
          <p style={{ margin: '0 0 18px', color: '#A0A0A8', lineHeight: 1.5 }}>Хичээлийн зам руу буцаад бэлэн болсон хичээлээ сонго.</p>
          <button onClick={() => setPage('path')} className="btn-gold" style={{ width: '100%', padding: 14 }}>Хичээлийн зам руу буцах</button>
        </div>
      </div>
    );
  }

  return <A0LessonEngine config={lesson} />;
};

export default A0ReferenceLessonPage;
