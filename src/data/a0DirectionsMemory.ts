import { a0ExerciseMemoryTargetIds } from './a0ExerciseMemoryMap';
import { a0MemoryTargets } from './a0MemoryPlan';

const active = { card: 1, recognition: 2, retrieval: 2, dialogue: 2, carryover: 2 };
const support = { card: 1, recognition: 1, retrieval: 1, dialogue: 1, carryover: 0 };

if (!a0MemoryTargets.some((target) => target.id === 'a0c0058')) {
  a0MemoryTargets.push(...[
    { id:'a0c0058', lessonId:'l004', czech:'rovně', mongolian:'шулуун', priority:'support', requiredCoverage:support },
    { id:'a0c0059', lessonId:'l004', czech:'doleva', mongolian:'зүүн тийш', priority:'support', requiredCoverage:support },
    { id:'a0c0060', lessonId:'l004', czech:'doprava', mongolian:'баруун тийш', priority:'support', requiredCoverage:support },
    { id:'a0c0061', lessonId:'l004', czech:'Jděte rovně.', mongolian:'Шулуун яваарай.', priority:'active', requiredCoverage:active },
    { id:'a0c0062', lessonId:'l004', czech:'zastávka', mongolian:'буудал', priority:'support', requiredCoverage:support },
    { id:'a0c0063', lessonId:'l004', czech:'Kde je zastávka?', mongolian:'Буудал хаана байна?', priority:'active', requiredCoverage:active },
    { id:'a0c0064', lessonId:'l004', czech:'autobus', mongolian:'автобус', priority:'support', requiredCoverage:support },
    { id:'a0c0065', lessonId:'l004', czech:'tramvaj', mongolian:'трамвай', priority:'support', requiredCoverage:support },
    { id:'a0c0066', lessonId:'l004', czech:'Jeďte autobusem.', mongolian:'Автобусаар яваарай.', priority:'active', requiredCoverage:active },
    { id:'a0c0067', lessonId:'l004', czech:'Jeďte tramvají.', mongolian:'Трамвайгаар яваарай.', priority:'active', requiredCoverage:active },
    { id:'a0c0068', lessonId:'l004', czech:'vystoupit', mongolian:'буух', priority:'support', requiredCoverage:support },
    { id:'a0c0069', lessonId:'l004', czech:'Vystupte tady.', mongolian:'Энд буугаарай.', priority:'active', requiredCoverage:active },
    { id:'a0c0070', lessonId:'l004', czech:'Kam jedete?', mongolian:'Та хаашаа явж байна?', priority:'active', requiredCoverage:active },
    { id:'a0c0071', lessonId:'l004', czech:'Jdu na nádraží.', mongolian:'Би галт тэрэгний буудал руу явж байна.', priority:'active', requiredCoverage:active },
  ] as unknown as typeof a0MemoryTargets);
}

Object.assign(a0ExerciseMemoryTargetIds, {
  'a0-4-a-1':'a0c0061', 'a0-4-a-2':'a0c0060',
  'a0-4-b-1':'a0c0063', 'a0-4-b-2':'a0c0065',
  'a0-4-c-1':'a0c0066', 'a0-4-c-2':'a0c0067',
  'a0-4-d-1':'a0c0069', 'a0-4-d-2':'a0c0069', 'a0-4-d-3':'a0c0005',
  'a0-4-e-1':'a0c0070', 'a0-4-e-2':'a0c0071', 'a0-4-e-3':'a0c0071',
});
