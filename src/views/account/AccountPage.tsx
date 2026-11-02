import { useEffect, useState } from "react";
import { AuthForm } from "../../components/account/AuthForm";
import "../../components/account/account.css";
import { signOut, useAccount } from "../../lib/account";
import {
  getWishlist,
  removeWishlistItem,
  WISHLIST_EVENT,
  type WishlistItem,
} from "../../lib/wishlist";

type AccountPageProps = {
  onOpenProduct: (productId: string) => void;
};

export function AccountPage({ onOpenProduct }: AccountPageProps) {
  const account = useAccount();
  const [items, setItems] = useState<WishlistItem[]>(() => getWishlist());

  useEffect(() => {
    const sync = () => setItems(getWishlist());
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [account?.email]);

  return (
    <main className="account-page" id="account">
      {account ? (
        <>
          <header className="account-page__intro">
            <p className="account-page__eyebrow">Account</p>
            <h1 className="editorial-title account-page__title">{account.name}</h1>
            <p className="account-page__email">{account.email}</p>
          </header>

          <section className="account-page__saved" aria-label="Saved pieces">
            <h2>Wishlist</h2>
            {items.length === 0 ? (
              <p className="account-page__empty">
                Nothing saved yet. A heart on a product page keeps that piece with this account.
              </p>
            ) : (
              <ul className="account-page__list">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="account-page__product"
                      onClick={() => onOpenProduct(item.id)}
                    >
                      <img src={item.image} alt="" width={72} height={72} />
                      <span>
                        <span className="account-page__name">{item.name}</span>
                        {(item.metalLabel || item.size) && (
                          <span className="account-page__line">
                            {[
                              item.metalLabel,
                              item.size ? `Size ${item.size}` : null,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        )}
                        <span className="account-page__price">{item.price}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="account-page__remove"
                      onClick={() => removeWishlistItem(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <button type="button" className="account-page__signout" onClick={signOut}>
            Sign out
          </button>
        </>
      ) : (
        <section className="account-page__gate" aria-label="Sign in">
          <header className="account-page__intro">
            <p className="account-page__eyebrow">Account</p>
            <h1 className="editorial-title account-page__title">Your maison</h1>
            <p className="account-page__email">
              Sign in to see the pieces saved to this account.
            </p>
          </header>
          <AuthForm />
        </section>
      )}
    </main>
  );
}
