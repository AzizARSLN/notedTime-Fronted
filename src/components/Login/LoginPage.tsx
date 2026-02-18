import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, User, Eye, EyeOff, ArrowRight, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import KVKKModal from '../Modals/KVKKModal';
import CookieConsent from '../Modals/CookieConsent';

interface LoginPageProps {
    onLogin: (username: string) => void;
}

const languages = [
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe', dir: 'ltr' },
    { code: 'en', flag: '🇺🇸', name: 'English', dir: 'ltr' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch', dir: 'ltr' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский', dir: 'ltr' },
    { code: 'uz', flag: '🇺🇿', name: 'Oʻzbekcha', dir: 'ltr' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية', dir: 'rtl' }
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [showKVKK, setShowKVKK] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setShowLangMenu(false);
        document.dir = languages.find(l => l.code === code)?.dir || 'ltr';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                onLogin(username);
            } else {
                setError(t('login.error'));
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-6 relative z-10">
                <div className="w-full max-w-md animate-reveal">
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 sm:p-10 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        {/* Form Header with Language Switcher */}
                        <div className="relative mb-8 text-center">
                            <div className="flex justify-center mb-6">
                                <div className="relative group cursor-pointer p-0.5 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl shadow-2xl">
                                    <div className="flex items-center justify-center w-14 h-14 bg-slate-950 rounded-[14px] overflow-hidden">
                                        <span className="text-xl font-black text-white tracking-tighter relative -left-[1px]">N</span>
                                        <div className="w-[2px] h-6 bg-indigo-500 mx-0.5 rotate-[20deg] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                                        <span className="text-xl font-black text-white tracking-tighter relative -right-[1px]">T</span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowLangMenu(!showLangMenu)}
                                        className="p-2.5 bg-slate-950/50 border border-white/5 rounded-xl hover:bg-slate-800 transition-all text-white shadow-lg"
                                        title={currentLang.name}
                                    >
                                        <span className="text-lg">{currentLang.flag}</span>
                                    </button>

                                    {showLangMenu && (
                                        <div className="absolute right-0 mt-2 w-44 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1 z-50 animate-scale-in">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => changeLanguage(lang.code)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${i18n.language === lang.code ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                                >
                                                    <span className="text-xl">{lang.flag}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-baseline gap-1.5">
                                    <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Noted</h1>
                                    <span className="text-3xl font-light tracking-tighter text-indigo-500 uppercase">Time</span>
                                </div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2 opacity-70">{t('login.welcome')}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 relative" dir="ltr">
                            {error && (
                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('login.identity')}</label>
                                <div className="relative group">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/5 text-white pl-11 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm font-bold"
                                        placeholder={t('login.username')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('login.securityKey')}</label>
                                <div className="relative group">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/5 text-white pl-11 pr-12 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 text-sm font-bold"
                                        placeholder={t('login.password')}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-3 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>{t('login.submit')}</span>
                                        <ArrowRight size={16} className={i18n.language === 'ar' ? 'rotate-180' : ''} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* COMPACT CORPORATE FOOTER */}
            <footer className="relative z-20 bg-slate-950/80 backdrop-blur-3xl border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center border border-white/10 shadow-lg shadow-indigo-500/5">
                                    <span className="text-[10px] font-black text-indigo-400">NT</span>
                                </div>
                                <h2 className="text-xs font-black text-white tracking-[0.2em] uppercase">NotedTime</h2>
                            </div>
                            <p className="text-[10px] font-semibold text-slate-500 leading-relaxed uppercase tracking-widest">
                                {t('footer.description')}
                            </p>
                            <div className="flex items-center gap-3">
                                {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                                    <a key={i} href="#" className="w-7 h-7 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500 transition-all hover:-translate-y-0.5 shadow-lg">
                                        <Icon size={12} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em] opacity-80 decoration-indigo-500/30 underline underline-offset-8">{t('footer.corporate')}</h3>
                            <ul className="grid grid-cols-1 gap-3">
                                {[
                                    { label: t('footer.about'), url: 'https://www.tbcteknoloji.com/tr/hakkimizda/' },
                                    { label: t('footer.solutions'), url: 'https://www.tbcteknoloji.com/tr/cozumlerimiz/' },
                                    { label: t('footer.references'), url: 'https://www.tbcteknoloji.com/tr/referanslar/' }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-white transition-all group uppercase tracking-widest">
                                            <ExternalLink size={10} className="text-indigo-500/50 group-hover:text-indigo-500" />
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em] opacity-80 decoration-indigo-500/30 underline underline-offset-8">{t('footer.contact')}</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <MapPin size={12} className="text-indigo-500/60 mt-0.5" />
                                    <span className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-wider">{t('footer.address')}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Phone size={12} className="text-indigo-500/60" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">0850 305 65 40</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Mail size={12} className="text-indigo-500/60" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">info@tbcteknoloji.com</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <div className="p-4 bg-slate-900/30 rounded-[1.5rem] border border-white/5 space-y-3 relative overflow-hidden group">
                                <div className="relative space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{t('footer.systemStatus')}</span>
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[8px] font-black text-emerald-500 uppercase">{t('footer.live')}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/5 pt-2">
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{t('footer.currentTime')}</span>
                                        <p className="text-[12px] font-black text-white tabular-nums tracking-tighter">
                                            {currentTime.toLocaleTimeString(i18n.language)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-4 text-center sm:text-left">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                            © 2026 TBC TEKNOLOJİ A.Ş.
                        </p>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setShowKVKK(true)}
                                className="flex items-center gap-1.5 text-[9px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest transition-all group"
                            >
                                <ShieldCheck size={12} />
                                {t('footer.kvkk')}
                            </button>
                            <div className="hidden sm:block h-3 w-px bg-slate-800"></div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md border border-white/5">v2.4.0.BETA</p>
                        </div>
                    </div>
                </div>
            </footer>
            <KVKKModal isOpen={showKVKK} onClose={() => setShowKVKK(false)} />
            <CookieConsent />
        </div>
    );
};

export default LoginPage;
