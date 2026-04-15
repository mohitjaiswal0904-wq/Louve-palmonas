/** Catalog types matching the Go backend catalog module DTOs. */

export type MoneyDTO = {
  amount: string;
  currency: string;
};

export type ImageDTO = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VariantDTO = {
  id: number;
  title: string;
  price: MoneyDTO;
  compare_at_price?: MoneyDTO;
  sku: string;
  option1?: string;
  option2?: string;
  option3?: string;
  weight: number;
  weight_unit: string;
  available: boolean;
  image_id?: number;
};

export type OptionDTO = {
  name: string;
  values: string[];
};

export type ProductDTO = {
  id: number;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  tags: string[];
  price: MoneyDTO;
  compare_at_price?: MoneyDTO;
  image?: ImageDTO;
  created_at: string;
  updated_at: string;
  variants?: VariantDTO[];
};

export type ProductDetailDTO = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  price: MoneyDTO;
  compare_at_price?: MoneyDTO;
  variants: VariantDTO[];
  options: OptionDTO[];
  images: ImageDTO[];
  created_at: string;
  updated_at: string;
};

export type VendorDTO = {
  name: string;
  count: number;
};

export type ProductTypeDTO = {
  name: string;
  count: number;
};

export type FiltersDTO = {
  vendors: VendorDTO[];
  product_types: ProductTypeDTO[];
  currencies: string[];
};

export type ProductListParams = {
  page?: number;
  limit?: number;
  vendor?: string;
  product_type?: string;
  min_price?: string;
  max_price?: string;
  sort_by?: string;
  sort_order?: string;
  currency?: string;
};

// Collections

export type CollectionDTO = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  parent_slug?: string | null;
  product_count: number;
  children?: CollectionDTO[];
  seo_title?: string;
  seo_description?: string;
};

export type CollectionDetailDTO = CollectionDTO & {
  products: ProductDTO[];
  total: number;
  page: number;
  total_pages: number;
};

export type { Collection, Currency, Money, Product } from "./commerce";
