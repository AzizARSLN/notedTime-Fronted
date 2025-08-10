import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { DateString, FinancialRecord, FinancialRecordType, Currency, PaymentStatus } from '../../types';

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
    groupId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toplam hesapla
  const total = formData.quantity * formData.unitAmount;

  // Form validasyonu
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Tarih zorunlu';
    if (!formData.category) newErrors.category = 'Kategori zorunlu';
    if (formData.quantity < 1) newErrors.quantity = 'Adet en az 1 olmalı';
    if (formData.unitAmount <= 0) newErrors.unitAmount = 'Birim tutar 0\'dan büyük olmalı';
    if (formData.installments < 1 || formData.installments > 36) {
      newErrors.installments = 'Taksit sayısı 1-36 arasında olmalı';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Mock API call - gerçek uygulamada API'ye gönderilecek
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Finansal kayıt kaydedildi:', formData);
      onSave();
    } catch (error) {
      console.error('Kayıt hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form alanı güncelle
  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Hata mesajını temizle
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Karşı taraf ekle/çıkar
  const handleCounterpartyChange = (value: string, action: 'add' | 'remove') => {
    if (action === 'add' && value.trim()) {
      setFormData(prev => ({
        ...prev,
        counterparty: [...prev.counterparty, value.trim()]
      }));
    } else if (action === 'remove') {
      setFormData(prev => ({
        ...prev,
        counterparty: prev.counterparty.filter(cp => cp !== value)
      }));
    }
  };

  return (
    <div>
      {/* Geri butonu */}
      <button
        onClick={onCancel}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Geri</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Kayıt tipi */}
        <div>
          <label className="form-label">
            Kayıt Tipi <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="form-input"
          >
            <option value="expense">Harcama</option>
            <option value="income">Gelir</option>
            <option value="debt_given">Borç Verildi</option>
            <option value="debt_received">Borç Alındı</option>
          </select>
        </div>

        {/* Tarih */}
        <div>
          <label className="form-label">
            Tarih <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleFieldChange('date', e.target.value)}
            className={`form-input ${errors.date ? 'border-red-500' : ''}`}
          />
          {errors.date && <p className="form-error">{errors.date}</p>}
        </div>

        {/* Kategori */}
        <div>
          <label className="form-label">
            Kategori <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            placeholder="Kategori adı"
            className={`form-input ${errors.category ? 'border-red-500' : ''}`}
          />
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>

        {/* Adet ve Birim Tutar */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Adet <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => handleFieldChange('quantity', parseInt(e.target.value))}
              className={`form-input ${errors.quantity ? 'border-red-500' : ''}`}
            />
            {errors.quantity && <p className="form-error">{errors.quantity}</p>}
          </div>
          
          <div>
            <label className="form-label">
              Birim Tutar <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.unitAmount}
              onChange={(e) => handleFieldChange('unitAmount', parseFloat(e.target.value))}
              className={`form-input ${errors.unitAmount ? 'border-red-500' : ''}`}
            />
            {errors.unitAmount && <p className="form-error">{errors.unitAmount}</p>}
          </div>
        </div>

        {/* Para birimi */}
        <div>
          <label className="form-label">
            Para Birimi <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleFieldChange('currency', e.target.value)}
            className="form-input"
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Toplam (salt okunur) */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="form-label text-gray-700">Toplam Tutar</label>
          <div className="text-2xl font-bold text-gray-900">
            {total.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} {formData.currency}
          </div>
        </div>

        {/* Karşı taraf */}
        <div>
          <label className="form-label">Kim/Karşı Taraf</label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Kişi adı"
                className="form-input flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    handleCounterpartyChange(target.value, 'add');
                    target.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Kişi adı"]') as HTMLInputElement;
                  if (input) {
                    handleCounterpartyChange(input.value, 'add');
                    input.value = '';
                  }
                }}
                className="btn-secondary px-4"
              >
                Ekle
              </button>
            </div>
            
            {/* Eklenen kişiler */}
            <div className="flex flex-wrap gap-2">
              {formData.counterparty.map((person, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {person}
                  <button
                    type="button"
                    onClick={() => handleCounterpartyChange(person, 'remove')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Yer */}
        <div>
          <label className="form-label">Yer</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="Yer bilgisi"
            className="form-input"
          />
        </div>

        {/* Açıklama */}
        <div>
          <label className="form-label">Açıklama</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Detaylı açıklama"
            rows={3}
            className="form-input"
          />
        </div>

        {/* Taksit bilgileri */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Taksit Sayısı</label>
            <input
              type="number"
              min="1"
              max="36"
              value={formData.installments}
              onChange={(e) => handleFieldChange('installments', parseInt(e.target.value))}
              className={`form-input ${errors.installments ? 'border-red-500' : ''}`}
            />
            {errors.installments && <p className="form-error">{errors.installments}</p>}
          </div>
          
          <div>
            <label className="form-label">Taksit Başlangıç</label>
            <input
              type="date"
              value={formData.installmentStartDate}
              onChange={(e) => handleFieldChange('installmentStartDate', e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Taksit özeti */}
        {formData.installments > 1 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Taksit Özeti</h4>
            <p className="text-sm text-blue-700">
              {formData.installments} taksit × {(total / formData.installments).toFixed(2)} {formData.currency}
            </p>
          </div>
        )}

        {/* Diğer seçenekler */}
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.isPlanned}
              onChange={(e) => handleFieldChange('isPlanned', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Planlı mı?</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.isShared}
              onChange={(e) => handleFieldChange('isShared', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Ortakla paylaş?</span>
          </label>
        </div>

        {/* Form butonları */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            İptal
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialForm;
