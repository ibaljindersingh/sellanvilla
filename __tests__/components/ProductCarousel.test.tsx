import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ProductCarousel from '../../app/components/ProductCarousel'
import { mockProducts } from '../utils/test-utils'

// Mock fetch for products loading
global.fetch = jest.fn()

// Increase timeout for this test suite
jest.setTimeout(15000)

describe('ProductCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Rendering', () => {
    it('should render loading state when no products provided', () => {
      render(<ProductCarousel />)
      
      expect(screen.getByText('Loading carousel...')).toBeInTheDocument()
      expect(screen.getByText('Loading carousel...').parentElement).toHaveClass('text-center', 'text-gray-500')
    })

    it('should render with provided products', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
      expect(screen.getByText(mockProducts[0].description)).toBeInTheDocument()
      expect(screen.getByText(`$${mockProducts[0].price.toFixed(2)}`)).toBeInTheDocument()
    })

    it('should render navigation arrows', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('should render dot indicators', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      // Should have dots for each product
      const dots = screen.getAllByLabelText(/Go to slide/)
      expect(dots).toHaveLength(mockProducts.length)
    })

    it('should render pause/play button', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      expect(screen.getByLabelText('Pause carousel')).toBeInTheDocument()
    })

    it('should render view details button', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      const viewDetailsButtons = screen.getAllByText('View Details')
      expect(viewDetailsButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Product Loading', () => {
    it('should load products from API when not provided', async () => {
      const mockProductsData = mockProducts.slice(0, 3)
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockProductsData)
      }
      ;(fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      render(<ProductCarousel />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/products.json')
      }, { timeout: 5000 })
      
      await waitFor(() => {
        expect(screen.getByText(mockProductsData[0].name)).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should handle API fetch error gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
      
      render(<ProductCarousel />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/products.json')
      }, { timeout: 5000 })
      
      // Should show error state
      await waitFor(() => {
        expect(screen.getByText('Unable to load products')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should handle invalid JSON response', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      }
      ;(fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
      
      render(<ProductCarousel />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/products.json')
      }, { timeout: 5000 })
      
      // Should show error state
      await waitFor(() => {
        expect(screen.getByText('Unable to load products')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should handle HTTP error response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      })
      
      render(<ProductCarousel />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/products.json')
      }, { timeout: 5000 })
      
      // Should show error state
      await waitFor(() => {
        expect(screen.getByText('Unable to load products')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('should limit products to first 5 for carousel', async () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        ...mockProducts[0],
        slug: `product-${i}`,
        name: `Product ${i}`
      }))
      
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(manyProducts)
      }
      ;(fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      render(<ProductCarousel />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/products.json')
      }, { timeout: 5000 })
      
      await waitFor(() => {
        expect(screen.getByText('Product 0')).toBeInTheDocument()
      }, { timeout: 5000 })
      
      // Should only show first 5 products
      const dots = screen.getAllByLabelText(/Go to slide/)
      expect(dots).toHaveLength(5)
    })

    it('should not fetch from API when products are provided as props', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      // Should not call fetch when products are provided
      expect(fetch).not.toHaveBeenCalled()
      
      // Should render products immediately
      expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    beforeEach(() => {
      render(<ProductCarousel products={mockProducts} />)
    })

    it('should navigate to next slide', async () => {
      const nextButton = screen.getByLabelText('Next slide')
      
      fireEvent.click(nextButton)
      
      await waitFor(() => {
        expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should navigate to previous slide', async () => {
      const prevButton = screen.getByLabelText('Previous slide')
      const nextButton = screen.getByLabelText('Next slide')
      
      // Go to second slide first
      fireEvent.click(nextButton)
      await waitFor(() => {
        expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Then go back
      fireEvent.click(prevButton)
      await waitFor(() => {
        expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should wrap around to last slide when going previous from first', async () => {
      const prevButton = screen.getByLabelText('Previous slide')
      
      fireEvent.click(prevButton)
      
      // Should wrap to last slide
      await waitFor(() => {
        expect(screen.getByText(mockProducts[mockProducts.length - 1].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should navigate to specific slide via dots', async () => {
      const dots = screen.getAllByLabelText(/Go to slide/)
      const secondDot = dots[1]
      
      fireEvent.click(secondDot)
      
      await waitFor(() => {
        expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should highlight active dot correctly', async () => {
      const dots = screen.getAllByLabelText(/Go to slide/)
      const firstDot = dots[0]
      
      // First dot should be active initially
      expect(firstDot).toHaveClass('bg-blue-600', 'scale-125')
      
      // Click second dot
      fireEvent.click(dots[1])
      
      // Second dot should now be active
      await waitFor(() => {
        expect(dots[1]).toHaveClass('bg-blue-600', 'scale-125')
        expect(firstDot).not.toHaveClass('bg-blue-600', 'scale-125')
      }, { timeout: 3000 })
    })
  })

  describe('Auto-advance', () => {
    beforeEach(() => {
      render(<ProductCarousel products={mockProducts} />)
    })

    it('should auto-advance every 5 seconds', async () => {
      // Fast-forward time by 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      
      await waitFor(() => {
        expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should pause auto-advance when pause button is clicked', async () => {
      const pauseButton = screen.getByLabelText('Pause carousel')
      
      fireEvent.click(pauseButton)
      
      // Fast-forward time by 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      
      // Should still be on first slide
      await waitFor(() => {
        expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should resume auto-advance when play button is clicked', async () => {
      const pauseButton = screen.getByLabelText('Pause carousel')
      
      // Pause first
      fireEvent.click(pauseButton)
      
      // Resume
      fireEvent.click(pauseButton)
      
      // Fast-forward time by 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      
      // Should advance to next slide
      await waitFor(() => {
        expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should not auto-advance when no products', () => {
      render(<ProductCarousel products={[]} />)
      
      // Fast-forward time by 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000)
      })
      
      // Should not crash
      expect(screen.getByText('Loading carousel...')).toBeInTheDocument()
    })
  })

  describe('Image Handling', () => {
    it('should handle missing product images gracefully', () => {
      const productWithoutImages = { ...mockProducts[0], images: [] }
      render(<ProductCarousel products={[productWithoutImages]} />)
      
      const image = screen.getByAltText(productWithoutImages.name)
      expect(image).toHaveAttribute('src', '/og-sellanvilla.jpg')
    })

    it('should handle image load errors gracefully', async () => {
      render(<ProductCarousel products={mockProducts} />)
      
      const image = screen.getByAltText(mockProducts[0].name)
      
      // Simulate image error
      fireEvent.error(image)
      
      await waitFor(() => {
        expect(image).toHaveAttribute('src', '/og-sellanvilla.jpg')
      }, { timeout: 3000 })
    })

    it('should use first image from product images array', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      const image = screen.getByAltText(mockProducts[0].name)
      expect(image).toHaveAttribute('src', mockProducts[0].images[0])
    })
  })

  describe('Edge Cases', () => {
    it('should handle single product', () => {
      const singleProduct = [mockProducts[0]]
      render(<ProductCarousel products={singleProduct} />)
      
      expect(screen.getByText(singleProduct[0].name)).toBeInTheDocument()
      
      // Should still have navigation buttons
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('should handle products with missing properties', () => {
      const incompleteProduct = {
        slug: 'incomplete',
        name: 'Incomplete Product',
        category: 'Test',
        price: 0,
        description: '',
        images: []
      }
      
      render(<ProductCarousel products={[incompleteProduct]} />)
      
      expect(screen.getByText('Incomplete Product')).toBeInTheDocument()
      expect(screen.getByText('$0.00')).toBeInTheDocument()
    })

    it('should handle very long product names', () => {
      const longNameProduct = {
        ...mockProducts[0],
        name: 'This is a very long product name that should be handled gracefully by the carousel component without breaking the layout or causing any visual issues'
      }
      
      render(<ProductCarousel products={[longNameProduct]} />)
      
      expect(screen.getByText(longNameProduct.name)).toBeInTheDocument()
    })

    it('should handle very long descriptions', () => {
      const longDescProduct = {
        ...mockProducts[0],
        description: 'This is a very long product description that should be handled gracefully by the carousel component. It should not break the layout or cause any visual issues. The component should properly truncate or wrap the text as needed.'
      }
      
      render(<ProductCarousel products={[longDescProduct]} />)
      
      expect(screen.getByText(longDescProduct.description)).toBeInTheDocument()
    })

    it('should handle zero price products', () => {
      const zeroPriceProduct = { ...mockProducts[0], price: 0 }
      render(<ProductCarousel products={[zeroPriceProduct]} />)
      
      expect(screen.getByText('$0.00')).toBeInTheDocument()
    })

    it('should handle negative price products', () => {
      const negativePriceProduct = { ...mockProducts[0], price: -10.50 }
      render(<ProductCarousel products={[negativePriceProduct]} />)
      
      expect(screen.getByText('$-10.50')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Pause carousel')).toBeInTheDocument()
      
      const dots = screen.getAllByLabelText(/Go to slide/)
      dots.forEach((dot, index) => {
        expect(dot).toHaveAttribute('aria-label', `Go to slide ${index + 1}`)
      })
    })

    it('should have proper button titles', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      const pauseButton = screen.getByLabelText('Pause carousel')
      expect(pauseButton).toBeInTheDocument()
    })

    it('should have proper link attributes', () => {
      render(<ProductCarousel products={mockProducts} />)
      
      const viewDetailsLinks = screen.getAllByText('View Details')
      expect(viewDetailsLinks[0]).toHaveAttribute('href', `/shop?product=${mockProducts[0].slug}`)
    })
  })

  describe('Responsive Behavior', () => {
    it('should render correctly with different product counts', () => {
      const { rerender } = render(<ProductCarousel products={mockProducts.slice(0, 1)} />)
      
      // Single product
      expect(screen.getAllByLabelText(/Go to slide/)).toHaveLength(1)
      
      // Multiple products
      rerender(<ProductCarousel products={mockProducts} />)
      expect(screen.getAllByLabelText(/Go to slide/)).toHaveLength(mockProducts.length)
    })

    it('should handle empty products array', () => {
      render(<ProductCarousel products={[]} />)
      
      expect(screen.getByText('Loading carousel...')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should work with cart context', async () => {
      render(<ProductCarousel products={mockProducts} />)
      
      // Should not crash when rendered with cart context
      expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
    })

    it('should work with wishlist context', async () => {
      render(<ProductCarousel products={mockProducts} />)
      
      // Should not crash when rendered with wishlist context
      expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
    })
  })
})
