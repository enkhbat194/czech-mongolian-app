import { a0ExerciseMemoryTargetIds } from './a0ExerciseMemoryMap';
import { a0MemoryTargets } from './a0MemoryPlan';

const active = { card: 1, recognition: 2, retrieval: 2, dialogue: 2, carryover: 2 };
const support = { card: 1, recognition: 1, retrieval: 1, dialogue: 1, carryover: 0 };

if (!a0MemoryTargets.some((target) => target.id === 'a0c0086')) {
  a0MemoryTargets.push(...[
    { id:'a0c0086', lessonId:'l006', czech:'práce', mongolian:'ажил', priority:'support', requiredCoverage:support },
    { id:'a0c0087', lessonId:'l006', czech:'Pracuji tady.', mongolian:'Би энд ажилладаг.', priority:'active', requiredCoverage:active },
    { id:'a0c0088', lessonId:'l006', czech:'Kde pracujete?', mongolian:'Та хаана ажилладаг вэ?', priority:'active', requiredCoverage:active },
    { id:'a0c0089', lessonId:'l006', czech:'začínáme', mongolian:'бид эхэлнэ', priority:'support', requiredCoverage:support },
    { id:'a0c0090', lessonId:'l006', czech:'Začínáme v osm.', mongolian:'Бид найман цагт эхэлнэ.', priority:'active', requiredCoverage:active },
    { id:'a0c0091', lessonId:'l006', czech:'Kdy končíme?', mongolian:'Бид хэзээ тарах вэ?', priority:'active', requiredCoverage:active },
    { id:'a0c0092', lessonId:'l006', czech:'směna', mongolian:'ээлж', priority:'support', requiredCoverage:support },
    { id:'a0c0093', lessonId:'l006', czech:'Mám směnu.', mongolian:'Би ээлжтэй.', priority:'active', requiredCoverage:active },
    { id:'a0c0094', lessonId:'l006', czech:'přestávka', mongolian:'завсарлага', priority:'support', requiredCoverage:support },
    { id:'a0c0095', lessonId:'l006', czech:'Kdy je přestávka?', mongolian:'Завсарлага хэзээ вэ?', priority:'active', requiredCoverage:active },
    { id:'a0c0096', lessonId:'l006', czech:'Co mám dělat?', mongolian:'Би юу хийх вэ?', priority:'active', requiredCoverage:active },
    { id:'a0c0097', lessonId:'l006', czech:'hotovo', mongolian:'дууссан', priority:'support', requiredCoverage:support },
    { id:'a0c0098', lessonId:'l006', czech:'Je hotovo?', mongolian:'Дууссан уу?', priority:'active', requiredCoverage:active },
  ] as unknown as typeof a0MemoryTargets);
}

Object.assign(a0ExerciseMemoryTargetIds, {
  'a0-6-a-1':'a0c0087', 'a0-6-a-2':'a0c0088', 'a0-6-a-3':'a0c0087',
  'a0-6-b-1':'a0c0090', 'a0-6-b-2':'a0c0091', 'a0-6-b-3':'a0c0090',
  'a0-6-c-1':'a0c0093', 'a0-6-c-2':'a0c0095',
  'a0-6-d-1':'a0c0096', 'a0-6-d-2':'a0c0096', 'a0-6-d-3':'a0c0096',
  'a0-6-e-1':'a0c0098', 'a0-6-e-2':'a0c0025', 'a0-6-e-3':'a0c0098',
});
