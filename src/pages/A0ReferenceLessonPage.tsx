import React, { useEffect, useState } from 'react';
import '../stores/a0WordBridge';
import { a0ReferenceCatalog } from '../data/a0ReferenceCatalog';
import A0LessonEngine from '../components/lessons/A0LessonEngine';
import A0CarryoverReview from '../components/lessons/A0CarryoverReview';
import { useAppStore } from '../stores/useAppStore';

const DialoguePreviewShortcut: React.FC = () => {
  const setPage = useAppStore((state) => state.setPage);
  return (
    <button onClick={() => setPage('a0DialoguePreview')} style={{ position: 'fixed', right: 14, bottom: 14, zIndex: 30, padding: '10px 12px', borderRadius: 14, border: '1px solid rgba(200,149,42,.55)', background: '#1C1C1F', color: '#F5C842', boxShadow: '0 8px 22px rgba(0,0,0,.38)', fontSize: 12, fontWeight: 900, cursor: 'pointer' }}>
      💬 Яриаг шууд шалгах
    </button>
  );
};

const A0ReferenceLessonPage: React.FC = () => {
  const currentLessonId = useAppStore((state) => state.currentLessonId);
  const setPage = useAppStore((state) => state.setPage);
  const lesson = currentLessonId ? a0ReferenceCatalog[currentLessonId as keyof typeof a0ReferenceCatalog] : undefined;
  const [carryoverComplete, setCarryoverComplete] = useState(() => currentLessonId === 'l001');

  useEffect(() => {
    setCarryoverComplete(currentLessonId === 'l001');
  }, [currentLessonId]);

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
    return <><A0CarryoverReview lessonId={currentLessonId} onComplete={() => setCarryoverComplete(true)} /><DialoguePreviewShortcut /></>;
  }

  return <A0LessonEngine config={lesson} />;
};

export default A0ReferenceLessonPage;
