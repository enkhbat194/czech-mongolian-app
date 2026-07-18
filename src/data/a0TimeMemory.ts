import { a0ExerciseMemoryTargetIds } from './a0ExerciseMemoryMap';
import { a0MemoryTargets } from './a0MemoryPlan';

const active = { card: 1, recognition: 2, retrieval: 2, dialogue: 2, carryover: 2 };
const support = { card: 1, recognition: 1, retrieval: 1, dialogue: 1, carryover: 0 };

if (!a0MemoryTargets.some((target) => target.id === 'a0c0072')) {
  a0MemoryTargets.push(...[
    { id:'a0c0072', lessonId:'l005', czech:'kolik', mongolian:'хэд', priority:'support', requiredCoverage:support },
    { id:'a0c0073', lessonId:'l005', czech:'Kolik je hodin?', mongolian:'Цаг хэд болж байна?', priority:'active', requiredCoverage:active },
    { id:'a0c0074', lessonId:'l005', czech:'teď', mongolian:'одоо', priority:'support', requiredCoverage:support },
    { id:'a0c0075', lessonId:'l005', czech:'dnes', mongolian:'өнөөдөр', priority:'support', requiredCoverage:support },
    { id:'a0c0076', lessonId:'l005', czech:'zítra', mongolian:'маргааш', priority:'support', requiredCoverage:support },
    { id:'a0c0077', lessonId:'l005', czech:'ráno', mongolian:'өглөө', priority:'support', requiredCoverage:support },
    { id:'a0c0078', lessonId:'l005', czech:'večer', mongolian:'орой', priority:'support', requiredCoverage:support },
    { id:'a0c0079', lessonId:'l005', czech:'Kdy?', mongolian:'Хэзээ?', priority:'support', requiredCoverage:support },
    { id:'a0c0080', lessonId:'l005', czech:'Kdy máte čas?', mongolian:'Та хэзээ завтай вэ?', priority:'active', requiredCoverage:active },
    { id:'a0c0081', lessonId:'l005', czech:'Mám čas.', mongolian:'Би завтай.', priority:'active', requiredCoverage:active },
    { id:'a0c0082', lessonId:'l005', czech:'Nemám čas.', mongolian:'Би завгүй.', priority:'active', requiredCoverage:active },
    { id:'a0c0083', lessonId:'l005', czech:'v osm', mongolian:'найман цагт', priority:'support', requiredCoverage:support },
    { id:'a0c0084', lessonId:'l005', czech:'schůzka', mongolian:'уулзалт', priority:'support', requiredCoverage:support },
    { id:'a0c0085', lessonId:'l005', czech:'Máme schůzku v osm.', mongolian:'Бид найман цагт уулзалттай.', priority:'active', requiredCoverage:active },
  ] as unknown as typeof a0MemoryTargets);
}

Object.assign(a0ExerciseMemoryTargetIds, {
  'a0-5-a-1':'a0c0073', 'a0-5-a-2':'a0c0074', 'a0-5-a-3':'a0c0073',
  'a0-5-b-1':'a0c0076', 'a0-5-b-2':'a0c0078',
  'a0-5-c-1':'a0c0080', 'a0-5-c-2':'a0c0082',
  'a0-5-d-1':'a0c0083', 'a0-5-d-2':'a0c0085', 'a0-5-d-3':'a0c0085',
});
