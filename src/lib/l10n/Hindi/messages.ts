import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "hi",
  languageLabel: "हिन्दी",
  brand: {
    name: "Louve",
    tagline: "अपनी उपस्थिति दर्ज करें।",
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
        title: "कोर गोल्ड एसेंशियल्स",
        description: "लेयर, मिक्स और दोबारा लौटने के लिए बनाया गया।",
      },
      {
        slug: "diamond-staples",
        title: "डायमंड स्टेपल्स",
        description: "शांत चमक के साथ रोज़ाना की लक्ज़री।",
      },
      {
        slug: "occasion-pieces",
        title: "ऑकेज़न पीसेज़",
        description: "खास पलों के लिए उन्नत डिज़ाइन।",
      },
      {
        slug: "signature-louve-designs",
        title: "सिग्नेचर लूव डिज़ाइन्स",
        description: "मूल प्रतीकवाद, वैश्विक स्तर पर परिष्कृत।",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — एक समकालीन फाइन ज्वेलरी हाउस। अंतर्ज्ञान। स्वतंत्रता। क्षेत्र। शांत शक्ति।",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — एक समकालीन फाइन ज्वेलरी हाउस। अंतर्ज्ञान। स्वतंत्रता। क्षेत्र। शांत शक्ति।",
    brandLine: "Palmonas के घर से।",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "खोजें", href: "/search" },
        { key: "wishlist", ariaLabel: "इच्छा-सूची", href: "/wishlist" },
        { key: "cart", ariaLabel: "कार्ट", href: "/cart" },
        { key: "account", ariaLabel: "खाता", href: "/account" },
      ],
    },
    userMenu: {
      profile: "प्रोफ़ाइल",
      orders: "ऑर्डर",
      cart: "कार्ट",
      wishlist: "इच्छा-सूची",
      signOut: "साइन आउट",
    },
    footer: [
      {
        title: "कंपनी",
        links: [
          { key: "about", label: "हमारे बारे में", href: "/about" },
          { key: "collections", label: "कलेक्शन", href: "/collections" },
          { key: "products", label: "उत्पाद", href: "/products" },
        ],
      },
      {
        title: "सहायता",
        links: [
          { key: "contact", label: "संपर्क", href: "/contact" },
          { key: "shipping", label: "शिपिंग", href: "/shipping" },
          { key: "help", label: "मदद", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "अंगूठियाँ", href: "/collections/rings" },
        { label: "बालियाँ", href: "/collections/earrings" },
        { label: "पेंडेंट", href: "/collections/pendants" },
        { label: "ब्रेसलेट", href: "/collections/bracelets" },
        { label: "हार", href: "/collections/necklaces" },
        { label: "सभी कलेक्शन", href: "/collections/all" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "कलेक्शन दृश्य 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "कलेक्शन दृश्य 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "कलेक्शन दृश्य 3" },
      ],
      cta: { label: "एक्सप्लोर करें", href: "/products" },
    },
  },
  common: {
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    back: "वापस",
    browse: "ब्राउज़ करें",
    notes: "नोट्स",
    footerFromHouse: "Palmonas के घर से",
    copyright: "सर्वाधिकार सुरक्षित।",
    language: "भाषा",
    brandAlt: "Louve",
    loading: "लोड हो रहा है",
    popularSearchesHeading: "लोकप्रिय खोज",
  },
  catalog: {
    products: "उत्पाद",
    productCount: "{count} उत्पाद",
    allBrands: "सभी ब्रांड",
    allTypes: "सभी प्रकार",
    sortDefault: "डिफ़ॉल्ट",
    sortPriceLow: "कीमत: कम से अधिक",
    sortPriceHigh: "कीमत: अधिक से कम",
    sortTitleAZ: "शीर्षक: A–Z",
    sortTitleZA: "शीर्षक: Z–A",
    sortNewest: "नवीनतम पहले",
    clearFilters: "फ़िल्टर साफ़ करें",
    noProducts: "कोई उत्पाद नहीं मिला।",
    previous: "पिछला",
    next: "अगला",
    sale: "सेल",
    noImage: "कोई छवि नहीं",
    sku: "SKU",
    searchPlaceholder: "गोल्ड रिंग, Mejuri, नेकलेस…",
    searchButton: "खोजें",
    searchTitle: "खोजें",
    searchSubtitle: "नाम, ब्रांड या श्रेणी से आभूषण खोजें।",
    searchResultsFor: "के लिए परिणाम",
    searchResults: "{count} परिणाम",
    searchAgain: "फिर से खोजें…",
    relevance: "प्रासंगिकता",
    searching: "खोज रहे हैं…",
    productNotFound: "उत्पाद नहीं मिला।",
    similarProducts: "आपको यह भी पसंद आ सकता है",
    addToCart: "कार्ट में जोड़ें",
    addingToCart: "जोड़ा जा रहा है…",
    buyNow: "अभी खरीदें",
    signInToAddToCart: "कार्ट में जोड़ने के लिए साइन इन करें",
    variantUnavailable: "यह विकल्प उपलब्ध नहीं है।",
  },
  errors: {
    errorTitle: "कुछ गलत हो गया",
    errorBody:
      "इस Louve पृष्ठ को लोड करते समय समस्या आई। कृपया पुनः प्रयास करें। यदि समस्या बनी रहती है, कुछ समय बाद फिर आएँ।",
    tryAgain: "पुनः प्रयास करें",
    goHome: "होम पर जाएँ",
    notFoundTitle: "पृष्ठ नहीं मिला",
    notFoundBody:
      "आप जो पृष्ठ खोज रहे हैं वह मौजूद नहीं है। आइए आपको Louve पर वापस ले चलें।",
    globalTitle: "हमें एक समस्या आई",
    globalBody:
      "Louve में अप्रत्याशित समस्या आई। कृपया पृष्ठ रीफ़्रेश करें। यदि बनी रहती है, बाद में पुनः प्रयास करें।",
    retry: "फिर कोशिश करें",
    brandLine: "Louve · Palmonas के घर से",
  },
  pages: {
    home: {
      metaTitle: "Louve — Palmonas के घर से।",
      metaDescription:
        "Louve — एक समकालीन फाइन ज्वेलरी हाउस। अंतर्ज्ञान। स्वतंत्रता। क्षेत्र। शांत शक्ति।",
      comingSoonTitle: "जल्द आ रहा है",
      comingSoonBody: "यह वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
      heading: "जल्द आ रहा है",
      subheading: "यह वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    about: {
      metaTitle: "हमारे बारे में — Louve",
      metaDescription:
        "Louve फ्रेंच शब्द मादा भेड़िया से आता है — अंतर्ज्ञान, स्वतंत्रता, सुरक्षा और शांत नेतृत्व।",
      comingSoonTitle: "हमारे बारे में",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    collections: {
      metaTitle: "कलेक्शन्स — Louve",
      metaDescription: "Louve कलेक्शन्स देखें — जल्द आ रहा है।",
      comingSoonTitle: "कलेक्शन्स",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    products: {
      metaTitle: "उत्पाद — Louve",
      metaDescription: "Louve उत्पाद — जल्द आ रहा है।",
      comingSoonTitle: "उत्पाद",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "उत्पाद पृष्ठ — जल्द आ रहा है।",
      comingSoonTitle: "उत्पाद",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "उत्पाद आईडी",
    },
    search: {
      metaTitle: "खोज — Louve",
      metaDescription: "खोज — जल्द आ रहा है।",
      comingSoonTitle: "खोज",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    searchResults: {
      metaTitle: "खोज — Louve",
      metaDescription: "खोज परिणाम — जल्द आ रहा है।",
      comingSoonTitle: "खोज",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
      metaTitleTemplate: "{query} — खोज — {siteName}",
      queryLabel: "क्वेरी",
    },
    contact: {
      metaTitle: "संपर्क — Louve",
      metaDescription: "Louve से संपर्क — जल्द आ रहा है।",
      comingSoonTitle: "संपर्क",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    stores: {
      metaTitle: "स्टोर — Louve",
      metaDescription: "Louve स्टोर — जल्द आ रहा है।",
      comingSoonTitle: "स्टोर",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    help: {
      metaTitle: "मदद — Louve",
      metaDescription: "सहायता केंद्र — जल्द आ रहा है।",
      comingSoonTitle: "मदद",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    shipping: {
      metaTitle: "शिपिंग — Louve",
      metaDescription: "शिपिंग जानकारी — जल्द आ रहा है।",
      comingSoonTitle: "शिपिंग",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    authLogin: {
      metaTitle: "साइन इन — Louve",
      metaDescription: "अपने Louve खाते में साइन इन — जल्द आ रहा है।",
      comingSoonTitle: "साइन इन",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    authSignup: {
      metaTitle: "खाता बनाएँ — Louve",
      metaDescription: "अपना Louve खाता बनाएँ — जल्द आ रहा है।",
      comingSoonTitle: "खाता बनाएँ",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    authForgotPassword: {
      metaTitle: "पासवर्ड भूल गए — Louve",
      metaDescription: "अपना Louve पासवर्ड रीसेट करें।",
      comingSoonTitle: "पासवर्ड भूल गए",
      comingSoonBody: "अपना ईमेल दर्ज करें और हम आपको रीसेट लिंक भेजेंगे।",
    },
    authResetPassword: {
      metaTitle: "पासवर्ड रीसेट करें — Louve",
      metaDescription: "अपने Louve खाते के लिए नया पासवर्ड चुनें।",
      comingSoonTitle: "पासवर्ड रीसेट करें",
      comingSoonBody: "अपने खाते के लिए नया पासवर्ड सेट करें।",
    },
    account: {
      metaTitle: "खाता — Louve",
      metaDescription: "आपका Louve खाता — जल्द आ रहा है।",
      comingSoonTitle: "खाता",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    cart: {
      metaTitle: "कार्ट — Louve",
      metaDescription: "आपकी शॉपिंग कार्ट — जल्द आ रहा है।",
      comingSoonTitle: "कार्ट",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    wishlist: {
      metaTitle: "इच्छा-सूची — Louve",
      metaDescription: "आपकी इच्छा-सूची — जल्द आ रहा है।",
      comingSoonTitle: "इच्छा-सूची",
      comingSoonBody:
        "यह सुविधा जल्द आ रही है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
    orders: {
      metaTitle: "ऑर्डर — Louve",
      metaDescription: "आपका ऑर्डर इतिहास — जल्द आ रहा है।",
      comingSoonTitle: "ऑर्डर",
      comingSoonBody:
        "ऑर्डर इतिहास जल्द आ रहा है। वेबसाइट तैयार की जा रही है — जल्द फिर देखें।",
    },
  },
  homeFeature: {
    heroDescription:
      "अंतर्ज्ञान। स्वतंत्रता। क्षेत्र। शांत शक्ति — समकालीन फाइन ज्वेलरी, जो जानबूझकर चुनी और पहनी जाती है।",
    shopCollections: "कलेक्शन्स देखें",
    exploreBrand: "ब्रांड एक्सप्लोर करें",
    instinctTitle: "अंतर्ज्ञान",
    instinctBody: "आत्मविश्वास से चुनी गई ज्वेलरी।",
    independenceTitle: "स्वतंत्रता",
    independenceBody: "पहनने वाले के स्वामित्व में लक्ज़री।",
    territoryTitle: "क्षेत्र",
    territoryBody: "पहचान बनाने वाले टुकड़े।",
    quietPowerTitle: "शांत शक्ति",
    quietPowerBody: "सुरुचि के माध्यम से व्यक्त शक्ति।",
    collectionsHeading: "कलेक्शन्स",
    collectionsSubtitle: "हर कलेक्शन अपने आप में है, और एक साथ और भी बेहतर।",
    fineJewelleryBadge: "फाइन ज्वेलरी",
    slugLabel: "स्लग",
    ctaSubtitle:
      "ज्वेलरी एक व्यक्तिगत दस्तखत है — चुनी, स्वामित्व की और जानबूझकर पहनी गई।",
    browseNew: "नया ब्राउज़ करें",
    visitStores: "स्टोर देखें",
    entryLuxury: "एंट्री लक्ज़री",
    coreRange: "कोर रेंज",
    elevatedPieces: "उन्नत टुकड़े",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
