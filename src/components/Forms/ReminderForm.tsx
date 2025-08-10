import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import type { DateString, Reminder, ReminderType, RepeatFrequency, WarningTime } from '../../types';

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
    date: selectedDate || '',
    time: '',
    location: '',
    participants: [] as string[],
    description: '',
    warningTime: '15min' as WarningTime,
    repeat: 'none' as RepeatFrequency,
    relativeDuration: '',
    snooze: 0,
    isCritical: false,
    isShared: false,
    groupId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validasyonu
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Başlık zorunlu';
    if (!formData.date) newErrors.date = 'Tarih zorunlu';
    if (formData.snooze < 0) newErrors.snooze = 'Snooze süresi negatif olamaz';

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
      
      console.log('Hatırlatıcı kaydedildi:', formData);
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

  // Katılımcı ekle/çıkar
  const handleParticipantChange = (value: string, action: 'add' | 'remove') => {
    if (action === 'add' && value.trim()) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, value.trim()]
      }));
    } else if (action === 'remove') {
      setFormData(prev => ({
        ...prev,
        participants: prev.participants.filter(p => p !== value)
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
        {/* Hatırlatıcı tipi */}
        <div>
          <label className="form-label">
            Hatırlatıcı Tipi <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="form-input"
          >
            <option value="normal">Normal</option>
            <option value="appointment">Randevu</option>
            <option value="meeting">Toplantı</option>
            <option value="work">İş</option>
          </select>
        </div>

        {/* Başlık */}
        <div>
          <label className="form-label">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Hatırlatıcı başlığı"
            className={`form-input ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        {/* Tarih ve saat */}
        <div className="grid grid-cols-2 gap-4">
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
          
          <div>
            <label className="form-label">Saat</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleFieldChange('time', e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Yer */}
        <div>
          <label className="form-label">Yer</label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="Yer bilgisi"
              className="form-input pl-10"
            />
          </div>
        </div>

        {/* Katılımcılar */}
        <div>
          <label className="form-label">Katılımcılar</label>
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
                    handleParticipantChange(target.value, 'add');
                    target.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Kişi adı"]') as HTMLInputElement;
                  if (input) {
                    handleParticipantChange(input.value, 'add');
                    input.value = '';
                  }
                }}
                className="btn-secondary px-4"
              >
                Ekle
              </button>
            </div>
            
            {/* Eklenen katılımcılar */}
            <div className="flex flex-wrap gap-2">
              {formData.participants.map((person, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {person}
                  <button
                    type="button"
                    onClick={() => handleParticipantChange(person, 'remove')}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
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

        {/* Uyarı zamanı */}
        <div>
          <label className="form-label">Uyarı Zamanı</label>
          <select
            value={formData.warningTime}
            onChange={(e) => handleFieldChange('warningTime', e.target.value)}
            className="form-input"
          >
            <option value="5min">5 dakika önce</option>
            <option value="10min">10 dakika önce</option>
            <option value="15min">15 dakika önce</option>
            <option value="30min">30 dakika önce</option>
            <option value="1hour">1 saat önce</option>
            <option value="1day">1 gün önce</option>
          </select>
        </div>

        {/* Tekrar */}
        <div>
          <label className="form-label">Tekrar</label>
          <select
            value={formData.repeat}
            onChange={(e) => handleFieldChange('repeat', e.target.value)}
            className="form-input"
          >
            <option value="none">Tekrar yok</option>
            <option value="daily">Günlük</option>
            <option value="weekly">Haftalık</option>
            <option value="monthly">Aylık</option>
            <option value="yearly">Yıllık</option>
            <option value="relative">Göreceli</option>
          </select>
        </div>

        {/* Snooze */}
        <div>
          <label className="form-label">Snooze (dakika)</label>
          <input
            type="number"
            min="0"
            value={formData.snooze}
            onChange={(e) => handleFieldChange('snooze', parseInt(e.target.value))}
            className={`form-input ${errors.snooze ? 'border-red-500' : ''}`}
          />
          {errors.snooze && <p className="form-error">{errors.snooze}</p>}
        </div>

        {/* Diğer seçenekler */}
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.isCritical}
              onChange={(e) => handleFieldChange('isCritical', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">Kritik mi?</span>
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

export default ReminderForm;
