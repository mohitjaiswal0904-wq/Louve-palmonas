import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "en",
  languageLabel: "English",
  brand: {
    name: "Louve",
    tagline: "Mark your Presence.",
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
        title: "Core Gold Essentials",
        description: "Built to layer, mix, and return to.",
      },
      {
        slug: "diamond-staples",
        title: "Diamond Staples",
        description: "Everyday luxury with quiet brilliance.",
      },
      {
        slug: "occasion-pieces",
        title: "Occasion Pieces",
        description: "Elevated pieces for defining moments.",
      },
      {
        slug: "signature-louve-designs",
        title: "Signature Louve Designs",
        description: "Primal symbolism, refined globally.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — a contemporary fine jewellery house. Instinct. Independence. Territory. Quiet power.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — a contemporary fine jewellery house. Instinct. Independence. Territory. Quiet power.",
    brandLine: "From the house of Palmonas.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "Search", href: "/search" },
        { key: "wishlist", ariaLabel: "Wishlist", href: "/wishlist" },
        { key: "cart", ariaLabel: "Cart", href: "/cart" },
        { key: "account", ariaLabel: "Account", href: "/account" },
      ],
    },
    userMenu: {
      profile: "Profile",
      orders: "Orders",
      cart: "Cart",
      wishlist: "Wishlist",
      signOut: "Sign out",
    },
    footer: [
      {
        title: "Company",
        links: [
          { key: "about", label: "About", href: "/about" },
          { key: "collections", label: "Collections", href: "/collections" },
          { key: "products", label: "Products", href: "/products" },
        ],
      },
      {
        title: "Support",
        links: [
          { key: "contact", label: "Contact", href: "/contact" },
          { key: "shipping", label: "Shipping", href: "/shipping" },
          { key: "help", label: "Help", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "Rings", href: "/collections/rings" },
        { label: "Earrings", href: "/collections/earrings" },
        { label: "Necklaces", href: "/collections/necklaces" },
        { label: "Bracelets", href: "/collections/bracelets" },
        { label: "Pendants", href: "/collections/pendants" },
        { label: "All Collections", href: "/collections" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "Collection view 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "Collection view 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "Collection view 3" },
      ],
      cta: { label: "Explore More", href: "/products" },
    },
  },
  common: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    back: "Back",
    browse: "Browse",
    notes: "Notes",
    footerFromHouse: "From the house of Palmonas",
    copyright: "All rights reserved.",
    language: "Language",
    brandAlt: "Louve",
    loading: "Loading",
  },
  catalog: {
    products: "Products",
    productCount: "{count} products",
    allBrands: "All brands",
    allTypes: "All types",
    sortDefault: "Default",
    sortPriceLow: "Price: low to high",
    sortPriceHigh: "Price: high to low",
    sortTitleAZ: "Title: A–Z",
    sortTitleZA: "Title: Z–A",
    sortNewest: "Newest first",
    clearFilters: "Clear filters",
    noProducts: "No products found.",
    previous: "Previous",
    next: "Next",
    sale: "SALE",
    noImage: "No image",
    sku: "SKU",
    searchPlaceholder: "Gold rings, Mejuri, Necklaces…",
    searchButton: "Search",
    searchTitle: "Search",
    searchSubtitle: "Find jewellery by name, brand, or category.",
    searchResultsFor: "Results for",
    searchResults: "{count} results",
    searchAgain: "Search again…",
    relevance: "Relevance",
    searching: "Searching…",
    productNotFound: "Product not found.",
    similarProducts: "You may also like",
  },
  errors: {
    errorTitle: "Something went wrong",
    errorBody:
      "We hit an issue while loading this Louve page. Please try again. If the problem continues, come back in a bit.",
    tryAgain: "Try again",
    goHome: "Go home",
    notFoundTitle: "Page not found",
    notFoundBody:
      "The page you’re looking for doesn’t exist. Let’s get you back to Louve.",
    globalTitle: "We hit an issue",
    globalBody:
      "Louve ran into an unexpected problem. Please refresh the page. If it persists, try again later.",
    retry: "Retry",
    brandLine: "Louve · from the house of Palmonas",
  },
  pages: {
    home: {
      metaTitle: "Louve — From the house of Palmonas.",
      metaDescription:
        "Louve — a contemporary fine jewellery house. Instinct. Independence. Territory. Quiet power.",
      comingSoonTitle: "Coming soon",
      comingSoonBody: "This website is being crafted — check back soon.",
      heading: "Coming soon",
      subheading: "This website is being crafted — check back soon.",
    },
    about: {
      metaTitle: "About — Louve",
      metaDescription:
        "Louve comes from the French word for she-wolf — instinct, independence, protection, and quiet leadership.",
      comingSoonTitle: "About",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    collections: {
      metaTitle: "Collections — Louve",
      metaDescription: "Explore Louve collections — coming soon.",
      comingSoonTitle: "Collections",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    products: {
      metaTitle: "Products — Louve",
      metaDescription: "Browse our curated collection of contemporary jewellery.",
      comingSoonTitle: "Products",
      comingSoonBody: "Browse our curated collection of contemporary jewellery.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Explore this piece from the Louve collection.",
      comingSoonTitle: "Product",
      comingSoonBody: "Explore this piece from the Louve collection.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "Product id",
    },
    search: {
      metaTitle: "Search — Louve",
      metaDescription: "Search our jewellery collection by name, brand, or style.",
      comingSoonTitle: "Search",
      comingSoonBody: "Search our jewellery collection.",
    },
    searchResults: {
      metaTitle: "Search — Louve",
      metaDescription: "Search results from the Louve collection.",
      comingSoonTitle: "Search Results",
      comingSoonBody: "Search results from the Louve collection.",
      metaTitleTemplate: "{query} — Search — {siteName}",
      queryLabel: "Query",
    },
    contact: {
      metaTitle: "Contact — Louve",
      metaDescription: "Contact Louve — coming soon.",
      comingSoonTitle: "Contact",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    stores: {
      metaTitle: "Stores — Louve",
      metaDescription: "Louve stores — coming soon.",
      comingSoonTitle: "Stores",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    help: {
      metaTitle: "Help — Louve",
      metaDescription: "Help centre — coming soon.",
      comingSoonTitle: "Help",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    shipping: {
      metaTitle: "Shipping — Louve",
      metaDescription: "Shipping information — coming soon.",
      comingSoonTitle: "Shipping",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    authLogin: {
      metaTitle: "Sign in — Louve",
      metaDescription: "Sign in to your Louve account — coming soon.",
      comingSoonTitle: "Sign in",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    authSignup: {
      metaTitle: "Create account — Louve",
      metaDescription: "Create your Louve account — coming soon.",
      comingSoonTitle: "Create account",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    authForgotPassword: {
      metaTitle: "Forgot password — Louve",
      metaDescription: "Reset your Louve password.",
      comingSoonTitle: "Forgot password",
      comingSoonBody: "Enter your email and we'll send you a reset link.",
    },
    authResetPassword: {
      metaTitle: "Reset password — Louve",
      metaDescription: "Choose a new password for your Louve account.",
      comingSoonTitle: "Reset password",
      comingSoonBody: "Set a new password for your account.",
    },
    account: {
      metaTitle: "Account — Louve",
      metaDescription: "Your Louve account — coming soon.",
      comingSoonTitle: "Account",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    cart: {
      metaTitle: "Cart — Louve",
      metaDescription: "Your shopping cart — coming soon.",
      comingSoonTitle: "Cart",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    wishlist: {
      metaTitle: "Wishlist — Louve",
      metaDescription: "Your wishlist — coming soon.",
      comingSoonTitle: "Wishlist",
      comingSoonBody:
        "This feature is coming soon. The website is being crafted — check back soon.",
    },
    orders: {
      metaTitle: "Orders — Louve",
      metaDescription: "Your order history — coming soon.",
      comingSoonTitle: "Orders",
      comingSoonBody:
        "Order history is coming soon. The website is being crafted — check back soon.",
    },
  },
  homeFeature: {
    heroDescription:
      "Instinct. Independence. Territory. Quiet power — contemporary fine jewellery chosen and worn with intention.",
    shopCollections: "Shop collections",
    exploreBrand: "Explore the brand",
    instinctTitle: "Instinct",
    instinctBody: "Jewellery chosen with confidence.",
    independenceTitle: "Independence",
    independenceBody: "Luxury owned by the wearer.",
    territoryTitle: "Territory",
    territoryBody: "Pieces that mark identity.",
    quietPowerTitle: "Quiet power",
    quietPowerBody: "Strength expressed through elegance.",
    collectionsHeading: "Collections",
    collectionsSubtitle: "Each collection holds its own, and works better together.",
    fineJewelleryBadge: "Fine jewellery",
    slugLabel: "Slug",
    ctaSubtitle:
      "Jewellery is a personal signature — chosen, owned, and worn with intention.",
    browseNew: "Browse new",
    visitStores: "Visit stores",
    entryLuxury: "Entry luxury",
    coreRange: "Core range",
    elevatedPieces: "Elevated pieces",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
