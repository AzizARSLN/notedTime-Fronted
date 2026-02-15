import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import FinancialForm from './components/Forms/FinancialForm';
import ReminderForm from './components/Forms/ReminderForm';
import NoteForm from './components/Forms/NoteForm';
import TravelForm from './components/Forms/TravelForm';
import CounterForm from './components/Forms/CounterForm';
import AddModuleModal from './components/Modals/AddModuleModal';
import type { DateString, FinancialRecord, Reminder, Note, Travel, Counter } from './types';

import {
  SunIcon,
  MoonIcon,
  BellIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import LoginPage from './components/Login/LoginPage';

import { useEffect } from 'react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('user');
  });

  const [selectedDate, setSelectedDate] = useState<DateString | null>(null);
  const [activeForm, setActiveForm] = useState<'financial' | 'reminder' | 'note' | 'travel' | 'counter' | null>(null);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([
    {
      id: '1',
      type: 'expense',
      date: '15.12.2024',
      category: 'Market',
      quantity: 1,
      unitAmount: 150,
      currency: 'TRY',
      total: 150,
      counterparty: ['Market A'],
      installments: 1,
      isPlanned: false,
      isShared: false,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'meeting',
      title: 'Takım Toplantısı',
      date: '15.12.2024',
      time: '14:00',
      participants: ['Ahmet', 'Mehmet'],
      warningTime: '15min',
      repeat: 'none',
      isCritical: true,
      isShared: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Proje Notları',
      content: 'Önemli proje detayları',
      category: 'İş',
      date: '15.12.2024',
      isCritical: false,
      todoItems: [
        { id: '1', text: 'Dokümantasyon hazırla', isCompleted: false },
        { id: '2', text: 'Test yap', isCompleted: true }
      ],
      assignedPeople: ['Ben'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [travels, setTravels] = useState<Travel[]>([
    {
      id: '1',
      from: 'İstanbul',
      to: 'Ankara',
      dateRange: { start: '15.12.2024', end: '17.12.2024' },
      companions: ['Aile'],
      dailyNotes: [],
      totalKm: 450,
      color: '#10B981',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [counters, setCounters] = useState<Counter[]>([
    {
      id: '1',
      type: 'Su İçme',
      date: '15.12.2024',
      value: 8,
      dailyTarget: 10,
      isShared: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUser(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  // Tarih seçimi
  const handleDateSelect = (date: DateString) => {
    if (date) {
      setSelectedDate(date);
      setIsAddModuleModalOpen(true);
    } else {
      setSelectedDate(null);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
    <div className="h-screen overflow-hidden flex flex-col">
      {/* 2026 Premium Ultra-Thin Header */}
      <header className="premium-glass sticky top-0 z-[100] border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
                  <span className="text-xl font-black bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent italic">NT</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">NotedTime</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Enterprise Time & Finance Management</span>
                </div>
              </div>
            </div>

            {/* Centered Actions */}
            <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-white/10">
              <button className="px-5 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 rounded-xl shadow-sm transition-all">Panel</button>
              <button className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">Analiz</button>
              <button className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">Raporlar</button>
            </nav>

            {/* System Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-11 h-11 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                {theme === 'light' ? <MoonIcon className="w-5 h-5 text-slate-900" /> : <SunIcon className="w-5 h-5 text-amber-400" />}
              </button>

              <button className="relative w-11 h-11 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <BellIcon className="w-5 h-5 ml-0" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full ring-4 ring-white dark:ring-slate-900"></span>
              </button>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-1.5 pl-4 bg-slate-100 dark:bg-white/5 hover:bg-white dark:hover:bg-slate-800 rounded-[1.25rem] transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
              >
                <div className="hidden md:block text-right">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">{user}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Pro Elite</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                  <span className="text-xs font-black">AA</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Full screen minus header */}
      <main className="flex-1 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="h-full animate-reveal">
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
        </div>
      </main>

      {/* Modül ekleme modal'ı (Seçici) */}
      <AddModuleModal
        isOpen={isAddModuleModalOpen && !activeForm}
        onClose={() => {
          setIsAddModuleModalOpen(false);
          setSelectedDate(null);
        }}
        onSelectModule={handleOpenForm}
        selectedDate={selectedDate}
      />

      {/* Aktif Form Modalı */}
      {activeForm && (
        <div className="fixed inset-0 z-[10000] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={handleCloseForm} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-in p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {activeForm === 'financial' && '💰 Finansal Kayıt'}
                    {activeForm === 'reminder' && '🔔 Hatırlatıcı'}
                    {activeForm === 'note' && '📝 Not'}
                    {activeForm === 'travel' && '✈️ Seyahat'}
                    {activeForm === 'counter' && '📊 Sayaç'}
                  </h2>
                  <p className="text-slate-500 font-medium mt-1">
                    {selectedDate && `Tarih: ${selectedDate}`}
                  </p>
                </div>
                <button onClick={handleCloseForm} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-slate-600 transition-all">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="custom-scrollbar max-h-[70vh] overflow-y-auto pr-2">
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
            </div>
          </div>
        </div>
      )}

      {/* Kullanıcı menüsü dışına tıklandığında kapat */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default App;
