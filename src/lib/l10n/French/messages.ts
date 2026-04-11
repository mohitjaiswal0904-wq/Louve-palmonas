import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "fr",
  languageLabel: "Français",
  brand: {
    name: "Louve",
    tagline: "Marquez votre présence.",
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
        title: "Essentiels or cœur",
        description: "Conçu pour se superposer, se mélanger et se redécouvrir.",
      },
      {
        slug: "diamond-staples",
        title: "Incontournables diamant",
        description: "Luxe quotidien à l’éclat discret.",
      },
      {
        slug: "occasion-pieces",
        title: "Pièces d’occasion",
        description: "Des pièces raffinées pour les moments qui comptent.",
      },
      {
        slug: "signature-louve-designs",
        title: "Créations signature Louve",
        description: "Symbolisme primal, raffiné à l’échelle mondiale.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — une maison de joaillerie fine contemporaine. Instinct. Indépendance. Territoire. Pouvoir silencieux.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — une maison de joaillerie fine contemporaine. Instinct. Indépendance. Territoire. Pouvoir silencieux.",
    brandLine: "De la maison Palmonas.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "Recherche", href: "/search" },
        { key: "wishlist", ariaLabel: "Liste de souhaits", href: "/wishlist" },
        { key: "cart", ariaLabel: "Panier", href: "/cart" },
        { key: "account", ariaLabel: "Compte", href: "/account" },
      ],
    },
    userMenu: {
      profile: "Profil",
      orders: "Commandes",
      cart: "Panier",
      wishlist: "Liste de souhaits",
      signOut: "Déconnexion",
    },
    footer: [
      {
        title: "Entreprise",
        links: [
          { key: "about", label: "À propos", href: "/about" },
          { key: "stores", label: "Boutiques", href: "/stores" },
          { key: "products", label: "Produits", href: "/products" },
        ],
      },
      {
        title: "Support",
        links: [
          { key: "contact", label: "Contact", href: "/contact" },
          { key: "shipping", label: "Livraison", href: "/shipping" },
          { key: "help", label: "Aide", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "Bagues", href: "/products?category=rings" },
        { label: "Boucles d'oreilles", href: "/products?category=earrings" },
        { label: "Pendentifs", href: "/products?category=pendants" },
        { label: "Bracelets", href: "/products?category=bracelets" },
        { label: "Bagues de fiançailles", href: "/products?category=engagement-rings" },
        { label: "Pierres précieuses", href: "/products?category=gemstones" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "Vue de collection 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "Vue de collection 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "Vue de collection 3" },
      ],
      cta: { label: "Explorer plus", href: "/products" },
    },
  },
  common: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    back: "Retour",
    browse: "Parcourir",
    notes: "Notes",
    footerFromHouse: "De la maison Palmonas",
    copyright: "Tous droits réservés.",
    language: "Langue",
    brandAlt: "Louve",
    loading: "Chargement",
  },
  catalog: {
    products: "Produits",
    productCount: "{count} produits",
    allBrands: "Toutes les marques",
    allTypes: "Tous les types",
    sortDefault: "Par défaut",
    sortPriceLow: "Prix : croissant",
    sortPriceHigh: "Prix : décroissant",
    sortTitleAZ: "Titre : A–Z",
    sortTitleZA: "Titre : Z–A",
    sortNewest: "Plus récents",
    clearFilters: "Effacer les filtres",
    noProducts: "Aucun produit trouvé.",
    previous: "Précédent",
    next: "Suivant",
    sale: "PROMO",
    noImage: "Pas d'image",
    sku: "SKU",
    searchPlaceholder: "Bagues en or, Mejuri, Colliers…",
    searchButton: "Rechercher",
    searchTitle: "Rechercher",
    searchSubtitle: "Trouvez des bijoux par nom, marque ou catégorie.",
    searchResultsFor: "Résultats pour",
    searchResults: "{count} résultats",
    searchAgain: "Rechercher à nouveau…",
    relevance: "Pertinence",
    searching: "Recherche…",
    productNotFound: "Produit introuvable.",
    similarProducts: "Vous aimerez aussi",
  },
  errors: {
    errorTitle: "Une erreur s’est produite",
    errorBody:
      "Un problème est survenu lors du chargement de cette page Louve. Veuillez réessayer. Si cela continue, revenez un peu plus tard.",
    tryAgain: "Réessayer",
    goHome: "Accueil",
    notFoundTitle: "Page introuvable",
    notFoundBody:
      "La page que vous cherchez n’existe pas. Revenons sur Louve.",
    globalTitle: "Un problème est survenu",
    globalBody:
      "Louve a rencontré un problème inattendu. Actualisez la page. Si cela persiste, réessayez plus tard.",
    retry: "Réessayer",
    brandLine: "Louve · de la maison Palmonas",
  },
  pages: {
    home: {
      metaTitle: "Louve — De la maison Palmonas.",
      metaDescription:
        "Louve — une maison de joaillerie fine contemporaine. Instinct. Indépendance. Territoire. Pouvoir silencieux.",
      comingSoonTitle: "Bientôt disponible",
      comingSoonBody: "Ce site est en cours de création — revenez bientôt.",
      heading: "Bientôt disponible",
      subheading: "Ce site est en cours de création — revenez bientôt.",
    },
    about: {
      metaTitle: "À propos — Louve",
      metaDescription:
        "Louve vient du mot français pour louve — instinct, indépendance, protection et leadership discret.",
      comingSoonTitle: "À propos",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    collections: {
      metaTitle: "Collections — Louve",
      metaDescription: "Découvrez les collections Louve — bientôt.",
      comingSoonTitle: "Collections",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    products: {
      metaTitle: "Produits — Louve",
      metaDescription: "Achetez les produits Louve — bientôt.",
      comingSoonTitle: "Produits",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Page produit — bientôt.",
      comingSoonTitle: "Produit",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "Référence produit",
    },
    search: {
      metaTitle: "Recherche — Louve",
      metaDescription: "Recherche — bientôt.",
      comingSoonTitle: "Recherche",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    searchResults: {
      metaTitle: "Recherche — Louve",
      metaDescription: "Résultats de recherche — bientôt.",
      comingSoonTitle: "Recherche",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
      metaTitleTemplate: "{query} — Recherche — {siteName}",
      queryLabel: "Requête",
    },
    contact: {
      metaTitle: "Contact — Louve",
      metaDescription: "Contactez Louve — bientôt.",
      comingSoonTitle: "Contact",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    stores: {
      metaTitle: "Boutiques — Louve",
      metaDescription: "Boutiques Louve — bientôt.",
      comingSoonTitle: "Boutiques",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    help: {
      metaTitle: "Aide — Louve",
      metaDescription: "Centre d’aide — bientôt.",
      comingSoonTitle: "Aide",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    shipping: {
      metaTitle: "Livraison — Louve",
      metaDescription: "Informations de livraison — bientôt.",
      comingSoonTitle: "Livraison",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    authLogin: {
      metaTitle: "Connexion — Louve",
      metaDescription: "Connectez-vous à votre compte Louve — bientôt.",
      comingSoonTitle: "Connexion",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    authSignup: {
      metaTitle: "Créer un compte — Louve",
      metaDescription: "Créez votre compte Louve — bientôt.",
      comingSoonTitle: "Créer un compte",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    authForgotPassword: {
      metaTitle: "Mot de passe oublié — Louve",
      metaDescription: "Réinitialisez votre mot de passe Louve.",
      comingSoonTitle: "Mot de passe oublié",
      comingSoonBody: "Entrez votre email et nous vous enverrons un lien de réinitialisation.",
    },
    authResetPassword: {
      metaTitle: "Réinitialiser le mot de passe — Louve",
      metaDescription: "Choisissez un nouveau mot de passe pour votre compte Louve.",
      comingSoonTitle: "Réinitialiser le mot de passe",
      comingSoonBody: "Définissez un nouveau mot de passe pour votre compte.",
    },
    account: {
      metaTitle: "Compte — Louve",
      metaDescription: "Votre compte Louve — bientôt.",
      comingSoonTitle: "Compte",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    cart: {
      metaTitle: "Panier — Louve",
      metaDescription: "Votre panier — bientôt.",
      comingSoonTitle: "Panier",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    wishlist: {
      metaTitle: "Liste de souhaits — Louve",
      metaDescription: "Votre liste de souhaits — bientôt.",
      comingSoonTitle: "Liste de souhaits",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
    orders: {
      metaTitle: "Commandes — Louve",
      metaDescription: "Votre historique de commandes — bientôt.",
      comingSoonTitle: "Commandes",
      comingSoonBody:
        "L’historique des commandes arrive bientôt. Le site est en cours de création — revenez bientôt.",
    },
  },
  homeFeature: {
    heroDescription:
      "Instinct. Indépendance. Territoire. Pouvoir silencieux — joaillerie fine contemporaine choisie et portée avec intention.",
    shopCollections: "Voir les collections",
    exploreBrand: "Découvrir la marque",
    instinctTitle: "Instinct",
    instinctBody: "Des bijoux choisis avec assurance.",
    independenceTitle: "Indépendance",
    independenceBody: "Le luxe appartient à celui qui le porte.",
    territoryTitle: "Territoire",
    territoryBody: "Des pièces qui affirment l’identité.",
    quietPowerTitle: "Pouvoir silencieux",
    quietPowerBody: "La force exprimée par l’élégance.",
    collectionsHeading: "Collections",
    collectionsSubtitle: "Chaque collection a sa personnalité et se révèle encore plus rassemblée.",
    fineJewelleryBadge: "Joaillerie fine",
    slugLabel: "Slug",
    ctaSubtitle:
      "La bijouterie est une signature personnelle — choisie, possédée et portée avec intention.",
    browseNew: "Voir les nouveautés",
    visitStores: "Visiter les boutiques",
    entryLuxury: "Luxe d’entrée",
    coreRange: "Gamme centrale",
    elevatedPieces: "Pièces haut de gamme",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
