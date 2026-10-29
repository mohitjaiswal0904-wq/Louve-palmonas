import { COLLECTION_PRODUCTS } from "./collection";
import { PRODUCT } from "./product";
import { STORE_PRODUCTS } from "./storeProducts";

export type PdpIdentity = {
  id: string;
  name: string;
  price: string;
  image: string;
  metalLine: string;
  subtitle: string;
};

const DEFAULT_PRODUCT: PdpIdentity = {
  id: PRODUCT.id,
  name: PRODUCT.name,
  price: PRODUCT.price,
  image: PRODUCT.hero,
  metalLine: PRODUCT.metalLine,
  subtitle: PRODUCT.subtitle,
};

export function resolvePdpProduct(productId: string | null): PdpIdentity {
  if (!productId || productId === PRODUCT.id) return DEFAULT_PRODUCT;

  const fromCollection = COLLECTION_PRODUCTS.find((item) => item.id === productId);
  if (fromCollection) {
    return {
      id: fromCollection.id,
      name: fromCollection.name,
      price: fromCollection.price,
      image: fromCollection.image,
      metalLine: "",
      subtitle: "",
    };
  }

  const fromStore = STORE_PRODUCTS.find((item) => item.id === productId);
  if (fromStore) {
    return {
      id: fromStore.id,
      name: fromStore.name,
      price: fromStore.price,
      image: fromStore.image,
      metalLine: fromStore.metal,
      subtitle: "",
    };
  }

  return DEFAULT_PRODUCT;
}
