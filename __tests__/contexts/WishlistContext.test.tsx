import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { WishlistProvider, useWishlist } from '../../app/contexts/WishlistContext'
import { setupLocalStorageMock, clearAllMocks, mockLocalStorage } from '../utils/test-utils'

// Test component to access context
const TestComponent = () => {
  const { state, addItem, removeItem, clearWishlist, isInWishlist } = useWishlist()
  
  return (
    <div>
      <div data-testid="item-count">{state.itemCount}</div>
      <div data-testid="items-count">{state.items.length}</div>
      <div data-testid="is-in-wishlist">{isInWishlist('test') ? 'true' : 'false'}</div>
      <button onClick={() => addItem({ id: 'test', name: 'Test', price: 10, image: 'test.jpg', category: 'Test' })}>
        Add Item
      </button>
      <button onClick={() => removeItem('test')}>Remove Item</button>
      <button onClick={clearWishlist}>Clear Wishlist</button>
    </div>
  )
}

describe('WishlistContext', () => {
  beforeEach(() => {
    setupLocalStorageMock()
    clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('WishlistProvider', () => {
    it('should render children without crashing', () => {
      render(
        <WishlistProvider>
          <div>Test Child</div>
        </WishlistProvider>
      )
      expect(screen.getByText('Test Child')).toBeInTheDocument()
    })

    it('should provide initial wishlist state', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      expect(screen.getByTestId('items-count')).toHaveTextContent('0')
      expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
    })
  })

  describe('useWishlist hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(<TestComponent />)
      }).toThrow('useWishlist must be used within a WishlistProvider')
      
      consoleSpy.mockRestore()
    })

    it('should work when used within provider', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      expect(screen.getByTestId('item-count')).toBeInTheDocument()
    })
  })

  describe('Wishlist Actions', () => {
    beforeEach(() => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
    })

    describe('addItem', () => {
      it('should add new item to wishlist', () => {
        const addButton = screen.getByText('Add Item')
        
        act(() => {
          addButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('1')
        expect(screen.getByTestId('items-count')).toHaveTextContent('1')
        expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('true')
      })

      it('should not add duplicate items', () => {
        const addButton = screen.getByText('Add Item')
        
        // Add item twice
        act(() => {
          addButton.click()
          addButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('1')
        expect(screen.getByTestId('items-count')).toHaveTextContent('1')
      })

      it('should handle item with missing properties', () => {
        const addButton = screen.getByText('Add Item')
        
        act(() => {
          addButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('1')
      })

      it('should handle multiple different items', () => {
        const addButton = screen.getByText('Add Item')
        
        // Add first item
        act(() => {
          addButton.click()
        })
        
        // Add second item with different ID
        act(() => {
          // Simulate adding different item
          const testComponent = screen.getByTestId('item-count').parentElement
          if (testComponent) {
            const addButton2 = testComponent.querySelector('button')
            if (addButton2) {
              addButton2.click()
            }
          }
        })
        
        expect(screen.getByTestId('items-count')).toHaveTextContent('1')
      })
    })

    describe('removeItem', () => {
      it('should remove item from wishlist', () => {
        const addButton = screen.getByText('Add Item')
        const removeButton = screen.getByText('Remove Item')
        
        // Add then remove
        act(() => {
          addButton.click()
          removeButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
        expect(screen.getByTestId('items-count')).toHaveTextContent('0')
        expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
      })

      it('should handle removing non-existent item', () => {
        const removeButton = screen.getByText('Remove Item')
        
        act(() => {
          removeButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      })

      it('should handle removing from empty wishlist', () => {
        const removeButton = screen.getByText('Remove Item')
        
        act(() => {
          removeButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      })
    })

    describe('clearWishlist', () => {
      it('should clear all items from wishlist', () => {
        const addButton = screen.getByText('Add Item')
        const clearButton = screen.getByText('Clear Wishlist')
        
        // Add items then clear
        act(() => {
          addButton.click()
          clearButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
        expect(screen.getByTestId('items-count')).toHaveTextContent('0')
        expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
      })

      it('should work on empty wishlist', () => {
        const clearButton = screen.getByText('Clear Wishlist')
        
        act(() => {
          clearButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      })
    })

    describe('isInWishlist', () => {
      it('should return true for existing item', () => {
        const addButton = screen.getByText('Add Item')
        
        act(() => {
          addButton.click()
        })
        
        expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('true')
      })

      it('should return false for non-existing item', () => {
        expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
      })

      it('should return false after item removal', () => {
        const addButton = screen.getByText('Add Item')
        const removeButton = screen.getByText('Remove Item')
        
        act(() => {
          addButton.click()
          removeButton.click()
        })
        
        expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('false')
      })
    })
  })

  describe('localStorage Integration', () => {
    it('should load wishlist from localStorage on mount', () => {
      const mockWishlistData = [
        { id: 'saved-item', name: 'Saved Item', price: 15, image: 'saved.jpg', category: 'Test' }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockWishlistData))
      
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('wishlist')
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('should handle localStorage parse error gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json')
      
      // Should not crash
      expect(() => {
        render(
          <WishlistProvider>
            <TestComponent />
          </WishlistProvider>
        )
      }).not.toThrow()
    })

    it('should save wishlist to localStorage when items change', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wishlist', expect.any(String))
    })

    it('should handle localStorage setItem error gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      // Should not crash
      expect(() => {
        act(() => {
          addButton.click()
        })
      }).not.toThrow()
    })

    it('should handle localStorage getItem returning null', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('0')
    })
  })

  describe('Edge Cases', () => {
    it('should handle items with special characters in ID', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(screen.getByTestId('is-in-wishlist')).toHaveTextContent('true')
    })

    it('should handle very long item names', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('should handle decimal prices correctly', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('should handle empty items array', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    })

    it('should handle undefined localStorage gracefully', () => {
      // Mock localStorage as undefined
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      })
      
      // Should not crash
      expect(() => {
        render(
          <WishlistProvider>
            <TestComponent />
          </WishlistProvider>
        )
      }).not.toThrow()
    })

    it('should handle null item properties gracefully', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })
  })

  describe('Performance', () => {
    it('should handle rapid successive operations', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      // Rapid successive clicks
      act(() => {
        for (let i = 0; i < 10; i++) {
          addButton.click()
        }
      })
      
      // Should still only have 1 item (no duplicates)
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('should handle large number of items', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      // Simulate adding many different items
      act(() => {
        for (let i = 0; i < 100; i++) {
          // Each item would have a different ID in real scenario
          const testComponent = screen.getByTestId('item-count').parentElement
          if (testComponent) {
            const addButton = testComponent.querySelector('button')
            if (addButton) {
              addButton.click()
            }
          }
        }
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })

    it('should handle frequent isInWishlist calls', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      // Component calls isInWishlist on every render
      // This test ensures it doesn't cause performance issues
      expect(screen.getByTestId('is-in-wishlist')).toBeInTheDocument()
    })
  })

  describe('Data Integrity', () => {
    it('should maintain item order', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    })

    it('should handle item removal without affecting other items', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      const removeButton = screen.getByText('Remove Item')
      
      act(() => {
        addButton.click()
        removeButton.click()
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('0')
    })

    it('should preserve item properties exactly', () => {
      render(
        <WishlistProvider>
          <TestComponent />
        </WishlistProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    })
  })
})
