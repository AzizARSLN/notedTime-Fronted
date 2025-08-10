import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { getCalendarDays, getMonthName, getShortWeekdayName, isDateToday, isSameMonthCheck, toDateString } from '../../utils/dateUtils';
import type { CalendarCell as CalendarCellType, FinancialRecord, Reminder, Note, Travel, Counter } from '../../types';
import type { CalendarFilters } from '../../types';
import CalendarCell from './CalendarCell';
import CalendarFiltersComponent from './CalendarFilters';
import AddModuleModal from '../Modals/AddModuleModal';

interface CalendarProps {
  financialRecords: FinancialRecord[];
  reminders: Reminder[];
  notes: Note[];
  travels: Travel[];
  counters: Counter[];
  onDateSelect?: (date: string) => void;
  onQuickAction?: (action: string, moduleId: string) => void;
  onSelectModule?: (moduleType: 'financial' | 'reminder' | 'note' | 'travel' | 'counter') => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, onSelectModule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<CalendarFilters>({
    modules: ['financial', 'reminder', 'note', 'travel', 'counter'],
    shared: false,
    search: '',
    todayOnly: false
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Takvim günlerini hesapla
  const calendarDays = useMemo(() => {
    return getCalendarDays(currentDate);
  }, [currentDate]);

  // Hafta günü başlıkları
  const weekdays = useMemo(() => {
    return ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  }, []);

  // Ay değiştir
  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
  };

  // Gün seç
  const handleDateSelect = (date: Date) => {
    const dateString = toDateString(date);
    setSelectedDate(dateString);
    setShowAddModal(true);
    // Takvim üzerinden tarih seçildiğinde modal açılsın
    onDateSelect?.(dateString);
  };

  // Filtreleri güncelle
  const handleFiltersChange = (newFilters: Partial<CalendarFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Modal kapat
  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedDate(null);
    // Modal kapandığında seçili tarihi de temizle
    if (onDateSelect) {
      onDateSelect('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Takvim Başlığı - Modern tasarım */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Ay navigasyon butonları */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => changeMonth('prev')}
                className="p-3 rounded-xl bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-blue-200/50"
                aria-label="Önceki ay"
              >
                <ChevronLeftIcon className="w-5 h-5 text-blue-600" />
              </button>
              
              <button
                onClick={() => changeMonth('next')}
                className="p-3 rounded-xl bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-blue-200/50"
                aria-label="Sonraki ay"
              >
                <ChevronRightIcon className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            
            {/* Ay ve yıl başlığı */}
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                {getMonthName(currentDate)}
              </h2>
              <p className="text-blue-600 font-medium">
                {currentDate.getFullYear()}
              </p>
            </div>
          </div>

          {/* Yeni kayıt butonu */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Yeni Kayıt
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100">
        <CalendarFiltersComponent
          filters={filters}
          onChange={handleFiltersChange}
        />
      </div>

      {/* Takvim grid'i */}
      <div className="p-6">
        {/* Hafta günü başlıkları */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekdays.map((day, index) => (
            <div
              key={index}
              className="text-center py-3 px-2"
            >
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Takvim günleri */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <CalendarCell
              key={index}
              day={{ date: day }}
              isToday={isDateToday(day)}
              isCurrentMonth={isSameMonthCheck(day, currentDate)}
              onDateSelect={handleDateSelect}
              financialRecords={[]}
              reminders={[]}
              notes={[]}
              travels={[]}
              counters={[]}
            />
          ))}
        </div>
      </div>

             {/* Modül ekleme modal'ı */}
       <AddModuleModal
         isOpen={showAddModal}
         onClose={handleCloseModal}
         onSelectModule={onSelectModule || (() => {})}
         selectedDate={selectedDate}
       />
       </div>
     </div>
   );
 };

export default Calendar;
