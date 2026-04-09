import type { AppLocale } from "./locale";

export type SidebarNavMessage = {
  key: string;
  label: string;
  href?: string;
  children?: SidebarNavMessage[];
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
    footer: FooterSectionMessage[];
    sidebar: SidebarNavMessage[];
  };
  common: {
    openMenu: string;
    closeMenu: string;
    closeSidebar: string;
    back: string;
    browse: string;
    notes: string;
    footerFromHouse: string;
    copyright: string;
    language: string;
    brandAlt: string;
    loading: string;
    sidebar: string;
    sidebarSub: string;
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
  pages: PagesMessages;
  homeFeature: HomeFeatureMessages;
};

export type PageId = keyof PagesMessages;
