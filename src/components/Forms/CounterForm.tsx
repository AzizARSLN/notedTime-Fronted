import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { DateString, Counter } from '../../types';

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
  const [formData, setFormData] = useState({
    type: '',
    date: selectedDate || '',
    value: 0,
    dailyTarget: 0,
    isShared: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validasyonu
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type.trim()) newErrors.type = 'Sayaç tipi zorunlu';
    if (!formData.date) newErrors.date = 'Tarih zorunlu';
    if (formData.value < 0) newErrors.value = 'Değer negatif olamaz';

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
      
      console.log('Sayaç kaydedildi:', formData);
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
        {/* Sayaç tipi */}
        <div>
          <label className="form-label">
            Sayaç Tipi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            placeholder="Sayaç tipi (örn: Su, Adım, Kitap)"
            className={`form-input ${errors.type ? 'border-red-500' : ''}`}
          />
          {errors.type && <p className="form-error">{errors.type}</p>}
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

        {/* Değer */}
        <div>
          <label className="form-label">
            Değer <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            value={formData.value}
            onChange={(e) => handleFieldChange('value', parseInt(e.target.value) || 0)}
            className={`form-input ${errors.value ? 'border-red-500' : ''}`}
          />
          {errors.value && <p className="form-error">{errors.value}</p>}
        </div>

        {/* Günlük hedef */}
        <div>
          <label className="form-label">Günlük Hedef</label>
          <input
            type="number"
            min="0"
            value={formData.dailyTarget}
            onChange={(e) => handleFieldChange('dailyTarget', parseInt(e.target.value) || 0)}
            className="form-input"
          />
        </div>

        {/* Ortakla paylaş */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.isShared}
              onChange={(e) => handleFieldChange('isShared', e.target.checked)}
              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            <span className="text-sm text-gray-700">Ortakla paylaş</span>
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

export default CounterForm;