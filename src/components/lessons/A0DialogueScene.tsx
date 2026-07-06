import React from 'react';
import { getA0StoryScene } from '../../data/a0StoryScenes';

const Person: React.FC<{ x: number; shirt: string; hair: string }> = ({ x, shirt, hair }) => (
  <>
    <circle cx={x} cy="80" r="19" fill="#D8A17B" />
    <path d={`M${x - 19} 79 Q${x} 53 ${x + 19} 78 L${x + 17} 95 Q${x} 87 ${x - 18} 98Z`} fill={hair} />
    <path d={`M${x - 27} 107 Q${x} 91 ${x + 27} 107 L${x + 34} 146 L${x - 34} 146Z`} fill={shirt} />
  </>
);

const A0DialogueScene: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const story = getA0StoryScene(lessonId);
  const isTram = story.sceneId === 'tram';
  const isMeeting = story.sceneId === 'meeting';
  const isWork = story.sceneId === 'work';
  const indoor = !isTram && !isMeeting;
  const background = isTram || isMeeting ? '#9FBED2' : '#35404C';

  return (
    <section style={{ margin: '0 0 14px', overflow: 'hidden', borderRadius: 18, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
      <svg viewBox="0 0 420 156" width="100%" height="auto" aria-label="Ярианы нөхцөл байдлын зураг" style={{ display: 'block', background }}>
        <rect width="420" height="156" fill={background} />
        {indoor && <rect x="0" y="0" width="420" height="156" fill="#28303A" opacity=".3" />}
        {(isTram || isMeeting) && <><rect y="104" width="420" height="52" fill="#515D69" /><rect y="126" width="420" height="30" fill="#363E48" /></>}
        {isTram && <>
          <rect x="190" y="61" width="150" height="56" rx="8" fill="#D74D40" stroke="#5B241E" strokeWidth="3" />
          {[205, 237, 269, 301].map((x) => <rect key={x} x={x} y="72" width="24" height="18" rx="3" fill="#B8D6E7" />)}
          <circle cx="219" cy="121" r="7" fill="#1C222A" /><circle cx="313" cy="121" r="7" fill="#1C222A" />
          <line x1="260" y1="61" x2="276" y2="42" stroke="#1C222A" strokeWidth="4" /><line x1="276" y1="42" x2="292" y2="61" stroke="#1C222A" strokeWidth="4" />
          <rect x="31" y="45" width="47" height="59" rx="4" fill="#E1C8A2" /><rect x="39" y="54" width="31" height="15" rx="2" fill="#6D95B7" />
          <Person x={115} shirt="#315A87" hair="#392724" />
        </>}
        {isMeeting && <>
          <rect x="74" y="110" width="272" height="12" rx="6" fill="#7C5636" /><ellipse cx="210" cy="136" rx="136" ry="24" fill="#6A482E" />
          <Person x={137} shirt="#315A87" hair="#392724" />
          <Person x={284} shirt="#C9B18E" hair="#4C3028" />
          <rect x="194" y="117" width="32" height="17" rx="3" fill="#1C222A" />
          <circle cx="164" cy="116" r="7" fill="#EEE7D8" /><circle cx="257" cy="116" r="7" fill="#EEE7D8" />
        </>}
        {story.sceneId === 'reception' && <>
          <rect x="42" y="22" width="336" height="52" rx="9" fill="#536579" /><rect x="58" y="34" width="304" height="27" rx="4" fill="#A1C6D9" />
          <rect x="27" y="102" width="366" height="41" rx="9" fill="#815936" />
          <Person x={111} shirt="#315A87" hair="#392724" /><Person x={309} shirt="#7B5B22" hair="#4C3028" />
          <rect x="282" y="113" width="53" height="22" rx="4" fill="#F2EEE4" />
        </>}
        {story.sceneId === 'help' && <>
          <rect x="24" y="101" width="372" height="43" rx="9" fill="#815936" />
          <Person x={125} shirt="#315A87" hair="#392724" /><Person x={293} shirt="#7B5B22" hair="#4C3028" />
          <rect x="204" y="111" width="39" height="19" rx="5" fill="#1B222B" /><rect x="181" y="108" width="14" height="28" rx="5" fill="#9ED9EA" />
        </>}
        {story.sceneId === 'building' && <>
          <rect x="28" y="18" width="364" height="102" rx="8" fill="#57616C" />
          {[51, 151, 251].map((x) => <rect key={x} x={x} y="38" width="76" height="70" rx="6" fill="#27323E" />)}
          <rect y="121" width="420" height="35" fill="#3A424C" />
          <Person x={102} shirt="#315A87" hair="#392724" /><Person x={304} shirt="#7B5B22" hair="#4C3028" />
        </>}
        {isWork && <>
          <rect x="31" y="20" width="358" height="80" rx="9" fill="#3E4A56" />
          {[47, 141, 235].map((x) => <rect key={x} x={x} y="33" width="76" height="54" fill="#5D7388" />)}
          <rect y="116" width="420" height="40" fill="#424A54" />
          <Person x={121} shirt="#315A87" hair="#F2C94C" /><Person x={215} shirt="#7B5B22" hair="#F2C94C" />
          <rect x="205" y="111" width="18" height="28" rx="2" fill="#ECE8DD" />
        </>}
      </svg>
      <div style={{ padding: '10px 12px 11px' }}>
        <p style={{ margin: '0 0 3px', color: '#C8952A', fontSize: 10, fontWeight: 900, letterSpacing: .4 }}>ЯРИАНЫ НӨХЦӨЛ</p>
        <p style={{ margin: 0, color: '#FFF', fontSize: 14, fontWeight: 800 }}>{story.placeMn}</p>
      </div>
    </section>
  );
};

export default A0DialogueScene;
