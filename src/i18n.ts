import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    tr: {
        translation: {
            nav: {
                dashboard: "Panel",
                analytics: "Analiz",
                reports: "Raporlar"
            },
            user: {
                role: "Pro Elite",
                account: "Hesap",
                logout: "Çıkış Yap"
            },
            login: {
                title: "Sisteme Eriş",
                welcome: "Kurumsal Yönetim Paneli",
                username: "Kullanıcı Adı",
                password: "Şifre",
                submit: "Sisteme Bağlan",
                error: "Hatalı kullanıcı adı veya şifre.",
                identity: "Kimlik Tanımlama",
                securityKey: "Güvenlik Anahtarı",
                rememberMe: "Beni Hatırla",
                forgotPassword: "Şifremi Unuttum"
            },
            calendar: {
                today: "Bugün",
                searchPlaceholder: "Veri ara...",
                newRecord: "Yeni Kayıt",
                weekdays: {
                    mon: "Pzt",
                    tue: "Sal",
                    wed: "Çar",
                    thu: "Per",
                    fri: "Cum",
                    sat: "Cmt",
                    sun: "Paz"
                },
                filters: {
                    modules: "Modüller",
                    shared: "Ortak Akış",
                    todayOnly: "Sadece Bugün",
                    financial: "Finans",
                    reminder: "Alarmlar",
                    note: "Notlar",
                    travel: "Rotalar",
                    counter: "Trendler"
                },
                popover: {
                    dailyDetail: "Günlük Detay",
                    noRecords: "Bu kategoride henüz kayıt yok.",
                    quickAdd: "Hızlı Ekle",
                    untitled: "Başlıksız"
                }
            },
            forms: {
                common: {
                    cancel: "Vazgeç",
                    confirm: "Onayla",
                    save: "Kaydet",
                    category: "Kategori",
                    title: "Başlık",
                    description: "Açıklama",
                    descriptionPlaceholder: "Detaylar...",
                    date: "Tarih",
                    time: "Saat",
                    planned: "Planlı",
                    critical: "Kritik / Acil",
                    details: "Detaylar...",
                    saving: "Kaydediliyor...",
                    currency: {
                        try: "₺ TRY",
                        usd: "$ USD",
                        eur: "€ EUR"
                    }
                },
                financial: {
                    recordCategory: "Kayıt Kategorisi",
                    label: "Etiket / Başlık",
                    labelPlaceholder: "örn. Market, Kira",
                    quantity: "Miktar",
                    unitAmount: "Birim Tutar",
                    total: "Toplam",
                    types: {
                        expense: "📉 Gider",
                        income: "📈 Gelir",
                        debt_given: "💸 Borç Verildi",
                        debt_received: "💰 Borç Alındı"
                    }
                },
                note: {
                    titlePlaceholder: "Başlık yazın...",
                    categoryPlaceholder: "örn. İş, Özel",
                    content: "İçerik",
                    contentPlaceholder: "Notunuzu buraya yazın...",
                    addTodo: "Görev ekle...",
                    noTodos: "Görev yok",
                    saveNote: "Notu Kaydet"
                },
                counter: {
                    purpose: "Sayaç Amacı",
                    purposePlaceholder: "örn. Su (bardak)...",
                    target: "Hedef",
                    sharedStream: "Ortak Akış",
                    dailyTarget: "Günlük Hedef"
                },
                reminder: {
                    eventTitle: "Etkinlik Başlığı",
                    titlePlaceholder: "Toplantı, Doğum Günü...",
                    type: "Tür",
                    location: "Konum / Platform",
                    locationPlaceholder: "Ofis, Zoom, Ev...",
                    setReminder: "Hatırlatıcı Kur",
                    types: {
                        normal: "📌 Normal",
                        appointment: "📆 Randevu",
                        meeting: "🤝 Toplantı",
                        work: "💼 İş"
                    },
                    warningTime: {
                        label: "Hatırlatıcı",
                        "5min": "5 dk önce",
                        "15min": "15 dk önce",
                        "1hour": "1 saat önce",
                        "1day": "1 gün önce"
                    },
                    repeat: {
                        label: "Tekrar",
                        none: "Bir kez",
                        daily: "Günlük",
                        weekly: "Haftalık",
                        monthly: "Aylık"
                    }
                },
                travel: {
                    from: "Kalkış",
                    to: "Varış",
                    cityPlaceholder: "Şehir...",
                    distance: "Mesafe (KM)",
                    routeColor: "Rota Rengi",
                    companionPlaceholder: "Yol arkadaşı ekle...",
                    alone: "Yalnız Yolculuk",
                    plan: "Planla"
                }
            },
            modals: {
                addModule: {
                    title: "Yeni Kayıt",
                    selectDate: "Takvimden bir tarih seçin",
                    comingSoon: "Yakında daha fazlası",
                    financial: { title: "Finans", desc: "Gider, gelir ve borç takibi" },
                    reminder: { title: "Hatırlatıcı", desc: "Görevler ve randevular" },
                    note: { title: "Notlar", desc: "Günlük kayıtlar ve yapılacaklar" },
                    travel: { title: "Seyahat", desc: "Rotalar ve yol arkadaşları" },
                    counter: { title: "Sayaçlar", desc: "Alışkanlıklar ve ilerleme" }
                }
            },
            footer: {
                corporate: "Kurumsal",
                about: "Hakkımızda",
                solutions: "Çözümlerimiz",
                references: "Referanslar",
                contact: "İletişim",
                systemStatus: "Sistem Durumu",
                live: "Aktif",
                currentTime: "Canlı Saat",
                kvkk: "KVKK Aydınlatma Metni",
                address: "Ankara, Türkiye (Merkez)",
                description: "TBC Teknoloji A.Ş. bünyesinde geliştirilen, 'Verinizi Güce Dönüştürün' vizyonuyla çalışan yeni nesil finansal ekosistem.",
                systemStatusActive: "Sistem Durumu Aktif"
            }
        }
    },
    en: {
        translation: {
            nav: {
                dashboard: "Dashboard",
                analytics: "Analytics",
                reports: "Reports"
            },
            user: {
                role: "Pro Elite",
                account: "Account",
                logout: "Logout"
            },
            login: {
                title: "Access System",
                welcome: "Enterprise Management Panel",
                username: "Username",
                password: "Password",
                submit: "Connect to System",
                error: "Invalid username or password.",
                identity: "Identity Identification",
                securityKey: "Security Key",
                rememberMe: "Remember Me",
                forgotPassword: "Forgot Password"
            },
            calendar: {
                today: "Today",
                searchPlaceholder: "Search data...",
                newRecord: "New Record",
                weekdays: {
                    mon: "Mon",
                    tue: "Tue",
                    wed: "Wed",
                    thu: "Thu",
                    fri: "Fri",
                    sat: "Sat",
                    sun: "Sun"
                },
                filters: {
                    modules: "Modules",
                    shared: "Shared Stream",
                    todayOnly: "Today Only",
                    financial: "Finance",
                    reminder: "Reminders",
                    note: "Notes",
                    travel: "Routes",
                    counter: "Trends"
                },
                popover: {
                    dailyDetail: "Daily Detail",
                    noRecords: "No records in this category.",
                    quickAdd: "Quick Add",
                    untitled: "Untitled"
                }
            },
            forms: {
                common: {
                    cancel: "Cancel",
                    confirm: "Confirm",
                    save: "Save",
                    category: "Category",
                    title: "Title",
                    description: "Description",
                    descriptionPlaceholder: "Details...",
                    date: "Date",
                    time: "Time",
                    planned: "Planned",
                    critical: "Critical / Urgent",
                    details: "Details...",
                    saving: "Saving...",
                    currency: {
                        try: "₺ TRY",
                        usd: "$ USD",
                        eur: "€ EUR"
                    }
                },
                financial: {
                    recordCategory: "Record Category",
                    label: "Label / Title",
                    labelPlaceholder: "e.g. Market, Rent",
                    quantity: "Quantity",
                    unitAmount: "Unit Amount",
                    total: "Total",
                    types: {
                        expense: "📉 Expense",
                        income: "📈 Income",
                        debt_given: "💸 Debt Given",
                        debt_received: "💰 Debt Received"
                    }
                },
                note: {
                    titlePlaceholder: "Write a title...",
                    categoryPlaceholder: "e.g. Work, Private",
                    content: "Content",
                    contentPlaceholder: "Write your note here...",
                    addTodo: "Add task...",
                    noTodos: "No tasks",
                    saveNote: "Save Note"
                },
                counter: {
                    purpose: "Counter Purpose",
                    purposePlaceholder: "e.g. Water (glass)...",
                    target: "Target",
                    sharedStream: "Shared Stream",
                    dailyTarget: "Daily Target"
                },
                reminder: {
                    eventTitle: "Event Title",
                    titlePlaceholder: "Meeting, Birthday...",
                    type: "Type",
                    location: "Location / Platform",
                    locationPlaceholder: "Office, Zoom, Home...",
                    setReminder: "Set Reminder",
                    types: {
                        normal: "📌 Normal",
                        appointment: "📆 Appointment",
                        meeting: "🤝 Meeting",
                        work: "💼 Work"
                    },
                    warningTime: {
                        label: "Reminder",
                        "5min": "5 min before",
                        "15min": "15 min before",
                        "1hour": "1 hour before",
                        "1day": "1 day before"
                    },
                    repeat: {
                        label: "Repeat",
                        none: "Once",
                        daily: "Daily",
                        weekly: "Weekly",
                        monthly: "Monthly"
                    }
                },
                travel: {
                    from: "Departure",
                    to: "Arrival",
                    cityPlaceholder: "City...",
                    distance: "Distance (KM)",
                    routeColor: "Route Color",
                    companionPlaceholder: "Add travel companion...",
                    alone: "Traveling Alone",
                    plan: "Plan"
                }
            },
            modals: {
                addModule: {
                    title: "New Record",
                    selectDate: "Select a date from calendar",
                    comingSoon: "More coming soon",
                    financial: { title: "Finance", desc: "Expense, income and debt tracking" },
                    reminder: { title: "Reminder", desc: "Tasks and appointments" },
                    note: { title: "Notes", desc: "Daily logs and to-dos" },
                    travel: { title: "Travel", desc: "Routes and companions" },
                    counter: { title: "Counters", desc: "Habits and progress" }
                }
            },
            footer: {
                corporate: "Corporate",
                about: "About Us",
                solutions: "Our Solutions",
                references: "References",
                contact: "Contact",
                systemStatus: "System Status",
                live: "Live",
                currentTime: "Live Clock",
                kvkk: "Data Protection Policy",
                address: "Ankara, Turkey (HQ)",
                description: "A next-generation financial ecosystem developed within TBC Technology, operating with the vision of 'Turn Your Data Into Power'.",
                systemStatusActive: "System Status Active"
            }
        }
    },
    de: {
        translation: {
            nav: {
                dashboard: "Übersicht",
                analytics: "Analysen",
                reports: "Berichte"
            },
            user: {
                role: "Pro Elite",
                account: "Konto",
                logout: "Abmelden"
            },
            login: {
                title: "Systemzugriff",
                welcome: "Unternehmens-Management-Panel",
                username: "Benutzername",
                password: "Passwort",
                submit: "Verbinden",
                error: "Ungültiger Benutzername oder Passwort.",
                identity: "Identitätsnachweis",
                securityKey: "Sicherheitsschlüssel",
                rememberMe: "Angemeldet bleiben",
                forgotPassword: "Passwort vergessen"
            },
            calendar: {
                today: "Heute",
                searchPlaceholder: "Daten suchen...",
                newRecord: "Neuer Eintrag",
                weekdays: {
                    mon: "Mo",
                    tue: "Di",
                    wed: "Mi",
                    thu: "Do",
                    fri: "Fr",
                    sat: "Sa",
                    sun: "So"
                },
                filters: {
                    modules: "Module",
                    shared: "Gemeinsamer Feed",
                    todayOnly: "Nur Heute",
                    financial: "Finanzen",
                    reminder: "Alarme",
                    note: "Notizen",
                    travel: "Routen",
                    counter: "Trends"
                },
                popover: {
                    dailyDetail: "Tagesübersicht",
                    noRecords: "Keine Einträge in dieser Kategorie.",
                    quickAdd: "Schnell hinzufügen",
                    untitled: "Ohne Titel"
                }
            },
            forms: {
                common: {
                    cancel: "Abbrechen",
                    confirm: "Bestätigen",
                    save: "Speichern",
                    category: "Kategorie",
                    title: "Titel",
                    description: "Beschreibung",
                    descriptionPlaceholder: "Details...",
                    date: "Datum",
                    time: "Zeit",
                    planned: "Geplant",
                    critical: "Kritisch / Dringend",
                    details: "Details...",
                    saving: "Speichern...",
                    currency: {
                        try: "₺ TRY",
                        usd: "$ USD",
                        eur: "€ EUR"
                    }
                },
                financial: {
                    recordCategory: "Eintrags-Kategorie",
                    label: "Bezeichnung / Titel",
                    labelPlaceholder: "z.B. Markt, Miete",
                    quantity: "Menge",
                    unitAmount: "Einzelbetrag",
                    total: "Gesamt",
                    types: {
                        expense: "📉 Ausgaben",
                        income: "📈 Einnahmen",
                        debt_given: "💸 Schulden gegeben",
                        debt_received: "💰 Schulden erhalten"
                    }
                },
                note: {
                    titlePlaceholder: "Titel schreiben...",
                    categoryPlaceholder: "z.B. Arbeit, Privat",
                    content: "Inhalt",
                    contentPlaceholder: "Schreiben Sie Ihre Notiz hier...",
                    addTodo: "Aufgabe hinzufügen...",
                    noTodos: "Keine Aufgaben",
                    saveNote: "Notiz speichern"
                },
                counter: {
                    purpose: "Zweck des Zählers",
                    purposePlaceholder: "z.B. Wasser (Glas)...",
                    target: "Ziel",
                    sharedStream: "Gemeinsamer Feed",
                    dailyTarget: "Tagesziel"
                },
                reminder: {
                    eventTitle: "Event-Titel",
                    titlePlaceholder: "Meeting, Geburtstag...",
                    type: "Typ",
                    location: "Ort / Plattform",
                    locationPlaceholder: "Büro, Zoom, Zuhause...",
                    setReminder: "Erinnerung einstellen",
                    types: {
                        normal: "📌 Normal",
                        appointment: "📆 Termin",
                        meeting: "🤝 Meeting",
                        work: "💼 Arbeit"
                    },
                    warningTime: {
                        label: "Erinnerung",
                        "5min": "5 Min. vorher",
                        "15min": "15 Min. vorher",
                        "1hour": "1 Std. vorher",
                        "1day": "1 Tag vorher"
                    },
                    repeat: {
                        label: "Wiederholen",
                        none: "Einmalig",
                        daily: "Täglich",
                        weekly: "Wöchentlich",
                        monthly: "Monatlich"
                    }
                },
                travel: {
                    from: "Abfahrt",
                    to: "Ankunft",
                    cityPlaceholder: "Stadt...",
                    distance: "Entfernung (KM)",
                    routeColor: "Routenfarbe",
                    companionPlaceholder: "Reisebegleiter hinzufügen...",
                    alone: "Allein reisen",
                    plan: "Planen"
                }
            },
            modals: {
                addModule: {
                    title: "Neuer Eintrag",
                    selectDate: "Wählen Sie ein Datum im Kalender",
                    comingSoon: "In Kürze mehr",
                    financial: { title: "Finanzen", desc: "Ausgaben, Einnahmen und Schuldenverfolgung" },
                    reminder: { title: "Erinnerung", desc: "Aufgaben und Termine" },
                    note: { title: "Notizen", desc: "Tägliche Protokolle und To-dos" },
                    travel: { title: "Reise", desc: "Routen und Begleiter" },
                    counter: { title: "Zähler", desc: "Gewohnheiten und Fortschritt" }
                }
            },
            footer: {
                corporate: "Unternehmen",
                about: "Über uns",
                solutions: "Unsere Lösungen",
                references: "Referenzen",
                contact: "Kontakt",
                systemStatus: "Systemstatus",
                live: "Live",
                currentTime: "Echtzeit-Uhr",
                kvkk: "Datenschutzbestimmungen",
                address: "Ankara, Türkei (Zentrale)",
                description: "Ein Finanz-Ökosystem der nächsten Generation, entwickelt von TBC Technology unter der Vision 'Daten in Kraft verwandeln'.",
                systemStatusActive: "Systemstatus Aktiv"
            }
        }
    },
    ru: {
        translation: {
            nav: {
                dashboard: "Панель",
                analytics: "Аналитика",
                reports: "Отчеты"
            },
            user: {
                role: "Pro Elite",
                account: "Аккаунт",
                logout: "Выйти"
            },
            login: {
                title: "Доступ к системе",
                welcome: "Панель управления предприятием",
                username: "Имя пользователя",
                password: "Пароль",
                submit: "Подключиться",
                error: "Неверное имя пользователя или пароль.",
                identity: "Идентификация",
                securityKey: "Ключ безопасности",
                rememberMe: "Запомнить меня",
                forgotPassword: "Забыли пароль?"
            },
            calendar: {
                today: "Сегодня",
                searchPlaceholder: "Поиск данных...",
                newRecord: "Новая запись",
                weekdays: {
                    mon: "Пн",
                    tue: "Вт",
                    wed: "Ср",
                    thu: "Чт",
                    fri: "Пт",
                    sat: "Сб",
                    sun: "Вс"
                },
                filters: {
                    modules: "Модули",
                    shared: "Общий поток",
                    todayOnly: "Только сегодня",
                    financial: "Финансы",
                    reminder: "Будильники",
                    note: "Заметки",
                    travel: "Маршруты",
                    counter: "Тренды"
                },
                popover: {
                    dailyDetail: "Дневные детали",
                    noRecords: "В этой категории пока нет записей.",
                    quickAdd: "Быстрое добавление",
                    untitled: "Без названия"
                }
            },
            forms: {
                common: {
                    cancel: "Отмена",
                    confirm: "Подтвердить",
                    save: "Сохранить",
                    category: "Категория",
                    title: "Заголовок",
                    description: "Описание",
                    descriptionPlaceholder: "Детали...",
                    date: "Дата",
                    time: "Время",
                    planned: "Запланировано",
                    critical: "Критически / Срочно",
                    details: "Детали...",
                    saving: "Сохранение...",
                    currency: {
                        try: "₺ TRY",
                        usd: "$ USD",
                        eur: "€ EUR"
                    }
                },
                financial: {
                    recordCategory: "Категория записи",
                    label: "Метка / Заголовок",
                    labelPlaceholder: "напр. Рынок, Аренда",
                    quantity: "Количество",
                    unitAmount: "Сумма за единицу",
                    total: "Итого",
                    types: {
                        expense: "📉 Расход",
                        income: "📈 Доход",
                        debt_given: "💸 Долг выдан",
                        debt_received: "💰 Долг получен"
                    }
                },
                note: {
                    titlePlaceholder: "Напишите заголовок...",
                    categoryPlaceholder: "напр. Работа, Личное",
                    content: "Контент",
                    contentPlaceholder: "Напишите вашу заметку здесь...",
                    addTodo: "Добавить задачу...",
                    noTodos: "Нет задач",
                    saveNote: "Сохранить заметку"
                },
                counter: {
                    purpose: "Цель счетчика",
                    purposePlaceholder: "напр. Вода (стакан)...",
                    target: "Цель",
                    sharedStream: "Общий поток",
                    dailyTarget: "Дневная цель"
                },
                reminder: {
                    eventTitle: "Название события",
                    titlePlaceholder: "Встреча, День рождения...",
                    type: "Тип",
                    location: "Место / Платформа",
                    locationPlaceholder: "Офис, Zoom, Дом...",
                    setReminder: "Установить напоминание",
                    types: {
                        normal: "📌 Обычный",
                        appointment: "📆 Запись",
                        meeting: "🤝 Встреча",
                        work: "💼 Работа"
                    },
                    warningTime: {
                        label: "Напоминание",
                        "5min": "за 5 мин",
                        "15min": "за 15 мин",
                        "1hour": "за 1 час",
                        "1day": "за 1 день"
                    },
                    repeat: {
                        label: "Повтор",
                        none: "Один раз",
                        daily: "Ежедневно",
                        weekly: "Вженедельно",
                        monthly: "Ежемесячно"
                    }
                },
                travel: {
                    from: "Отправление",
                    to: "Прибытие",
                    cityPlaceholder: "Город...",
                    distance: "Расстояние (КМ)",
                    routeColor: "Цвет маршрута",
                    companionPlaceholder: "Добавить попутчика...",
                    alone: "Путешествую один",
                    plan: "Планировать"
                }
            },
            modals: {
                addModule: {
                    title: "Новая запись",
                    selectDate: "Выберите дату в календаре",
                    comingSoon: "Скоро будет больше",
                    financial: { title: "Финансы", desc: "Отслеживание расходов, доходов и долгов" },
                    reminder: { title: "Напоминание", desc: "Задачи и встречи" },
                    note: { title: "Заметки", desc: "Ежедневные журналы и дела" },
                    travel: { title: "Путешествие", desc: "Маршруты и попутчики" },
                    counter: { title: "Счетчики", desc: "Привычки и прогресс" }
                }
            },
            footer: {
                corporate: "Корпоративный",
                about: "О нас",
                solutions: "Наши решения",
                references: "Рекомендации",
                contact: "Контакты",
                systemStatus: "Статус системы",
                live: "Активен",
                currentTime: "Живое время",
                kvkk: "Политика конфиденциальности",
                address: "Анкара, Турция (Штаб-квартира)",
                description: "Финансовая экосистема нового поколения, разработанная в рамках TBC Technology, работающая с видением 'Превратите ваши данные в силу'.",
                systemStatusActive: "Статус системы активен"
            }
        }
    },
    ar: {
        translation: {
            nav: {
                dashboard: "لوحة التحكم",
                analytics: "التحليلات",
                reports: "التقارير"
            },
            user: {
                role: "برو إليت",
                account: "الحساب",
                logout: "تسجيل الخروج"
            },
            login: {
                title: "الدخول إلى النظام",
                welcome: "لوحة إدارة المؤسسة",
                username: "اسم المستخدم",
                password: "كلمة المرور",
                submit: "اتصال بالنظام",
                error: "اسم المستخدم أو كلمة المرور غير صالحة.",
                identity: "تعريف الهوية",
                securityKey: "مفتاح الأمان",
                rememberMe: "تذكرني",
                forgotPassword: "نسيت كلمة المرور"
            },
            calendar: {
                today: "اليوم",
                searchPlaceholder: "البحث عن بيانات...",
                newRecord: "تسجيل جديد",
                weekdays: {
                    mon: "الإثنين",
                    tue: "الثلاثاء",
                    wed: "الأربعاء",
                    thu: "الخميس",
                    fri: "الجمعة",
                    sat: "السبت",
                    sun: "الأحد"
                },
                filters: {
                    modules: "الوحدات",
                    shared: "التدفق المشترك",
                    todayOnly: "اليوم فقط",
                    financial: "المالية",
                    reminder: "التنبيهات",
                    note: "الملاحظات",
                    travel: "المسارات",
                    counter: "الاتجاهات"
                },
                popover: {
                    dailyDetail: "تفاصيل اليوم",
                    noRecords: "لا توجد سجلات في هذه الفئة بعد.",
                    quickAdd: "إضافة سريعة",
                    untitled: "بدون عنوان"
                }
            },
            forms: {
                common: {
                    cancel: "إلغاء",
                    confirm: "تأكيد",
                    save: "حفظ",
                    category: "الفئة",
                    title: "العنوان",
                    description: "الوصف",
                    descriptionPlaceholder: "التفاصيل...",
                    date: "التاريخ",
                    time: "الوقت",
                    planned: "مخطط له",
                    critical: "حرج / عاجل",
                    details: "التفاصيل...",
                    saving: "جاري الحفظ...",
                    currency: {
                        try: "₺ TRY",
                        usd: "$ USD",
                        eur: "€ EUR"
                    }
                },
                financial: {
                    recordCategory: "فئة السجل",
                    label: "التسمية / العنوان",
                    labelPlaceholder: "مثلاً: سوق، إيجار",
                    quantity: "الكمية",
                    unitAmount: "مبلغ الوحدة",
                    total: "الإجمالي",
                    types: {
                        expense: "📉 مصروف",
                        income: "📈 دخل",
                        debt_given: "💸 دين معطى",
                        debt_received: "💰 دين مستلم"
                    }
                },
                note: {
                    titlePlaceholder: "اكتب عنواناً...",
                    categoryPlaceholder: "مثلاً: عمل، خاص",
                    content: "المحتوى",
                    contentPlaceholder: "اكتب ملاحظتك هنا...",
                    addTodo: "إضافة مهمة...",
                    noTodos: "لا توجد مهام",
                    saveNote: "حفظ الملاحظة"
                },
                counter: {
                    purpose: "الغرض من العداد",
                    purposePlaceholder: "مثلاً: ماء (كوب)...",
                    target: "الهدف",
                    sharedStream: "التدفق المشترك",
                    dailyTarget: "الهدف اليومي"
                },
                reminder: {
                    eventTitle: "عنوان الفعالية",
                    titlePlaceholder: "اجتماع، عيد ميلاد...",
                    type: "النوع",
                    location: "الموقع / المنصة",
                    locationPlaceholder: "المكتب، زووم، المنزل...",
                    setReminder: "ضبط التذكير",
                    types: {
                        normal: "📌 عادي",
                        appointment: "📆 موعد",
                        meeting: "🤝 اجتماع",
                        work: "💼 عمل"
                    },
                    warningTime: {
                        label: "التذكير",
                        "5min": "قبل 5 دقائق",
                        "15min": "قبل 15 دقيقة",
                        "1hour": "قبل ساعة واحدة",
                        "1day": "قبل يوم واحد"
                    },
                    repeat: {
                        label: "التكرار",
                        none: "مرة واحدة",
                        daily: "يومياً",
                        weekly: "أسبوعياً",
                        monthly: "شهرياً"
                    }
                },
                travel: {
                    from: "المغادرة",
                    to: "الوصول",
                    cityPlaceholder: "المدينة...",
                    distance: "المسافة (كم)",
                    routeColor: "لون المسار",
                    companionPlaceholder: "إضافة رفيق سفر...",
                    alone: "سفر وحيد",
                    plan: "تخطيط"
                }
            },
            modals: {
                addModule: {
                    title: "تسجيل جديد",
                    selectDate: "اختر تاريخاً من التقويم",
                    comingSoon: "المزيد قريباً",
                    financial: { title: "المالية", desc: "تتبع المصروفات والدخل والديون" },
                    reminder: { title: "تذكير", desc: "المهام والمواعيد" },
                    note: { title: "ملاحظات", desc: "السجلات اليومية والمهام" },
                    travel: { title: "سفر", desc: "المسارات والرفقاء" },
                    counter: { title: "عدادات", desc: "العادات والتقدم" }
                }
            },
            footer: {
                corporate: "الشركات",
                about: "حولنا",
                solutions: "حلولنا",
                references: "المراجع",
                contact: "اتصل بنا",
                systemStatus: "حالة النظام",
                live: "مباشر",
                currentTime: "الساعة المباشرة",
                kvkk: "سياسة حماية البيانات",
                address: "أنقرة، تركيا (المقر الرئيسي)",
                description: "نظام مالي من الجيل القادم تم تطويره ضمن شركة TBC للتقنية، يعمل برؤية 'حوّل بياناتك إلى قوة'.",
                systemStatusActive: "حالة النظام نشطة"
            }
        }
    },
    uz: {
        translation: {
            nav: {
                dashboard: "Panel",
                analytics: "Tahlil",
                reports: "Hisobotlar"
            },
            user: {
                role: "Pro Elite",
                account: "Hisob",
                logout: "Chiqish"
            },
            login: {
                title: "Tizimga kirish",
                welcome: "Korporativ boshqaruv paneli",
                username: "Foydalanuvchi nomi",
                password: "Parol",
                submit: "Tizimga ulanish",
                error: "Foydalanuvchi nomi yoki parol noto'g'ri.",
                identity: "Shaxsni tasdiqlash",
                securityKey: "Xavfsizlik kaliti",
                rememberMe: "Eslab qolish",
                forgotPassword: "Parolni unutdingizmi?"
            },
            calendar: {
                today: "Bugun",
                searchPlaceholder: "Ma'lumot qidirish...",
                newRecord: "Yangi yozuv",
                weekdays: {
                    mon: "Du",
                    tue: "Se",
                    wed: "Ch",
                    thu: "Pa",
                    fri: "Ju",
                    sat: "Sha",
                    sun: "Ya"
                },
                filters: {
                    modules: "Modullar",
                    shared: "Umumiy oqim",
                    todayOnly: "Faqat bugun",
                    financial: "Moliya",
                    reminder: "Budilniklar",
                    note: "Eslatmalar",
                    travel: "Yo'nalishlar",
                    counter: "Trendlar"
                },
                popover: {
                    dailyDetail: "Kunlik tafsilot",
                    noRecords: "Ushbu kategoriyada yozuv yo'q.",
                    quickAdd: "Tez qo'shish",
                    untitled: "Sarlavhasiz"
                }
            },
            forms: {
                common: {
                    cancel: "Bekor qilish",
                    confirm: "Tasdiqlash",
                    save: "Saqlash",
                    category: "Kategoriya",
                    title: "Sarlavha",
                    description: "Tavsif",
                    descriptionPlaceholder: "Tafsilotlar...",
                    date: "Sana",
                    time: "Vaqt",
                    planned: "Rejalashtirilgan",
                    critical: "Muhim / Shoshilinch",
                    details: "Tafsilotlar...",
                    saving: "Saqlanmoqda...",
                    currency: {
                        try: "₺ TRY",
                        usd: "$ USD",
                        eur: "€ EUR"
                    }
                },
                financial: {
                    recordCategory: "Yozuv kategoriyasi",
                    label: "Yorliq / Sarlavha",
                    labelPlaceholder: "masalan, Market, Ijara",
                    quantity: "Miqdor",
                    unitAmount: "Birlik miqdori",
                    total: "Jami",
                    types: {
                        expense: "📉 Xarajat",
                        income: "📈 Daromad",
                        debt_given: "💸 Qarz berildi",
                        debt_received: "💰 Qarz olindi"
                    }
                },
                note: {
                    titlePlaceholder: "Sarlavha yozing...",
                    categoryPlaceholder: "masalan, Ish, Shaxsiy",
                    content: "Mazmun",
                    contentPlaceholder: "Eslatmani shu yerga yozing...",
                    addTodo: "Vazifa qo'shish...",
                    noTodos: "Vazifalar yo'q",
                    saveNote: "Eslatmani saqlash"
                },
                counter: {
                    purpose: "Hisoblagich maqsadi",
                    purposePlaceholder: "masalan, Suv (stakan)...",
                    target: "Maqsad",
                    sharedStream: "Umumiy oqim",
                    dailyTarget: "Kunlik maqsad"
                },
                reminder: {
                    eventTitle: "Tadbir sarlavhasi",
                    titlePlaceholder: "Uchrashuv, Tug'ilgan kun...",
                    type: "Turi",
                    location: "Joylashuv / Platforma",
                    locationPlaceholder: "Ofis, Zoom, Uy...",
                    setReminder: "Eslatmani o'rnatish",
                    types: {
                        normal: "📌 Oddiy",
                        appointment: "📆 Uchrashuv",
                        meeting: "🤝 Majlis",
                        work: "💼 Ish"
                    },
                    warningTime: {
                        label: "Eslatma",
                        "5min": "5 daqiqa oldin",
                        "15min": "15 daqiqa oldin",
                        "1hour": "1 soat oldin",
                        "1day": "1 kun oldin"
                    },
                    repeat: {
                        label: "Takrorlash",
                        none: "Bir marta",
                        daily: "Kunlik",
                        weekly: "Haftalik",
                        monthly: "Oylik"
                    }
                },
                travel: {
                    from: "Ketish",
                    to: "Kelish",
                    cityPlaceholder: "Shahar...",
                    distance: "Masofa (KM)",
                    routeColor: "Yo'nalish rangi",
                    companionPlaceholder: "Hamroh qo'shish...",
                    alone: "Yolg'iz sayohat",
                    plan: "Rejalashtirish"
                }
            },
            modals: {
                addModule: {
                    title: "Yangi yozuv",
                    selectDate: "Taqvimdan sana tanlang",
                    comingSoon: "Tez orada ko'proq",
                    financial: { title: "Moliya", desc: "Xarajatlar, daromadlar va qarzlar oqimi" },
                    reminder: { title: "Eslatma", desc: "Vazifalar va uchrashuvlar" },
                    note: { title: "Eslatmalar", desc: "Kunlik jurnallar va ishlar" },
                    travel: { title: "Sayohat", desc: "Yo'nalishlar va hamrohlar" },
                    counter: { title: "Hisoblagichlar", desc: "Odatlar va rivojlanish" }
                }
            },
            footer: {
                corporate: "Korporativ",
                about: "Biz haqimizda",
                solutions: "Bizning yechimlar",
                references: "Tavsiyalar",
                contact: "Aloqa",
                systemStatus: "Tizim holati",
                live: "Faol",
                currentTime: "Jonli soat",
                kvkk: "Maxfiylik siyosati",
                address: "Anqara, Turkiya (Shtab-kvartira)",
                description: "TBC Technology tarkibida ishlab chiqilgan, 'Ma'lumotlaringizni kuchga aylantiring' shiori ostida ishlaydigan yeni avlod moliyaviy ekotizimi.",
                systemStatusActive: "Tizim holati faol"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'tr',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
