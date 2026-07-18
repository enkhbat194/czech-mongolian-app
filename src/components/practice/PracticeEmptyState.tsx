import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface PracticeEmptyStateProps {
  onBack: () => void;
  onGoToLessons: () => void;
  title?: string;
  description?: string;
  icon?: string;
}

const PracticeEmptyState: React.FC<PracticeEmptyStateProps> = ({
  onBack,
  onGoToLessons,
  title = 'Эхлээд хичээлээ үзээрэй',
  description = 'Энэ дасгалд зөвхөн өмнө нь үзсэн Чех хэллэгүүд орно.',
  icon = '📚',
}) => (
  <div style={{ background: '#0C0C0E', minHeight: '100vh', padding: 20, fontFamily: 'Inter,sans-serif', color: '#FFF' }}>
    <button
      onClick={onBack}
      aria-label="Буцах"
      style={{ width: 34, height: 34, borderRadius: 10, background: '#242428', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <ChevronLeft size={18} color="#A0A0A8" />
    </button>
    <section style={{ maxWidth: 430, margin: '80px auto 0', background: '#1C1C1F', borderRadius: 24, padding: 28, textAlign: 'center', border: '1px solid #2A2A2F' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
      <h2 style={{ fontSize: 20, fontWeight: 900, color: '#FFF', margin: '0 0 8px' }}>{title}</h2>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: '#A0A0A8', margin: '0 0 20px' }}>{description}</p>
      <button onClick={onGoToLessons} className="btn-gold" style={{ width: '100%', padding: 14, fontSize: 14 }}>Хичээл рүү очих</button>
    </section>
  </div>
);

export default PracticeEmptyState;
