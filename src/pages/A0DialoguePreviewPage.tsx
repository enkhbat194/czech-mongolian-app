import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { a0ReferenceCatalog } from '../data/a0ReferenceCatalog';
import DialogueRunner from '../components/lessons/DialogueRunner';
import { useAppStore } from '../stores/useAppStore';

const A0DialoguePreviewPage: React.FC = () => {
  const currentLessonId = useAppStore((state) => state.currentLessonId) || 'l001';
  const setPage = useAppStore((state) => state.setPage);
  const lesson = a0ReferenceCatalog[currentLessonId as keyof typeof a0ReferenceCatalog] || a0ReferenceCatalog.l001;

  return (
    <div style={{ minHeight: '100dvh', background: '#0C0C0E', color: '#FFF', fontFamily: 'Inter,sans-serif' }}>
      <header style={{ padding: 'max(11px, env(safe-area-inset-top)) 14px 10px', background: '#141416', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <button onClick={() => setPage('a0Lesson')} style={{ width: 34, height: 34, flex: '0 0 34px', borderRadius: 10, border: 0, background: '#242428', color: '#E5E5EA', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={19} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, color: '#C8952A', fontSize: 10, fontWeight: 900 }}>ХӨГЖҮҮЛЭЛТИЙН ШАЛГАЛТ</p>
            <h1 style={{ margin: '2px 0 0', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.titleMn.split(' — ')[0]} · Төгсгөлийн яриа</h1>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 430, margin: '0 auto', padding: '12px 12px 24px' }}>
        <DialogueRunner scenario={lesson.finalDialogue} completionBehavior="stay" />
      </main>
    </div>
  );
};

export default A0DialoguePreviewPage;
