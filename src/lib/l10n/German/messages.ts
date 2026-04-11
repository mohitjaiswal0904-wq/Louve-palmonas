import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "de",
  languageLabel: "Deutsch",
  brand: {
    name: "Louve",
    tagline: "Zeige deine Präsenz.",
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
        title: "Gold-Essentials",
        description: "Zum Schichten, Mixen und immer wieder Tragen.",
      },
      {
        slug: "diamond-staples",
        title: "Diamant-Klassiker",
        description: "Alltagsluxus mit dezenter Brillanz.",
      },
      {
        slug: "occasion-pieces",
        title: "Anlassstücke",
        description: "Besondere Stücke für besondere Momente.",
      },
      {
        slug: "signature-louve-designs",
        title: "Signature Louve Designs",
        description: "Ursprüngliche Symbolik, weltweit verfeinert.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — ein zeitgenössisches Feinschmuckhaus. Instinkt. Unabhängigkeit. Territorium. Leise Stärke.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — ein zeitgenössisches Feinschmuckhaus. Instinkt. Unabhängigkeit. Territorium. Leise Stärke.",
    brandLine: "Aus dem Haus Palmonas.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "Suche", href: "/search" },
        { key: "wishlist", ariaLabel: "Wunschliste", href: "/wishlist" },
        { key: "cart", ariaLabel: "Warenkorb", href: "/cart" },
        { key: "account", ariaLabel: "Konto", href: "/account" },
      ],
    },
    userMenu: {
      profile: "Profil",
      orders: "Bestellungen",
      cart: "Warenkorb",
      wishlist: "Wunschliste",
      signOut: "Abmelden",
    },
    footer: [
      {
        title: "Unternehmen",
        links: [
          { key: "about", label: "Über uns", href: "/about" },
          { key: "stores", label: "Stores", href: "/stores" },
          { key: "products", label: "Produkte", href: "/products" },
        ],
      },
      {
        title: "Support",
        links: [
          { key: "contact", label: "Kontakt", href: "/contact" },
          { key: "shipping", label: "Versand", href: "/shipping" },
          { key: "help", label: "Hilfe", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "Ringe", href: "/products?category=rings" },
        { label: "Ohrringe", href: "/products?category=earrings" },
        { label: "Anhänger", href: "/products?category=pendants" },
        { label: "Armbänder", href: "/products?category=bracelets" },
        { label: "Verlobungsringe", href: "/products?category=engagement-rings" },
        { label: "Edelsteine", href: "/products?category=gemstones" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "Kollektionsansicht 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "Kollektionsansicht 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "Kollektionsansicht 3" },
      ],
      cta: { label: "Mehr entdecken", href: "/products" },
    },
  },
  common: {
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    back: "Zurück",
    browse: "Entdecken",
    notes: "Hinweise",
    footerFromHouse: "Aus dem Haus Palmonas",
    copyright: "Alle Rechte vorbehalten.",
    language: "Sprache",
    brandAlt: "Louve",
    loading: "Wird geladen",
  },
  catalog: {
    products: "Produkte",
    productCount: "{count} Produkte",
    allBrands: "Alle Marken",
    allTypes: "Alle Typen",
    sortDefault: "Standard",
    sortPriceLow: "Preis: aufsteigend",
    sortPriceHigh: "Preis: absteigend",
    sortTitleAZ: "Titel: A–Z",
    sortTitleZA: "Titel: Z–A",
    sortNewest: "Neueste zuerst",
    clearFilters: "Filter zurücksetzen",
    noProducts: "Keine Produkte gefunden.",
    previous: "Zurück",
    next: "Weiter",
    sale: "SALE",
    noImage: "Kein Bild",
    sku: "SKU",
    searchPlaceholder: "Goldringe, Mejuri, Halsketten …",
    searchButton: "Suchen",
    searchTitle: "Suche",
    searchSubtitle: "Schmuck nach Name, Marke oder Kategorie finden.",
    searchResultsFor: "Ergebnisse für",
    searchResults: "{count} Ergebnisse",
    searchAgain: "Erneut suchen …",
    relevance: "Relevanz",
    searching: "Suche läuft …",
    productNotFound: "Produkt nicht gefunden.",
    similarProducts: "Das könnte Ihnen auch gefallen",
  },
  errors: {
    errorTitle: "Etwas ist schiefgelaufen",
    errorBody:
      "Beim Laden dieser Louve-Seite ist ein Problem aufgetreten. Bitte versuchen Sie es erneut. Sollte das Problem weiterhin bestehen, kommen Sie später wieder.",
    tryAgain: "Erneut versuchen",
    goHome: "Zur Startseite",
    notFoundTitle: "Seite nicht gefunden",
    notFoundBody:
      "Die gesuchte Seite existiert nicht. Wir bringen Sie zurück zu Louve.",
    globalTitle: "Ein Problem ist aufgetreten",
    globalBody:
      "Louve ist auf ein unerwartetes Problem gestoßen. Bitte laden Sie die Seite neu. Wenn es weiterhin auftritt, versuchen Sie es später erneut.",
    retry: "Wiederholen",
    brandLine: "Louve · aus dem Haus Palmonas",
  },
  pages: {
    home: {
      metaTitle: "Louve — Aus dem Haus Palmonas.",
      metaDescription:
        "Louve — ein zeitgenössisches Feinschmuckhaus. Instinkt. Unabhängigkeit. Territorium. Leise Stärke.",
      comingSoonTitle: "Demnächst",
      comingSoonBody: "Diese Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
      heading: "Demnächst",
      subheading: "Diese Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    about: {
      metaTitle: "Über uns — Louve",
      metaDescription:
        "Louve leitet sich vom französischen Wort für Wölfin ab — Instinkt, Unabhängigkeit, Schutz und leise Führung.",
      comingSoonTitle: "Über uns",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    collections: {
      metaTitle: "Kollektionen — Louve",
      metaDescription: "Entdecken Sie die Louve-Kollektionen — demnächst.",
      comingSoonTitle: "Kollektionen",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    products: {
      metaTitle: "Produkte — Louve",
      metaDescription: "Stöbern Sie in unserer kuratierten Auswahl zeitgenössischen Schmucks.",
      comingSoonTitle: "Produkte",
      comingSoonBody: "Stöbern Sie in unserer kuratierten Auswahl zeitgenössischen Schmucks.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Entdecken Sie dieses Stück aus der Louve-Kollektion.",
      comingSoonTitle: "Produkt",
      comingSoonBody: "Entdecken Sie dieses Stück aus der Louve-Kollektion.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "Produkt-ID",
    },
    search: {
      metaTitle: "Suche — Louve",
      metaDescription: "Durchsuchen Sie unsere Schmuckkollektion nach Name, Marke oder Stil.",
      comingSoonTitle: "Suche",
      comingSoonBody: "Durchsuchen Sie unsere Schmuckkollektion.",
    },
    searchResults: {
      metaTitle: "Suche — Louve",
      metaDescription: "Suchergebnisse aus der Louve-Kollektion.",
      comingSoonTitle: "Suchergebnisse",
      comingSoonBody: "Suchergebnisse aus der Louve-Kollektion.",
      metaTitleTemplate: "{query} — Suche — {siteName}",
      queryLabel: "Suchanfrage",
    },
    contact: {
      metaTitle: "Kontakt — Louve",
      metaDescription: "Kontaktieren Sie Louve — demnächst.",
      comingSoonTitle: "Kontakt",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    stores: {
      metaTitle: "Stores — Louve",
      metaDescription: "Louve Stores — demnächst.",
      comingSoonTitle: "Stores",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    help: {
      metaTitle: "Hilfe — Louve",
      metaDescription: "Hilfecenter — demnächst.",
      comingSoonTitle: "Hilfe",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    shipping: {
      metaTitle: "Versand — Louve",
      metaDescription: "Versandinformationen — demnächst.",
      comingSoonTitle: "Versand",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    authLogin: {
      metaTitle: "Anmelden — Louve",
      metaDescription: "Melden Sie sich bei Ihrem Louve-Konto an — demnächst.",
      comingSoonTitle: "Anmelden",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    authSignup: {
      metaTitle: "Konto erstellen — Louve",
      metaDescription: "Erstellen Sie Ihr Louve-Konto — demnächst.",
      comingSoonTitle: "Konto erstellen",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    authForgotPassword: {
      metaTitle: "Passwort vergessen — Louve",
      metaDescription: "Setzen Sie Ihr Louve-Passwort zurück.",
      comingSoonTitle: "Passwort vergessen",
      comingSoonBody: "Geben Sie Ihre E-Mail-Adresse ein, und wir senden Ihnen einen Link zum Zurücksetzen.",
    },
    authResetPassword: {
      metaTitle: "Passwort zurücksetzen — Louve",
      metaDescription: "Wählen Sie ein neues Passwort für Ihr Louve-Konto.",
      comingSoonTitle: "Passwort zurücksetzen",
      comingSoonBody: "Legen Sie ein neues Passwort für Ihr Konto fest.",
    },
    account: {
      metaTitle: "Konto — Louve",
      metaDescription: "Ihr Louve-Konto — demnächst.",
      comingSoonTitle: "Konto",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    cart: {
      metaTitle: "Warenkorb — Louve",
      metaDescription: "Ihr Warenkorb — demnächst.",
      comingSoonTitle: "Warenkorb",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    wishlist: {
      metaTitle: "Wunschliste — Louve",
      metaDescription: "Ihre Wunschliste — demnächst.",
      comingSoonTitle: "Wunschliste",
      comingSoonBody:
        "Diese Funktion kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
    orders: {
      metaTitle: "Bestellungen — Louve",
      metaDescription: "Ihre Bestellhistorie — demnächst.",
      comingSoonTitle: "Bestellungen",
      comingSoonBody:
        "Die Bestellhistorie kommt bald. Die Website wird gerade gestaltet — schauen Sie bald wieder vorbei.",
    },
  },
  homeFeature: {
    heroDescription:
      "Instinkt. Unabhängigkeit. Territorium. Leise Stärke — zeitgenössischer Feinschmuck, mit Absicht ausgewählt und getragen.",
    shopCollections: "Kollektionen shoppen",
    exploreBrand: "Die Marke entdecken",
    instinctTitle: "Instinkt",
    instinctBody: "Schmuck, der mit Selbstvertrauen gewählt wird.",
    independenceTitle: "Unabhängigkeit",
    independenceBody: "Luxus, der der Trägerin gehört.",
    territoryTitle: "Territorium",
    territoryBody: "Stücke, die Identität prägen.",
    quietPowerTitle: "Leise Stärke",
    quietPowerBody: "Stärke, ausgedrückt durch Eleganz.",
    collectionsHeading: "Kollektionen",
    collectionsSubtitle: "Jede Kollektion steht für sich und harmoniert mit den anderen.",
    fineJewelleryBadge: "Feinschmuck",
    slugLabel: "Slug",
    ctaSubtitle:
      "Schmuck ist eine persönliche Signatur — gewählt, besessen und mit Absicht getragen.",
    browseNew: "Neu entdecken",
    visitStores: "Stores besuchen",
    entryLuxury: "Einstiegsluxus",
    coreRange: "Kernsortiment",
    elevatedPieces: "Besondere Stücke",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
