import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  getCalendarDays,
  getMonthName,
  isDateToday,
  isSameMonthCheck,
  toDateString,
  isWithinRange,
  isDateBefore
} from '../../utils/dateUtils';
import type { FinancialRecord, Reminder, Note, Travel, Counter, CalendarFilters } from '../../types';
import CalendarCell from './CalendarCell';
import CalendarFiltersComponent from './CalendarFilters';
import { isSameDay, subMonths, addMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface CalendarProps {
  financialRecords: FinancialRecord[];
  reminders: Reminder[];
  notes: Note[];
  travels: Travel[];
  counters: Counter[];
  onDateSelect?: (date: string) => void;
  onQuickAction?: (action: string, moduleId: string) => void;
  onSelectModule?: (moduleType: 'financial' | 'reminder' | 'note' | 'travel' | 'counter') => void;
}

const Calendar: React.FC<CalendarProps> = ({
  financialRecords, reminders, notes, travels, counters, onDateSelect
}) => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<CalendarFilters>({
    modules: ['financial', 'reminder', 'note', 'travel', 'counter'],
    shared: false,
    search: '',
    todayOnly: false
  });
  const [showFilters, setShowFilters] = useState(false);

  // Selection state
  const [selectionRange, setSelectionRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  const [isDragging, setIsDragging] = useState(false);

  const calendarDays = useMemo(() => getCalendarDays(currentDate), [currentDate]);
  const weekdays = [
    t('calendar.weekdays.mon'),
    t('calendar.weekdays.tue'),
    t('calendar.weekdays.wed'),
    t('calendar.weekdays.thu'),
    t('calendar.weekdays.fri'),
    t('calendar.weekdays.sat'),
    t('calendar.weekdays.sun')
  ];

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  // Drag Handlers
  const handleMouseDown = (date: Date, e: React.MouseEvent) => {
    if (e.button === 2) e.preventDefault();
    setIsDragging(true);
    setSelectionRange({ start: date, end: null });
  };

  const handleMouseEnter = (date: Date) => {
    if (isDragging && selectionRange.start) {
      if (isDateBefore(date, selectionRange.start)) {
        setSelectionRange({ start: date, end: selectionRange.start });
      } else {
        setSelectionRange({ start: selectionRange.start, end: date });
      }
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const clearRange = () => setSelectionRange({ start: null, end: null });

  const handleOpenAdd = () => {
    let dateStr = "";
    if (selectionRange.start && selectionRange.end) {
      dateStr = `${toDateString(selectionRange.start)} - ${toDateString(selectionRange.end)}`;
    } else if (selectionRange.start) {
      dateStr = toDateString(selectionRange.start);
    } else {
      dateStr = toDateString(new Date());
    }
    onDateSelect?.(dateStr);
  };

  return (
    <div className="h-full flex flex-col premium-glass rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/5 shadow-2xl animate-reveal" onContextMenu={(e) => e.preventDefault()}>
      {/* 2026 Premium Calendar Header - COMPACT */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 dark:border-white/5 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100/50 dark:bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => changeMonth('prev')} className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-slate-600 dark:text-slate-400">
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all">
              {t('calendar.today')}
            </button>
            <button onClick={() => changeMonth('next')} className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all text-slate-600 dark:text-slate-400">
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
            {getMonthName(currentDate)}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {selectionRange.start && (
            <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-xl border border-indigo-500/20 animate-reveal">
              <span className="text-[9px] font-black uppercase tracking-tighter">
                {toDateString(selectionRange.start)}
                {selectionRange.end ? ` — ${toDateString(selectionRange.end)}` : ''}
              </span>
              <button onClick={clearRange} className="p-1 hover:bg-indigo-500/20 rounded-lg transition-colors">
                <XMarkIcon className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="relative hidden lg:block">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('calendar.searchPlaceholder')}
              className="pl-10 pr-4 py-2 bg-slate-100/50 dark:bg-white/5 border border-white/10 rounded-xl text-xs font-medium focus:ring-4 focus:ring-indigo-500/10 w-48 transition-all outline-none"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition-all ${showFilters ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500'}`}
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-black shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group text-[10px]"
          >
            <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline uppercase tracking-widest">{t('calendar.newRecord')}</span>
          </button>
        </div>
      </header>

      {showFilters && (
        <div className="bg-slate-50/50 dark:bg-white/5 px-8 py-6 border-b border-white/10 animate-reveal z-10">
          <CalendarFiltersComponent filters={filters} onChange={(f) => setFilters(p => ({ ...p, ...f }))} />
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent relative select-none">
        <div className="grid grid-cols-7 border-b border-white/10 dark:border-white/5 shrink-0">
          {weekdays.map((day, i) => (
            <div key={i} className="py-4 text-center">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">{day}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-7 gap-[1px] bg-white/5 dark:bg-white/2">
            {calendarDays.map((day, index) => {
              const dayString = toDateString(day);
              const isInRange = isWithinRange(day, selectionRange.start, selectionRange.end);
              const isStart = selectionRange.start && isSameDay(day, selectionRange.start);
              const isEnd = selectionRange.end && isSameDay(day, selectionRange.end);

              return (
                <CalendarCell
                  key={index}
                  day={{ date: day }}
                  isToday={isDateToday(day)}
                  isCurrentMonth={isSameMonthCheck(day, currentDate)}
                  onMouseDown={(d, e) => handleMouseDown(d, e)}
                  onMouseEnter={(d) => handleMouseEnter(d)}
                  onMouseUp={handleMouseUp}
                  onQuickAdd={(d) => onDateSelect?.(toDateString(d))}
                  isInRange={!!isInRange}
                  isRangeStart={!!isStart}
                  isRangeEnd={!!isEnd}
                  financialRecords={financialRecords.filter(r => r.date === dayString)}
                  reminders={reminders.filter(r => r.date === dayString)}
                  notes={notes.filter(n => typeof n.date === 'string' ? n.date === dayString : n.date.start === dayString || n.date.end === dayString)}
                  travels={travels.filter(t => t.dateRange.start === dayString || t.dateRange.end === dayString)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
