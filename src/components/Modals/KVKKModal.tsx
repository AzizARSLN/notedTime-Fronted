import React from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ShieldCheck } from 'lucide-react';

interface KVKKModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const KVKKModal: React.FC<KVKKModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <div className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                                {t('footer.kvkk')}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Son Güncelleme: 18 Şubat 2026</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 text-slate-600 dark:text-slate-400 custom-scrollbar">
                    <section className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">1. Veri Sorumlusu</h3>
                        <p className="text-xs leading-relaxed">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu ("Kanun") uyarınca, NotedTime (TBC Teknoloji A.Ş.) olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun bir şekilde işleyebilecek, kaydedebilecek, saklayabilecek, sınıflandırabilecek, güncelleyebilecek ve mevzuatın izin verdiği hallerde üçüncü kişilere açıklayabilecek/aktarabileceğiz.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">2. İşlenen Kişisel Veriler</h3>
                        <p className="text-xs leading-relaxed">
                            Uygulamamızı kullanımınız sırasında aşağıdaki verileriniz işlenebilmektedir:
                        </p>
                        <ul className="text-xs space-y-2 list-disc pl-5">
                            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad.</li>
                            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası.</li>
                            <li><strong>Kullanım Bilgileri:</strong> Uygulama içi tercihler, notlar, finansal kayıtlar (kendi isteğinizle girdiğiniz veriler).</li>
                            <li><strong>Cihaz Bilgileri:</strong> IP adresi, işletim sistemi, tarayıcı tipi.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">3. Kişisel Verilerin İşlenme Amacı</h3>
                        <p className="text-xs leading-relaxed">
                            Kişisel verileriniz şu amaçlarla işlenmektedir:
                        </p>
                        <ul className="text-xs space-y-2 list-disc pl-5">
                            <li>Uygulama hizmetlerinin sunulması ve yönetilmesi.</li>
                            <li>Kullanıcı deneyiminin iyileştirilmesi ve kişiselleştirilmesi.</li>
                            <li>Bilgi güvenliği süreçlerinin yürütülmesi.</li>
                            <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">4. Çerezler (Cookies)</h3>
                        <p className="text-xs leading-relaxed">
                            NotedTime, web sitesi ve uygulama deneyiminizi optimize etmek için çerezleri kullanır. Çerezler, cihazınıza kaydedilen küçük dosyalardır. Zorunlu çerezler uygulamanın çalışması için gereklidir; analitik ve tercih çerezleri ise sizin onayınıza tabidir.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">5. İlgili Kişinin Hakları</h3>
                        <p className="text-xs leading-relaxed">
                            Kanun'un 11. maddesi uyarınca herkes veri sorumlusuna başvurarak kendisiyle ilgili; kişisel veri işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, verilerin silinmesini veya yok edilmesini isteme haklarına sahiptir.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                    <button
                        onClick={onClose}
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 rounded-2xl tracking-widest text-[10px] uppercase shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                    >
                        Anladım, Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KVKKModal;
