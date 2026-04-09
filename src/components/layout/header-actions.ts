import type { ComponentType } from "react";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

export const HEADER_ACTION_ICONS: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  search: Search,
  wishlist: Heart,
  cart: ShoppingBag,
  account: User,
};
