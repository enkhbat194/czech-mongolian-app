import React, { useState } from 'react';
import '../stores/a0WordBridge';
import { a0ReferenceCatalog } from '../data/a0ReferenceCatalog';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import A0CarryoverReview from '../components/lessons/A0CarryoverReview';
import { useAppStore } from '../stores/useAppStore';

const A0ReferenceLessonPage: React.FC = () => {
  const currentLessonId = useAppStore((state) => state.currentLessonId);
  const setPage = useAppStore((state) => state.setPage);
  const lesson = currentLessonId ? a0ReferenceCatalog[currentLessonId as keyof typeof a0ReferenceCatalog] : undefined;
  const [carryoverComplete, setCarryoverComplete] = useState(() => currentLessonId === 'l001');

  if (!lesson || !currentLessonId) {
    return (
      <div style={{ background: '#0C0C0E', minHeight: '100dvh', color: '#FFF', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 430, margin: '0 auto', background: '#1C1C1F', border: '1px solid #2A2A2F', borderRadius: 22, padding: 20, textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 10px', fontSize: 22 }}>Энэ хичээлийн өгөгдөл бэлэн болоогүй байна</h1>
          <button onClick={() => setPage('path')} className="btn-gold" style={{ width: '100%', padding: 14 }}>Хичээлийн зам руу буцах</button>
        </div>
      </div>
    );
  }

  if (!carryoverComplete) {
    return <A0CarryoverReview lessonId={currentLessonId} onComplete={() => setCarryoverComplete(true)} />;
  }

  return <A0LessonEngine config={lesson} />;
};

export default A0ReferenceLessonPage;
