import React from 'react';
import { CurrencyDollarIcon, BellIcon, DocumentTextIcon, PaperAirplaneIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import type { CalendarFilters as CalendarFiltersType } from '../../types';

interface CalendarFiltersProps {
  filters: CalendarFiltersType;
  onChange: (filters: Partial<CalendarFiltersType>) => void;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({ filters, onChange }) => {
  const { t } = useTranslation();
  const moduleOptions = [
    { id: 'financial', label: t('calendar.filters.financial'), icon: CurrencyDollarIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'reminder', label: t('calendar.filters.reminder'), icon: BellIcon, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'note', label: t('calendar.filters.note'), icon: DocumentTextIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'travel', label: t('calendar.filters.travel'), icon: PaperAirplaneIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'counter', label: t('calendar.filters.counter'), icon: ChartBarIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' }
  ];

  const handleModuleToggle = (moduleId: string) => {
    const newModules = filters.modules.includes(moduleId as any)
      ? filters.modules.filter(m => m !== moduleId)
      : [...filters.modules, moduleId as any];
    onChange({ modules: newModules });
  };

  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex flex-wrap items-center gap-2">
        {moduleOptions.map((opt) => {
          const isActive = filters.modules.includes(opt.id as any);
          return (
            <button
              key={opt.id}
              onClick={() => handleModuleToggle(opt.id)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition-all duration-300 text-[10px] font-black uppercase tracking-[0.15em] ${isActive
                ? `${opt.color} ${opt.bg} border-transparent shadow-lg shadow-black/5`
                : 'text-slate-400 bg-white/50 dark:bg-white/5 border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800'
                }`}
            >
              <opt.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.shared}
            onChange={() => onChange({ shared: !filters.shared })}
            className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500/10 transition-all"
          />
          <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-[0.2em]">{t('calendar.filters.shared')}</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.todayOnly}
            onChange={() => onChange({ todayOnly: !filters.todayOnly })}
            className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500/10 transition-all"
          />
          <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-[0.2em]">{t('calendar.filters.todayOnly')}</span>
        </label>
      </div>
    </div>
  );
};

export default CalendarFilters;
