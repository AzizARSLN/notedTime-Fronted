import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { DateString, TodoItem } from '../../types';

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
    isCritical: false,
    todoItems: [] as TodoItem[],
  });

  const [newTodo, setNewTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (!newTodo.trim()) return;
    setFormData(prev => ({
      ...prev,
      todoItems: [...prev.todoItems, { id: Date.now().toString(), text: newTodo, isCompleted: false }]
    }));
    setNewTodo('');
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
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Başlık</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Başlık yazın..."
            className="form-input py-3 text-sm font-bold"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Kategori</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              placeholder="örn. İş, Özel"
              className="form-input py-3 text-sm font-bold flex-1"
            />
            <label className="flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
              <input
                type="checkbox"
                checked={formData.isCritical}
                onChange={(e) => handleFieldChange('isCritical', e.target.checked)}
                className="peer hidden"
              />
              <span className={`text-sm ${formData.isCritical ? 'text-amber-500' : 'text-slate-400'}`}>⭐</span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">İçerik</label>
        <textarea
          value={formData.content}
          onChange={(e) => handleFieldChange('content', e.target.value)}
          placeholder="Notunuzu buraya yazın..."
          rows={3}
          className="form-input py-3 text-sm font-medium min-h-[100px]"
        />
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
            placeholder="Görev ekle..."
            className="form-input py-2.5 text-xs font-bold flex-1"
          />
          <button type="button" onClick={addItem} className="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/10 flex items-center justify-center hover:bg-indigo-600/20 active:scale-95 transition-all">
            <PlusIcon className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        <div className="max-h-[140px] overflow-y-auto custom-scrollbar space-y-2">
          {formData.todoItems.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/50 group">
              <input type="checkbox" checked={item.isCompleted} onChange={() => { }} className="w-4 h-4 rounded-md border-slate-300 text-indigo-600" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex-1">{item.text}</span>
            </div>
          ))}
          {formData.todoItems.length === 0 && (
            <p className="text-[10px] font-bold text-slate-400 text-center py-2 uppercase tracking-widest">Görev yok</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs font-black text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-white/5 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
          Vazgeç
        </button>
        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em]">
          {isSubmitting ? '...' : 'Notu Kaydet'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
