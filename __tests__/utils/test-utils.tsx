import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

// Mock messages for testing
const mockMessages = {
  common: {
    home: 'Home',
    shop: 'Shop',
    wishlist: 'Wishlist',
    contact: 'Contact',
    cart: 'Cart',
    search: 'Search',
    sort: 'Sort',
    filter: 'Filter',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No'
  },
  navigation: {
    home: 'Home',
    shop: 'Shop',
    wishlist: 'Wishlist',
    contact: 'Contact',
    cart: 'Cart'
  },
  product: {
    addToCart: 'Add to Cart',
    addingToCart: 'Adding...',
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    moveToWishlist: 'Move to wishlist',
    featured: 'Featured',
    oneSize: 'One size',
    sizes: 'sizes',
    viewDetails: 'View Details',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    price: 'Price',
    category: 'Category',
    description: 'Description'
  },
  cart: {
    shoppingCart: 'Shopping Cart',
    continueShopping: 'Continue Shopping',
    checkout: 'Checkout',
    emptyCart: 'Your cart is empty',
    cartTotal: 'Cart Total',
    subtotal: 'Subtotal',
    tax: 'Tax',
    shipping: 'Shipping',
    total: 'Total',
    quantity: 'Quantity',
    removeItem: 'Remove Item',
    updateQuantity: 'Update Quantity',
    proceedToCheckout: 'Proceed to Checkout',
    cartItems: 'Cart Items'
  },
  shop: {
    searchProducts: 'Search products...',
    sortByName: 'Sort by Name',
    sortByPriceLow: 'Price: Low to High',
    sortByPriceHigh: 'Price: High to Low',
    sortByCategory: 'Sort by Category',
    advancedFilters: 'Advanced Filters',
    priceRange: 'Price Range',
    under25: 'Under $25',
    under50: 'Under $50',
    under100: 'Under $100',
    over100: 'Over $100',
    priceRange25to50: '$25 - $50',
    priceRange50to100: '$50 - $100',
    shopByCategory: 'Shop by Category',
    featuredProducts: 'Featured Products',
    shopNow: 'Shop Now',
    viewAllProducts: 'View All Products',
    onOrdersOver50: 'On orders over $50'
  },
  footer: {
    craftedWithLove: 'Crafted with love in Brampton. Quality fabrics, size-inclusive options.',
    allRightsReserved: 'All rights reserved.',
    facebook: 'Facebook',
    email: 'Email'
  },
  errors: {
    general: 'Something went wrong. Please try again.',
    notFound: 'Page not found.',
    unauthorized: 'You are not authorized to access this page.',
    serverError: 'Server error. Please try again later.',
    networkError: 'Network error. Please check your connection.',
    validationError: 'Please check your input and try again.',
    cartError: 'Error updating cart. Please try again.',
    wishlistError: 'Error updating wishlist. Please try again.',
    productNotFound: 'Product not found.',
    imageLoadError: 'Error loading image.'
  },
  success: {
    itemAddedToCart: 'Item added to cart successfully.',
    itemRemovedFromCart: 'Item removed from cart successfully.',
    itemAddedToWishlist: 'Item added to wishlist successfully.',
    itemRemovedFromWishlist: 'Item removed from wishlist successfully.',
    cartUpdated: 'Cart updated successfully.',
    wishlistUpdated: 'Wishlist updated successfully.'
  }
};

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  return ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const keys = key.split('.');
    let value: any = mockMessages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  },
  getTranslations: () => (key: string) => {
    const keys = key.split('.');
    let value: any = mockMessages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  },
  useLocale: () => 'en',
  useNow: () => new Date(),
  useTimeZone: () => 'UTC',
}));

// Mock constants
jest.mock('../../app/constants', () => ({
  CONSTANTS: {
    SYSTEM: {
      DEFAULTS: {
        MAX_CART_ITEMS: 99
      }
    },
    ERRORS: {
      NETWORK: {
        FETCH_FAILED: 'Failed to fetch data from server',
        IMAGE_LOAD_ERROR: 'Error loading image'
      },
      CART: {
        CART_ERROR: 'Error updating cart. Please try again.'
      },
      WISHLIST: {
        WISHLIST_ERROR: 'Error updating wishlist. Please try again.'
      }
    }
  }
}));

// Mock products data
export const mockProducts = [
  {
    slug: 'test-product-1',
    name: 'Test Product 1',
    category: 'Test Category',
    price: 29.99,
    sizes: ['S', 'M', 'L'],
    description: 'This is a test product description for testing purposes.',
    images: ['/test-image-1.jpg', '/test-image-2.jpg']
  },
  {
    slug: 'test-product-2',
    name: 'Test Product 2',
    category: 'Test Category',
    price: 49.99,
    sizes: ['M', 'L'],
    description: 'Another test product description for testing purposes.',
    images: ['/test-image-3.jpg']
  },
  {
    slug: 'test-product-3',
    name: 'Test Product 3',
    category: 'Another Category',
    price: 79.99,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Yet another test product description for testing purposes.',
    images: ['/test-image-4.jpg', '/test-image-5.jpg', '/test-image-6.jpg']
  }
];

export function createMockProduct(overrides: Partial<typeof mockProducts[0]> = {}) {
  return {
    slug: 'mock-product',
    name: 'Mock Product',
    category: 'Mock Category',
    price: 39.99,
    sizes: ['S', 'M', 'L'],
    description: 'This is a mock product for testing.',
    images: ['/mock-image-1.jpg', '/mock-image-2.jpg'],
    ...overrides
  };
}

// Custom render function that includes all necessary providers
function render(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <NextIntlClientProvider messages={mockMessages}>
      {children}
    </NextIntlClientProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything
export * from '@testing-library/react';
export { render };
