import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { DateString } from '../../types';
import FinancialForm from '../Forms/FinancialForm';
import ReminderForm from '../Forms/ReminderForm';
import NoteForm from '../Forms/NoteForm';
import TravelForm from '../Forms/TravelForm';
import CounterForm from '../Forms/CounterForm'; 

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleType: 'financial' | 'reminder' | 'note' | 'travel' | 'counter') => void;
  selectedDate: DateString | null;
}

type ModuleType = 'financial' | 'reminder' | 'note' | 'travel' | 'counter';

const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  selectedDate
}) => {
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);

  const moduleOptions = [
    {
      id: 'financial',
      label: 'Finansal',
      description: 'Harcama, gelir, borç kayıtları',
      icon: '💰',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:border-purple-300 hover:bg-purple-100'
    },
    {
      id: 'reminder',
      label: 'Hatırlatıcı',
      description: 'Randevu, görüşme, iş hatırlatıcıları',
      icon: '🔔',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300 hover:bg-blue-100'
    },
    {
      id: 'note',
      label: 'Not',
      description: 'To-do listesi ve sesli notlar',
      icon: '📝',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      hoverColor: 'hover:border-yellow-300 hover:bg-yellow-100'
    },
    {
      id: 'travel',
      label: 'Seyahat',
      description: 'Seyahat planları ve günlük notlar',
      icon: '✈️',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-green-300 hover:bg-green-100'
    },
    {
      id: 'counter',
      label: 'Sayaç',
      description: 'Günlük sayaç ve hedefler',
      icon: '📊',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      hoverColor: 'hover:border-gray-300 hover:bg-gray-100'
    }
  ];

  const handleModuleSelect = (moduleType: ModuleType) => {
    setSelectedModule(moduleType);
    onSelectModule(moduleType);
  };

  const handleBack = () => {
    setSelectedModule(null);
  };

  const handleClose = () => {
    setSelectedModule(null);
    onClose();
  };

  const renderForm = () => {
    if (!selectedModule) return null;

    const commonProps = {
      selectedDate,
      onSave: () => {
        // Form kaydedildikten sonra modal'ı kapat
        handleClose();
      },
      onCancel: handleBack
    };

    switch (selectedModule) {
      case 'financial':
        return <FinancialForm {...commonProps} />;
      case 'reminder':
        return <ReminderForm {...commonProps} />;
      case 'note':
        return <NoteForm {...commonProps} />;
      case 'travel':
        return <TravelForm {...commonProps} />;
      case 'counter':
        return <CounterForm {...commonProps} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={handleClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl transform overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20 transition-all">
          {/* Modal başlığı */}
          <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {selectedModule && (
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${moduleOptions.find(m => m.id === selectedModule)?.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {moduleOptions.find(m => m.id === selectedModule)?.icon}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedModule ? `${moduleOptions.find(m => m.id === selectedModule)?.label} Ekle` : 'Yeni Modül Ekle'}
                  </h2>
                  <p className="text-gray-600">
                    {selectedModule ? 'Modül bilgilerini doldurun' : 'Hangi tür kayıt eklemek istiyorsunuz?'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal içeriği */}
          <div className="p-8">
            {!selectedModule ? (
              // Modül seçim ekranı
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Modül Seçin</h3>
                  <p className="text-gray-500">İhtiyacınıza uygun modülü seçerek başlayın</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {moduleOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleModuleSelect(option.id as ModuleType)}
                      className={`group relative p-6 ${option.bgColor} ${option.borderColor} border-2 rounded-2xl transition-all duration-300 ${option.hoverColor} hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30`}
                    >
                      {/* Hover efekti */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      
                      <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-4xl">{option.icon}</span>
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${option.color} shadow-lg`} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">
                          {option.label}
                        </h3>
                        
                        <p className="text-gray-600 text-left leading-relaxed">
                          {option.description}
                        </p>
                        
                        {/* Hover çizgisi */}
                        <div className={`mt-4 w-0 group-hover:w-full h-1 bg-gradient-to-r ${option.color} rounded-full transition-all duration-500`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Form ekranı
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Geri
                  </button>
                  
                  {selectedDate && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      📅 {selectedDate}
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  {renderForm()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModuleModal;
