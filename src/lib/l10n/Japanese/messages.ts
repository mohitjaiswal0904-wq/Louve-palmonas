import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "ja",
  languageLabel: "日本語",
  brand: {
    name: "Louve",
    tagline: "存在感を刻む。",
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
        title: "コアゴールドエッセンシャル",
        description: "重ねても、ミックスしても、何度でも手に取りたくなる一本。",
      },
      {
        slug: "diamond-staples",
        title: "ダイヤモンドステープル",
        description: "日常のラグジュアリーに、静かな輝きを。",
      },
      {
        slug: "occasion-pieces",
        title: "オケージョンピース",
        description: "記念の瞬間を彩る、格上のジュエリー。",
      },
      {
        slug: "signature-louve-designs",
        title: "シグネチャー・ルーヴ デザイン",
        description: "原初のシンボルを、世界へ洗練して。",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — コンテンポラリーなファインジュエリーのハウス。本能。独立。領域。静かな力。",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — コンテンポラリーなファインジュエリーのハウス。本能。独立。領域。静かな力。",
    brandLine: "Palmonas のハウスより。",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "検索", href: "/search" },
        { key: "wishlist", ariaLabel: "ウィッシュリスト", href: "/wishlist" },
        { key: "cart", ariaLabel: "カート", href: "/cart" },
        { key: "account", ariaLabel: "アカウント", href: "/account" },
      ],
    },
    userMenu: {
      profile: "プロフィール",
      orders: "ご注文",
      cart: "カート",
      wishlist: "ウィッシュリスト",
      signOut: "ログアウト",
    },
    footer: [
      {
        title: "会社情報",
        links: [
          { key: "about", label: "について", href: "/about" },
          { key: "collections", label: "コレクション", href: "/collections" },
          { key: "products", label: "商品", href: "/products" },
        ],
      },
      {
        title: "サポート",
        links: [
          { key: "contact", label: "お問い合わせ", href: "/contact" },
          { key: "shipping", label: "配送", href: "/shipping" },
          { key: "help", label: "ヘルプ", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "リング", href: "/collections/rings" },
        { label: "イヤリング", href: "/collections/earrings" },
        { label: "ペンダント", href: "/collections/pendants" },
        { label: "ブレスレット", href: "/collections/bracelets" },
        { label: "ネックレス", href: "/collections/necklaces" },
        { label: "すべてのコレクション", href: "/collections/all" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "コレクションビュー 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "コレクションビュー 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "コレクションビュー 3" },
      ],
      cta: { label: "もっと見る", href: "/products" },
    },
  },
  common: {
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    back: "戻る",
    browse: "見る",
    notes: "メモ",
    footerFromHouse: "Palmonas のハウスより",
    copyright: "無断転載を禁じます。",
    language: "言語",
    brandAlt: "Louve",
    loading: "読み込み中",
    popularSearchesHeading: "人気の検索",
  },
  catalog: {
    products: "商品",
    productCount: "{count} 件の商品",
    allBrands: "すべてのブランド",
    allTypes: "すべてのタイプ",
    sortDefault: "デフォルト",
    sortPriceLow: "価格：安い順",
    sortPriceHigh: "価格：高い順",
    sortTitleAZ: "タイトル：あ〜ん順",
    sortTitleZA: "タイトル：ん〜あ順",
    sortNewest: "新しい順",
    clearFilters: "フィルターをクリア",
    noProducts: "該当する商品はありません。",
    previous: "前へ",
    next: "次へ",
    sale: "セール",
    noImage: "画像なし",
    sku: "SKU",
    searchPlaceholder: "ゴールドリング、Mejuri、ネックレス…",
    searchButton: "検索",
    searchTitle: "検索",
    searchSubtitle: "名前、ブランド、カテゴリーからジュエリーを探す。",
    searchResultsFor: "検索結果：",
    searchResults: "{count} 件",
    searchAgain: "別のキーワードで検索…",
    relevance: "関連度",
    searching: "検索中…",
    productNotFound: "商品が見つかりません。",
    similarProducts: "こちらもおすすめ",
    addToCart: "カートに追加",
    addingToCart: "追加中…",
    buyNow: "今すぐ購入",
    signInToAddToCart: "カートに追加するにはログインしてください",
    variantUnavailable: "このオプションは利用できません。",
  },
  errors: {
    errorTitle: "問題が発生しました",
    errorBody:
      "Louve のページの読み込み中にエラーが発生しました。もう一度お試しください。解消しない場合は、しばらくしてからアクセスしてください。",
    tryAgain: "再試行",
    goHome: "ホームへ",
    notFoundTitle: "ページが見つかりません",
    notFoundBody:
      "お探しのページは存在しません。Louve のサイトへお戻りください。",
    globalTitle: "問題が発生しました",
    globalBody:
      "Louve で予期しないエラーが発生しました。ページを更新してください。続く場合は、しばらくしてからお試しください。",
    retry: "再試行",
    brandLine: "Louve · Palmonas のハウスより",
  },
  pages: {
    home: {
      metaTitle: "Louve — Palmonas のハウスより。",
      metaDescription:
        "Louve — コンテンポラリーなファインジュエリーのハウス。本能。独立。領域。静かな力。",
      comingSoonTitle: "近日公開",
      comingSoonBody: "サイトは現在制作中です — またご覧ください。",
      heading: "近日公開",
      subheading: "サイトは現在制作中です — またご覧ください。",
    },
    about: {
      metaTitle: "について — Louve",
      metaDescription:
        "Louve はフランス語で雌オオカミを意味します — 本能、独立、守り、静かなリーダーシップ。",
      comingSoonTitle: "について",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    collections: {
      metaTitle: "コレクション — Louve",
      metaDescription: "Louve のコレクションを探索 — 近日公開。",
      comingSoonTitle: "コレクション",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    products: {
      metaTitle: "商品 — Louve",
      metaDescription: "厳選したコンテンポラリージュエリーをご覧ください。",
      comingSoonTitle: "商品",
      comingSoonBody: "厳選したコンテンポラリージュエリーをご覧ください。",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Louve コレクションのこの一品をご覧ください。",
      comingSoonTitle: "商品",
      comingSoonBody: "Louve コレクションのこの一品をご覧ください。",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "商品 ID",
    },
    search: {
      metaTitle: "検索 — Louve",
      metaDescription: "名前、ブランド、スタイルからジュエリーを検索。",
      comingSoonTitle: "検索",
      comingSoonBody: "ジュエリーコレクションを検索。",
    },
    searchResults: {
      metaTitle: "検索 — Louve",
      metaDescription: "Louve コレクションの検索結果。",
      comingSoonTitle: "検索結果",
      comingSoonBody: "Louve コレクションの検索結果。",
      metaTitleTemplate: "{query} — 検索 — {siteName}",
      queryLabel: "クエリ",
    },
    contact: {
      metaTitle: "お問い合わせ — Louve",
      metaDescription: "Louve へのお問い合わせ — 近日公開。",
      comingSoonTitle: "お問い合わせ",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    stores: {
      metaTitle: "店舗 — Louve",
      metaDescription: "Louve 店舗 — 近日公開。",
      comingSoonTitle: "店舗",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    help: {
      metaTitle: "ヘルプ — Louve",
      metaDescription: "ヘルプセンター — 近日公開。",
      comingSoonTitle: "ヘルプ",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    shipping: {
      metaTitle: "配送 — Louve",
      metaDescription: "配送について — 近日公開。",
      comingSoonTitle: "配送",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    authLogin: {
      metaTitle: "ログイン — Louve",
      metaDescription: "Louve アカウントにログイン — 近日公開。",
      comingSoonTitle: "ログイン",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    authSignup: {
      metaTitle: "アカウント作成 — Louve",
      metaDescription: "Louve アカウントを作成 — 近日公開。",
      comingSoonTitle: "アカウント作成",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    authForgotPassword: {
      metaTitle: "パスワードをお忘れの方 — Louve",
      metaDescription: "Louve のパスワードをリセット。",
      comingSoonTitle: "パスワードをお忘れの方",
      comingSoonBody: "メールアドレスを入力すると、リセット用のリンクをお送りします。",
    },
    authResetPassword: {
      metaTitle: "パスワードの再設定 — Louve",
      metaDescription: "Louve アカウントの新しいパスワードを設定。",
      comingSoonTitle: "パスワードの再設定",
      comingSoonBody: "アカウントの新しいパスワードを設定してください。",
    },
    account: {
      metaTitle: "アカウント — Louve",
      metaDescription: "Louve アカウント — 近日公開。",
      comingSoonTitle: "アカウント",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    cart: {
      metaTitle: "カート — Louve",
      metaDescription: "ショッピングカート — 近日公開。",
      comingSoonTitle: "カート",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    wishlist: {
      metaTitle: "ウィッシュリスト — Louve",
      metaDescription: "ウィッシュリスト — 近日公開。",
      comingSoonTitle: "ウィッシュリスト",
      comingSoonBody:
        "この機能は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
    orders: {
      metaTitle: "ご注文 — Louve",
      metaDescription: "ご注文履歴 — 近日公開。",
      comingSoonTitle: "ご注文",
      comingSoonBody:
        "ご注文履歴は近日公開予定です。サイトは現在制作中です — またご覧ください。",
    },
  },
  homeFeature: {
    heroDescription:
      "本能。独立。領域。静かな力 — 意図をもって選び、纏うコンテンポラリーなファインジュエリー。",
    shopCollections: "コレクションを見る",
    exploreBrand: "ブランドを知る",
    instinctTitle: "本能",
    instinctBody: "自信をもって選ぶジュエリー。",
    independenceTitle: "独立",
    independenceBody: "身につける人が所有するラグジュアリー。",
    territoryTitle: "領域",
    territoryBody: "アイデンティティを刻む一品。",
    quietPowerTitle: "静かな力",
    quietPowerBody: "優雅さに宿る強さ。",
    collectionsHeading: "コレクション",
    collectionsSubtitle: "それぞれに個性があり、重ねるほどに映える。",
    fineJewelleryBadge: "ファインジュエリー",
    slugLabel: "スラッグ",
    ctaSubtitle:
      "ジュエリーは個人の署名 — 選び、所有し、意図をもって纏うもの。",
    browseNew: "新作を見る",
    visitStores: "店舗を見る",
    entryLuxury: "エントリーラグジュアリー",
    coreRange: "コアレンジ",
    elevatedPieces: "格上のピース",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
