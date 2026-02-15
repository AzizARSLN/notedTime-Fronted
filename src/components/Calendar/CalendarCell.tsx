import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { FinancialRecord, Reminder, Note, Travel, Counter } from '../../types';

interface CalendarCellProps {
  day: { date: Date };
  isToday: boolean;
  isCurrentMonth: boolean;
  onMouseDown: (date: Date, e: React.MouseEvent) => void;
  onMouseEnter: (date: Date) => void;
  onMouseUp: () => void;
  onQuickAdd: (date: Date) => void;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  financialRecords: FinancialRecord[];
  reminders: Reminder[];
  notes: Note[];
  travels: Travel[];
  counters: Counter[];
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  isToday,
  isCurrentMonth,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onQuickAdd,
  isInRange,
  isRangeStart,
  isRangeEnd,
  financialRecords,
  reminders,
  notes,
  travels,
  counters
}) => {
  const date = day.date.getDate();

  return (
    <div
      onMouseDown={(e) => onMouseDown(day.date, e)}
      onMouseEnter={() => onMouseEnter(day.date)}
      onMouseUp={onMouseUp}
      onDoubleClick={() => onQuickAdd(day.date)}
      className={`relative h-28 sm:h-32 border-r border-b border-white/10 dark:border-white/5 p-3 transition-all duration-300 group
        ${!isCurrentMonth ? 'bg-slate-50/10 dark:bg-white/2 opacity-20' : 'hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10'}
        ${isInRange ? 'bg-indigo-500/5 dark:bg-indigo-500/10' : ''}
        ${isRangeStart ? 'rounded-tl-2xl' : ''}
        ${isRangeEnd ? 'rounded-br-2xl' : ''}
      `}
    >
      {/* Date Number */}
      <div className="flex justify-between items-start">
        <span className={`text-sm font-black transition-all ${isToday ? 'bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/10' : 'text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
          {date}
        </span>

        {/* Indicators */}
        <div className="flex -space-x-1">
          {financialRecords.length > 0 && <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 shadow-sm" />}
          {reminders.length > 0 && <div className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 shadow-sm" />}
          {notes.length > 0 && <div className="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900 shadow-sm" />}
        </div>
      </div>

      {/* Events List - Compact View */}
      <div className="mt-3 space-y-1 overflow-hidden">
        {financialRecords.slice(0, 2).map((r, i) => (
          <div key={i} className="text-[10px] font-bold py-1 px-2 bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg truncate border border-emerald-500/10">
            💰 {r.category}
          </div>
        ))}
        {reminders.slice(0, 2).map((r, i) => (
          <div key={i} className="text-[10px] font-bold py-1 px-2 bg-rose-100/50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-lg truncate border border-rose-500/10">
            🔔 {r.title}
          </div>
        ))}
        {travels.length > 0 && (
          <div className="text-[10px] font-bold py-1 px-2 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg truncate border border-blue-500/10">
            ✈️ {travels[0].to}
          </div>
        )}
      </div>

      {/* Quick Add Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(day.date);
          }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-white/20 scale-90 group-hover:scale-100 transition-transform pointer-events-auto active:scale-95"
        >
          <PlusIcon className="w-6 h-6 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};

export default CalendarCell;
