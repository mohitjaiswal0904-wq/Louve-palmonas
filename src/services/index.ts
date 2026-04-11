export { healthCheck } from "./health.service";

export {
  sendOTP,
  verifyOTP,
  logout,
  updateProfile,
  getMe,
} from "./auth.service";

export {
  listProducts,
  getProductByHandle,
  getProductById,
  getFilters,
} from "./catalog.service";

export {
  searchProducts,
  getTopSearches,
  getRecentSearches,
  getSuggestions,
  getAutocomplete,
} from "./search.service";

export {
  addToWishlist,
  listWishlist,
  getWishlistCount,
  checkWishlist,
  getWishlistProductIds,
  updateWishlistItem,
  removeWishlistItem,
  removeWishlistByProduct,
  moveWishlistToCart,
} from "./wishlist.service";

export {
  addToCart,
  getCartSummary,
  getCartCount,
  updateCartItem,
  removeCartItem,
  removeMultipleCartItems,
  clearCart,
} from "./cart.service";

export {
  createOrder,
  listOrders,
  getOrderCount,
  getOrder,
  getOrderByNumber,
  simulateCheckout,
  cancelOrder,
} from "./order.service";

export {
  createAddress,
  listAddresses,
  getAddress,
  getDefaultAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
} from "./address.service";

export {
  payOrder,
  verifyRazorpayPayment,
  getPaymentByOrder,
  listPayments,
  requestRefund,
} from "./payment.service";
