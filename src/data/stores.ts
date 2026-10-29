export type StoreLocation = {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  note: string;
  image: string;
  imageAlt: string;
};

export const STORES: StoreLocation[] = [
  {
    id: "mumbai-bandra",
    city: "Mumbai",
    name: "Louve Bandra",
    address: "14 Linking Road, Bandra West",
    hours: "11:00 – 21:00",
    note: "Flagship boutique · private jewellery viewings",
    image: "/assets/slides/slide-02.png",
    imageAlt: "Louve Bandra boutique interior with warm gold light",
  },
  {
    id: "delhi-mek",
    city: "New Delhi",
    name: "Louve Mehrauli",
    address: "The Chanakya, Yashwant Place",
    hours: "11:00 – 20:30",
    note: "Atelier appointments · bridal suite",
    image: "/assets/slides/s6-col.png",
    imageAlt: "Louve Mehrauli boutique with sculptural jewellery display",
  },
  {
    id: "bengaluru-indiranagar",
    city: "Bengaluru",
    name: "Louve Indiranagar",
    address: "100 Feet Road, Indiranagar",
    hours: "11:00 – 21:00",
    note: "Quiet boutique · personal jewellery styling",
    image: "/assets/slides/slide-05.png",
    imageAlt: "Louve Indiranagar boutique with soft daylight",
  },
  {
    id: "jaipur-cscheme",
    city: "Jaipur",
    name: "Louve C-Scheme",
    address: "Mirza Ismail Road, C-Scheme",
    hours: "11:00 – 20:00",
    note: "Heritage store · gold craft desk",
    image: "/assets/slides/s6-col2.png",
    imageAlt: "Louve Jaipur boutique with heritage craft detailing",
  },
];
