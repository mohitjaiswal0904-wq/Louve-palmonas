import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "pt",
  languageLabel: "Português",
  brand: {
    name: "Louve",
    tagline: "Marque sua presença.",
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
        title: "Essenciais em ouro",
        description: "Para combinar em camadas, misturar e usar sempre de novo.",
      },
      {
        slug: "diamond-staples",
        title: "Clássicos com diamantes",
        description: "Luxo do dia a dia com brilho discreto.",
      },
      {
        slug: "occasion-pieces",
        title: "Peças para ocasiões",
        description: "Peças especiais para momentos marcantes.",
      },
      {
        slug: "signature-louve-designs",
        title: "Signature Louve Designs",
        description: "Simbolismo primal, refinado globalmente.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — uma casa contemporânea de joalheria fina. Instinto. Independência. Território. Poder silencioso.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — uma casa contemporânea de joalheria fina. Instinto. Independência. Território. Poder silencioso.",
    brandLine: "Da casa Palmonas.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "Buscar", href: "/search" },
        { key: "wishlist", ariaLabel: "Lista de desejos", href: "/wishlist" },
        { key: "cart", ariaLabel: "Carrinho", href: "/cart" },
        { key: "account", ariaLabel: "Conta", href: "/account" },
      ],
    },
    userMenu: {
      profile: "Perfil",
      orders: "Pedidos",
      cart: "Carrinho",
      wishlist: "Lista de desejos",
      signOut: "Sair",
    },
    footer: [
      {
        title: "Empresa",
        links: [
          { key: "about", label: "Sobre", href: "/about" },
          { key: "stores", label: "Lojas", href: "/stores" },
          { key: "products", label: "Produtos", href: "/products" },
        ],
      },
      {
        title: "Suporte",
        links: [
          { key: "contact", label: "Contato", href: "/contact" },
          { key: "shipping", label: "Envio", href: "/shipping" },
          { key: "help", label: "Ajuda", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "Anéis", href: "/products?category=rings" },
        { label: "Brincos", href: "/products?category=earrings" },
        { label: "Pingentes", href: "/products?category=pendants" },
        { label: "Pulseiras", href: "/products?category=bracelets" },
        { label: "Anéis de noivado", href: "/products?category=engagement-rings" },
        { label: "Pedras preciosas", href: "/products?category=gemstones" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "Vista de coleção 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "Vista de coleção 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "Vista de coleção 3" },
      ],
      cta: { label: "Explorar mais", href: "/products" },
    },
  },
  common: {
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    back: "Voltar",
    browse: "Explorar",
    notes: "Observações",
    footerFromHouse: "Da casa Palmonas",
    copyright: "Todos os direitos reservados.",
    language: "Idioma",
    brandAlt: "Louve",
    loading: "Carregando",
  },
  catalog: {
    products: "Produtos",
    productCount: "{count} produtos",
    allBrands: "Todas as marcas",
    allTypes: "Todos os tipos",
    sortDefault: "Padrão",
    sortPriceLow: "Preço: menor para maior",
    sortPriceHigh: "Preço: maior para menor",
    sortTitleAZ: "Título: A–Z",
    sortTitleZA: "Título: Z–A",
    sortNewest: "Mais recentes primeiro",
    clearFilters: "Limpar filtros",
    noProducts: "Nenhum produto encontrado.",
    previous: "Anterior",
    next: "Próxima",
    sale: "SALE",
    noImage: "Sem imagem",
    sku: "SKU",
    searchPlaceholder: "Anéis de ouro, Mejuri, colares…",
    searchButton: "Buscar",
    searchTitle: "Busca",
    searchSubtitle: "Encontre joias por nome, marca ou categoria.",
    searchResultsFor: "Resultados para",
    searchResults: "{count} resultados",
    searchAgain: "Buscar de novo…",
    relevance: "Relevância",
    searching: "Buscando…",
    productNotFound: "Produto não encontrado.",
    similarProducts: "Você também pode gostar",
  },
  errors: {
    errorTitle: "Algo deu errado",
    errorBody:
      "Encontramos um problema ao carregar esta página da Louve. Tente novamente. Se o problema continuar, volte mais tarde.",
    tryAgain: "Tentar novamente",
    goHome: "Ir ao início",
    notFoundTitle: "Página não encontrada",
    notFoundBody:
      "A página que você procura não existe. Vamos levá-lo de volta à Louve.",
    globalTitle: "Encontramos um problema",
    globalBody:
      "A Louve encontrou um problema inesperado. Atualize a página. Se persistir, tente novamente mais tarde.",
    retry: "Tentar de novo",
    brandLine: "Louve · da casa Palmonas",
  },
  pages: {
    home: {
      metaTitle: "Louve — Da casa Palmonas.",
      metaDescription:
        "Louve — uma casa contemporânea de joalheria fina. Instinto. Independência. Território. Poder silencioso.",
      comingSoonTitle: "Em breve",
      comingSoonBody: "Este site está sendo criado — volte em breve.",
      heading: "Em breve",
      subheading: "Este site está sendo criado — volte em breve.",
    },
    about: {
      metaTitle: "Sobre — Louve",
      metaDescription:
        "Louve vem da palavra francesa para loba — instinto, independência, proteção e liderança discreta.",
      comingSoonTitle: "Sobre",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    collections: {
      metaTitle: "Coleções — Louve",
      metaDescription: "Explore as coleções Louve — em breve.",
      comingSoonTitle: "Coleções",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    products: {
      metaTitle: "Produtos — Louve",
      metaDescription: "Navegue pela nossa seleção curada de joias contemporâneas.",
      comingSoonTitle: "Produtos",
      comingSoonBody: "Navegue pela nossa seleção curada de joias contemporâneas.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Explore esta peça da coleção Louve.",
      comingSoonTitle: "Produto",
      comingSoonBody: "Explore esta peça da coleção Louve.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "ID do produto",
    },
    search: {
      metaTitle: "Busca — Louve",
      metaDescription: "Busque na nossa coleção de joias por nome, marca ou estilo.",
      comingSoonTitle: "Busca",
      comingSoonBody: "Busque na nossa coleção de joias.",
    },
    searchResults: {
      metaTitle: "Busca — Louve",
      metaDescription: "Resultados de busca da coleção Louve.",
      comingSoonTitle: "Resultados da busca",
      comingSoonBody: "Resultados de busca da coleção Louve.",
      metaTitleTemplate: "{query} — Busca — {siteName}",
      queryLabel: "Consulta",
    },
    contact: {
      metaTitle: "Contato — Louve",
      metaDescription: "Fale com a Louve — em breve.",
      comingSoonTitle: "Contato",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    stores: {
      metaTitle: "Lojas — Louve",
      metaDescription: "Lojas Louve — em breve.",
      comingSoonTitle: "Lojas",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    help: {
      metaTitle: "Ajuda — Louve",
      metaDescription: "Central de ajuda — em breve.",
      comingSoonTitle: "Ajuda",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    shipping: {
      metaTitle: "Envio — Louve",
      metaDescription: "Informações de envio — em breve.",
      comingSoonTitle: "Envio",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    authLogin: {
      metaTitle: "Entrar — Louve",
      metaDescription: "Entre na sua conta Louve — em breve.",
      comingSoonTitle: "Entrar",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    authSignup: {
      metaTitle: "Criar conta — Louve",
      metaDescription: "Crie sua conta Louve — em breve.",
      comingSoonTitle: "Criar conta",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    authForgotPassword: {
      metaTitle: "Esqueci a senha — Louve",
      metaDescription: "Redefina sua senha Louve.",
      comingSoonTitle: "Esqueci a senha",
      comingSoonBody: "Digite seu e-mail e enviaremos um link para redefinir.",
    },
    authResetPassword: {
      metaTitle: "Redefinir senha — Louve",
      metaDescription: "Escolha uma nova senha para sua conta Louve.",
      comingSoonTitle: "Redefinir senha",
      comingSoonBody: "Defina uma nova senha para sua conta.",
    },
    account: {
      metaTitle: "Conta — Louve",
      metaDescription: "Sua conta Louve — em breve.",
      comingSoonTitle: "Conta",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    cart: {
      metaTitle: "Carrinho — Louve",
      metaDescription: "Seu carrinho de compras — em breve.",
      comingSoonTitle: "Carrinho",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    wishlist: {
      metaTitle: "Lista de desejos — Louve",
      metaDescription: "Sua lista de desejos — em breve.",
      comingSoonTitle: "Lista de desejos",
      comingSoonBody:
        "Este recurso chega em breve. O site está sendo criado — volte em breve.",
    },
    orders: {
      metaTitle: "Pedidos — Louve",
      metaDescription: "Seu histórico de pedidos — em breve.",
      comingSoonTitle: "Pedidos",
      comingSoonBody:
        "O histórico de pedidos chega em breve. O site está sendo criado — volte em breve.",
    },
  },
  homeFeature: {
    heroDescription:
      "Instinto. Independência. Território. Poder silencioso — joalheria fina contemporânea escolhida e usada com intenção.",
    shopCollections: "Ver coleções",
    exploreBrand: "Conhecer a marca",
    instinctTitle: "Instinto",
    instinctBody: "Joias escolhidas com confiança.",
    independenceTitle: "Independência",
    independenceBody: "Luxo que pertence a quem usa.",
    territoryTitle: "Território",
    territoryBody: "Peças que marcam identidade.",
    quietPowerTitle: "Poder silencioso",
    quietPowerBody: "Força expressa com elegância.",
    collectionsHeading: "Coleções",
    collectionsSubtitle: "Cada coleção tem personalidade própria e combina ainda melhor junto.",
    fineJewelleryBadge: "Joalheria fina",
    slugLabel: "Slug",
    ctaSubtitle:
      "Joias são uma assinatura pessoal — escolhidas, conquistadas e usadas com intenção.",
    browseNew: "Ver novidades",
    visitStores: "Visitar lojas",
    entryLuxury: "Luxo de entrada",
    coreRange: "Linha principal",
    elevatedPieces: "Peças elevadas",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
