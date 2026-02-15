import React, { useState } from 'react';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { DateString, ReminderType, RepeatFrequency, WarningTime } from '../../types';

interface ReminderFormProps {
  selectedDate: DateString | null;
  onSave: () => void;
  onCancel: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({
  selectedDate,
  onSave,
  onCancel
}) => {
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
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Etkinlik Başlığı</label>
        <div className="relative group">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Toplantı, Doğum Günü..."
            className="form-input py-3 text-base font-black relative"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Tür</label>
          <select
            value={formData.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="form-input py-3 text-sm font-bold"
          >
            <option value="normal">📌 Normal</option>
            <option value="appointment">📆 Randevu</option>
            <option value="meeting">🤝 Toplantı</option>
            <option value="work">💼 İş</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Saat</label>
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
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Konum / Platform</label>
        <div className="relative group">
          <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-600 transition-colors z-10" />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="Ofis, Zoom, Ev..."
            className="form-input py-3 pl-10 text-sm font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Hatırlatıcı</label>
          <select
            value={formData.warningTime}
            onChange={(e) => handleFieldChange('warningTime', e.target.value)}
            className="form-input py-3 text-xs font-bold"
          >
            <option value="5min">5 dk önce</option>
            <option value="15min">15 dk önce</option>
            <option value="1hour">1 saat önce</option>
            <option value="1day">1 gün önce</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Tekrar</label>
          <select
            value={formData.repeat}
            onChange={(e) => handleFieldChange('repeat', e.target.value)}
            className="form-input py-3 text-xs font-bold"
          >
            <option value="none">Bir kez</option>
            <option value="daily">Günlük</option>
            <option value="weekly">Haftalık</option>
            <option value="monthly">Aylık</option>
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
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 group-hover:text-rose-600 transition-colors uppercase tracking-widest">🔥 Kritik / Acil</span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
          Vazgeç
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-rose-500 to-rose-700 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : 'Hatırlatıcı Kur'}
        </button>
      </div>
    </form>
  );
};

export default ReminderForm;
