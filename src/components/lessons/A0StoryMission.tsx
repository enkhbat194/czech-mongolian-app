import React from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { getA0StoryScene, type A0StorySceneId } from '../../data/a0StoryScenes';

const shell: React.CSSProperties = {
  minHeight: '100dvh',
  background: '#0C0C0E',
  color: '#FFF',
  fontFamily: 'Inter,sans-serif',
};

const card: React.CSSProperties = {
  background: '#1C1C1F',
  border: '1px solid #2A2A2F',
  borderRadius: 20,
};

const StoryArt: React.FC<{ sceneId: A0StorySceneId }> = ({ sceneId }) => {
  const isMeeting = sceneId === 'meeting';
  const isTram = sceneId === 'tram';
  const isWork = sceneId === 'work';
  const isBuilding = sceneId === 'building';
  const isReception = sceneId === 'reception';

  return (
    <svg viewBox="0 0 420 248" width="100%" height="auto" role="img" aria-label="Харилцан ярианы нөхцөл байдлын зураг" style={{ display: 'block', background: '#22242A' }}>
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#91B8D5"/><stop offset="1" stopColor="#E7C787"/></linearGradient>
        <linearGradient id="wall" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#3C414B"/><stop offset="1" stopColor="#1D2027"/></linearGradient>
        <linearGradient id="desk" x1="0" x2="1"><stop stopColor="#8E633F"/><stop offset="1" stopColor="#4D321F"/></linearGradient>
      </defs>
      {!isBuilding && !isReception && <rect x="0" y="0" width="420" height="248" fill="url(#sky)" />}
      {(isMeeting || isTram) && <>
        <rect x="0" y="150" width="420" height="98" fill="#59626E" />
        <rect x="0" y="182" width="420" height="66" fill="#39404A" />
        <rect x="18" y="36" width="88" height="114" rx="6" fill="#E0C6A2" />
        <rect x="28" y="49" width="21" height="26" rx="2" fill="#6D91B8" />
        <rect x="57" y="49" width="21" height="26" rx="2" fill="#6D91B8" />
        <rect x="28" y="84" width="21" height="26" rx="2" fill="#6D91B8" />
        <rect x="57" y="84" width="21" height="26" rx="2" fill="#6D91B8" />
        <circle cx="348" cy="55" r="27" fill="#F5E6C3" stroke="#4A4A50" strokeWidth="4" />
        <line x1="348" y1="55" x2="348" y2="39" stroke="#30323A" strokeWidth="3" strokeLinecap="round" />
        <line x1="348" y1="55" x2="362" y2="65" stroke="#30323A" strokeWidth="3" strokeLinecap="round" />
        <rect x="331" y="82" width="34" height="68" rx="4" fill="#535B65" />
        <circle cx="348" cy="154" r="7" fill="#222831" />
      </>}
      {isTram && <>
        <rect x="180" y="112" width="154" height="64" rx="9" fill="#D84E3E" stroke="#54201B" strokeWidth="3" />
        <rect x="195" y="124" width="25" height="22" rx="3" fill="#B9D7E7" />
        <rect x="227" y="124" width="25" height="22" rx="3" fill="#B9D7E7" />
        <rect x="259" y="124" width="25" height="22" rx="3" fill="#B9D7E7" />
        <rect x="291" y="124" width="25" height="22" rx="3" fill="#B9D7E7" />
        <circle cx="212" cy="179" r="9" fill="#222831" /><circle cx="302" cy="179" r="9" fill="#222831" />
        <line x1="260" y1="111" x2="276" y2="87" stroke="#2A2A2F" strokeWidth="4" />
        <line x1="276" y1="87" x2="290" y2="111" stroke="#2A2A2F" strokeWidth="4" />
      </>}
      {isMeeting && <>
        <rect x="64" y="178" width="287" height="14" rx="7" fill="url(#desk)" />
        <ellipse cx="207" cy="205" rx="142" ry="31" fill="url(#desk)" />
        <circle cx="132" cy="128" r="26" fill="#D9A477" />
        <path d="M104 130 Q129 88 157 123 L155 144 Q130 132 104 147Z" fill="#2D1E1B" />
        <path d="M98 164 Q130 142 164 165 L176 204 L88 204Z" fill="#2A4E7E" />
        <circle cx="289" cy="129" r="26" fill="#D39A76" />
        <path d="M262 125 Q286 89 316 120 L314 145 Q286 133 262 146Z" fill="#4C3028" />
        <path d="M251 165 Q286 144 321 165 L337 204 L238 204Z" fill="#D3BD9A" />
        <rect x="196" y="184" width="42" height="20" rx="4" fill="#1B2028" />
        <circle cx="156" cy="178" r="9" fill="#ECE7DB" /><circle cx="264" cy="178" r="9" fill="#ECE7DB" />
      </>}
      {isReception && <>
        <rect x="0" y="0" width="420" height="248" fill="url(#wall)" />
        <rect x="42" y="35" width="336" height="78" rx="11" fill="#536274" />
        <rect x="59" y="50" width="302" height="48" rx="6" fill="#9FC1D4" opacity=".82" />
        <rect x="30" y="159" width="360" height="59" rx="10" fill="url(#desk)" />
        <circle cx="112" cy="133" r="24" fill="#D8A17B" /><path d="M87 133 Q110 96 137 129 L136 149 Q112 138 88 151Z" fill="#3A2724" /><path d="M76 166 Q112 145 148 166 L157 211 L69 211Z" fill="#315A87" />
        <circle cx="308" cy="132" r="24" fill="#D39B78" /><path d="M284 130 Q309 96 336 128 L334 149 Q309 140 284 150Z" fill="#4C3028" /><path d="M272 166 Q307 146 344 166 L353 211 L262 211Z" fill="#7B5B22" />
        <rect x="278" y="174" width="59" height="28" rx="4" fill="#F5F0E7" />
      </>}
      {sceneId === 'help' && <>
        <rect x="0" y="0" width="420" height="248" fill="url(#wall)" />
        <rect x="24" y="156" width="372" height="66" rx="10" fill="url(#desk)" />
        <circle cx="126" cy="131" r="25" fill="#D8A17B" /><path d="M100 130 Q126 94 153 126 L151 148 Q126 138 101 149Z" fill="#3B2924" /><path d="M90 166 Q126 144 163 166 L174 213 L80 213Z" fill="#315A87" />
        <circle cx="292" cy="132" r="25" fill="#D39B78" /><path d="M267 128 Q293 94 321 127 L318 149 Q293 140 267 150Z" fill="#4B302A" /><path d="M258 166 Q294 144 331 166 L344 213 L247 213Z" fill="#7B5B22" />
        <rect x="211" y="174" width="44" height="25" rx="6" fill="#1B2028" /><circle cx="233" cy="194" r="2" fill="#C8952A" />
        <rect x="180" y="171" width="18" height="31" rx="6" fill="#A9D7E8" /><rect x="184" y="164" width="10" height="9" rx="4" fill="#A9D7E8" />
      </>}
      {isBuilding && <>
        <rect x="0" y="0" width="420" height="248" fill="#2B2D34" />
        <rect x="24" y="22" width="372" height="174" rx="10" fill="#555C66" />
        <rect x="44" y="49" width="86" height="132" rx="8" fill="#25313D" />
        <rect x="145" y="49" width="86" height="132" rx="8" fill="#25313D" />
        <rect x="246" y="49" width="86" height="132" rx="8" fill="#25313D" />
        <rect x="347" y="49" width="29" height="132" rx="8" fill="#25313D" />
        <rect x="0" y="196" width="420" height="52" fill="#353A43" />
        <circle cx="100" cy="150" r="24" fill="#D8A17B" /><path d="M76 151 Q100 112 126 147 L125 167 Q100 156 76 170Z" fill="#3B2924" /><path d="M66 184 Q100 162 136 184 L145 225 L55 225Z" fill="#315A87" />
        <circle cx="302" cy="151" r="24" fill="#D39B78" /><path d="M278 148 Q302 112 330 147 L328 168 Q302 156 278 169Z" fill="#4B302A" /><path d="M268 184 Q302 162 338 184 L347 225 L257 225Z" fill="#7B5B22" />
      </>}
      {isWork && <>
        <rect x="0" y="0" width="420" height="248" fill="#2C3038" />
        <rect x="32" y="28" width="356" height="115" rx="10" fill="#3E4752" />
        <rect x="45" y="44" width="76" height="75" fill="#55697A" /><rect x="137" y="44" width="76" height="75" fill="#55697A" /><rect x="229" y="44" width="76" height="75" fill="#55697A" />
        <rect x="0" y="183" width="420" height="65" fill="#404650" />
        <rect x="269" y="146" width="93" height="45" rx="5" fill="#9A7047" /><rect x="281" y="155" width="69" height="9" fill="#B88A5E" /><rect x="281" y="170" width="69" height="9" fill="#B88A5E" />
        <circle cx="116" cy="137" r="26" fill="#D8A17B" /><path d="M90 132 Q116 98 142 132 L142 146 L90 146Z" fill="#F2C94C" /><path d="M81 171 Q116 149 153 171 L163 221 L71 221Z" fill="#315A87" />
        <circle cx="212" cy="137" r="26" fill="#D39B78" /><path d="M186 132 Q212 98 238 132 L238 146 L186 146Z" fill="#F2C94C" /><path d="M177 171 Q212 149 249 171 L259 221 L167 221Z" fill="#7B5B22" />
        <rect x="203" y="170" width="18" height="31" rx="2" fill="#E9E5D9" /><line x1="207" y1="179" x2="217" y2="179" stroke="#7B7F84" strokeWidth="2" /><line x1="207" y1="186" x2="217" y2="186" stroke="#7B7F84" strokeWidth="2" />
      </>}
    </svg>
  );
};

