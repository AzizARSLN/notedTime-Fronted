import React, { useState } from 'react';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import type { ReminderType, RepeatFrequency, WarningTime } from '../../types';

interface ReminderFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({
  onSave,
  onCancel
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    type: 'normal' as ReminderType,
    title: '',
    time: '',
    location: '',
    description: '',
    warningTime: '15min' as WarningTime,
    repeat: 'none' as RepeatFrequency,
    isCritical: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    onSave();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-reveal">
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.reminder.eventTitle')}</label>
        <div className="relative group">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder={t('forms.reminder.titlePlaceholder')}
            className="form-input py-3 text-base font-black relative"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.reminder.type')}</label>
          <select
            value={formData.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="form-input py-3 text-sm font-bold"
          >
            <option value="normal">{t('forms.reminder.types.normal')}</option>
            <option value="appointment">{t('forms.reminder.types.appointment')}</option>
            <option value="meeting">{t('forms.reminder.types.meeting')}</option>
            <option value="work">{t('forms.reminder.types.work')}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.common.time')}</label>
          <div className="relative group">
            <ClockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleFieldChange('time', e.target.value)}
              className="form-input py-3 pl-10 text-sm font-bold"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.reminder.location')}</label>
        <div className="relative group">
          <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-600 transition-colors z-10" />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder={t('forms.reminder.locationPlaceholder')}
            className="form-input py-3 pl-10 text-sm font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.reminder.warningTime.label')}</label>
          <select
            value={formData.warningTime}
            onChange={(e) => handleFieldChange('warningTime', e.target.value)}
            className="form-input py-3 text-xs font-bold"
          >
            <option value="5min">{t('forms.reminder.warningTime.5min')}</option>
            <option value="15min">{t('forms.reminder.warningTime.15min')}</option>
            <option value="1hour">{t('forms.reminder.warningTime.1hour')}</option>
            <option value="1day">{t('forms.reminder.warningTime.1day')}</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.reminder.repeat.label')}</label>
          <select
            value={formData.repeat}
            onChange={(e) => handleFieldChange('repeat', e.target.value)}
            className="form-input py-3 text-xs font-bold"
          >
            <option value="none">{t('forms.reminder.repeat.none')}</option>
            <option value="daily">{t('forms.reminder.repeat.daily')}</option>
            <option value="weekly">{t('forms.reminder.repeat.weekly')}</option>
            <option value="monthly">{t('forms.reminder.repeat.monthly')}</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6 px-2">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={formData.isCritical}
              onChange={(e) => handleFieldChange('isCritical', e.target.checked)}
              className="peer hidden"
            />
            <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 peer-checked:bg-rose-600 transition-all shadow-inner" />
          </div>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 group-hover:text-rose-600 transition-colors uppercase tracking-widest">🔥 {t('forms.common.critical')}</span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
          {t('forms.common.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-rose-500 to-rose-700 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : t('forms.reminder.setReminder')}
        </button>
      </div>
    </form>
  );
};

export default ReminderForm;
