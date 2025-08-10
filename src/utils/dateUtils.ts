import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, parseISO, addDays, addYears, getDaysInMonth } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { DateString } from '../types';

// Türkçe tarih formatı
export const formatDate = (date: Date | string, formatStr: string = 'dd.MM.yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: tr });
};

// Saat formatı
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm');
};

// Tarih string'ini Date objesine çevir
export const parseDateString = (dateString: DateString): Date => {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
};

// Date objesini DateString'e çevir
export const toDateString = (date: Date): DateString => {
  return format(date, 'dd.MM.yyyy');
};

// Ay başlangıcı ve bitişi
export const getMonthRange = (date: Date) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};

// Ay için tüm günleri al
export const getDaysInMonthArray = (date: Date): Date[] => {
  const { start, end } = getMonthRange(date);
  return eachDayOfInterval({ start, end });
};

// Takvim grid'i için günleri al (önceki ve sonraki aydan da)
export const getCalendarDays = (date: Date): Date[] => {
  const { start, end } = getMonthRange(date);
  
  // Haftanın ilk günü Pazartesi (1) olduğu için
  const firstDayOfWeek = 1;
  const startDate = new Date(start);
  const dayOfWeek = startDate.getDay();
  
  // Pazartesi = 1, Pazar = 0 olarak ayarla
  const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  const daysToSubtract = adjustedDayOfWeek - firstDayOfWeek;
  
  if (daysToSubtract > 0) {
    startDate.setDate(startDate.getDate() - daysToSubtract);
  }
  
  // 6 satır için 42 gün (6 * 7)
  const totalDays = 42;
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + totalDays - 1);
  
  return eachDayOfInterval({ start: startDate, end: endDate });
};

// Bugün mü?
export const isDateToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseDateString(date) : date;
  return isToday(dateObj);
};

// Aynı ay mı?
export const isSameMonthCheck = (date1: Date | string, date2: Date | string): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseDateString(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseDateString(date2) : date2;
  return isSameMonth(dateObj1, dateObj2);
};

// Aynı gün mü?
export const isSameDayCheck = (date1: Date | string, date2: Date | string): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseDateString(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseDateString(date2) : date2;
  return isSameDay(dateObj1, dateObj2);
};

// Ay ekle/çıkar
export const addMonth = (date: Date, months: number): Date => {
  return addMonths(date, months);
};

export const subtractMonth = (date: Date, months: number): Date => {
  return subMonths(date, months);
};

// Taksit tarihlerini hesapla
export const calculateInstallmentDates = (
  startDate: DateString,
  numberOfInstallments: number
): DateString[] => {
  const start = parseDateString(startDate);
  const dates: DateString[] = [];
  
  for (let i = 0; i < numberOfInstallments; i++) {
    const installmentDate = addMonths(start, i);
    // Ay sonuna yuvarla
    const lastDayOfMonth = getDaysInMonth(installmentDate);
    installmentDate.setDate(lastDayOfMonth);
    dates.push(toDateString(installmentDate));
  }
  
  return dates;
};

// Göreli tarih hesapla (örn: P3W = 3 hafta sonra)
export const calculateRelativeDate = (duration: string, fromDate: Date = new Date()): Date => {
  // ISO 8601 duration format: P3W, P1M, P1Y gibi
  const match = duration.match(/P(\d+)([WMDY])/);
  if (!match) return fromDate;
  
  const [, amount, unit] = match;
  const numAmount = parseInt(amount);
  
  switch (unit) {
    case 'W': // Hafta
      return addDays(fromDate, numAmount * 7);
    case 'M': // Ay
      return addMonths(fromDate, numAmount);
    case 'Y': // Yıl
      return addYears(fromDate, numAmount);
    case 'D': // Gün
      return addDays(fromDate, numAmount);
    default:
      return fromDate;
  }
};

// Tarih aralığındaki tüm günleri al
export const getDaysInRange = (startDate: DateString, endDate: DateString): DateString[] => {
  const start = parseDateString(startDate);
  const end = parseDateString(endDate);
  const days = eachDayOfInterval({ start, end });
  return days.map(toDateString);
};

// Ay adını Türkçe al
export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM yyyy', { locale: tr });
};

// Hafta günü adını Türkçe al
export const getWeekdayName = (date: Date): string => {
  return format(date, 'EEEE', { locale: tr });
};

// Kısa hafta günü adını Türkçe al
export const getShortWeekdayName = (date: Date): string => {
  return format(date, 'EEE', { locale: tr });
};
