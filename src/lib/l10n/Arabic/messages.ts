import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "ar",
  languageLabel: "العربية",
  brand: {
    name: "Louve",
    tagline: "ارسم حضورك.",
    colors: {
      primalRouge: "#77080E",
      auroraForest: "#063F47",
      softIvory: "#F4F1EA",
      graphiteBlack: "#1F1F1F",
      champagneGold: "#D6B97C",
    },
    collections: [
      {
        slug: "core-gold-essentials",
        title: "أساسيات الذهب",
        description: "مصممة للتنسيق والمزج والعودة إليها.",
      },
      {
        slug: "diamond-staples",
        title: "قطع الألماس الأساسية",
        description: "فخامة يومية بلمعان هادئ.",
      },
      {
        slug: "occasion-pieces",
        title: "قطع المناسبات",
        description: "قطع راقية للحظات المميزة.",
      },
      {
        slug: "signature-louve-designs",
        title: "تصاميم Louve المميزة",
        description: "رمزية أصيلة، مصقولة عالمياً.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — دار مجوهرات فاخرة معاصرة. غريزة. استقلال. إقليم. قوة هادئة.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — دار مجوهرات فاخرة معاصرة. غريزة. استقلال. إقليم. قوة هادئة.",
    brandLine: "من دار Palmonas.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "بحث", href: "/search" },
        { key: "wishlist", ariaLabel: "قائمة الأمنيات", href: "/wishlist" },
        { key: "cart", ariaLabel: "سلة التسوق", href: "/cart" },
        { key: "account", ariaLabel: "الحساب", href: "/account" },
      ],
    },
    userMenu: {
      profile: "الملف الشخصي",
      orders: "الطلبات",
      cart: "السلة",
      wishlist: "قائمة الأمنيات",
      signOut: "تسجيل الخروج",
    },
    footer: [
      {
        title: "الشركة",
        links: [
          { key: "about", label: "من نحن", href: "/about" },
          { key: "stores", label: "المتاجر", href: "/stores" },
          { key: "products", label: "المنتجات", href: "/products" },
        ],
      },
      {
        title: "الدعم",
        links: [
          { key: "contact", label: "اتصل بنا", href: "/contact" },
          { key: "shipping", label: "الشحن", href: "/shipping" },
          { key: "help", label: "المساعدة", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "الخواتم", href: "/products?category=rings" },
        { label: "الأقراط", href: "/products?category=earrings" },
        { label: "الدلايات", href: "/products?category=pendants" },
        { label: "الأساور", href: "/products?category=bracelets" },
        { label: "خواتم الخطوبة", href: "/products?category=engagement-rings" },
        { label: "الأحجار الكريمة", href: "/products?category=gemstones" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "عرض المجموعة 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "عرض المجموعة 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "عرض المجموعة 3" },
      ],
      cta: { label: "استكشف المزيد", href: "/products" },
    },
  },
  common: {
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    back: "رجوع",
    browse: "تصفح",
    notes: "ملاحظات",
    footerFromHouse: "من دار Palmonas",
    copyright: "جميع الحقوق محفوظة.",
    language: "اللغة",
    brandAlt: "Louve",
    loading: "جاري التحميل",
  },
  catalog: {
    products: "المنتجات",
    productCount: "{count} منتج",
    allBrands: "جميع العلامات",
    allTypes: "جميع الأنواع",
    sortDefault: "الافتراضي",
    sortPriceLow: "السعر: من الأقل إلى الأعلى",
    sortPriceHigh: "السعر: من الأعلى إلى الأقل",
    sortTitleAZ: "العنوان: أ–ي",
    sortTitleZA: "العنوان: ي–أ",
    sortNewest: "الأحدث أولاً",
    clearFilters: "مسح عوامل التصفية",
    noProducts: "لم يُعثر على منتجات.",
    previous: "السابق",
    next: "التالي",
    sale: "تخفيض",
    noImage: "لا توجد صورة",
    sku: "SKU",
    searchPlaceholder: "خواتم ذهب، Mejuri، قلادات…",
    searchButton: "بحث",
    searchTitle: "بحث",
    searchSubtitle: "ابحث عن المجوهرات بالاسم أو العلامة أو الفئة.",
    searchResultsFor: "نتائج عن",
    searchResults: "{count} نتيجة",
    searchAgain: "ابحث مجدداً…",
    relevance: "الصلة",
    searching: "جاري البحث…",
    productNotFound: "المنتج غير موجود.",
    similarProducts: "قد يعجبك أيضاً",
  },
  errors: {
    errorTitle: "حدث خطأ ما",
    errorBody:
      "واجهنا مشكلة أثناء تحميل هذه الصفحة من Louve. يرجى المحاولة مرة أخرى. إذا استمرت المشكلة، عد لاحقاً.",
    tryAgain: "حاول مرة أخرى",
    goHome: "الذهاب إلى الرئيسية",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody:
      "الصفحة التي تبحث عنها غير موجودة. لنعيدك إلى Louve.",
    globalTitle: "واجهنا مشكلة",
    globalBody:
      "واجهت Louve مشكلة غير متوقعة. يرجى تحديث الصفحة. إذا استمر الأمر، حاول لاحقاً.",
    retry: "إعادة المحاولة",
    brandLine: "Louve · من دار Palmonas",
  },
  pages: {
    home: {
      metaTitle: "Louve — من دار Palmonas.",
      metaDescription:
        "Louve — دار مجوهرات فاخرة معاصرة. غريزة. استقلال. إقليم. قوة هادئة.",
      comingSoonTitle: "قريباً",
      comingSoonBody: "الموقع قيد الإعداد — عد قريباً.",
      heading: "قريباً",
      subheading: "الموقع قيد الإعداد — عد قريباً.",
    },
    about: {
      metaTitle: "من نحن — Louve",
      metaDescription:
        "يأتي اسم Louve من الكلمة الفرنسية للذئبة — غريزة، استقلال، حماية، وقيادة هادئة.",
      comingSoonTitle: "من نحن",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    collections: {
      metaTitle: "المجموعات — Louve",
      metaDescription: "استكشف مجموعات Louve — قريباً.",
      comingSoonTitle: "المجموعات",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    products: {
      metaTitle: "المنتجات — Louve",
      metaDescription: "تصفح مجموعتنا المختارة من المجوهرات المعاصرة.",
      comingSoonTitle: "المنتجات",
      comingSoonBody: "تصفح مجموعتنا المختارة من المجوهرات المعاصرة.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "استكشف هذه القطعة من مجموعة Louve.",
      comingSoonTitle: "المنتج",
      comingSoonBody: "استكشف هذه القطعة من مجموعة Louve.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "معرّف المنتج",
    },
    search: {
      metaTitle: "بحث — Louve",
      metaDescription: "ابحث في مجموعة المجوهرات بالاسم أو العلامة أو الأسلوب.",
      comingSoonTitle: "بحث",
      comingSoonBody: "ابحث في مجموعة المجوهرات.",
    },
    searchResults: {
      metaTitle: "بحث — Louve",
      metaDescription: "نتائج البحث من مجموعة Louve.",
      comingSoonTitle: "نتائج البحث",
      comingSoonBody: "نتائج البحث من مجموعة Louve.",
      metaTitleTemplate: "{query} — Search — {siteName}",
      queryLabel: "الاستعلام",
    },
    contact: {
      metaTitle: "اتصل بنا — Louve",
      metaDescription: "تواصل مع Louve — قريباً.",
      comingSoonTitle: "اتصل بنا",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    stores: {
      metaTitle: "المتاجر — Louve",
      metaDescription: "متاجر Louve — قريباً.",
      comingSoonTitle: "المتاجر",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    help: {
      metaTitle: "المساعدة — Louve",
      metaDescription: "مركز المساعدة — قريباً.",
      comingSoonTitle: "المساعدة",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    shipping: {
      metaTitle: "الشحن — Louve",
      metaDescription: "معلومات الشحن — قريباً.",
      comingSoonTitle: "الشحن",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    authLogin: {
      metaTitle: "تسجيل الدخول — Louve",
      metaDescription: "سجّل الدخول إلى حساب Louve — قريباً.",
      comingSoonTitle: "تسجيل الدخول",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    authSignup: {
      metaTitle: "إنشاء حساب — Louve",
      metaDescription: "أنشئ حساب Louve — قريباً.",
      comingSoonTitle: "إنشاء حساب",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    authForgotPassword: {
      metaTitle: "نسيت كلمة المرور — Louve",
      metaDescription: "أعد تعيين كلمة مرور Louve.",
      comingSoonTitle: "نسيت كلمة المرور",
      comingSoonBody: "أدخل بريدك الإلكتروني وسنرسل رابط إعادة التعيين.",
    },
    authResetPassword: {
      metaTitle: "إعادة تعيين كلمة المرور — Louve",
      metaDescription: "اختر كلمة مرور جديدة لحساب Louve.",
      comingSoonTitle: "إعادة تعيين كلمة المرور",
      comingSoonBody: "عيّن كلمة مرور جديدة لحسابك.",
    },
    account: {
      metaTitle: "الحساب — Louve",
      metaDescription: "حساب Louve — قريباً.",
      comingSoonTitle: "الحساب",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    cart: {
      metaTitle: "سلة التسوق — Louve",
      metaDescription: "سلة التسوق — قريباً.",
      comingSoonTitle: "سلة التسوق",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    wishlist: {
      metaTitle: "قائمة الأمنيات — Louve",
      metaDescription: "قائمة أمنياتك — قريباً.",
      comingSoonTitle: "قائمة الأمنيات",
      comingSoonBody:
        "هذه الميزة قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
    orders: {
      metaTitle: "الطلبات — Louve",
      metaDescription: "سجل طلباتك — قريباً.",
      comingSoonTitle: "الطلبات",
      comingSoonBody:
        "سجل الطلبات قريباً. الموقع قيد الإعداد — عد قريباً.",
    },
  },
  homeFeature: {
    heroDescription:
      "غريزة. استقلال. إقليم. قوة هادئة — مجوهرات فاخرة معاصرة تُختار وتُرتدى بقصد.",
    shopCollections: "تسوق المجموعات",
    exploreBrand: "استكشف العلامة",
    instinctTitle: "الغريزة",
    instinctBody: "مجوهرات تُختار بثقة.",
    independenceTitle: "الاستقلال",
    independenceBody: "فخامة يمتلكها من يرتديها.",
    territoryTitle: "الإقليم",
    territoryBody: "قطع تُميّز الهوية.",
    quietPowerTitle: "القوة الهادئة",
    quietPowerBody: "قوة تُعبَّر عنها بالأناقة.",
    collectionsHeading: "المجموعات",
    collectionsSubtitle: "كل مجموعة لها طابعها، وتتناغم معاً بشكل أفضل.",
    fineJewelleryBadge: "مجوهرات فاخرة",
    slugLabel: "المسار",
    ctaSubtitle:
      "المجوهرات توقيع شخصي — تُختار وتُمتلك وتُرتدى بقصد.",
    browseNew: "تصفح الجديد",
    visitStores: "زيارة المتاجر",
    entryLuxury: "فخامة المدخل",
    coreRange: "النطاق الأساسي",
    elevatedPieces: "قطع راقية",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
