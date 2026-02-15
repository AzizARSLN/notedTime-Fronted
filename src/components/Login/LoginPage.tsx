import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock login logic
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin(username);
      } else {
        setError('Hatalı kullanıcı adı veya şifre.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 mb-6">
              <span className="text-2xl font-bold text-white tracking-tighter">NT</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">NotedTime</h1>
            <p className="text-slate-400">Yönetim Paneline Hoş Geldiniz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Kullanıcı Adı</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Şifre</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white pl-11 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 border border-slate-700 rounded bg-slate-800/50 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                  <CheckCircle2 size={12} className="absolute inset-x-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Beni Hatırla</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">Şifremi Unuttum</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-slate-500 text-sm">
              Hesabınız yok mu?{' '}
              <a href="#" className="text-white font-medium hover:text-blue-400 transition-colors">Kayıt Ol</a>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-500 text-xs uppercase tracking-widest font-semibold">
          © 2024 NotedTime Enterprise
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
