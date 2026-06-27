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
}

export const lessons: Lesson[] = [
  {
    id: 'l001',
    title: 'Mándčilgáa',
    titleMn: 'Мандчилгаа',
    description: 'Чех хэлний анхан шатны мэндчилгээ',
    wordCount: 8,
    estimatedMinutes: 15,
    icon: '👋',
    order: 1,
    isLocked: false,
  },
  {
    id: 'l002',
    title: 'Tоо',
    titleMn: 'Тоо',
    description: '1-ээс 100 хүртэл тоо сурах',
    wordCount: 6,
    estimatedMinutes: 10,
    icon: '🔢',
    order: 2,
    isLocked: false,
  },
  {
    id: 'l003',
    title: 'Хоол хүнс',
    titleMn: 'Хоол хүнс',
    description: 'Ресторан, дэлгүүрт хэрэглэх үгс',
    wordCount: 6,
    estimatedMinutes: 12,
    icon: '🍽️',
    order: 3,
    isLocked: true,
  },
  {
    id: 'l004',
    title: 'Өнгө',
    titleMn: 'Өнгө',
    description: 'Үндсэн өнгөнүүд чех хэлээр',
    wordCount: 6,
    estimatedMinutes: 10,
    icon: '🎨',
    order: 4,
    isLocked: true,
  },
  {
    id: 'l005',
    title: 'Гэр бүл',
    titleMn: 'Гэр бүл',
    description: 'Гэр бүлийн гишүүдийн нэрс',
    wordCount: 5,
    estimatedMinutes: 10,
    icon: '👨‍👩‍👧‍👦',
    order: 5,
    isLocked: true,
  },
  {
    id: 'l006',
    title: 'Цаг хугацаа',
    titleMn: 'Цаг хугацаа',
    description: 'Өдөр, цаг хугацааны илэрхийлэл',
    wordCount: 5,
    estimatedMinutes: 10,
    icon: '⏰',
    order: 6,
    isLocked: true,
  },
  {
    id: 'l007',
    title: 'Газар байршил',
    titleMn: 'Газар байршил',
    description: 'Хот, байшин, газруудын нэрс',
    wordCount: 4,
    estimatedMinutes: 8,
    icon: '📍',
    order: 7,
    isLocked: true,
  },
  {
    id: 'l008',
    title: 'Үйл үг',
    titleMn: 'Үйл үг',
    description: 'Өдөр тутамд хэрэглэх үйл үгс',
    wordCount: 7,
    estimatedMinutes: 15,
    icon: '⚡',
    order: 8,
    isLocked: true,
  },
  {
    id: 'l009',
    title: 'Нэр үг',
    titleMn: 'Нэр үг',
    description: 'Байнга хэрэглэгддэг нэр үгс',
    wordCount: 5,
    estimatedMinutes: 10,
    icon: '📚',
    order: 9,
    isLocked: true,
  },
];
