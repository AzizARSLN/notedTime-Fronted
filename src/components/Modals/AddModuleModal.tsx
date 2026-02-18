import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import type { ModuleType, DateString } from '../../types';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleType: ModuleType) => void;
  selectedDate: DateString | null;
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  selectedDate
}) => {
  const { t } = useTranslation();

  const moduleOptions = [
    { id: 'financial', icon: '💰', title: t('modals.addModule.financial.title'), desc: t('modals.addModule.financial.desc'), color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/20' },
    { id: 'reminder', icon: '🔔', title: t('modals.addModule.reminder.title'), desc: t('modals.addModule.reminder.desc'), color: 'from-rose-400 to-rose-600', shadow: 'shadow-rose-500/20' },
    { id: 'note', icon: '📝', title: t('modals.addModule.note.title'), desc: t('modals.addModule.note.desc'), color: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/20' },
    { id: 'travel', icon: '✈️', title: t('modals.addModule.travel.title'), desc: t('modals.addModule.travel.desc'), color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/20' },
    { id: 'counter', icon: '📊', title: t('modals.addModule.counter.title'), desc: t('modals.addModule.counter.desc'), color: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-500/20' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Aurora Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xl" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-6">
        <div className="relative w-full max-w-5xl transform overflow-hidden rounded-[3rem] bg-white/90 dark:bg-slate-900/90 premium-glass animate-reveal">

          {/* 2026 Premium Header */}
          <div className="px-12 py-10 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{t('modals.addModule.title')}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
                  {selectedDate || t('modals.addModule.selectDate')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-90"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
          </div>

          {/* Grid of Options */}
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moduleOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSelectModule(option.id as ModuleType)}
                  className="group relative p-8 bg-white dark:bg-slate-800/40 border border-white/20 dark:border-white/5 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 focus:outline-none"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-6xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">{option.icon}</span>
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${option.color} ${option.shadow} ring-8 ring-white/50 dark:ring-black/20`} />
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-left tracking-tighter group-hover:text-indigo-600 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-left text-sm leading-relaxed italic">
                    {option.desc}
                  </p>

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[2.5rem]" />
                </button>
              ))}

              {/* Extra Slot for aesthetic balance */}
              <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-slate-100/30 dark:bg-white/5 border border-dashed border-slate-300 dark:border-slate-800 rounded-[2.5rem]">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-4">
                  <PlusIcon className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('modals.addModule.comingSoon')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModuleModal;
