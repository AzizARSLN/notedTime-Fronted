import { useState, useEffect } from 'react';
import Calendar from './components/Calendar/Calendar';
import AddModuleModal from './components/Modals/AddModuleModal';
import FinancialForm from './components/Forms/FinancialForm';
import ReminderForm from './components/Forms/ReminderForm';
import NoteForm from './components/Forms/NoteForm';
import TravelForm from './components/Forms/TravelForm';
import CounterForm from './components/Forms/CounterForm';
import type { DateString, FinancialRecord, Reminder, Note, Travel, Counter } from './types';

import {
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import LoginPage from './components/Login/LoginPage';

function App() {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const languages = [
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'uz', flag: '🇺🇿', name: 'Oʻzbekcha' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const [financialRecords] = useState<FinancialRecord[]>([
    {
      id: '1',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'Market',
      quantity: 1,
      unitAmount: 450.50,
      currency: 'TRY',
      isPlanned: false,
      isShared: false,
      total: 450.50,
      counterparty: ['Migros'],
      installments: 1,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [reminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'meeting',
      date: new Date().toISOString().split('T')[0],
      title: 'Haftalık Senkronizasyon',
      time: '10:00',
      description: 'Ekip toplantısı',
      isCritical: true,
      participants: [],
      warningTime: '15min',
      repeat: 'none',
      isShared: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [notes] = useState<Note[]>([]);
  const [travels] = useState<Travel[]>([]);
  const [counters] = useState<Counter[]>([]);

  const [selectedDate, setSelectedDate] = useState<DateString | null>(null);
  const [activeForm, setActiveForm] = useState<'add' | 'financial' | 'reminder' | 'note' | 'travel' | 'counter' | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'financial':
        return <FinancialForm selectedDate={selectedDate} onSave={() => setActiveForm(null)} onCancel={() => setActiveForm(null)} />;
      case 'reminder':
        return <ReminderForm onSave={() => setActiveForm(null)} onCancel={() => setActiveForm(null)} />;
      case 'note':
        return <NoteForm onSave={() => setActiveForm(null)} onCancel={() => setActiveForm(null)} />;
      case 'travel':
        return <TravelForm onSave={() => setActiveForm(null)} onCancel={() => setActiveForm(null)} />;
      case 'counter':
        return <CounterForm selectedDate={selectedDate} onSave={() => setActiveForm(null)} onCancel={() => setActiveForm(null)} />;
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
      {/* 2026 Aurora Header */}
      <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-10 relative z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-3xl">
        <div className="flex items-center gap-12">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative p-0.5 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <div className="flex items-center justify-center w-10 h-10 bg-slate-950 rounded-[14px] overflow-hidden">
                <span className="text-base font-black text-white tracking-tighter relative -left-[0.5px]">N</span>
                <div className="w-[1.5px] h-4 bg-indigo-500 mx-0.5 rotate-[20deg] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                <span className="text-base font-black text-white tracking-tighter relative -right-[0.5px]">T</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">Noted</h1>
                <span className="text-xl font-light text-indigo-500 tracking-tighter leading-none uppercase">Time</span>
              </div>
              <span className="text-[8px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.3em] mt-0.5">Enterprise 2026</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <button className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 dark:shadow-white/5 transition-all hover:scale-105">{t('nav.dashboard')}</button>
            <button className="px-5 py-2.5 rounded-xl text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">{t('nav.analytics')}</button>
            <button className="px-5 py-2.5 rounded-xl text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">{t('nav.reports')}</button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/* Digital Clock */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-black text-slate-900 dark:text-white tracking-widest tabular-nums">
              {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('footer.live')}</span>
          </div>

          <div className="h-6 w-1px bg-slate-200 dark:bg-white/10 mx-2" />

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-90"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 z-[200] animate-scale-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setShowLangMenu(false);
                        document.dir = lang.code === 'ar' ? 'rtl' : 'ltr';
                      }}
                      className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl transition-all ${i18n.language === lang.code ? 'bg-indigo-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'}`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-2 pr-4 py-2 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                  {user?.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col items-start translate-y-[-1px]">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{user}</span>
                  <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest opacity-80">{t('user.role')}</span>
                </div>
                <ChevronDownIcon className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-[200] animate-scale-in">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-2">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('user.account')}</p>
                    <p className="text-[10px] font-bold text-slate-900 dark:text-white mt-1 truncate">{user}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t('user.logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all duration-1000" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32 transition-all duration-1000" />

        <Calendar
          financialRecords={financialRecords}
          reminders={reminders}
          notes={notes}
          travels={travels}
          counters={counters}
          onDateSelect={(date) => {
            setSelectedDate(date as DateString);
            setActiveForm('add');
          }}
        />
      </main>

      <AddModuleModal
        isOpen={activeForm === 'add'}
        onClose={() => setActiveForm(null)}
        onSelectModule={(type) => setActiveForm(type as any)}
        selectedDate={selectedDate}
      />

      {/* Generic Form Modal */}
      {activeForm && activeForm !== 'add' && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xl animate-fade-in" onClick={() => setActiveForm(null)} />
          <div className="relative w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 rounded-[2.5rem] premium-glass p-8 sm:p-12 animate-slide-up shadow-2xl border border-white/20 dark:border-white/5">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                  {t(`modals.addModule.${activeForm}.title`)}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{selectedDate}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveForm(null)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-95"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            {renderActiveForm()}
          </div>
        </div>
      )}


    </div>
  );
}

export default App;
