import React, { useState } from 'react';
import { MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { DateString } from '../../types';

interface TravelFormProps {
  selectedDate: DateString | null;
  onSave: () => void;
  onCancel: () => void;
}

const TravelForm: React.FC<TravelFormProps> = ({
  selectedDate,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    totalKm: 0,
    color: '#6366f1',
    companions: [] as string[],
  });

  const [newCompanion, setNewCompanion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCompanion = () => {
    if (!newCompanion.trim()) return;
    setFormData(prev => ({ ...prev, companions: [...prev.companions, newCompanion] }));
    setNewCompanion('');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Kalkış</label>
          <div className="relative group">
            <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 z-10" />
            <input
              type="text"
              value={formData.from}
              onChange={(e) => handleFieldChange('from', e.target.value)}
              placeholder="Şehir..."
              className="form-input py-3 pl-10 text-sm font-bold"
              required
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Varış</label>
          <div className="relative group">
            <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 z-10" />
            <input
              type="text"
              value={formData.to}
              onChange={(e) => handleFieldChange('to', e.target.value)}
              placeholder="Şehir..."
              className="form-input py-3 pl-10 text-sm font-bold"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Mesafe (KM)</label>
          <input
            type="number"
            value={formData.totalKm}
            onChange={(e) => handleFieldChange('totalKm', parseInt(e.target.value))}
            className="form-input py-3 text-sm font-black text-center"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Rota Rengi</label>
          <input
            type="color"
            value={formData.color}
            onChange={(e) => handleFieldChange('color', e.target.value)}
            className="w-full h-[46px] rounded-xl border-none cursor-pointer p-1 bg-slate-100 dark:bg-white/5"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCompanion}
            onChange={(e) => setNewCompanion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompanion())}
            placeholder="Yol arkadaşı ekle..."
            className="form-input py-2.5 text-xs font-bold flex-1"
          />
          <button type="button" onClick={addCompanion} className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/10 flex items-center justify-center hover:bg-emerald-600/20 active:scale-95 transition-all">
            <PlusIcon className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {formData.companions.map((person, i) => (
            <span key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black rounded-lg border border-indigo-500/10 uppercase tracking-widest animate-reveal">
              {person}
            </span>
          ))}
          {formData.companions.length === 0 && (
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] py-1 ml-2">Yalnız Yolculuk</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
          Vazgeç
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : 'Planla'}
        </button>
      </div>
    </form>
  );
};

export default TravelForm;
