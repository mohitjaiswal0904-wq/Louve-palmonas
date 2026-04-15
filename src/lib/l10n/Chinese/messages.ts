import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "zh",
  languageLabel: "中文",
  brand: {
    name: "Louve",
    tagline: "彰显你的存在。",
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
        title: "黄金核心系列",
        description: "可叠戴、混搭，值得反复佩戴。",
      },
      {
        slug: "diamond-staples",
        title: "钻石经典款",
        description: "日常奢华，低调闪耀。",
      },
      {
        slug: "occasion-pieces",
        title: "场合臻选",
        description: "为重要时刻而设的进阶之选。",
      },
      {
        slug: "signature-louve-designs",
        title: "Louve 标志性设计",
        description: "原始象征，全球演绎的精致。",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — 当代高级珠宝品牌。本能。独立。领地。静力。",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — 当代高级珠宝品牌。本能。独立。领地。静力。",
    brandLine: "源自 Palmonas 家族。",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "搜索", href: "/search" },
        { key: "wishlist", ariaLabel: "心愿单", href: "/wishlist" },
        { key: "cart", ariaLabel: "购物车", href: "/cart" },
        { key: "account", ariaLabel: "账户", href: "/account" },
      ],
    },
    userMenu: {
      profile: "个人资料",
      orders: "订单",
      cart: "购物车",
      wishlist: "心愿单",
      signOut: "退出登录",
    },
    footer: [
      {
        title: "公司",
        links: [
          { key: "about", label: "关于我们", href: "/about" },
          { key: "collections", label: "系列", href: "/collections" },
          { key: "products", label: "产品", href: "/products" },
        ],
      },
      {
        title: "支持",
        links: [
          { key: "contact", label: "联系我们", href: "/contact" },
          { key: "shipping", label: "配送", href: "/shipping" },
          { key: "help", label: "帮助", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "戒指", href: "/collections/rings" },
        { label: "耳环", href: "/collections/earrings" },
        { label: "吊坠", href: "/collections/pendants" },
        { label: "手链", href: "/collections/bracelets" },
        { label: "项链", href: "/collections/necklaces" },
        { label: "所有系列", href: "/collections/all" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "系列展示 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "系列展示 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "系列展示 3" },
      ],
      cta: { label: "探索更多", href: "/products" },
    },
  },
  common: {
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    back: "返回",
    browse: "浏览",
    notes: "备注",
    footerFromHouse: "源自 Palmonas 家族",
    copyright: "版权所有。",
    language: "语言",
    brandAlt: "Louve",
    loading: "加载中",
    popularSearchesHeading: "热门搜索",
  },
  catalog: {
    products: "产品",
    productCount: "{count} 件商品",
    allBrands: "全部品牌",
    allTypes: "全部类型",
    sortDefault: "默认",
    sortPriceLow: "价格：从低到高",
    sortPriceHigh: "价格：从高到低",
    sortTitleAZ: "标题：A–Z",
    sortTitleZA: "标题：Z–A",
    sortNewest: "最新优先",
    clearFilters: "清除筛选",
    noProducts: "未找到商品。",
    previous: "上一页",
    next: "下一页",
    sale: "促销",
    noImage: "无图片",
    sku: "SKU",
    searchPlaceholder: "金戒指、Mejuri、项链…",
    searchButton: "搜索",
    searchTitle: "搜索",
    searchSubtitle: "按名称、品牌或类别查找珠宝。",
    searchResultsFor: "搜索结果：",
    searchResults: "{count} 条结果",
    searchAgain: "再次搜索…",
    relevance: "相关度",
    searching: "搜索中…",
    productNotFound: "未找到该商品。",
    similarProducts: "您可能还喜欢",
    addToCart: "加入购物车",
    addingToCart: "正在添加…",
    buyNow: "立即购买",
    signInToAddToCart: "登录后将商品加入购物车",
    variantUnavailable: "该选项暂时无法购买。",
  },
  errors: {
    errorTitle: "出了点问题",
    errorBody:
      "加载此 Louve 页面时遇到问题。请重试。若问题持续，请稍后再来。",
    tryAgain: "重试",
    goHome: "返回首页",
    notFoundTitle: "页面未找到",
    notFoundBody:
      "您访问的页面不存在。让我们带您回到 Louve。",
    globalTitle: "遇到问题",
    globalBody:
      "Louve 遇到意外问题。请刷新页面。若仍如此，请稍后再试。",
    retry: "重试",
    brandLine: "Louve · 源自 Palmonas 家族",
  },
  pages: {
    home: {
      metaTitle: "Louve — 源自 Palmonas 家族。",
      metaDescription:
        "Louve — 当代高级珠宝品牌。本能。独立。领地。静力。",
      comingSoonTitle: "即将上线",
      comingSoonBody: "网站正在精心打造中 — 敬请期待。",
      heading: "即将上线",
      subheading: "网站正在精心打造中 — 敬请期待。",
    },
    about: {
      metaTitle: "关于我们 — Louve",
      metaDescription:
        "Louve 源自法语中的「母狼」——本能、独立、守护与沉静领导力。",
      comingSoonTitle: "关于我们",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    collections: {
      metaTitle: "系列 — Louve",
      metaDescription: "探索 Louve 系列 — 即将上线。",
      comingSoonTitle: "系列",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    products: {
      metaTitle: "产品 — Louve",
      metaDescription: "浏览我们精选的当代珠宝。",
      comingSoonTitle: "产品",
      comingSoonBody: "浏览我们精选的当代珠宝。",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "探索 Louve 系列中的这件作品。",
      comingSoonTitle: "商品",
      comingSoonBody: "探索 Louve 系列中的这件作品。",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "商品编号",
    },
    search: {
      metaTitle: "搜索 — Louve",
      metaDescription: "按名称、品牌或风格搜索我们的珠宝系列。",
      comingSoonTitle: "搜索",
      comingSoonBody: "搜索我们的珠宝系列。",
    },
    searchResults: {
      metaTitle: "搜索 — Louve",
      metaDescription: "来自 Louve 系列的搜索结果。",
      comingSoonTitle: "搜索结果",
      comingSoonBody: "来自 Louve 系列的搜索结果。",
      metaTitleTemplate: "{query} — Search — {siteName}",
      queryLabel: "查询",
    },
    contact: {
      metaTitle: "联系我们 — Louve",
      metaDescription: "联系 Louve — 即将上线。",
      comingSoonTitle: "联系我们",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    stores: {
      metaTitle: "门店 — Louve",
      metaDescription: "Louve 门店 — 即将上线。",
      comingSoonTitle: "门店",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    help: {
      metaTitle: "帮助 — Louve",
      metaDescription: "帮助中心 — 即将上线。",
      comingSoonTitle: "帮助",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    shipping: {
      metaTitle: "配送 — Louve",
      metaDescription: "配送信息 — 即将上线。",
      comingSoonTitle: "配送",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    authLogin: {
      metaTitle: "登录 — Louve",
      metaDescription: "登录您的 Louve 账户 — 即将上线。",
      comingSoonTitle: "登录",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    authSignup: {
      metaTitle: "创建账户 — Louve",
      metaDescription: "创建您的 Louve 账户 — 即将上线。",
      comingSoonTitle: "创建账户",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    authForgotPassword: {
      metaTitle: "忘记密码 — Louve",
      metaDescription: "重置您的 Louve 密码。",
      comingSoonTitle: "忘记密码",
      comingSoonBody: "输入您的邮箱，我们将发送重置链接。",
    },
    authResetPassword: {
      metaTitle: "重置密码 — Louve",
      metaDescription: "为您的 Louve 账户设置新密码。",
      comingSoonTitle: "重置密码",
      comingSoonBody: "为您的账户设置新密码。",
    },
    account: {
      metaTitle: "账户 — Louve",
      metaDescription: "您的 Louve 账户 — 即将上线。",
      comingSoonTitle: "账户",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    cart: {
      metaTitle: "购物车 — Louve",
      metaDescription: "您的购物车 — 即将上线。",
      comingSoonTitle: "购物车",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    wishlist: {
      metaTitle: "心愿单 — Louve",
      metaDescription: "您的心愿单 — 即将上线。",
      comingSoonTitle: "心愿单",
      comingSoonBody:
        "该功能即将上线。网站正在精心打造中 — 敬请期待。",
    },
    orders: {
      metaTitle: "订单 — Louve",
      metaDescription: "您的订单记录 — 即将上线。",
      comingSoonTitle: "订单",
      comingSoonBody:
        "订单记录即将上线。网站正在精心打造中 — 敬请期待。",
    },
  },
  homeFeature: {
    heroDescription:
      "本能。独立。领地。静力 — 当代高级珠宝，用心挑选与佩戴。",
    shopCollections: "选购系列",
    exploreBrand: "探索品牌",
    instinctTitle: "本能",
    instinctBody: "自信之选珠宝。",
    independenceTitle: "独立",
    independenceBody: "由佩戴者拥有的奢华。",
    territoryTitle: "领地",
    territoryBody: "彰显身份的作品。",
    quietPowerTitle: "静力",
    quietPowerBody: "以优雅表达力量。",
    collectionsHeading: "系列",
    collectionsSubtitle: "每个系列自成一格，搭配更佳。",
    fineJewelleryBadge: "高级珠宝",
    slugLabel: "链接别名",
    ctaSubtitle:
      "珠宝是个人印记 — 由您选择、拥有并有意佩戴。",
    browseNew: "浏览新品",
    visitStores: "前往门店",
    entryLuxury: "入门奢华",
    coreRange: "核心系列",
    elevatedPieces: "进阶作品",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
