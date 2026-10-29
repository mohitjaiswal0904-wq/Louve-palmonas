export const PRODUCT = {
  name: "Twist Wave",
  metalLine: "9KT Gold",
  subtitle: "Lab Grown Diamond Mangalsutra",
  price: "₹2,27,725",
  hero: "/assets/pdp/hero.png",
  gallery: [
    "/assets/pdp/gallery-1.png",
    "/assets/pdp/gallery-2.png",
    "/assets/pdp/gallery-3.png",
    "/assets/pdp/gallery-4.png",
    "/assets/pdp/gallery-5.png",
  ],
  metals: [
    { src: "/assets/pdp/metal-1.png", label: "White Gold" },
    { src: "/assets/pdp/metal-2.png", label: "Yellow Gold" },
    { src: "/assets/pdp/metal-3.png", label: "Rose Gold" },
  ],
  usps: [
    {
      src: "/assets/pdp/usp-hallmark.svg",
      title: "BIS Hallmark",
      note: "Purity verified",
    },
    {
      src: "/assets/pdp/usp-certified.svg",
      title: "SGL / IGI",
      note: "Diamond certified",
    },
    {
      src: "/assets/pdp/usp-buyback.svg",
      title: "Lifetime Buyback",
      note: "Value that endures",
    },
    {
      src: "/assets/pdp/usp-exchange.svg",
      title: "Easy Exchange",
      note: "Effortless returns",
    },
  ],
  sizes: [7, 8, 9, 10] as const,
  tabs: [
    "Product Details",
    "Price Details",
    "Description",
    "Shipping",
    "Returns",
  ] as const,
  detailColumns: [
    {
      title: "Metal",
      rows: [
        ["Type", "Gold"],
        ["Purity", "9KT"],
        ["Colour", "Yellow"],
        ["Net weight", "2.768g"],
        ["Length", "2.0mm"],
      ],
    },
    {
      title: "Diamonds",
      guide: true,
      rows: [
        ["Shape", "Round, Square"],
        ["Cut", "Brilliant"],
        ["Clarity", "VS"],
        ["Colour", "F–G"],
        ["Count", "2"],
        ["Carat", "2.567ct"],
      ],
    },
    {
      title: "Dimensions",
      rows: [
        ["Width", "9.5mm"],
        ["Height", "32mm"],
        ["Gross weight", "1.509g"],
      ],
    },
  ],
  priceRows: [
    ["Metal value", "₹1,42,800"],
    ["Diamond value", "₹68,450"],
    ["Making charges", "₹12,200"],
    ["GST (3%)", "₹4,275"],
    ["Total", "₹2,27,725"],
  ],
  description:
    "Twist Wave is a study in quiet movement — interlocking curves of 9KT gold set with lab-grown diamonds that catch light the way LOUVE intends: softly, then all at once. Crafted for the modern muse who values lineage without excess, each mangalsutra is finished by hand in our atelier.",
  shipping:
    "Complimentary insured delivery across India within 5–7 working days. International shipping is available on request. Every LOUVE piece leaves our maison sealed, authenticated, and ready to gift.",
  returns:
    "Easy exchange within 15 days of delivery for unused pieces in original packaging. Lifetime buyback available on gold and diamond value as per prevailing rates. Speak with a LOUVE expert for a tailored arrangement.",
} as const;

export type ProductSize = (typeof PRODUCT.sizes)[number];
export type ProductTab = (typeof PRODUCT.tabs)[number];