interface Props {
  lessonId: string;
  lessonTitleMn: string;
  onStart: () => void;
  onBack: () => void;
}

const PhraseChip: React.FC<{ text: string; accent?: boolean }> = ({ text, accent = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, padding: '9px 10px', borderRadius: 12, background: accent ? 'rgba(200,149,42,.14)' : '#242428', border: accent ? '1px solid rgba(200,149,42,.42)' : '1px solid #34343A' }}>
    <Volume2 size={14} color={accent ? '#F5C842' : '#A0A0A8'} />
    <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.25 }}>{text}</span>
  </div>
);

const A0StoryMission: React.FC<Props> = ({ lessonId, lessonTitleMn, onStart, onBack }) => {
  const story = getA0StoryScene(lessonId);

  return (
    <div style={shell}>
      <header style={{ padding: 'max(16px, env(safe-area-inset-top)) 18px 14px', background: '#141416', borderBottom: '1px solid #2A2A2F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <button onClick={onBack} aria-label="Хичээлийн зам руу буцах" style={{ width: 36, height: 36, borderRadius: 11, border: 0, background: '#242428', color: '#E5E5EA', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, color: '#C8952A', fontSize: 12, fontWeight: 800 }}>{lessonTitleMn.split(' — ')[0]} · ҮЙЛ ЯВДЛЫН ДААЛГАВАР</p>
            <h1 style={{ margin: '3px 0 0', fontSize: 18, lineHeight: 1.2 }}>{story.placeMn}</h1>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 430, margin: '0 auto', padding: '16px 16px 30px' }}>
        <div style={{ ...card, overflow: 'hidden', marginBottom: 12 }}><StoryArt sceneId={story.sceneId} /></div>

        <section style={{ ...card, padding: 16, marginBottom: 12 }}>
          <p style={{ margin: '0 0 7px', color: '#F5C842', fontSize: 12, fontWeight: 900 }}>НӨХЦӨЛ БАЙДАЛ</p>
          <p style={{ margin: 0, color: '#F1F1F4', fontSize: 15, lineHeight: 1.52 }}>{story.contextMn}</p>
        </section>

        <section style={{ ...card, padding: 16, marginBottom: 12 }}>
          <p style={{ margin: '0 0 10px', color: '#F5C842', fontSize: 12, fontWeight: 900 }}>ЭНЭ ЯРИАНД АШИГЛАХ ГОЛ ХЭЛЛЭГ</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
            {story.currentPhrases.map((phrase) => <PhraseChip key={phrase} text={phrase} accent />)}
          </div>
          <p style={{ margin: '14px 0 8px', color: '#A0A0A8', fontSize: 11, fontWeight: 800 }}>ӨМНӨ СУРСАНААС ДАХИН АШИГЛАХ</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {story.reusePhrases.map((phrase) => <PhraseChip key={phrase} text={phrase} />)}
          </div>
        </section>

        <section style={{ ...card, padding: 16, marginBottom: 18 }}>
          <p style={{ margin: '0 0 12px', color: '#F5C842', fontSize: 12, fontWeight: 900 }}>ЯРИАНЫ ДАРААЛАЛ</p>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 3 }}>
            {story.beats.map((beat, index) => (
              <React.Fragment key={beat.id}>
                <div style={{ flex: '0 0 126px', minHeight: 128, padding: 12, borderRadius: 15, background: '#242428', border: '1px solid #34343A' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}><span style={{ fontSize: 25 }}>{beat.icon}</span><span style={{ color: '#C8952A', fontSize: 12, fontWeight: 900 }}>{index + 1}</span></div>
                  <p style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 900, lineHeight: 1.25 }}>{beat.titleMn}</p>
                  <p style={{ margin: 0, color: '#A0A0A8', fontSize: 11, lineHeight: 1.36 }}>{beat.detailMn}</p>
                </div>
                {index < story.beats.length - 1 && <div style={{ display: 'grid', placeItems: 'center', flex: '0 0 9px', color: '#C8952A' }}>›</div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        <button onClick={onStart} className="btn-gold" style={{ width: '100%', minHeight: 54, borderRadius: 16, fontSize: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          Яриаг эхлэх <ChevronRight size={20} />
        </button>
      </main>
    </div>
  );
};

export default A0StoryMission;
