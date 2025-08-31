import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { CartProvider } from '../../app/contexts/CartContext'
import { WishlistProvider } from '../../app/contexts/WishlistContext'

// Mock data for testing
export const mockProducts = [
  {
    slug: 'test-product-1',
    name: 'Test Product 1',
    category: 'Test Category',
    price: 29.99,
    sizes: ['S', 'M', 'L'],
    description: 'A test product for testing purposes',
    images: ['/test-image-1.jpg', '/test-image-2.jpg'],
  },
  {
    slug: 'test-product-2',
    name: 'Test Product 2',
    category: 'Another Category',
    price: 49.99,
    sizes: ['M', 'L'],
    description: 'Another test product',
    images: ['/test-image-3.jpg'],
  },
  {
    slug: 'test-product-3',
    name: 'Test Product 3',
    category: 'Test Category',
    price: 79.99,
    sizes: ['One Size'],
    description: 'A third test product',
    images: ['/test-image-4.jpg'],
  },
]

export const mockCartItem = {
  id: 'test-product-1',
  name: 'Test Product 1',
  price: 29.99,
  image: '/test-image-1.jpg',
  quantity: 1,
  size: 'M',
}

export const mockWishlistItem = {
  id: 'test-product-1',
  name: 'Test Product 1',
  price: 29.99,
  image: '/test-image-1.jpg',
  category: 'Test Category',
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Helper function to create mock product with custom properties
export const createMockProduct = (overrides: Partial<typeof mockProducts[0]> = {}) => ({
  ...mockProducts[0],
  ...overrides,
})

// Helper function to create mock cart item with custom properties
export const createMockCartItem = (overrides: Partial<typeof mockCartItem> = {}) => ({
  ...mockCartItem,
  ...overrides,
})

// Helper function to create mock wishlist item with custom properties
export const createMockWishlistItem = (overrides: Partial<typeof mockWishlistItem> = {}) => ({
  ...mockWishlistItem,
  ...overrides,
})

// Mock localStorage helpers
export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// Setup localStorage mock
export const setupLocalStorageMock = () => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  })
}

// Clear all mocks
export const clearAllMocks = () => {
  jest.clearAllMocks()
  mockLocalStorage.getItem.mockClear()
  mockLocalStorage.setItem.mockClear()
  mockLocalStorage.removeItem.mockClear()
  mockLocalStorage.clear.mockClear()
}
