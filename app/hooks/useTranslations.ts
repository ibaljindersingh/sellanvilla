import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Custom hook for using translations with proper typing
 * This provides better TypeScript support and error handling
 */
export function useTranslations() {
  const t = useNextIntlTranslations();
  
  return {
    t,
    // Helper function for nested translations
    tn: (key: string, values?: Record<string, any>) => {
      try {
        return t(key, values);
      } catch (error) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    },
    // Helper function for common translations
    common: {
      home: () => t('common.home'),
      shop: () => t('common.shop'),
      wishlist: () => t('common.wishlist'),
      contact: () => t('common.contact'),
      cart: () => t('common.cart'),
      search: () => t('common.search'),
      sort: () => t('common.sort'),
      filter: () => t('common.filter'),
      loading: () => t('common.loading'),
      error: () => t('common.error'),
      success: () => t('common.success'),
      cancel: () => t('common.cancel'),
      save: () => t('common.save'),
      delete: () => t('common.delete'),
      edit: () => t('common.edit'),
      add: () => t('common.add'),
      remove: () => t('common.remove'),
      continue: () => t('common.continue'),
      back: () => t('common.back'),
      next: () => t('common.next'),
      previous: () => t('common.previous'),
      close: () => t('common.close'),
      open: () => t('common.open'),
      yes: () => t('common.yes'),
      no: () => t('common.no')
    },
    // Helper function for product translations
    product: {
      addToCart: () => t('product.addToCart'),
      addingToCart: () => t('product.addingToCart'),
      addToWishlist: () => t('product.addToWishlist'),
      removeFromWishlist: () => t('product.removeFromWishlist'),
      moveToWishlist: () => t('product.moveToWishlist'),
      featured: () => t('product.featured'),
      oneSize: () => t('product.oneSize'),
      sizes: () => t('product.sizes'),
      viewDetails: () => t('product.viewDetails'),
      outOfStock: () => t('product.outOfStock'),
      inStock: () => t('product.inStock'),
      price: () => t('product.price'),
      category: () => t('product.category'),
      description: () => t('product.description')
    },
    // Helper function for cart translations
    cart: {
      shoppingCart: () => t('cart.shoppingCart'),
      continueShopping: () => t('cart.continueShopping'),
      checkout: () => t('cart.checkout'),
      emptyCart: () => t('cart.emptyCart'),
      cartTotal: () => t('cart.cartTotal'),
      subtotal: () => t('cart.subtotal'),
      tax: () => t('cart.tax'),
      shipping: () => t('cart.shipping'),
      total: () => t('cart.total'),
      quantity: () => t('cart.quantity'),
      removeItem: () => t('cart.removeItem'),
      updateQuantity: () => t('cart.updateQuantity'),
      proceedToCheckout: () => t('cart.proceedToCheckout'),
      cartItems: () => t('cart.cartItems')
    },
    // Helper function for shop translations
    shop: {
      searchProducts: () => t('shop.searchProducts'),
      sortByName: () => t('shop.sortByName'),
      sortByPriceLow: () => t('shop.sortByPriceLow'),
      sortByPriceHigh: () => t('shop.sortByPriceHigh'),
      sortByCategory: () => t('shop.sortByCategory'),
      advancedFilters: () => t('shop.advancedFilters'),
      priceRange: () => t('shop.priceRange'),
      under25: () => t('shop.under25'),
      under50: () => t('shop.under50'),
      under100: () => t('shop.under100'),
      over100: () => t('shop.over100'),
      priceRange25to50: () => t('shop.priceRange25to50'),
      priceRange50to100: () => t('shop.priceRange50to100'),
      shopByCategory: () => t('shop.shopByCategory'),
      featuredProducts: () => t('shop.featuredProducts'),
      shopNow: () => t('shop.shopNow'),
      viewAllProducts: () => t('shop.viewAllProducts'),
      onOrdersOver50: () => t('shop.onOrdersOver50')
    },
    // Helper function for footer translations
    footer: {
      craftedWithLove: () => t('footer.craftedWithLove'),
      allRightsReserved: () => t('footer.allRightsReserved'),
      facebook: () => t('footer.facebook'),
      email: () => t('footer.email')
    },
    // Helper function for error translations
    errors: {
      general: () => t('errors.general'),
      notFound: () => t('errors.notFound'),
      unauthorized: () => t('errors.unauthorized'),
      serverError: () => t('errors.serverError'),
      networkError: () => t('errors.networkError'),
      validationError: () => t('errors.validationError'),
      cartError: () => t('errors.cartError'),
      wishlistError: () => t('errors.wishlistError'),
      productNotFound: () => t('errors.productNotFound'),
      imageLoadError: () => t('errors.imageLoadError')
    },
    // Helper function for success translations
    success: {
      itemAddedToCart: () => t('success.itemAddedToCart'),
      itemRemovedFromCart: () => t('success.itemRemovedFromCart'),
      itemAddedToWishlist: () => t('success.itemAddedToWishlist'),
      itemRemovedFromWishlist: () => t('success.itemRemovedFromWishlist'),
      cartUpdated: () => t('success.cartUpdated'),
      wishlistUpdated: () => t('success.wishlistUpdated')
    }
  };
}
