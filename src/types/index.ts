// Temel tarih tipi
export type DateString = string; // "DD.MM.YYYY" formatında
export type TimeString = string; // "HH:mm" formatında
export type DateTimeString = string; // ISO string

// Para birimi
export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';

// Finansal modül tipleri
export type FinancialRecordType = 'expense' | 'income' | 'debt_given' | 'debt_received';
export type PaymentStatus = 'planned' | 'paid' | 'partial' | 'overdue' | 'cancelled';

export interface FinancialRecord {
  id: string;
  type: FinancialRecordType;
  date: DateString;
  category: string;
  quantity: number;
  unitAmount: number;
  currency: Currency;
  total: number;
  counterparty: string[];
  location?: string;
  description?: string;
  installments: number;
  installmentStartDate?: DateString;
  isPlanned: boolean;
  isShared: boolean;
  groupId?: string;
  paymentStatus: PaymentStatus;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

// Hatırlatıcı modül tipleri
export type ReminderType = 'appointment' | 'meeting' | 'work' | 'normal';
export type RepeatFrequency = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'relative';
export type WarningTime = '5min' | '10min' | '15min' | '30min' | '1hour' | '1day';

export interface Reminder {
  id: string;
  type: ReminderType;
  title: string;
  date: DateString;
  time?: TimeString;
  location?: string;
  participants: string[];
  description?: string;
  warningTime: WarningTime;
  repeat: RepeatFrequency;
  relativeDuration?: string; // ISO 8601 duration (P3W gibi)
  snooze?: number; // dakika cinsinden
  isCritical: boolean;
  isShared: boolean;
  groupId?: string;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

// Not modül tipleri
export interface Note {
  id: string;
  title: string;
  content?: string;
  category: string;
  date: DateString | { start: DateString; end: DateString };
  isCritical: boolean;
  todoItems: TodoItem[];
  audioFile?: string;
  assignedPeople: string[];
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

export interface TodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
  completedAt?: DateTimeString;
}

// Seyahat modül tipleri
export interface Travel {
  id: string;
  from: string;
  to: string;
  dateRange: { start: DateString; end: DateString };
  companions: string[];
  dailyNotes: DailyNote[];
  totalKm?: number;
  color: string;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

export interface DailyNote {
  date: DateString;
  content: string;
}

// Sayaç modül tipleri
export interface Counter {
  id: string;
  type: string;
  date: DateString;
  value: number;
  dailyTarget?: number;
  isShared: boolean;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

// Kullanıcı ve grup tipleri
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  createdAt: DateTimeString;
}

// Takvim hücresi tipi
export interface CalendarCell {
  date: DateString;
  isToday: boolean;
  isCurrentMonth: boolean;
  financialRecords: FinancialRecord[];
  reminders: Reminder[];
  notes: Note[];
  travels: Travel[];
  counters: Counter[];
}

// Form durumları
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// API yanıt tipleri
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filtre tipleri
export interface CalendarFilters {
  modules: ('financial' | 'reminder' | 'note' | 'travel' | 'counter')[];
  shared: boolean;
  search: string;
  todayOnly: boolean;
}

// Snooze seçenekleri
export type SnoozeOption = 5 | 10 | 15;

// Hızlı eylem tipleri
export type QuickAction =
  | 'mark_paid'
  | 'mark_completed'
  | 'snooze'
  | 'delete'
  | 'edit';

export type ModuleType = 'financial' | 'reminder' | 'note' | 'travel' | 'counter';

// Bildirim tipleri
export interface Notification {
  id: string;
  type: 'reminder' | 'payment' | 'system';
  title: string;
  message: string;
  date: DateTimeString;
  isRead: boolean;
  actionUrl?: string;
}
