import React, { useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { 
  CurrencyDollarIcon, 
  BellIcon, 
  DocumentTextIcon, 
  PaperAirplaneIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import type { FinancialRecord, Reminder, Note, Travel, Counter } from '../../types';
import DayDetailPopover from './DayDetailPopover';

interface CalendarCellProps {
  day: { date: Date };
  isToday: boolean;
  isCurrentMonth: boolean;
  onDateSelect: (date: Date) => void;
  financialRecords: FinancialRecord[];
  reminders: Reminder[];
  notes: Note[];
  travels: Travel[];
  counters: Counter[];
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  isToday,
  isCurrentMonth,
  onDateSelect,
  financialRecords,
  reminders,
  notes,
  travels,
  counters
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Gün numarasını al
  const dayNumber = format(day.date, 'd', { locale: tr });

  // Modül sayılarını hesapla
  const moduleCounts = {
    financial: financialRecords.length,
    reminder: reminders.length,
    note: notes.length,
    travel: travels.length,
    counter: counters.length
  };

  // Toplam modül sayısı
  const totalModules = Object.values(moduleCounts).reduce((sum, count) => sum + count, 0);

  // Kritik işaretleri kontrol et
  const hasCriticalItems = 
    financialRecords.some(r => r.paymentStatus === 'overdue') ||
    reminders.some(r => r.isCritical) ||
    notes.some(n => n.isCritical);

  // Hücre tıklama
  const handleCellClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
    setShowPopover(true);
  };

  // Hücre hover
  const handleCellHover = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
  };

  // Popover kapat
  const handleClosePopover = () => {
    setShowPopover(false);
  };

  // Modül ikonları
  const getModuleIcon = (type: keyof typeof moduleCounts) => {
    const icons = {
      financial: CurrencyDollarIcon,
      reminder: BellIcon,
      note: DocumentTextIcon,
      travel: PaperAirplaneIcon,
      counter: ChartBarIcon
    };
    return icons[type];
  };

  // Modül renkleri
  const getModuleColor = (type: keyof typeof moduleCounts) => {
    const colors = {
      financial: 'from-purple-500 to-purple-600',
      reminder: 'from-blue-500 to-blue-600',
      note: 'from-yellow-500 to-yellow-600',
      travel: 'from-green-500 to-green-600',
      counter: 'from-gray-500 to-gray-600'
    };
    return colors[type];
  };

  return (
    <>
      <div
        className={`group relative min-h-[120px] p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
          isToday 
            ? 'bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-300 shadow-lg scale-105' 
            : isCurrentMonth 
              ? 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 hover:shadow-md' 
              : 'bg-gray-50/50 border-gray-100 text-gray-400'
        } ${hasCriticalItems ? 'ring-2 ring-red-400 ring-opacity-50' : ''}`}
        onClick={handleCellClick}
        onMouseEnter={handleCellHover}
        onMouseLeave={() => setShowPopover(false)}
      >
        {/* Gün numarası */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-lg font-bold ${
            isToday ? 'text-blue-900' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
          }`}>
            {dayNumber}
          </span>
          
          {/* Bugün işareti */}
          {isToday && (
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
          )}
        </div>

        {/* Modül göstergeleri */}
        {totalModules > 0 && (
          <div className="space-y-2">
            {Object.entries(moduleCounts).map(([type, count]) => {
              if (count === 0) return null;
              
              const IconComponent = getModuleIcon(type as keyof typeof moduleCounts);
              const color = getModuleColor(type as keyof typeof moduleCounts);
              
              return (
                <div key={type} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center shadow-sm`}>
                    <IconComponent className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Hover efekti */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none`} />
        
        {/* Kritik işaret */}
        {hasCriticalItems && (
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full" />
          </div>
        )}

        {/* Boş gün göstergesi */}
        {totalModules === 0 && isCurrentMonth && (
          <div className="flex items-center justify-center h-16">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 font-medium">Boş</p>
            </div>
          </div>
        )}
      </div>

      {/* Gün detay popover'ı */}
      {showPopover && (
        <DayDetailPopover
          date={day.date}
          financialRecords={financialRecords}
          reminders={reminders}
          notes={notes}
          travels={travels}
          counters={counters}
          position={popoverPosition}
          onClose={handleClosePopover}
        />
      )}
    </>
  );
};

export default CalendarCell;
