import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, DocumentTextIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import type { DateString, Note, TodoItem } from '../../types';

interface NoteFormProps {
  selectedDate: DateString | null;
  onSave: () => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  selectedDate,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: selectedDate || '',
    isCritical: false,
    todoItems: [] as TodoItem[],
    audioFile: '',
    assignedPeople: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');

  // Form validasyonu
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Başlık zorunlu';
    if (!formData.category.trim()) newErrors.category = 'Kategori zorunlu';
    if (!formData.date) newErrors.date = 'Tarih zorunlu';

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
      
      console.log('Not kaydedildi:', formData);
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

  // Todo item ekle
  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        isCompleted: false
      };
      
      setFormData(prev => ({
        ...prev,
        todoItems: [...prev.todoItems, newTodo]
      }));
      
      setNewTodoText('');
    }
  };

  // Todo item güncelle
  const handleTodoChange = (todoId: string, field: keyof TodoItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      todoItems: prev.todoItems.map(todo =>
        todo.id === todoId ? { ...todo, [field]: value } : todo
      )
    }));
  };

  // Todo item sil
  const handleDeleteTodo = (todoId: string) => {
    setFormData(prev => ({
      ...prev,
      todoItems: prev.todoItems.filter(todo => todo.id !== todoId)
    }));
  };

  // Kişi ekle/çıkar
  const handlePersonChange = (value: string, action: 'add' | 'remove') => {
    if (action === 'add' && value.trim()) {
      setFormData(prev => ({
        ...prev,
        assignedPeople: [...prev.assignedPeople, value.trim()]
      }));
    } else if (action === 'remove') {
      setFormData(prev => ({
        ...prev,
        assignedPeople: prev.assignedPeople.filter(p => p !== value)
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
        {/* Başlık */}
        <div>
          <label className="form-label">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Not başlığı"
            className={`form-input ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
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

        {/* İçerik */}
        <div>
          <label className="form-label">İçerik</label>
          <textarea
            value={formData.content}
            onChange={(e) => handleFieldChange('content', e.target.value)}
            placeholder="Not içeriği..."
            rows={6}
            className="form-input"
          />
        </div>

        {/* Todo Listesi */}
        <div>
          <label className="form-label">Yapılacaklar Listesi</label>
          <div className="space-y-3">
            {/* Yeni todo ekleme */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Yeni görev ekle"
                className="form-input flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTodo();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTodo}
                className="btn-secondary px-4"
              >
                Ekle
              </button>
            </div>
            
            {/* Mevcut todo'lar */}
            <div className="space-y-2">
              {formData.todoItems.map((todo) => (
                <div key={todo.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={(e) => handleTodoChange(todo.id, 'isCompleted', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleTodoChange(todo.id, 'text', e.target.value)}
                    className="form-input flex-1 border-0 bg-transparent p-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Atanan kişiler */}
        <div>
          <label className="form-label">Atanan Kişiler</label>
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
                    handlePersonChange(target.value, 'add');
                    target.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Kişi adı"]') as HTMLInputElement;
                  if (input) {
                    handlePersonChange(input.value, 'add');
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
              {formData.assignedPeople.map((person, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                >
                  {person}
                  <button
                    type="button"
                    onClick={() => handlePersonChange(person, 'remove')}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ses dosyası */}
        <div>
          <label className="form-label">Ses Dosyası</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFieldChange('audioFile', file.name);
              }
            }}
            className="form-input"
          />
        </div>

        {/* Kritik not */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.isCritical}
              onChange={(e) => handleFieldChange('isCritical', e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">Kritik not mu?</span>
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

export default NoteForm;
