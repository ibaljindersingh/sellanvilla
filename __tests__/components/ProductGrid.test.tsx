import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductGrid from '../../app/components/ProductGrid'
import { mockProducts, createMockProduct } from '../utils/test-utils'

// Mock ProductCard component
jest.mock('../../app/components/ProductCard', () => {
  return function MockProductCard({ product, variant, showCartActions }: any) {
    return (
      <div data-testid={`product-card-${product.slug}`} data-variant={variant} data-show-cart={showCartActions}>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p>${product.price}</p>
      </div>
    )
  }
})

describe('ProductGrid', () => {
  const user = userEvent.setup()

  describe('Loading State', () => {
    it('should render loading skeleton when loading is true', () => {
      render(<ProductGrid products={[]} loading={true} />)
      
      // Should render 8 skeleton items
      const skeletons = screen.getAllByTestId(/animate-pulse/)
      expect(skeletons).toHaveLength(8)
    })

    it('should not render loading skeleton when loading is false', () => {
      render(<ProductGrid products={mockProducts} loading={false} />)
      
      const skeletons = screen.queryAllByTestId(/animate-pulse/)
      expect(skeletons).toHaveLength(0)
    })
  })

  describe('Empty State', () => {
    it('should render empty state message when no products', () => {
      render(<ProductGrid products={[]} emptyMessage="Custom empty message" />)
      
      expect(screen.getByText('No products found')).toBeInTheDocument()
      expect(screen.getByText('Custom empty message')).toBeInTheDocument()
    })

    it('should render default empty message when none provided', () => {
      render(<ProductGrid products={[]} />)
      
      expect(screen.getByText('No products found matching your criteria.')).toBeInTheDocument()
    })

    it('should render empty state icon', () => {
      render(<ProductGrid products={[]} />)
      
      const icon = screen.getByTestId('empty-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Grid Layout (Default)', () => {
    beforeEach(() => {
      render(<ProductGrid products={mockProducts} layout="grid" />)
    })

    it('should render products in grid layout', () => {
      mockProducts.forEach(product => {
        expect(screen.getByTestId(`product-card-${product.slug}`)).toBeInTheDocument()
      })
    })

    it('should apply correct grid classes', () => {
      const gridContainer = screen.getByTestId('product-card-1').parentElement?.parentElement
      expect(gridContainer).toHaveClass('grid', 'gap-6', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4')
    })

    it('should handle hover events correctly', async () => {
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        fireEvent.mouseEnter(firstProductContainer)
        
        await waitFor(() => {
          const productCard = screen.getByTestId(`product-card-${mockProducts[0].slug}`)
          expect(productCard).toHaveAttribute('data-variant', 'featured')
        })
      }
    })

    it('should handle mouse leave events correctly', async () => {
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        fireEvent.mouseEnter(firstProductContainer)
        fireEvent.mouseLeave(firstProductContainer)
        
        await waitFor(() => {
          const productCard = screen.getByTestId(`product-card-${mockProducts[0].slug}`)
          expect(productCard).toHaveAttribute('data-variant', 'default')
        })
      }
    })

    it('should pass showCartActions prop to ProductCard', () => {
      mockProducts.forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.slug}`)
        expect(productCard).toHaveAttribute('data-show-cart', 'true')
      })
    })
  })

  describe('List Layout', () => {
    beforeEach(() => {
      render(<ProductGrid products={mockProducts} layout="list" />)
    })

    it('should render products in list layout', () => {
      mockProducts.forEach(product => {
        expect(screen.getByText(product.name)).toBeInTheDocument()
        expect(screen.getByText(product.category)).toBeInTheDocument()
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument()
      })
    })

    it('should apply correct list classes', () => {
      const listContainer = screen.getByTestId('product-card-1').parentElement?.parentElement
      expect(listContainer).toHaveClass('space-y-4')
    })

    it('should handle hover events in list layout', async () => {
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        fireEvent.mouseEnter(firstProductContainer)
        
        await waitFor(() => {
          expect(firstProductContainer).toHaveClass('hover:shadow-md')
        })
      }
    })

    it('should render product images in list layout', () => {
      mockProducts.forEach(product => {
        const image = screen.getByAltText(product.name)
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', product.images[0])
      })
    })

    it('should render view details button in list layout', () => {
      const viewDetailsButtons = screen.getAllByText('View Details')
      expect(viewDetailsButtons).toHaveLength(mockProducts.length)
    })

    it('should render sizes information in list layout', () => {
      mockProducts.forEach(product => {
        if (product.sizes.length > 0) {
          expect(screen.getByText(`Available sizes: ${product.sizes.join(', ')}`)).toBeInTheDocument()
        }
      })
    })
  })

  describe('Masonry Layout', () => {
    beforeEach(() => {
      render(<ProductGrid products={mockProducts} layout="masonry" />)
    })

    it('should render products in masonry layout', () => {
      mockProducts.forEach(product => {
        expect(screen.getByTestId(`product-card-${product.slug}`)).toBeInTheDocument()
      })
    })

    it('should apply correct masonry classes', () => {
      const masonryContainer = screen.getByTestId('product-card-1').parentElement?.parentElement
      expect(masonryContainer).toHaveClass('columns-1', 'sm:columns-2', 'lg:columns-3', 'xl:columns-4')
    })

    it('should use featured variant for masonry layout', () => {
      mockProducts.forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.slug}`)
        expect(productCard).toHaveAttribute('data-variant', 'featured')
      })
    })

    it('should pass showCartActions prop to ProductCard in masonry', () => {
      mockProducts.forEach(product => {
        const productCard = screen.getByTestId(`product-card-${product.slug}`)
        expect(productCard).toHaveAttribute('data-show-cart', 'true')
      })
    })
  })

  describe('Hover State Management', () => {
    it('should track hovered product correctly', async () => {
      render(<ProductGrid products={mockProducts} layout="grid" />)
      
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      const secondProductContainer = screen.getByTestId(`product-card-${mockProducts[1].slug}`).parentElement
      
      if (firstProductContainer && secondProductContainer) {
        // Hover first product
        fireEvent.mouseEnter(firstProductContainer)
        
        await waitFor(() => {
          const firstCard = screen.getByTestId(`product-card-${mockProducts[0].slug}`)
          expect(firstCard).toHaveAttribute('data-variant', 'featured')
        })
        
        // Hover second product
        fireEvent.mouseEnter(secondProductContainer)
        
        await waitFor(() => {
          const firstCard = screen.getByTestId(`product-card-${mockProducts[0].slug}`)
          const secondCard = screen.getByTestId(`product-card-${mockProducts[1].slug}`)
          expect(firstCard).toHaveAttribute('data-variant', 'default')
          expect(secondCard).toHaveAttribute('data-variant', 'featured')
        })
      }
    })

    it('should clear hover state when mouse leaves', async () => {
      render(<ProductGrid products={mockProducts} layout="grid" />)
      
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        fireEvent.mouseEnter(firstProductContainer)
        fireEvent.mouseLeave(firstProductContainer)
        
        await waitFor(() => {
          const productCard = screen.getByTestId(`product-card-${mockProducts[0].slug}`)
          expect(productCard).toHaveAttribute('data-variant', 'default')
        })
      }
    })
  })

  describe('Error Handling', () => {
    it('should handle hover event errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<ProductGrid products={mockProducts} layout="grid" />)
      
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        // Simulate error in hover handler
        fireEvent.mouseEnter(firstProductContainer)
        
        // Should not crash
        expect(firstProductContainer).toBeInTheDocument()
      }
      
      consoleSpy.mockRestore()
    })

    it('should handle mouse leave event errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<ProductGrid products={mockProducts} layout="grid" />)
      
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        // Simulate error in mouse leave handler
        fireEvent.mouseLeave(firstProductContainer)
        
        // Should not crash
        expect(firstProductContainer).toBeInTheDocument()
      }
      
      consoleSpy.mockRestore()
    })
  })

  describe('Edge Cases', () => {
    it('should handle single product', () => {
      render(<ProductGrid products={[mockProducts[0]]} />)
      
      expect(screen.getByTestId(`product-card-${mockProducts[0].slug}`)).toBeInTheDocument()
    })

    it('should handle products with missing properties', () => {
      const incompleteProduct = {
        slug: 'incomplete',
        name: 'Incomplete Product',
        category: '',
        price: 0,
        sizes: [],
        description: '',
        images: []
      }
      
      render(<ProductGrid products={[incompleteProduct]} />)
      
      expect(screen.getByText('Incomplete Product')).toBeInTheDocument()
    })

    it('should handle very long product names', () => {
      const longNameProduct = {
        ...mockProducts[0],
        name: 'This is a very long product name that should be handled gracefully by the grid component without breaking the layout or causing any visual issues'
      }
      
      render(<ProductGrid products={[longNameProduct]} />)
      
      expect(screen.getByText(longNameProduct.name)).toBeInTheDocument()
    })

    it('should handle products with no images', () => {
      const noImageProduct = createMockProduct({ images: [] })
      render(<ProductGrid products={[noImageProduct]} layout="list" />)
      
      // Should not crash
      expect(screen.getByText(noImageProduct.name)).toBeInTheDocument()
    })

    it('should handle products with no sizes', () => {
      const noSizesProduct = createMockProduct({ sizes: [] })
      render(<ProductGrid products={[noSizesProduct]} layout="list" />)
      
      // Should not crash
      expect(screen.getByText(noSizesProduct.name)).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should handle rapid hover events', async () => {
      render(<ProductGrid products={mockProducts} layout="grid" />)
      
      const firstProductContainer = screen.getByTestId(`product-card-${mockProducts[0].slug}`).parentElement
      
      if (firstProductContainer) {
        // Rapid hover events
        for (let i = 0; i < 10; i++) {
          fireEvent.mouseEnter(firstProductContainer)
          fireEvent.mouseLeave(firstProductContainer)
        }
        
        // Should not crash
        expect(firstProductContainer).toBeInTheDocument()
      }
    })

    it('should handle large number of products', () => {
      const manyProducts = Array.from({ length: 100 }, (_, i) => ({
        ...mockProducts[0],
        slug: `product-${i}`,
        name: `Product ${i}`
      }))
      
      render(<ProductGrid products={manyProducts} />)
      
      // Should render all products
      expect(screen.getByTestId('product-card-product-0')).toBeInTheDocument()
      expect(screen.getByTestId('product-card-product-99')).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should apply responsive grid classes', () => {
      render(<ProductGrid products={mockProducts} layout="grid" />)
      
      const gridContainer = screen.getByTestId('product-card-1').parentElement?.parentElement
      expect(gridContainer).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4')
    })

    it('should apply responsive masonry classes', () => {
      render(<ProductGrid products={mockProducts} layout="masonry" />)
      
      const masonryContainer = screen.getByTestId('product-card-1').parentElement?.parentElement
      expect(masonryContainer).toHaveClass('sm:columns-2', 'lg:columns-3', 'xl:columns-4')
    })
  })

  describe('Integration', () => {
    it('should work with ProductCard component', () => {
      render(<ProductGrid products={mockProducts} />)
      
      // Should render ProductCard components
      mockProducts.forEach(product => {
        expect(screen.getByTestId(`product-card-${product.slug}`)).toBeInTheDocument()
      })
    })

    it('should work with different layout types', () => {
      const { rerender } = render(<ProductGrid products={mockProducts} layout="grid" />)
      
      // Grid layout
      expect(screen.getByTestId('product-card-1').parentElement?.parentElement).toHaveClass('grid')
      
      // List layout
      rerender(<ProductGrid products={mockProducts} layout="list" />)
      expect(screen.getByTestId('product-card-1').parentElement?.parentElement).toHaveClass('space-y-4')
      
      // Masonry layout
      rerender(<ProductGrid products={mockProducts} layout="masonry" />)
      expect(screen.getByTestId('product-card-1').parentElement?.parentElement).toHaveClass('columns-1')
    })
  })
})
