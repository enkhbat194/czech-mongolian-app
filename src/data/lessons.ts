import { czechWords } from './czechWords';
import { a0LessonMeta } from './a0LessonMeta';

export type LessonStatus = 'ready' | 'planned';

export interface Lesson {
  id: string;
  title: string;
  titleMn: string;
  description: string;
  wordCount: number;
  estimatedMinutes: number;
  icon: string;
  order: number;
  isLocked: boolean;
  status: LessonStatus;
}

const cardCount = (lessonId: string) => czechWords.filter((card) => card.lessonId === lessonId).length;

export const lessons: Lesson[] = [
  { id:'l001', title:'A0.1 First contact', titleMn:a0LessonMeta.l001.titleMn, description:'Мэндлэх, нэрээ хэлэх, ойлгохгүй үед удаан ярихыг хүсэх', wordCount:cardCount('l001'), estimatedMinutes:a0LessonMeta.l001.durationMinutes, icon:'👋', order:1, isLocked:false, status:'ready' },
  { id:'l002', title:'A0.2 Needs', titleMn:a0LessonMeta.l002.titleMn, description:'Тусламж, ус, хоол хэрэгтэйгээ хэлж, байхгүй зүйлээ тайлбарлах', wordCount:cardCount('l002'), estimatedMinutes:a0LessonMeta.l002.durationMinutes, icon:'🧾', order:2, isLocked:true, status:'ready' },
  { id:'l003', title:'A0.3 Location', titleMn:a0LessonMeta.l003.titleMn, description:'Ариун цэврийн өрөө, дэлгүүр, эмийн сан, буудал хаана байгааг асуух', wordCount:cardCount('l003'), estimatedMinutes:a0LessonMeta.l003.durationMinutes, icon:'📍', order:3, isLocked:true, status:'ready' },
  { id:'l004', title:'A0.4 Directions', titleMn:a0LessonMeta.l004.titleMn, description:'Чиглэл, буудал, автобус, трамвай, буух заавар', wordCount:cardCount('l004'), estimatedMinutes:a0LessonMeta.l004.durationMinutes, icon:'🚌', order:4, isLocked:true, status:'ready' },
  { id:'l005', title:'A0.5 Time', titleMn:a0LessonMeta.l005.titleMn, description:'Цаг асуух, өдөр болон уулзалтын цагийг тодруулах', wordCount:cardCount('l005'), estimatedMinutes:a0LessonMeta.l005.durationMinutes, icon:'⏰', order:5, isLocked:true, status:'ready' },
  { id:'l006', title:'A0.6 Work', titleMn:a0LessonMeta.l006.titleMn, description:'Ажлын цаг, ээлж, завсарлага, даалгавар, тусламж', wordCount:cardCount('l006'), estimatedMinutes:a0LessonMeta.l006.durationMinutes, icon:'🦺', order:6, isLocked:true, status:'ready' },
  { id:'l007', title:'A0.7 Food', titleMn:a0LessonMeta.l007.titleMn, description:'Кафед цэс хүсэх, захиалга өгөх, авч явах эсэхээ хэлэх, төлбөр хийх', wordCount:cardCount('l007'), estimatedMinutes:a0LessonMeta.l007.durationMinutes, icon:'🍽️', order:7, isLocked:true, status:'ready' },
  { id:'l008', title:'A0.8 Shop', titleMn:a0LessonMeta.l008.titleMn, description:'Дэлгүүрт бараа заах, уут/баримт хүсэх, үнэ асуух, төлбөр хийх', wordCount:cardCount('l008'), estimatedMinutes:a0LessonMeta.l008.durationMinutes, icon:'🛒', order:8, isLocked:true, status:'ready' },
  { id:'l009', title:'A0.9 Home', titleMn:a0LessonMeta.l009.titleMn, description:'Өрөө, байр, түлхүүр, ус гарахгүй, хүйтэн байна гэсэн асуудал хэлэх', wordCount:cardCount('l009'), estimatedMinutes:a0LessonMeta.l009.durationMinutes, icon:'🏠', order:9, isLocked:true, status:'ready' },
  { id:'l010', title:'A0.10 Health', titleMn:a0LessonMeta.l010.titleMn, description:'Өвдөж байгаагаа хэлэх, эмийн санд өвчин намдаах зүйл болон заавар асуух', wordCount:cardCount('l010'), estimatedMinutes:a0LessonMeta.l010.durationMinutes, icon:'💊', order:10, isLocked:true, status:'ready' },
  { id:'l011', title:'A0.11 Phone', titleMn:a0LessonMeta.l011.titleMn, description:'Утсан дээр сонсож байгаа эсэх, давтуулах, бичүүлэх, SMS хүсэх', wordCount:cardCount('l011'), estimatedMinutes:a0LessonMeta.l011.durationMinutes, icon:'📞', order:11, isLocked:true, status:'ready' },
  { id:'l012', title:'A0.12 People', titleMn:'A0.12 — Хүмүүс, гэр бүл', description:'Хүн, гэр бүл, суурь тодорхойлолт', wordCount:0, estimatedMinutes:0, icon:'👨‍👩‍👧‍👦', order:12, isLocked:true, status:'planned' },
  { id:'l013', title:'A0.13 Weather', titleMn:'A0.13 — Цаг агаар, хувцас', description:'Цаг агаар ба өдөр тутмын сонголт', wordCount:0, estimatedMinutes:0, icon:'🌦️', order:13, isLocked:true, status:'planned' },
  { id:'l014', title:'A0.14 Safety', titleMn:'A0.14 — Асуудал, аюулгүй байдал', description:'Тусламж хүсэх, яаралтай нөхцөл', wordCount:0, estimatedMinutes:0, icon:'🆘', order:14, isLocked:true, status:'planned' },
  { id:'l015', title:'A0.15 First week', titleMn:'A0.15 — Чехэд эхний долоо хоног', description:'Бүх суурь чадварыг нэг сценарид ашиглах', wordCount:0, estimatedMinutes:0, icon:'🇨🇿', order:15, isLocked:true, status:'planned' },
];
