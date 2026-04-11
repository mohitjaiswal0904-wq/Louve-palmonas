import { redirect } from "next/navigation";

/** Stores / retail presence paused — send direct links to cart. */
export default function StoresPage() {
  redirect("/cart");
}
