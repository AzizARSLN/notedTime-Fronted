import React, { useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { XMarkIcon, PlusIcon, CurrencyDollarIcon, BellIcon, DocumentTextIcon, PaperAirplaneIcon, ChartBarIcon } from '@heroicons/react/24/outline';

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
  date, financialRecords, reminders, notes, travels, counters, position, onClose
}) => {
  const [activeTab, setActiveTab] = useState<'financial' | 'reminder' | 'note' | 'travel' | 'counter'>('financial');

  const tabs = [
    { id: 'financial', label: 'Finansal', count: financialRecords.length, icon: CurrencyDollarIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'reminder', label: 'Hatırlatıcı', count: reminders.length, icon: BellIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'note', label: 'Not', count: notes.length, icon: DocumentTextIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'travel', label: 'Seyahat', count: travels.length, icon: PaperAirplaneIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'counter', label: 'Sayaç', count: counters.length, icon: ChartBarIcon, color: 'text-slate-600', bg: 'bg-slate-50' }
  ];

  const renderContent = () => {
    const dataMap: any = { financial: financialRecords, reminder: reminders, note: notes, travel: travels, counter: counters };
    const items = dataMap[activeTab];

    if (items.length === 0) return (
      <div className="py-12 text-center">
        <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <XMarkIcon className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-slate-400 text-sm font-medium">Bu kategoride henüz kayıt yok.</p>
      </div>
    );

    return (
      <div className="space-y-2 py-2">
        {items.map((item: any, i: number) => (
          <div key={i} className="group p-3 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{item.title || item.category || item.type || 'Başlıksız'}</span>
              <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
                {item.total ? `${item.total} ${item.currency}` : item.time || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed z-[100] w- relative80 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in"
      style={{ left: `${Math.min(position.x, window.innerWidth - 340)}px`, top: `${Math.min(position.y, window.innerHeight - 450)}px`, width: '320px', maxHeight: '420px' }}
    >
      {/* Header */}
      <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{format(date, 'd MMMM EEEE', { locale: tr })}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Günlük Detay</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-all">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all relative ${activeTab === tab.id ? tab.color : 'text-slate-300 hover:text-slate-500'}`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[8px] font-bold uppercase tracking-tighter">{tab.count}</span>
            {activeTab === tab.id && <div className={`absolute bottom-0 inset-x-2 h-0.5 rounded-t-full ${tab.bg.replace('bg-', 'bg-').replace('50', '600')}`} />}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        {renderContent()}
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-white border-t border-slate-50">
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-slate-200">
          <PlusIcon className="w-4 h-4" />
          <span>Hızlı Ekle</span>
        </button>
      </div>

      {/* Close Overlay when clicking outside if handled by parent */}
    </div>
  );
};

export default DayDetailPopover;
