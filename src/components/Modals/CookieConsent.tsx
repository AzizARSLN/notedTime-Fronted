import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import KVKKModal from './KVKKModal';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showKVKK, setShowKVKK] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) return <KVKKModal isOpen={showKVKK} onClose={() => setShowKVKK(false)} />;

    return (
        <>
            <div className="fixed bottom-6 left-6 right-6 z-[9999] md:left-auto md:right-8 md:bottom-8 md:w-[400px] animate-slide-up">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-all duration-700" />

                    <div className="relative">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Çerez Tercihleri</h4>
                                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                    Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz. Bazı çerezler sistemin çalışması için zorunludur.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleAccept}
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all active:scale-95"
                            >
                                Tümünü Kabul Et
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleReject}
                                    className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-black py-3 rounded-xl text-[9px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                                >
                                    Reddet
                                </button>
                                <button
                                    onClick={() => setShowKVKK(true)}
                                    className="flex-1 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 font-black py-3 rounded-xl text-[9px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                >
                                    Detayları Gör
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <KVKKModal isOpen={showKVKK} onClose={() => setShowKVKK(false)} />
        </>
    );
};

export default CookieConsent;
