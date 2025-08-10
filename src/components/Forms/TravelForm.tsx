import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, MapPinIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import type { DateString, Travel, DailyNote } from '../../types';

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
    dateRange: {
      start: selectedDate || '',
      end: selectedDate || ''
    },
    companions: [] as string[],
    dailyNotes: [] as DailyNote[],
    totalKm: 0,
    color: '#3B82F6'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCompanion, setNewCompanion] = useState('');
  const [newDailyNote, setNewDailyNote] = useState({ date: '', content: '' });

  // Form validasyonu
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.from.trim()) newErrors.from = 'Nereden zorunlu';
    if (!formData.to.trim()) newErrors.to = 'Nereye zorunlu';
    if (!formData.dateRange.start) newErrors.startDate = 'Başlangıç tarihi zorunlu';
    if (!formData.dateRange.end) newErrors.endDate = 'Bitiş tarihi zorunlu';
    if (formData.totalKm < 0) newErrors.totalKm = 'Toplam km negatif olamaz';

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
      
      console.log('Seyahat kaydedildi:', formData);
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

  // Tarih aralığı güncelle
  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }));
    
    // Hata mesajını temizle
    const errorKey = field === 'start' ? 'startDate' : 'endDate';
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  // Yol arkadaşı ekle/çıkar
  const handleCompanionChange = (value: string, action: 'add' | 'remove') => {
    if (action === 'add' && value.trim()) {
      setFormData(prev => ({
        ...prev,
        companions: [...prev.companions, value.trim()]
      }));
      setNewCompanion('');
    } else if (action === 'remove') {
      setFormData(prev => ({
        ...prev,
        companions: prev.companions.filter(c => c !== value)
      }));
    }
  };

  // Günlük not ekle
  const handleAddDailyNote = () => {
    if (newDailyNote.date && newDailyNote.content.trim()) {
      const dailyNote: DailyNote = {
        date: newDailyNote.date,
        content: newDailyNote.content.trim()
      };
      
      setFormData(prev => ({
        ...prev,
        dailyNotes: [...prev.dailyNotes, dailyNote]
      }));
      
      setNewDailyNote({ date: '', content: '' });
    }
  };

  // Günlük not sil
  const handleDeleteDailyNote = (date: string) => {
    setFormData(prev => ({
      ...prev,
      dailyNotes: prev.dailyNotes.filter(note => note.date !== date)
    }));
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
        {/* Nereden - Nereye */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Nereden <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.from}
                onChange={(e) => handleFieldChange('from', e.target.value)}
                placeholder="Başlangıç yeri"
                className={`form-input pl-10 ${errors.from ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.from && <p className="form-error">{errors.from}</p>}
          </div>
          
          <div>
            <label className="form-label">
              Nereye <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.to}
                onChange={(e) => handleFieldChange('to', e.target.value)}
                placeholder="Varış yeri"
                className={`form-input pl-10 ${errors.to ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.to && <p className="form-error">{errors.to}</p>}
          </div>
        </div>

        {/* Tarih aralığı */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Başlangıç Tarihi <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
            />
            {errors.startDate && <p className="form-error">{errors.startDate}</p>}
          </div>
          
          <div>
            <label className="form-label">
              Bitiş Tarihi <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className={`form-input ${errors.endDate ? 'border-red-500' : ''}`}
            />
            {errors.endDate && <p className="form-error">{errors.endDate}</p>}
          </div>
        </div>

        {/* Toplam km */}
        <div>
          <label className="form-label">Toplam Kilometre</label>
          <input
            type="number"
            min="0"
            value={formData.totalKm}
            onChange={(e) => handleFieldChange('totalKm', parseInt(e.target.value))}
            className={`form-input ${errors.totalKm ? 'border-red-500' : ''}`}
          />
          {errors.totalKm && <p className="form-error">{errors.totalKm}</p>}
        </div>

        {/* Renk seçimi */}
        <div>
          <label className="form-label">Renk</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleFieldChange('color', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <span className="text-sm text-gray-600">Seyahat rengi</span>
          </div>
        </div>

        {/* Yol arkadaşları */}
        <div>
          <label className="form-label">Yol Arkadaşları</label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCompanion}
                onChange={(e) => setNewCompanion(e.target.value)}
                placeholder="Kişi adı"
                className="form-input flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCompanionChange(newCompanion, 'add');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleCompanionChange(newCompanion, 'add')}
                className="btn-secondary px-4"
              >
                Ekle
              </button>
            </div>
            
            {/* Eklenen yol arkadaşları */}
            <div className="flex flex-wrap gap-2">
              {formData.companions.map((person, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {person}
                  <button
                    type="button"
                    onClick={() => handleCompanionChange(person, 'remove')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Günlük notlar */}
        <div>
          <label className="form-label">Günlük Notlar</label>
          <div className="space-y-3">
            {/* Yeni günlük not ekleme */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={newDailyNote.date}
                onChange={(e) => setNewDailyNote(prev => ({ ...prev, date: e.target.value }))}
                className="form-input"
              />
              <input
                type="text"
                value={newDailyNote.content}
                onChange={(e) => setNewDailyNote(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Günlük not"
                className="form-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDailyNote();
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleAddDailyNote}
              className="btn-secondary px-4"
            >
              Not Ekle
            </button>
            
            {/* Mevcut günlük notlar */}
            <div className="space-y-2">
              {formData.dailyNotes.map((note, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{note.date}</div>
                    <div className="text-sm text-gray-600">{note.content}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteDailyNote(note.date)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
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

export default TravelForm;
