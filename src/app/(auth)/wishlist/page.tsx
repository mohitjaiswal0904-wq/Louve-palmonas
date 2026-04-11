import { redirect } from "next/navigation";

/** Wishlist UI paused — send direct links to cart. */
export default function WishlistPage() {
  redirect("/cart");
}
