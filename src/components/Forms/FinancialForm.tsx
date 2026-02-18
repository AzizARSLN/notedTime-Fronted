import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import type { DateString, FinancialRecordType, Currency } from '../../types';

interface FinancialFormProps {
  selectedDate: DateString | null;
  onSave: () => void;
  onCancel: () => void;
}

const FinancialForm: React.FC<FinancialFormProps> = ({
  selectedDate,
  onSave,
  onCancel
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    type: 'expense' as FinancialRecordType,
    date: selectedDate || '',
    category: '',
    quantity: 1,
    unitAmount: 0,
    currency: 'TRY' as Currency,
    counterparty: [] as string[],
    location: '',
    description: '',
    installments: 1,
    installmentStartDate: selectedDate || '',
    isPlanned: false,
    isShared: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = formData.quantity * formData.unitAmount;

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
    <form onSubmit={handleSubmit} className="space-y-5 animate-reveal">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.financial.recordCategory')}</label>
          <select
            value={formData.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="form-input py-3 text-sm font-bold"
          >
            <option value="expense">{t('forms.financial.types.expense')}</option>
            <option value="income">{t('forms.financial.types.income')}</option>
            <option value="debt_given">{t('forms.financial.types.debt_given')}</option>
            <option value="debt_received">{t('forms.financial.types.debt_received')}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.financial.label')}</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            placeholder={t('forms.financial.labelPlaceholder')}
            className="form-input py-3 text-sm font-bold"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.financial.quantity')}</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => handleFieldChange('quantity', parseInt(e.target.value))}
            className="form-input py-3 text-sm font-bold text-center"
          />
        </div>
        <div className="space-y-1.5 col-span-1 sm:col-span-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.financial.unitAmount')}</label>
          <div className="relative group">
            <input
              type="number"
              value={formData.unitAmount}
              onChange={(e) => handleFieldChange('unitAmount', parseFloat(e.target.value))}
              placeholder="0.00"
              className="form-input py-3 pr-20 text-sm font-black relative"
            />
            <select
              value={formData.currency}
              onChange={(e) => handleFieldChange('currency', e.target.value)}
              className="absolute right-2 top-2 bottom-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-[10px] font-black px-2 focus:ring-0 appearance-none text-indigo-600 dark:text-indigo-400"
            >
              <option value="TRY">₺ TRY</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-white dark:border-slate-700 flex items-center justify-between">
        <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.3em]">{t('forms.financial.total')}</span>
        <div className="text-right">
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">
            {total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 ml-1.5 uppercase">{formData.currency}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">{t('forms.common.description')}</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          placeholder={t('forms.common.details')}
          rows={2}
          className="form-input py-3 text-sm font-medium min-h-[80px]"
        />
      </div>

      <div className="flex items-center gap-6 px-2">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="peer hidden" />
            <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all" />
            <XMarkIcon className="w-3.5 h-3.5 text-white absolute inset-0.5 opacity-0 peer-checked:opacity-100 transition-opacity rotate-45" />
          </div>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('forms.common.planned')}</span>
        </label>
      </div>

      <div className="flex gap-3 mt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all border border-transparent active:scale-95 uppercase tracking-widest">
          {t('forms.common.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : t('forms.common.confirm')}
        </button>
      </div>
    </form>
  );
};

export default FinancialForm;
