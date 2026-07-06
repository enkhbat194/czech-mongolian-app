import React from 'react';
import { getA0StoryScene } from '../../data/a0StoryScenes';

const sceneIcons: Record<string, string> = {
  reception: '🧑‍💼  🤝  👤',
  help: '👤  📱  🧑‍💼',
  building: '👤  🗺️  🧑‍💼',
  tram: '👤  🚋  🚏',
  meeting: '👤  ☕  👤',
  work: '🦺  📋  🦺',
};

const sceneBackground: Record<string, string> = {
  reception: 'linear-gradient(135deg,#364454,#1B2028)',
  help: 'linear-gradient(135deg,#444A54,#25232A)',
  building: 'linear-gradient(135deg,#535D68,#252B33)',
  tram: 'linear-gradient(135deg,#91B8D5,#D8C08B)',
  meeting: 'linear-gradient(135deg,#9CB8C9,#CFAF78)',
  work: 'linear-gradient(135deg,#4B5966,#293039)',
};

const A0DialogueScene: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const story = getA0StoryScene(lessonId);
  const icons = sceneIcons[story.sceneId] || '👤  💬  👤';
  const background = sceneBackground[story.sceneId] || '#2A2A2F';

  return (
    <section style={{ margin: '0 0 14px', overflow: 'hidden', borderRadius: 18, background: '#1C1C1F', border: '1px solid #2A2A2F' }}>
      <div style={{ height: 112, display: 'grid', placeItems: 'center', background, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, background: 'rgba(15,17,22,.24)' }} />
        <div style={{ position: 'relative', fontSize: 43, letterSpacing: 12, filter: 'drop-shadow(0 8px 8px rgba(0,0,0,.28))' }}>{icons}</div>
      </div>
      <div style={{ padding: '10px 12px 11px' }}>
        <p style={{ margin: '0 0 3px', color: '#C8952A', fontSize: 10, fontWeight: 900, letterSpacing: .4 }}>ЯРИАНЫ НӨХЦӨЛ</p>
        <p style={{ margin: 0, color: '#FFF', fontSize: 14, fontWeight: 800 }}>{story.placeMn}</p>
      </div>
    </section>
  );
};

export default A0DialogueScene;
