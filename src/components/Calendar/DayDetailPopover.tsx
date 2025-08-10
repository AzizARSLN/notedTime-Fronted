import React, { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { CalendarCell as CalendarCellType } from '../../types';

interface DayDetailPopoverProps {
  date: Date;
  financialRecords: any[];
  reminders: any[];
  notes: any[];
  travels: any[];
  counters: any[];
  position: { x: number; y: number };
  onClose: () => void;
}

const DayDetailPopover: React.FC<DayDetailPopoverProps> = ({
  date,
  financialRecords,
  reminders,
  notes,
  travels,
  counters,
  position,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'financial' | 'reminder' | 'note' | 'travel' | 'counter'>('financial');

  const tabs = [
    { id: 'financial', label: 'Finansal', count: financialRecords.length },
    { id: 'reminder', label: 'Hatırlatıcı', count: reminders.length },
    { id: 'note', label: 'Not', count: notes.length },
    { id: 'travel', label: 'Seyahat', count: travels.length },
    { id: 'counter', label: 'Sayaç', count: counters.length }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'financial':
        return (
          <div className="space-y-2">
            {financialRecords.length === 0 ? (
              <p className="text-gray-500 text-sm">Bu gün için finansal kayıt yok</p>
            ) : (
              financialRecords.map((record: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-financial rounded-full"></div>
                    <span className="text-sm font-medium">{record.category}</span>
                  </div>
                  <span className="text-sm text-gray-600">{record.total} {record.currency}</span>
                </div>
              ))
            )}
          </div>
        );
      
      case 'reminder':
        return (
          <div className="space-y-2">
            {reminders.length === 0 ? (
              <p className="text-gray-500 text-sm">Bu gün için hatırlatıcı yok</p>
            ) : (
              reminders.map((reminder: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${reminder.isCritical ? 'bg-red-500' : 'bg-reminder'}`}></div>
                    <span className="text-sm font-medium">{reminder.title}</span>
                  </div>
                  {reminder.time && (
                    <span className="text-sm text-gray-600">{reminder.time}</span>
                  )}
                </div>
              ))
            )}
          </div>
        );
      
      case 'note':
        return (
          <div className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-gray-500 text-sm">Bu gün için not yok</p>
            ) : (
              notes.map((note: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${note.isCritical ? 'bg-yellow-500' : 'bg-note'}`}></div>
                    <span className="text-sm font-medium">{note.title}</span>
                  </div>
                  <span className="text-sm text-gray-600">{note.todoItems?.filter((item: any) => !item.isCompleted).length || 0} görev</span>
                </div>
              ))
            )}
          </div>
        );
      
      case 'travel':
        return (
          <div className="space-y-2">
            {travels.length === 0 ? (
              <p className="text-gray-500 text-sm">Bu gün için seyahat yok</p>
            ) : (
              travels.map((travel: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-travel rounded-full"></div>
                    <span className="text-sm font-medium">{travel.from} → {travel.to}</span>
                  </div>
                  {travel.totalKm && (
                    <span className="text-sm text-gray-600">{travel.totalKm} km</span>
                  )}
                </div>
              ))
            )}
          </div>
        );
      
      case 'counter':
        return (
          <div className="space-y-2">
            {counters.length === 0 ? (
              <p className="text-gray-500 text-sm">Bu gün için sayaç yok</p>
            ) : (
              counters.map((counter: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-counter rounded-full"></div>
                    <span className="text-sm font-medium">{counter.type}</span>
                  </div>
                  <span className="text-sm text-gray-600">{counter.value}</span>
                </div>
              ))
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      className="popover"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)'
      }}
    >
      {/* Popover başlığı */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {date.toLocaleDateString('tr-TR')}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Sekmeler */}
      <div className="flex space-x-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Sekme içeriği */}
      <div className="mb-4">
        {renderTabContent()}
      </div>

      {/* Yeni ekle butonu */}
      <button
        onClick={() => {}}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Yeni {tabs.find(t => t.id === activeTab)?.label} Ekle</span>
      </button>
    </div>
  );
};

export default DayDetailPopover;
