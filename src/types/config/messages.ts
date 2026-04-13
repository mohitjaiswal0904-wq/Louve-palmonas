import type { AppLocale } from "./locale";

export type MegaMenuMessage = {
  categories: { label: string; href: string }[];
  gallery: { src: string; alt: string }[];
  cta: { label: string; href: string };
};

export type FooterSectionMessage = {
  title: string;
  links: { key: string; label: string; href: string }[];
};

export type HeaderActionMessage = {
  key: string;
  ariaLabel: string;
  href: string;
};

export type BasePageMessages = {
  metaTitle: string;
  metaDescription: string;
  comingSoonTitle: string;
  comingSoonBody: string;
};

export type HomePageMessages = BasePageMessages & {
  heading: string;
  subheading: string;
};

export type ProductDetailPageMessages = BasePageMessages & {
  metaTitleTemplate: string;
  productIdLabel: string;
};

export type SearchResultsPageMessages = BasePageMessages & {
  metaTitleTemplate: string;
  queryLabel: string;
};

export type HomeFeatureMessages = {
  heroDescription: string;
  shopCollections: string;
  exploreBrand: string;
  instinctTitle: string;
  instinctBody: string;
  independenceTitle: string;
  independenceBody: string;
  territoryTitle: string;
  territoryBody: string;
  quietPowerTitle: string;
  quietPowerBody: string;
  collectionsHeading: string;
  collectionsSubtitle: string;
  fineJewelleryBadge: string;
  slugLabel: string;
  ctaSubtitle: string;
  browseNew: string;
  visitStores: string;
  entryLuxury: string;
  coreRange: string;
  elevatedPieces: string;
  priceEntryLuxury: string;
  priceCoreRange: string;
  priceElevated: string;
};

export type PagesMessages = {
  home: HomePageMessages;
  about: BasePageMessages;
  collections: BasePageMessages;
  products: BasePageMessages;
  productDetail: ProductDetailPageMessages;
  search: BasePageMessages;
  searchResults: SearchResultsPageMessages;
  contact: BasePageMessages;
  stores: BasePageMessages;
  help: BasePageMessages;
  shipping: BasePageMessages;
  authLogin: BasePageMessages;
  authSignup: BasePageMessages;
  authForgotPassword: BasePageMessages;
  authResetPassword: BasePageMessages;
  account: BasePageMessages;
  cart: BasePageMessages;
  wishlist: BasePageMessages;
  orders: BasePageMessages;
};

export type AppMessages = {
  locale: AppLocale;
  languageLabel: string;
  brand: {
    name: string;
    tagline: string;
    colors: {
      primalRouge: string;
      auroraForest: string;
      softIvory: string;
      graphiteBlack: string;
      champagneGold: string;
    };
    collections: {
      slug: string;
      title: string;
      description: string;
    }[];
  };
  site: {
    name: string;
    description: string;
    parentBrand: string;
  };
  seo: {
    siteName: string;
    defaultDescription: string;
    brandLine: string;
  };
  navigation: {
    header: {
      actions: HeaderActionMessage[];
    };
    userMenu: {
      profile: string;
      orders: string;
      cart: string;
      wishlist: string;
      signOut: string;
    };
    footer: FooterSectionMessage[];
    megaMenu: MegaMenuMessage;
  };
  common: {
    openMenu: string;
    closeMenu: string;
    back: string;
    browse: string;
    notes: string;
    footerFromHouse: string;
    copyright: string;
    language: string;
    brandAlt: string;
    loading: string;
  };
  errors: {
    errorTitle: string;
    errorBody: string;
    tryAgain: string;
    goHome: string;
    notFoundTitle: string;
    notFoundBody: string;
    globalTitle: string;
    globalBody: string;
    retry: string;
    brandLine: string;
  };
  catalog: {
    products: string;
    productCount: string;
    allBrands: string;
    allTypes: string;
    sortDefault: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortTitleAZ: string;
    sortTitleZA: string;
    sortNewest: string;
    clearFilters: string;
    noProducts: string;
    previous: string;
    next: string;
    sale: string;
    noImage: string;
    sku: string;
    searchPlaceholder: string;
    searchButton: string;
    searchTitle: string;
    searchSubtitle: string;
    searchResultsFor: string;
    searchResults: string;
    searchAgain: string;
    relevance: string;
    searching: string;
    productNotFound: string;
    similarProducts: string;
    addToCart: string;
    addingToCart: string;
    buyNow: string;
    signInToAddToCart: string;
    variantUnavailable: string;
  };
  pages: PagesMessages;
  homeFeature: HomeFeatureMessages;
};

export type PageId = keyof PagesMessages;
