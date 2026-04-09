import type { ComponentType } from "react";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

type HeaderAction = {
  key: string;
  href: string;
  ariaLabel: string;
  icon: ComponentType<{ className?: string }>;
};

export const headerNav = {
  actions: [
    { key: "search", href: "/search", ariaLabel: "Search", icon: Search },
    { key: "wishlist", href: "/wishlist", ariaLabel: "Wishlist", icon: Heart },
    { key: "cart", href: "/cart", ariaLabel: "Cart", icon: ShoppingBag },
    { key: "account", href: "/account", ariaLabel: "Account", icon: User },
  ] satisfies HeaderAction[],
} as const;
