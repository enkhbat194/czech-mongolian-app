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

/**
 * Зөвхөн A0.1 нь одоогоор апп дотор ажилладаг өгөгдөл, дасгалтай.
 * Бусад хичээлүүд нь батлагдсан curriculum (сургалтын хөтөлбөр)-ийн замын зураг;
 * тэдгээрийг бэлэн гэж харуулахгүй.
 */
export const lessons: Lesson[] = [
  { id:'l001', title:'A0.1 First contact', titleMn:'A0.1 — Анхны харилцаа', description:'Мэндлэх, нэрээ хэлэх, ойлгохгүй үед удаан ярихыг хүсэх', wordCount:25, estimatedMinutes:30, icon:'👋', order:1, isLocked:false, status:'ready' },
  { id:'l002', title:'A0.2 Needs', titleMn:'A0.2 — Надад хэрэгтэй', description:'Хүсэх, хэрэгтэй зүйлээ хэлэх', wordCount:0, estimatedMinutes:0, icon:'🧾', order:2, isLocked:true, status:'planned' },
  { id:'l003', title:'A0.3 Location', titleMn:'A0.3 — Хаана байна?', description:'Байршил асууж, хэлэх', wordCount:0, estimatedMinutes:0, icon:'📍', order:3, isLocked:true, status:'planned' },
  { id:'l004', title:'A0.4 Directions', titleMn:'A0.4 — Яаж очих вэ?', description:'Чиглэл, буудал, зорчих хөдөлгөөн', wordCount:0, estimatedMinutes:0, icon:'🚌', order:4, isLocked:true, status:'planned' },
  { id:'l005', title:'A0.5 Time', titleMn:'A0.5 — Цаг, өдөр, уулзалт', description:'Цаг асуух, цагийн хуваарь ойлгох', wordCount:0, estimatedMinutes:0, icon:'⏰', order:5, isLocked:true, status:'planned' },
  { id:'l006', title:'A0.6 Work', titleMn:'A0.6 — Ажил дээр', description:'Ажил, үүрэг, чадвараа хэлэх', wordCount:0, estimatedMinutes:0, icon:'🦺', order:6, isLocked:true, status:'planned' },
  { id:'l007', title:'A0.7 Food', titleMn:'A0.7 — Хоол, кафе, ресторан', description:'Захиалга өгөх, төлбөр хийх', wordCount:0, estimatedMinutes:0, icon:'🍽️', order:7, isLocked:true, status:'planned' },
  { id:'l008', title:'A0.8 Shop', titleMn:'A0.8 — Дэлгүүр, мөнгө', description:'Үнэ асуух, бараа авах', wordCount:0, estimatedMinutes:0, icon:'🛒', order:8, isLocked:true, status:'planned' },
  { id:'l009', title:'A0.9 Home', titleMn:'A0.9 — Гэр, байр, хэрэгцээ', description:'Байр, өрөө, засварын асуудал', wordCount:0, estimatedMinutes:0, icon:'🏠', order:9, isLocked:true, status:'planned' },
  { id:'l010', title:'A0.10 Health', titleMn:'A0.10 — Эрүүл мэнд, эмийн сан', description:'Өвдсөнөө хэлэх, эмч асуух', wordCount:0, estimatedMinutes:0, icon:'💊', order:10, isLocked:true, status:'planned' },
  { id:'l011', title:'A0.11 Phone', titleMn:'A0.11 — Утас, ойлгоогүй үед', description:'Утасдах, давтуулах, удаан ярихыг хүсэх', wordCount:0, estimatedMinutes:0, icon:'📞', order:11, isLocked:true, status:'planned' },
  { id:'l012', title:'A0.12 People', titleMn:'A0.12 — Хүмүүс, гэр бүл', description:'Хүн, гэр бүл, суурь тодорхойлолт', wordCount:0, estimatedMinutes:0, icon:'👨‍👩‍👧‍👦', order:12, isLocked:true, status:'planned' },
  { id:'l013', title:'A0.13 Weather', titleMn:'A0.13 — Цаг агаар, хувцас', description:'Цаг агаар ба өдөр тутмын сонголт', wordCount:0, estimatedMinutes:0, icon:'🌦️', order:13, isLocked:true, status:'planned' },
  { id:'l014', title:'A0.14 Safety', titleMn:'A0.14 — Асуудал, аюулгүй байдал', description:'Тусламж хүсэх, яаралтай нөхцөл', wordCount:0, estimatedMinutes:0, icon:'🆘', order:14, isLocked:true, status:'planned' },
  { id:'l015', title:'A0.15 First week', titleMn:'A0.15 — Чехэд эхний долоо хоног', description:'Бүх суурь чадварыг нэг сценарид ашиглах', wordCount:0, estimatedMinutes:0, icon:'🇨🇿', order:15, isLocked:true, status:'planned' },
];
