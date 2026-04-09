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
    sidebar: [
      { key: "home", label: "Accueil", href: "/" },
      {
        key: "collections",
        label: "Collections",
        children: [
          { key: "collections-all", label: "Toutes les collections", href: "/collections" },
          {
            key: "collections-core",
            label: "Essentiels or cœur",
            href: "/collections#core-gold-essentials",
          },
          {
            key: "collections-diamond",
            label: "Incontournables diamant",
            href: "/collections#diamond-staples",
          },
          {
            key: "collections-occasion",
            label: "Pièces d’occasion",
            href: "/collections#occasion-pieces",
          },
          {
            key: "collections-signature",
            label: "Créations signature Louve",
            href: "/collections#signature-louve-designs",
          },
        ],
      },
      {
        key: "products",
        label: "Produits",
        children: [
          { key: "products-all", label: "Tous les produits", href: "/products" },
          {
            key: "products-category",
            label: "Catégories",
            children: [
              { key: "products-rings", label: "Bagues", href: "/products?category=rings" },
              { key: "products-earrings", label: "Boucles d’oreilles", href: "/products?category=earrings" },
              {
                key: "products-necklaces",
                label: "Colliers",
                href: "/products?category=necklaces",
              },
            ],
          },
          {
            key: "products-sample",
            label: "Produit exemple (espace réservé)",
            href: "/products/sample-product",
          },
        ],
      },
      { key: "about", label: "À propos", href: "/about" },
      { key: "stores", label: "Boutiques", href: "/stores" },
      { key: "contact", label: "Contact", href: "/contact" },
      { key: "shipping", label: "Livraison", href: "/shipping" },
    ],
  },
  common: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    closeSidebar: "Fermer la barre latérale",
    back: "Retour",
    browse: "Parcourir",
    notes: "Notes",
    footerFromHouse: "De la maison Palmonas",
    copyright: "Tous droits réservés.",
    language: "Langue",
    brandAlt: "Louve",
    loading: "Chargement",
    sidebar: "Barre latérale",
    sidebarSub: "Sous-menu de la barre latérale",
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
      metaDescription: "Réinitialisez votre mot de passe Louve — bientôt.",
      comingSoonTitle: "Mot de passe oublié",
      comingSoonBody:
        "Cette fonctionnalité arrive bientôt. Le site est en cours de création — revenez bientôt.",
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
