import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "ko",
  languageLabel: "한국어",
  brand: {
    name: "Louve",
    tagline: "당신의 존재감을 새긴다.",
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
        title: "코어 골드 에센셜",
        description: "레이어링과 믹스에 어울리고, 언제든 손이 가는 피스.",
      },
      {
        slug: "diamond-staples",
        title: "다이아몬드 스테이플",
        description: "일상의 럭셔리에 잔잔한 빛을 더하다.",
      },
      {
        slug: "occasion-pieces",
        title: "오케이전 피스",
        description: "특별한 순간을 완성하는 한 단계 높은 주얼리.",
      },
      {
        slug: "signature-louve-designs",
        title: "시그니처 루브 디자인",
        description: "원초의 상징을, 세계적으로 다듬다.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — 컨템포러리 파인 주얼리 하우스. 본능. 독립. 영역. 고요한 힘.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — 컨템포러리 파인 주얼리 하우스. 본능. 독립. 영역. 고요한 힘.",
    brandLine: "Palmonas 하우스에서.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "검색", href: "/search" },
        { key: "wishlist", ariaLabel: "위시리스트", href: "/wishlist" },
        { key: "cart", ariaLabel: "장바구니", href: "/cart" },
        { key: "account", ariaLabel: "계정", href: "/account" },
      ],
    },
    userMenu: {
      profile: "프로필",
      orders: "주문",
      cart: "장바구니",
      wishlist: "위시리스트",
      signOut: "로그아웃",
    },
    footer: [
      {
        title: "회사",
        links: [
          { key: "about", label: "소개", href: "/about" },
          { key: "collections", label: "컬렉션", href: "/collections" },
          { key: "products", label: "제품", href: "/products" },
        ],
      },
      {
        title: "고객 지원",
        links: [
          { key: "contact", label: "문의", href: "/contact" },
          { key: "shipping", label: "배송", href: "/shipping" },
          { key: "help", label: "도움말", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "반지", href: "/collections/rings" },
        { label: "귀걸이", href: "/collections/earrings" },
        { label: "펜던트", href: "/collections/pendants" },
        { label: "팔찌", href: "/collections/bracelets" },
        { label: "목걸이", href: "/collections/necklaces" },
        { label: "모든 컬렉션", href: "/collections/all" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "컬렉션 뷰 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "컬렉션 뷰 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "컬렉션 뷰 3" },
      ],
      cta: { label: "더 보기", href: "/products" },
    },
  },
  common: {
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    back: "뒤로",
    browse: "둘러보기",
    notes: "메모",
    footerFromHouse: "Palmonas 하우스에서",
    copyright: "무단 복제를 금지합니다.",
    language: "언어",
    brandAlt: "Louve",
    loading: "로딩 중",
  },
  catalog: {
    products: "제품",
    productCount: "제품 {count}개",
    allBrands: "모든 브랜드",
    allTypes: "모든 유형",
    sortDefault: "기본",
    sortPriceLow: "가격: 낮은 순",
    sortPriceHigh: "가격: 높은 순",
    sortTitleAZ: "제목: 가나다순",
    sortTitleZA: "제목: 역순",
    sortNewest: "최신순",
    clearFilters: "필터 지우기",
    noProducts: "제품을 찾을 수 없습니다.",
    previous: "이전",
    next: "다음",
    sale: "세일",
    noImage: "이미지 없음",
    sku: "SKU",
    searchPlaceholder: "골드 링, Mejuri, 네크리스…",
    searchButton: "검색",
    searchTitle: "검색",
    searchSubtitle: "이름, 브랜드 또는 카테고리로 주얼리를 찾아보세요.",
    searchResultsFor: "검색 결과:",
    searchResults: "결과 {count}건",
    searchAgain: "다시 검색…",
    relevance: "관련도",
    searching: "검색 중…",
    productNotFound: "제품을 찾을 수 없습니다.",
    similarProducts: "이런 상품은 어떠세요",
  },
  errors: {
    errorTitle: "문제가 발생했습니다",
    errorBody:
      "Louve 페이지를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요. 계속되면 잠시 후 다시 방문해 주세요.",
    tryAgain: "다시 시도",
    goHome: "홈으로",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody:
      "찾으시는 페이지가 없습니다. Louve로 돌아가 보세요.",
    globalTitle: "문제가 발생했습니다",
    globalBody:
      "Louve에서 예기치 않은 오류가 발생했습니다. 페이지를 새로고침해 주세요. 계속되면 나중에 다시 시도해 주세요.",
    retry: "다시 시도",
    brandLine: "Louve · Palmonas 하우스에서",
  },
  pages: {
    home: {
      metaTitle: "Louve — Palmonas 하우스에서.",
      metaDescription:
        "Louve — 컨템포러리 파인 주얼리 하우스. 본능. 독립. 영역. 고요한 힘.",
      comingSoonTitle: "곧 공개",
      comingSoonBody: "웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
      heading: "곧 공개",
      subheading: "웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    about: {
      metaTitle: "소개 — Louve",
      metaDescription:
        "Louve는 프랑스어로 암컷 늑대를 뜻합니다 — 본능, 독립, 보호, 고요한 리더십.",
      comingSoonTitle: "소개",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    collections: {
      metaTitle: "컬렉션 — Louve",
      metaDescription: "Louve 컬렉션 탐색 — 곧 공개.",
      comingSoonTitle: "컬렉션",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    products: {
      metaTitle: "제품 — Louve",
      metaDescription: "엄선한 컨템포러리 주얼리를 둘러보세요.",
      comingSoonTitle: "제품",
      comingSoonBody: "엄선한 컨템포러리 주얼리를 둘러보세요.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Louve 컬렉션의 이 작품을 살펴보세요.",
      comingSoonTitle: "제품",
      comingSoonBody: "Louve 컬렉션의 이 작품을 살펴보세요.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "제품 ID",
    },
    search: {
      metaTitle: "검색 — Louve",
      metaDescription: "이름, 브랜드 또는 스타일로 주얼리를 검색하세요.",
      comingSoonTitle: "검색",
      comingSoonBody: "주얼리 컬렉션을 검색하세요.",
    },
    searchResults: {
      metaTitle: "검색 — Louve",
      metaDescription: "Louve 컬렉션 검색 결과.",
      comingSoonTitle: "검색 결과",
      comingSoonBody: "Louve 컬렉션 검색 결과.",
      metaTitleTemplate: "{query} — 검색 — {siteName}",
      queryLabel: "검색어",
    },
    contact: {
      metaTitle: "문의 — Louve",
      metaDescription: "Louve 문의 — 곧 공개.",
      comingSoonTitle: "문의",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    stores: {
      metaTitle: "매장 — Louve",
      metaDescription: "Louve 매장 — 곧 공개.",
      comingSoonTitle: "매장",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    help: {
      metaTitle: "도움말 — Louve",
      metaDescription: "고객센터 — 곧 공개.",
      comingSoonTitle: "도움말",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    shipping: {
      metaTitle: "배송 — Louve",
      metaDescription: "배송 안내 — 곧 공개.",
      comingSoonTitle: "배송",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    authLogin: {
      metaTitle: "로그인 — Louve",
      metaDescription: "Louve 계정 로그인 — 곧 공개.",
      comingSoonTitle: "로그인",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    authSignup: {
      metaTitle: "회원가입 — Louve",
      metaDescription: "Louve 계정 만들기 — 곧 공개.",
      comingSoonTitle: "회원가입",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    authForgotPassword: {
      metaTitle: "비밀번호 찾기 — Louve",
      metaDescription: "Louve 비밀번호 재설정.",
      comingSoonTitle: "비밀번호 찾기",
      comingSoonBody: "이메일을 입력하시면 재설정 링크를 보내드립니다.",
    },
    authResetPassword: {
      metaTitle: "비밀번호 재설정 — Louve",
      metaDescription: "Louve 계정의 새 비밀번호를 설정하세요.",
      comingSoonTitle: "비밀번호 재설정",
      comingSoonBody: "계정의 새 비밀번호를 설정하세요.",
    },
    account: {
      metaTitle: "계정 — Louve",
      metaDescription: "Louve 계정 — 곧 공개.",
      comingSoonTitle: "계정",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    cart: {
      metaTitle: "장바구니 — Louve",
      metaDescription: "장바구니 — 곧 공개.",
      comingSoonTitle: "장바구니",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    wishlist: {
      metaTitle: "위시리스트 — Louve",
      metaDescription: "위시리스트 — 곧 공개.",
      comingSoonTitle: "위시리스트",
      comingSoonBody:
        "이 기능은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
    orders: {
      metaTitle: "주문 — Louve",
      metaDescription: "주문 내역 — 곧 공개.",
      comingSoonTitle: "주문",
      comingSoonBody:
        "주문 내역은 곧 제공됩니다. 웹사이트를 준비 중입니다 — 곧 다시 찾아주세요.",
    },
  },
  homeFeature: {
    heroDescription:
      "본능. 독립. 영역. 고요한 힘 — 의도를 담아 고르고 입는 컨템포러리 파인 주얼리.",
    shopCollections: "컬렉션 쇼핑",
    exploreBrand: "브랜드 알아보기",
    instinctTitle: "본능",
    instinctBody: "자신 있게 고른 주얼리.",
    independenceTitle: "독립",
    independenceBody: "착용자가 소유하는 럭셔리.",
    territoryTitle: "영역",
    territoryBody: "정체성을 새기는 피스.",
    quietPowerTitle: "고요한 힘",
    quietPowerBody: "우아함으로 표현하는 힘.",
    collectionsHeading: "컬렉션",
    collectionsSubtitle: "각 컬렉션은 저마다의 개성을 지니며, 함께할수록 빛납니다.",
    fineJewelleryBadge: "파인 주얼리",
    slugLabel: "슬러그",
    ctaSubtitle:
      "주얼리는 개인의 서명 — 고르고, 소유하고, 의도를 담아 입는 것.",
    browseNew: "신상 보기",
    visitStores: "매장 방문",
    entryLuxury: "엔트리 럭셔리",
    coreRange: "코어 레인지",
    elevatedPieces: "한 단계 높은 피스",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
