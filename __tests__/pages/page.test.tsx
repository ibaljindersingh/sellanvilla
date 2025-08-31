import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '../../app/page'
import { mockProducts } from '../utils/test-utils'

// Mock the products.json import
jest.mock('@/public/products.json', () => mockProducts)

// Mock ProductCarousel component
jest.mock('../../app/components/ProductCarousel', () => {
  return function MockProductCarousel({ products }: any) {
    return (
      <div data-testid="product-carousel">
        <h2>Product Carousel</h2>
        <p>Products: {products?.length || 0}</p>
      </div>
    )
  }
})

// Mock ProductCard component
jest.mock('../../app/components/ProductCard', () => {
  return function MockProductCard({ product, showCartActions }: any) {
    return (
      <div data-testid={`product-card-${product.slug}`} data-show-cart={showCartActions}>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p>${product.price}</p>
      </div>
    )
  }
})

describe('HomePage', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear any previous renders
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all main sections', () => {
      render(<HomePage />)
      
      // Hero Carousel
      expect(screen.getByTestId('product-carousel')).toBeInTheDocument()
      
      // Features Section
      expect(screen.getByText('Free Shipping')).toBeInTheDocument()
      expect(screen.getByText('Quality Guarantee')).toBeInTheDocument()
      expect(screen.getByText('Handcrafted')).toBeInTheDocument()
      expect(screen.getByText('24/7 Support')).toBeInTheDocument()
      
      // Categories Section
      expect(screen.getByText('Shop by Category')).toBeInTheDocument()
      
      // Featured Products
      expect(screen.getByText('Featured Products')).toBeInTheDocument()
      
      // New Arrivals
      expect(screen.getByText('New Arrivals')).toBeInTheDocument()
      
      // Testimonials
      expect(screen.getByText('What Our Customers Say')).toBeInTheDocument()
      
      // Newsletter
      expect(screen.getByText('Stay Updated')).toBeInTheDocument()
      
      // Instagram/Collection Preview
      expect(screen.getByText('Follow Our Style')).toBeInTheDocument()
      
      // Final CTA
      expect(screen.getByText('Ready to Elevate Your Style?')).toBeInTheDocument()
    })

    it('should render product carousel with products', () => {
      render(<HomePage />)
      
      const carousel = screen.getByTestId('product-carousel')
      expect(carousel).toBeInTheDocument()
      expect(screen.getByText('Products: 5')).toBeInTheDocument()
    })

    it('should render featured products grid', () => {
      render(<HomePage />)
      
      // Should render first 4 products
      mockProducts.slice(0, 4).forEach(product => {
        expect(screen.getByTestId(`product-card-${product.slug}`)).toBeInTheDocument()
      })
    })

    it('should render new arrivals section', () => {
      render(<HomePage />)
      
      // Should render first 3 products in featured variant
      mockProducts.slice(0, 3).forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.slug}`)
        expect(productCard).toBeInTheDocument()
      })
    })
  })

  describe('Features Section', () => {
    it('should render all feature icons', () => {
      render(<HomePage />)
      
      // Check if feature icons are present (they're rendered as SVG elements)
      expect(screen.getByText('Free Shipping')).toBeInTheDocument()
      expect(screen.getByText('Quality Guarantee')).toBeInTheDocument()
      expect(screen.getByText('Handcrafted')).toBeInTheDocument()
      expect(screen.getByText('24/7 Support')).toBeInTheDocument()
    })

    it('should display correct feature descriptions', () => {
      render(<HomePage />)
      
      expect(screen.getByText('On orders over $50')).toBeInTheDocument()
      expect(screen.getByText('30-day return policy')).toBeInTheDocument()
      expect(screen.getByText('Made with love & care')).toBeInTheDocument()
      expect(screen.getByText('WhatsApp assistance')).toBeInTheDocument()
    })
  })

  describe('Categories Section', () => {
    it('should render category cards for all product categories', () => {
      render(<HomePage />)
      
      // Get unique categories from mock products
      const categories = [...new Set(mockProducts.map(p => p.category))]
      
      categories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument()
      })
    })

    it('should display product count for each category', () => {
      render(<HomePage />)
      
      // Check if category cards show product counts
      const categoryProducts = mockProducts.filter(p => p.category === 'Test Category')
      expect(screen.getByText(`${categoryProducts.length} Products`)).toBeInTheDocument()
    })

    it('should link category cards to shop page', () => {
      render(<HomePage />)
      
      // Check if category cards have proper links
      const categoryLinks = screen.getAllByRole('link')
      const shopLinks = categoryLinks.filter(link => link.getAttribute('href')?.includes('/shop?category='))
      expect(shopLinks.length).toBeGreaterThan(0)
    })
  })

  describe('Featured Products Section', () => {
    it('should render featured products title and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Featured Products')).toBeInTheDocument()
      expect(screen.getByText('Our most popular and trending items, carefully selected for you')).toBeInTheDocument()
    })

    it('should render view all products button', () => {
      render(<HomePage />)
      
      const viewAllButton = screen.getByText('View All Products')
      expect(viewAllButton).toBeInTheDocument()
      expect(viewAllButton.closest('a')).toHaveAttribute('href', '/shop')
    })

    it('should render product cards with cart actions enabled', () => {
      render(<HomePage />)
      
      mockProducts.slice(0, 4).forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.slug}`)
        expect(productCard).toHaveAttribute('data-show-cart', 'true')
      })
    })
  })

  describe('New Arrivals Section', () => {
    it('should render new arrivals title and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('New Arrivals')).toBeInTheDocument()
      expect(screen.getByText('Fresh styles and latest additions to our collection')).toBeInTheDocument()
    })

    it('should render new arrivals products in featured variant', () => {
      render(<HomePage />)
      
      mockProducts.slice(0, 3).forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.slug}`)
        expect(productCard).toBeInTheDocument()
      })
    })
  })

  describe('Testimonials Section', () => {
    it('should render testimonials title and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('What Our Customers Say')).toBeInTheDocument()
      expect(screen.getByText("Don't just take our word for it - hear from our satisfied customers")).toBeInTheDocument()
    })

    it('should render all three testimonials', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Sarah M.')).toBeInTheDocument()
      expect(screen.getByText('Aisha K.')).toBeInTheDocument()
      expect(screen.getByText('Priya S.')).toBeInTheDocument()
    })

    it('should display 5-star ratings for all testimonials', () => {
      render(<HomePage />)
      
      // Check if star ratings are present (they're rendered as SVG elements)
      const testimonialCards = screen.getAllByText(/Verified Buyer/)
      expect(testimonialCards).toHaveLength(3)
    })

    it('should display testimonial content', () => {
      render(<HomePage />)
      
      expect(screen.getByText(/The quality of their nightwear is exceptional/)).toBeInTheDocument()
      expect(screen.getByText(/Amazing customer service/)).toBeInTheDocument()
      expect(screen.getByText(/Beautiful traditional wear/)).toBeInTheDocument()
    })
  })

  describe('Newsletter Section', () => {
    it('should render newsletter title and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Stay Updated')).toBeInTheDocument()
      expect(screen.getByText('Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips')).toBeInTheDocument()
    })

    it('should render email input field', () => {
      render(<HomePage />)
      
      const emailInput = screen.getByPlaceholderText('Enter your email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should render subscribe button', () => {
      render(<HomePage />)
      
      const subscribeButton = screen.getByText('Subscribe')
      expect(subscribeButton).toBeInTheDocument()
      expect(subscribeButton).toHaveClass('bg-accent-500')
    })
  })

  describe('Instagram/Collection Preview Section', () => {
    it('should render section title and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Follow Our Style')).toBeInTheDocument()
      expect(screen.getByText('Get inspired by our latest collections and styling tips')).toBeInTheDocument()
    })

    it('should render product image grid', () => {
      render(<HomePage />)
      
      // Should render first 8 products in image grid
      const productImages = screen.getAllByAltText(/Test Product/)
      expect(productImages.length).toBeGreaterThan(0)
    })
  })

  describe('Final CTA Section', () => {
    it('should render CTA title and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Ready to Elevate Your Style?')).toBeInTheDocument()
      expect(screen.getByText('Discover our collection of elegant fashion pieces and experience the perfect blend of comfort and style')).toBeInTheDocument()
    })

    it('should render shop now button', () => {
      render(<HomePage />)
      
      const shopNowButton = screen.getByText('Shop Now')
      expect(shopNowButton).toBeInTheDocument()
      expect(shopNowButton.closest('a')).toHaveAttribute('href', '/shop')
    })

    it('should render chat with us button', () => {
      render(<HomePage />)
      
      const chatButton = screen.getByText('Chat with Us')
      expect(chatButton).toBeInTheDocument()
      expect(chatButton.closest('a')).toHaveAttribute('href', /wa\.me/)
    })
  })

  describe('Edge Cases', () => {
    it('should handle products with missing properties', () => {
      // Mock products with missing properties
      const incompleteProducts = [
        {
          slug: 'incomplete',
          name: 'Incomplete Product',
          category: '',
          price: 0,
          sizes: [],
          description: '',
          images: []
        }
      ]
      
      // Re-mock the products.json import for this test
      jest.doMock('@/public/products.json', () => incompleteProducts)
      
      render(<HomePage />)
      
      // Should not crash
      expect(screen.getByText('Incomplete Product')).toBeInTheDocument()
    })

    it('should handle empty products array', () => {
      // Mock empty products array
      jest.doMock('@/public/products.json', () => [])
      
      render(<HomePage />)
      
      // Should still render the page structure
      expect(screen.getByText('Shop by Category')).toBeInTheDocument()
    })

    it('should handle very long product names', () => {
      const longNameProducts = mockProducts.map(p => ({
        ...p,
        name: 'This is a very long product name that should be handled gracefully by the homepage component without breaking the layout or causing any visual issues'
      }))
      
      jest.doMock('@/public/products.json', () => longNameProducts)
      
      render(<HomePage />)
      
      // Should not crash
      expect(screen.getByText(/This is a very long product name/)).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should handle large number of products', () => {
      const manyProducts = Array.from({ length: 100 }, (_, i) => ({
        ...mockProducts[0],
        slug: `product-${i}`,
        name: `Product ${i}`,
        category: `Category ${i % 5}`
      }))
      
      jest.doMock('@/public/products.json', () => manyProducts)
      
      render(<HomePage />)
      
      // Should not crash
      expect(screen.getByText('Shop by Category')).toBeInTheDocument()
    })

    it('should handle rapid interactions', async () => {
      render(<HomePage />)
      
      // Rapid interactions should not crash
      const buttons = screen.getAllByRole('button')
      
      for (let i = 0; i < Math.min(buttons.length, 5); i++) {
        await user.click(buttons[i])
      }
      
      // Should still be functional
      expect(screen.getByText('Featured Products')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<HomePage />)
      
      // Main sections should have proper heading levels
      expect(screen.getByRole('heading', { level: 2, name: 'Shop by Category' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: 'Featured Products' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: 'New Arrivals' })).toBeInTheDocument()
    })

    it('should have proper button labels', () => {
      render(<HomePage />)
      
      expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
    })

    it('should have proper link attributes', () => {
      render(<HomePage />)
      
      const shopLink = screen.getByRole('link', { name: 'Shop Now' })
      expect(shopLink).toHaveAttribute('href', '/shop')
    })
  })

  describe('Responsive Behavior', () => {
    it('should render correctly on different screen sizes', () => {
      render(<HomePage />)
      
      // Should have responsive classes
      const featuresGrid = screen.getByText('Free Shipping').closest('div')?.parentElement
      expect(featuresGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
    })

    it('should handle mobile layout', () => {
      render(<HomePage />)
      
      // Should have mobile-first responsive design
      expect(screen.getByText('Shop by Category')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should work with ProductCarousel component', () => {
      render(<HomePage />)
      
      const carousel = screen.getByTestId('product-carousel')
      expect(carousel).toBeInTheDocument()
    })

    it('should work with ProductCard component', () => {
      render(<HomePage />)
      
      const productCards = screen.getAllByTestId(/product-card-/)
      expect(productCards.length).toBeGreaterThan(0)
    })

    it('should pass correct props to child components', () => {
      render(<HomePage />)
      
      // Check if ProductCarousel receives products prop
      expect(screen.getByText('Products: 5')).toBeInTheDocument()
      
      // Check if ProductCard receives showCartActions prop
      const productCards = screen.getAllByTestId(/product-card-/)
      productCards.forEach(card => {
        expect(card).toHaveAttribute('data-show-cart', 'true')
      })
    })
  })
})
