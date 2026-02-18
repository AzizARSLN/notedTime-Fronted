import React, { useState } from 'react';
import { PaperAirplaneIcon, MapIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface TravelFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const TravelForm: React.FC<TravelFormProps> = ({
  onSave,
  onCancel
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    distance: 0,
    color: '#6366f1',
    companions: [] as string[],
    isShared: false
  });

  const [newCompanion, setNewCompanion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCompanion = () => {
    if (!newCompanion.trim()) return;
    setFormData(prev => ({
      ...prev,
      companions: [...prev.companions, newCompanion]
    }));
    setNewCompanion('');
  };

  const removeCompanion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    onSave();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-reveal">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.travel.from')}</label>
          <div className="relative">
            <PaperAirplaneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-45" />
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => handleFieldChange('origin', e.target.value)}
              placeholder={t('forms.travel.cityPlaceholder')}
              className="form-input py-3 pl-10 text-sm font-bold"
              required
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.travel.to')}</label>
          <div className="relative">
            <MapIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleFieldChange('destination', e.target.value)}
              placeholder={t('forms.travel.cityPlaceholder')}
              className="form-input py-3 pl-10 text-sm font-bold"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.travel.distance')}</label>
          <input
            type="number"
            value={formData.distance}
            onChange={(e) => handleFieldChange('distance', parseInt(e.target.value) || 0)}
            className="form-input py-3 text-sm font-black text-center"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.travel.routeColor')}</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleFieldChange('color', e.target.value)}
              className="w-12 h-11 rounded-xl cursor-pointer bg-transparent border-2 border-slate-100 dark:border-slate-800 p-1"
            />
            <div className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-white/5 rounded-xl border border-transparent text-[10px] font-black flex items-center justify-center uppercase tracking-widest text-slate-400">
              {formData.color}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Hamrohlar</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <UserPlusIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={newCompanion}
              onChange={(e) => setNewCompanion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompanion())}
              placeholder={t('forms.travel.companionPlaceholder')}
              className="form-input py-2.5 pl-10 text-xs font-bold w-full"
            />
          </div>
          <button type="button" onClick={addCompanion} className="px-4 bg-blue-600/10 rounded-xl border border-blue-500/10 flex items-center justify-center hover:bg-blue-600/20 transition-all text-blue-600 font-black text-[10px] uppercase tracking-widest">
            {t('forms.common.confirm')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.companions.map((name, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 group">
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">{name}</span>
              <button type="button" onClick={() => removeCompanion(i)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <XMarkIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          {formData.companions.length === 0 && (
            <div className="w-full text-center py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('forms.travel.alone')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
          {t('forms.common.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : t('forms.travel.plan')}
        </button>
      </div>
    </form>
  );
};

export default TravelForm;
