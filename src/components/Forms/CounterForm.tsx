import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import type { DateString } from '../../types';

interface CounterFormProps {
  selectedDate: DateString | null;
  onSave: () => void;
  onCancel: () => void;
}

const CounterForm: React.FC<CounterFormProps> = ({
  selectedDate,
  onSave,
  onCancel
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    type: '',
    value: 0,
    dailyTarget: 8,
    isShared: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateValue = (delta: number) => {
    setFormData(prev => ({ ...prev, value: Math.max(0, prev.value + delta) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    onSave();
    setIsSubmitting(false);
  };

  const progress = Math.min(100, (formData.value / (formData.dailyTarget || 1)) * 100);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-reveal">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.counter.purpose')}</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => handleFieldChange('type', e.target.value)}
          placeholder={t('forms.counter.purposePlaceholder')}
          className="form-input py-3 text-base font-black text-center"
          required
        />
      </div>

      <div className="relative p-6 bg-slate-100/30 dark:bg-white/5 rounded-[2.5rem] border border-white dark:border-slate-800 overflow-hidden group shadow-lg">
        {/* Progress Background */}
        <div
          className="absolute inset-x-0 bottom-0 bg-indigo-500/10 transition-all duration-700 pointer-events-none"
          style={{ height: `${progress}%` }}
        />

        <div className="relative flex flex-col items-center py-2">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => updateValue(-1)}
              className="w-14 h-14 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 active:scale-90 transition-all"
            >
              <MinusIcon className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center min-w-[80px]">
              <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums drop-shadow-md">
                {formData.value}
              </span>
              <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mt-1">
                {t('forms.counter.target')}: {formData.dailyTarget}
              </span>
            </div>

            <button
              type="button"
              onClick={() => updateValue(1)}
              className="w-14 h-14 flex items-center justify-center bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30 text-white hover:bg-indigo-500 active:scale-90 transition-all"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mini Progress Bar */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-indigo-500 transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.counter.dailyTarget')}</label>
          <input
            type="number"
            value={formData.dailyTarget}
            onChange={(e) => handleFieldChange('dailyTarget', parseInt(e.target.value) || 0)}
            className="form-input py-2.5 text-sm font-black text-center"
          />
        </div>
        <div className="flex items-end pb-1.5">
          <label className="flex items-center gap-2.5 cursor-pointer group px-2">
            <div className="relative">
              <input type="checkbox" className="peer hidden" />
              <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 peer-checked:bg-indigo-600 transition-all shadow-inner" />
            </div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('forms.counter.sharedStream')}</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
          {t('forms.common.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : t('forms.common.save')}
        </button>
      </div>
    </form>
  );
};

export default CounterForm;