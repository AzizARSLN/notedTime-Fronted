import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import FinancialForm from './components/Forms/FinancialForm';
import ReminderForm from './components/Forms/ReminderForm';
import NoteForm from './components/Forms/NoteForm';
import TravelForm from './components/Forms/TravelForm';
import CounterForm from './components/Forms/CounterForm';
import AddModuleModal from './components/Modals/AddModuleModal';
import type { DateString, FinancialRecord, Reminder, Note, Travel, Counter } from './types';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateString | null>(null);
  const [activeForm, setActiveForm] = useState<'financial' | 'reminder' | 'note' | 'travel' | 'counter' | null>(null);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);

  // Tarih seçimi
  const handleDateSelect = (date: DateString) => {
    if (date) {
      setSelectedDate(date);
      // Takvim üzerinden tarih seçildiğinde modal açılsın
      setIsAddModuleModalOpen(true);
    } else {
      setSelectedDate(null);
    }
  };

  // Form açma
  const handleOpenForm = (formType: typeof activeForm) => {
    setActiveForm(formType);
  };

  // Form kapatma
  const handleCloseForm = () => {
    setActiveForm(null);
    setSelectedDate(null);
  };

  // Finansal kayıt kaydetme
  const handleSaveFinancial = () => {
    // Burada API çağrısı yapılacak
    console.log('Finansal kayıt kaydedildi');
    handleCloseForm();
  };

  // Hatırlatıcı kaydetme
  const handleSaveReminder = () => {
    // Burada API çağrısı yapılacak
    console.log('Hatırlatıcı kaydedildi');
    handleCloseForm();
  };

  // Not kaydetme
  const handleSaveNote = () => {
    // Burada API çağrısı yapılacak
    console.log('Not kaydedildi');
    handleCloseForm();
  };

  // Seyahat kaydetme
  const handleSaveTravel = () => {
    // Burada API çağrısı yapılacak
    console.log('Seyahat kaydedildi');
    handleCloseForm();
  };

  // Sayaç kaydetme
  const handleSaveCounter = () => {
    // Burada API çağrısı yapılacak
    console.log('Sayaç kaydedildi');
    handleCloseForm();
  };

  // Hızlı eylemler
  const handleQuickAction = (action: string, moduleId: string) => {
    console.log('Hızlı eylem:', action, moduleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <span className="text-2xl font-bold text-white">NT</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  NotedTime
                </h1>
                <p className="text-sm text-gray-500 font-medium">Zaman ve Para Yönetimi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Üst header'daki "Yeni Kayıt" butonu kaldırıldı */}
            </div>
          </div>
        </div>
      </header>

      {/* Ana içerik */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeForm ? (
          // Form görünümü - Modern kart tasarımı
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeForm === 'financial' && '💰 Finansal Kayıt'}
                {activeForm === 'reminder' && '🔔 Hatırlatıcı'}
                {activeForm === 'note' && '📝 Not'}
                {activeForm === 'travel' && '✈️ Seyahat'}
                {activeForm === 'counter' && '📊 Sayaç'}
              </h2>
              <p className="text-gray-600">
                {selectedDate && `Tarih: ${selectedDate}`}
              </p>
            </div>
            
            {activeForm === 'financial' && (
              <FinancialForm
                selectedDate={selectedDate}
                onSave={handleSaveFinancial}
                onCancel={handleCloseForm}
              />
            )}
            {activeForm === 'reminder' && (
              <ReminderForm
                selectedDate={selectedDate}
                onSave={handleSaveReminder}
                onCancel={handleCloseForm}
              />
            )}
            {activeForm === 'note' && (
              <NoteForm
                selectedDate={selectedDate}
                onSave={handleSaveNote}
                onCancel={handleCloseForm}
              />
            )}
            {activeForm === 'travel' && (
              <TravelForm
                selectedDate={selectedDate}
                onSave={handleSaveTravel}
                onCancel={handleCloseForm}
              />
            )}
            {activeForm === 'counter' && (
              <CounterForm
                selectedDate={selectedDate}
                onCancel={handleCloseForm}
                onSave={handleSaveCounter}
              />
            )}
          </div>
        ) : (
          // Takvim görünümü - Tam sayfa
          <Calendar
            financialRecords={financialRecords}
            reminders={reminders}
            notes={notes}
            travels={travels}
            counters={counters}
            onDateSelect={handleDateSelect}
            onQuickAction={handleQuickAction}
            onSelectModule={handleOpenForm}
          />
        )}
      </main>

      {/* Modül ekleme modal'ı */}
      <AddModuleModal
        isOpen={isAddModuleModalOpen}
        onClose={() => {
          setIsAddModuleModalOpen(false);
          setSelectedDate(null);
        }}
        onSelectModule={handleOpenForm}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default App;
