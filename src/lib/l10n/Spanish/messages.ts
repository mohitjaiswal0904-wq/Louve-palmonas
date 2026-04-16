import type { AppMessages } from "@/types/config/messages";

export const messages = {
  locale: "es",
  languageLabel: "Español",
  brand: {
    name: "Louve",
    tagline: "Marca tu presencia.",
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
        title: "Esenciales en oro central",
        description: "Creadas para combinar, superponer y volver una y otra vez.",
      },
      {
        slug: "diamond-staples",
        title: "Básicos con diamante",
        description: "Lujo cotidiano con un brillo discreto.",
      },
      {
        slug: "occasion-pieces",
        title: "Piezas para ocasiones",
        description: "Piezas elevadas para momentos memorables.",
      },
      {
        slug: "signature-louve-designs",
        title: "Diseños signature Louve",
        description: "Simbolismo primal, refinado a escala global.",
      },
    ],
  },
  site: {
    name: "Louve",
    description:
      "Louve — una casa de joyería fina contemporánea. Instinto. Independencia. Territorio. Poder silencioso.",
    parentBrand: "Palmonas",
  },
  seo: {
    siteName: "Louve",
    defaultDescription:
      "Louve — una casa de joyería fina contemporánea. Instinto. Independencia. Territorio. Poder silencioso.",
    brandLine: "De la casa de Palmonas.",
  },
  navigation: {
    header: {
      actions: [
        { key: "search", ariaLabel: "Buscar", href: "/search" },
        { key: "wishlist", ariaLabel: "Lista de deseos", href: "/wishlist" },
        { key: "cart", ariaLabel: "Cesta", href: "/cart" },
        { key: "account", ariaLabel: "Cuenta", href: "/account" },
      ],
    },
    userMenu: {
      profile: "Perfil",
      orders: "Pedidos",
      cart: "Carrito",
      wishlist: "Lista de deseos",
      signOut: "Cerrar sesión",
    },
    footer: [
      {
        title: "Empresa",
        links: [
          { key: "about", label: "Acerca de", href: "/about" },
          { key: "collections", label: "Colecciones", href: "/collections" },
          { key: "products", label: "Productos", href: "/products" },
        ],
      },
      {
        title: "Soporte",
        links: [
          { key: "contact", label: "Contacto", href: "/contact" },
          { key: "shipping", label: "Envíos", href: "/shipping" },
          { key: "help", label: "Ayuda", href: "/help" },
        ],
      },
    ],
    megaMenu: {
      categories: [
        { label: "Anillos", href: "/collections/rings" },
        { label: "Pendientes", href: "/collections/earrings" },
        { label: "Colgantes", href: "/collections/pendants" },
        { label: "Pulseras", href: "/collections/bracelets" },
        { label: "Collares", href: "/collections/necklaces" },
        { label: "Todas las colecciones", href: "/collections/all" },
      ],
      gallery: [
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-fourth-image-5d7a8ff1.png", alt: "Vista de colección 1" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-third-image-f00e6cb4.png", alt: "Vista de colección 2" },
        { src: "https://d2ppgkj0vs05g5.cloudfront.net/cms/media/2026/04/louve-hero-section-eighth-image-89e96d50.jpg", alt: "Vista de colección 3" },
      ],
      cta: { label: "Explorar más", href: "/products" },
    },
  },
  common: {
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    back: "Atrás",
    browse: "Explorar",
    notes: "Notas",
    footerFromHouse: "De la casa de Palmonas",
    copyright: "Todos los derechos reservados.",
    language: "Idioma",
    brandAlt: "Louve",
    loading: "Cargando",
    popularSearchesHeading: "Búsquedas populares",
  },
  catalog: {
    products: "Productos",
    productCount: "{count} productos",
    allBrands: "Todas las marcas",
    allTypes: "Todos los tipos",
    sortDefault: "Predeterminado",
    sortPriceLow: "Precio: menor a mayor",
    sortPriceHigh: "Precio: mayor a menor",
    sortTitleAZ: "Título: A–Z",
    sortTitleZA: "Título: Z–A",
    sortNewest: "Más recientes",
    clearFilters: "Limpiar filtros",
    noProducts: "No se encontraron productos.",
    previous: "Anterior",
    next: "Siguiente",
    sale: "OFERTA",
    noImage: "Sin imagen",
    sku: "SKU",
    searchPlaceholder: "Anillos de oro, Mejuri, Collares…",
    searchButton: "Buscar",
    searchTitle: "Buscar",
    searchSubtitle: "Encuentra joyería por nombre, marca o categoría.",
    searchResultsFor: "Resultados para",
    searchResults: "{count} resultados",
    searchAgain: "Buscar de nuevo…",
    relevance: "Relevancia",
    searching: "Buscando…",
    productNotFound: "Producto no encontrado.",
    similarProducts: "También te puede gustar",
    addToCart: "Añadir al carrito",
    addingToCart: "Añadiendo…",
    buyNow: "Comprar ahora",
    signInToAddToCart: "Inicia sesión para añadir artículos al carrito",
    variantUnavailable: "Esta opción no está disponible.",
  },
  errors: {
    errorTitle: "Algo salió mal",
    errorBody:
      "Hubo un problema al cargar esta página de Louve. Inténtalo de nuevo. Si continúa, vuelve más tarde.",
    tryAgain: "Intentar de nuevo",
    goHome: "Ir al inicio",
    notFoundTitle: "Página no encontrada",
    notFoundBody:
      "La página que buscas no existe. Volvamos a Louve.",
    globalTitle: "Encontramos un problema",
    globalBody:
      "Louve tuvo un problema inesperado. Actualiza la página. Si persiste, inténtalo más tarde.",
    retry: "Reintentar",
    brandLine: "Louve · de la casa de Palmonas",
  },
  pages: {
    home: {
      metaTitle: "Louve — De la casa de Palmonas.",
      metaDescription:
        "Louve — una casa de joyería fina contemporánea. Instinto. Independencia. Territorio. Poder silencioso.",
      comingSoonTitle: "Próximamente",
      comingSoonBody: "Este sitio está en preparación — vuelve pronto.",
      heading: "Próximamente",
      subheading: "Este sitio está en preparación — vuelve pronto.",
    },
    about: {
      metaTitle: "Acerca de — Louve",
      metaDescription:
        "Louve proviene de la palabra francesa para loba — instinto, independencia, protección y liderazgo silencioso.",
      comingSoonTitle: "Acerca de",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    collections: {
      metaTitle: "Colecciones — Louve",
      metaDescription: "Explora las colecciones Louve — próximamente.",
      comingSoonTitle: "Colecciones",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    products: {
      metaTitle: "Productos — Louve",
      metaDescription: "Compra productos Louve — próximamente.",
      comingSoonTitle: "Productos",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    productDetail: {
      metaTitle: "{slug} — Louve",
      metaDescription: "Página de producto — próximamente.",
      comingSoonTitle: "Producto",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
      metaTitleTemplate: "{slug} — {siteName}",
      productIdLabel: "Id. de producto",
    },
    search: {
      metaTitle: "Búsqueda — Louve",
      metaDescription: "Búsqueda — próximamente.",
      comingSoonTitle: "Búsqueda",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    searchResults: {
      metaTitle: "Búsqueda — Louve",
      metaDescription: "Resultados de búsqueda — próximamente.",
      comingSoonTitle: "Búsqueda",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
      metaTitleTemplate: "{query} — Búsqueda — {siteName}",
      queryLabel: "Consulta",
    },
    contact: {
      metaTitle: "Contacto — Louve",
      metaDescription: "Contacta con Louve — próximamente.",
      comingSoonTitle: "Contacto",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    stores: {
      metaTitle: "Tiendas — Louve",
      metaDescription: "Tiendas Louve — próximamente.",
      comingSoonTitle: "Tiendas",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    help: {
      metaTitle: "Ayuda — Louve",
      metaDescription: "Centro de ayuda — próximamente.",
      comingSoonTitle: "Ayuda",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    shipping: {
      metaTitle: "Envíos — Louve",
      metaDescription: "Información de envíos — próximamente.",
      comingSoonTitle: "Envíos",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    authLogin: {
      metaTitle: "Iniciar sesión — Louve",
      metaDescription: "Accede a tu cuenta Louve — próximamente.",
      comingSoonTitle: "Iniciar sesión",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    authSignup: {
      metaTitle: "Crear cuenta — Louve",
      metaDescription: "Crea tu cuenta Louve — próximamente.",
      comingSoonTitle: "Crear cuenta",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    authForgotPassword: {
      metaTitle: "Olvidé mi contraseña — Louve",
      metaDescription: "Restablece tu contraseña Louve.",
      comingSoonTitle: "Olvidé mi contraseña",
      comingSoonBody: "Ingresa tu correo y te enviaremos un enlace de restablecimiento.",
    },
    authResetPassword: {
      metaTitle: "Restablecer contraseña — Louve",
      metaDescription: "Elige una nueva contraseña para tu cuenta Louve.",
      comingSoonTitle: "Restablecer contraseña",
      comingSoonBody: "Establece una nueva contraseña para tu cuenta.",
    },
    account: {
      metaTitle: "Cuenta — Louve",
      metaDescription: "Tu cuenta Louve — próximamente.",
      comingSoonTitle: "Cuenta",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    cart: {
      metaTitle: "Cesta — Louve",
      metaDescription: "Tu cesta de compra — próximamente.",
      comingSoonTitle: "Cesta",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    wishlist: {
      metaTitle: "Lista de deseos — Louve",
      metaDescription: "Tu lista de deseos — próximamente.",
      comingSoonTitle: "Lista de deseos",
      comingSoonBody:
        "Esta función llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
    orders: {
      metaTitle: "Pedidos — Louve",
      metaDescription: "Tu historial de pedidos — próximamente.",
      comingSoonTitle: "Pedidos",
      comingSoonBody:
        "El historial de pedidos llegará pronto. El sitio está en preparación — vuelve pronto.",
    },
  },
  homeFeature: {
    heroDescription:
      "Instinto. Independencia. Territorio. Poder silencioso — joyería fina contemporánea elegida y llevada con intención.",
    shopCollections: "Ver colecciones",
    exploreBrand: "Explorar la marca",
    instinctTitle: "Instinto",
    instinctBody: "Joyería elegida con confianza.",
    independenceTitle: "Independencia",
    independenceBody: "Un lujo que pertenece a quien lo lleva.",
    territoryTitle: "Territorio",
    territoryBody: "Piezas que marcan identidad.",
    quietPowerTitle: "Poder silencioso",
    quietPowerBody: "Fuerza expresada con elegancia.",
    collectionsHeading: "Colecciones",
    collectionsSubtitle: "Cada colección tiene su carácter y juntas funcionan aún mejor.",
    fineJewelleryBadge: "Joyería fina",
    slugLabel: "Slug",
    ctaSubtitle:
      "La joyería es una firma personal — elegida, vivida y lucida con intención.",
    browseNew: "Ver novedades",
    visitStores: "Visitar tiendas",
    entryLuxury: "Lujo de entrada",
    coreRange: "Gama central",
    elevatedPieces: "Piezas elevadas",
    priceEntryLuxury: "₹1L – ₹2.5L",
    priceCoreRange: "₹2.5L – ₹5L",
    priceElevated: "₹5L+",
  },
} as const satisfies AppMessages;
