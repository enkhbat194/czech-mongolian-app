import React, { useState } from 'react';
import { getA0StoryScene, type A0StorySceneId } from '../../data/a0StoryScenes';

const assetByScene: Record<A0StorySceneId, string> = {
  reception: '/a0-dialogue-scenes/reception.jpg',
  help: '/a0-dialogue-scenes/help.jpg',
  building: '/a0-dialogue-scenes/building.jpg',
  tram: '/a0-dialogue-scenes/tram.jpg',
  meeting: '/a0-dialogue-scenes/meeting.jpg',
  work: '/a0-dialogue-scenes/work.jpg',
};

const A0DialogueScene: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const story = getA0StoryScene(lessonId);
  const [missing, setMissing] = useState(false);
  const imageSrc = assetByScene[story.sceneId];

  return (
    <section style={{ margin: '0 0 9px', overflow: 'hidden', borderRadius: 16, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
      {!missing ? (
        <img
          src={imageSrc}
          alt=""
          onError={() => setMissing(true)}
          style={{ width: '100%', height: 116, objectFit: 'cover', objectPosition: 'center', display: 'block', background: '#242428' }}
        />
      ) : (
        <div style={{ height: 116, display: 'grid', placeItems: 'center', padding: 16, textAlign: 'center', background: 'linear-gradient(135deg,#20242B,#343A45)', color: '#A0A0A8', fontSize: 12, lineHeight: 1.45 }}>
          Ярианы нөхцөл байдлын зураг ачаалагдсангүй.
        </div>
      )}
      <div style={{ minHeight: 38, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px' }}>
        <span style={{ color: '#C8952A', fontSize: 10, fontWeight: 900, letterSpacing: .35, whiteSpace: 'nowrap' }}>ЯРИАНЫ НӨХЦӨЛ</span>
        <span style={{ minWidth: 0, color: '#FFF', fontSize: 13, fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{story.placeMn}</span>
      </div>
    </section>
  );
};

export default A0DialogueScene;
