import { a0DirectionsCards, a0DirectionsMicroLessons, getA0DirectionsCard } from './a0Directions';
import { a0TimeCards, a0TimeMicroLessons, getA0TimeCard } from './a0Time';
import { a0WorkCards, a0WorkMicroLessons, getA0WorkCard } from './a0Work';
import { a0DirectionsFinalDialogue, a0DirectionsMicroDialogues } from './a0DirectionsDialogues';
import { a0TimeFinalDialogue, a0TimeMicroDialogues } from './a0TimeDialogues';
import { a0WorkFinalDialogue, a0WorkMicroDialogues } from './a0WorkDialogues';
import { defineA0Lesson, type A0LessonDefinition } from './a0LessonSchema';

export const a0ReferenceNewLessons: Record<'l004' | 'l005' | 'l006', A0LessonDefinition> = {
  l004: defineA0Lesson({
    lessonId:'l004', titleMn:'A0.4 — Яаж очих вэ?', durationMinutes:34, cards:a0DirectionsCards, microLessons:a0DirectionsMicroLessons, getCard:getA0DirectionsCard,
    microDialogues:a0DirectionsMicroDialogues, finalDialogue:a0DirectionsFinalDialogue, xpReward:180, completionIcon:'🚌',
    completionSummaryMn:'Та буудал асууж, шулуун, зүүн, баруун гэсэн чиглэлийг ойлгож, автобус эсвэл трамвайгаар явах, буух зааврыг дагаж чадна.',
    completionPhrases:['Kde je zastávka?','Jděte rovně.','Jeďte autobusem.','Vystupte tady.','Jdu na nádraží.'],
  }),
  l005: defineA0Lesson({
    lessonId:'l005', titleMn:'A0.5 — Цаг, өдөр, уулзалт', durationMinutes:32, cards:a0TimeCards, microLessons:a0TimeMicroLessons, getCard:getA0TimeCard,
    microDialogues:a0TimeMicroDialogues, finalDialogue:a0TimeFinalDialogue, xpReward:190, completionIcon:'⏰',
    completionSummaryMn:'Та цаг асууж, өнөөдөр эсвэл маргаашийг тодруулж, завтай эсэхээ хэлж, уулзалтын цагийг ойлгож чадна.',
    completionPhrases:['Kolik je hodin?','zítra','Kdy máte čas?','Nemám čas.','Máme schůzku v osm.'],
  }),
  l006: defineA0Lesson({
    lessonId:'l006', titleMn:'A0.6 — Ажил дээр', durationMinutes:35, cards:a0WorkCards, microLessons:a0WorkMicroLessons, getCard:getA0WorkCard,
    microDialogues:a0WorkMicroDialogues, finalDialogue:a0WorkFinalDialogue, xpReward:200, completionIcon:'🦺',
    completionSummaryMn:'Та ажилладаг газраа хэлж, эхлэх болон тарах цаг, ээлж, завсарлагаа асууж, даалгавар ойлгомжгүй үед тусламж хүсэж чадна.',
    completionPhrases:['Pracuji tady.','Začínáme v osm.','Kdy je přestávka?','Co mám dělat?','Potřebuji pomoc.'],
  }),
};
