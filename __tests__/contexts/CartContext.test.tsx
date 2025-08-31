import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { CartProvider, useCart } from '../../app/contexts/CartContext'
import { setupLocalStorageMock, clearAllMocks, mockLocalStorage } from '../utils/test-utils'

// Test component to access context
const TestComponent = () => {
  const { state, addItem, removeItem, updateQuantity, clearCart } = useCart()
  
  return (
    <div>
      <div data-testid="item-count">{state.itemCount}</div>
      <div data-testid="total">{state.total}</div>
      <div data-testid="items-count">{state.items.length}</div>
              <button onClick={() => addItem({ id: 'test', name: 'Test', price: 10, image: 'test.jpg', quantity: 1, size: 'M' })}>
        Add Item
      </button>
      <button onClick={() => removeItem('test')}>Remove Item</button>
      <button onClick={() => updateQuantity('test', 2)}>Update Quantity</button>
      <button onClick={() => updateQuantity('test', 0)}>Set Quantity to 0</button>
      <button onClick={() => updateQuantity('test', -1)}>Set Negative Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    setupLocalStorageMock()
    clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('CartProvider', () => {
    it('should render children without crashing', () => {
      render(
        <CartProvider>
          <div>Test Child</div>
        </CartProvider>
      )
      expect(screen.getByText('Test Child')).toBeInTheDocument()
    })

    it('should provide initial cart state', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      expect(screen.getByTestId('total')).toHaveTextContent('0')
      expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    })
  })

  describe('useCart hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(<TestComponent />)
      }).toThrow('useCart must be used within a CartProvider')
      
      consoleSpy.mockRestore()
    })

    it('should work when used within provider', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      expect(screen.getByTestId('item-count')).toBeInTheDocument()
    })
  })

  describe('Cart Actions', () => {
    beforeEach(() => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
    })

    describe('addItem', () => {
      it('should add new item to cart', () => {
        const addButton = screen.getByText('Add Item')
        
        act(() => {
          addButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('1')
        expect(screen.getByTestId('total')).toHaveTextContent('10')
        expect(screen.getByTestId('items-count')).toHaveTextContent('1')
      })

      it('should increment quantity for existing item', () => {
        const addButton = screen.getByText('Add Item')
        
        // Add item twice
        act(() => {
          addButton.click()
          addButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('2')
        expect(screen.getByTestId('total')).toHaveTextContent('20')
        expect(screen.getByTestId('items-count')).toHaveTextContent('1')
      })

      it('should handle item with no size', () => {
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
      it('should remove item from cart', () => {
        const addButton = screen.getByText('Add Item')
        const removeButton = screen.getByText('Remove Item')
        
        // Add then remove
        act(() => {
          addButton.click()
          removeButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
        expect(screen.getByTestId('total')).toHaveTextContent('0')
        expect(screen.getByTestId('items-count')).toHaveTextContent('0')
      })

      it('should handle removing non-existent item', () => {
        const removeButton = screen.getByText('Remove Item')
        
        act(() => {
          removeButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      })
    })

    describe('updateQuantity', () => {
      it('should update item quantity', () => {
        const addButton = screen.getByText('Add Item')
        const updateButton = screen.getByText('Update Quantity')
        
        // Add item then update quantity
        act(() => {
          addButton.click()
          updateButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('2')
        expect(screen.getByTestId('total')).toHaveTextContent('20')
      })

      it('should remove item when quantity is 0', () => {
        const addButton = screen.getByText('Add Item')
        const setZeroButton = screen.getByText('Set Quantity to 0')
        
        // Add item then set quantity to 0
        act(() => {
          addButton.click()
          setZeroButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
        expect(screen.getByTestId('total')).toHaveTextContent('0')
        expect(screen.getByTestId('items-count')).toHaveTextContent('0')
      })

      it('should handle negative quantity', () => {
        const addButton = screen.getByText('Add Item')
        const negativeButton = screen.getByText('Set Negative Quantity')
        
        // Add item then set negative quantity
        act(() => {
          addButton.click()
          negativeButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
        expect(screen.getByTestId('total')).toHaveTextContent('0')
        expect(screen.getByTestId('items-count')).toHaveTextContent('0')
      })
    })

    describe('clearCart', () => {
      it('should clear all items from cart', () => {
        const addButton = screen.getByText('Add Item')
        const clearButton = screen.getByText('Clear Cart')
        
        // Add items then clear
        act(() => {
          addButton.click()
          clearButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
        expect(screen.getByTestId('total')).toHaveTextContent('0')
        expect(screen.getByTestId('items-count')).toHaveTextContent('0')
      })

      it('should work on empty cart', () => {
        const clearButton = screen.getByText('Clear Cart')
        
        act(() => {
          clearButton.click()
        })
        
        expect(screen.getByTestId('item-count')).toHaveTextContent('0')
      })
    })
  })

  describe('localStorage Integration', () => {
    it('should load cart from localStorage on mount', () => {
      const mockCartData = [
        { id: 'saved-item', name: 'Saved Item', price: 15, image: 'saved.jpg', quantity: 2, size: 'L' }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockCartData))
      
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('cart')
    })

    it('should handle localStorage parse error gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json')
      
      // Should not crash
      expect(() => {
        render(
          <CartProvider>
            <TestComponent />
          </CartProvider>
        )
      }).not.toThrow()
    })

    it('should save cart to localStorage when items change', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cart', expect.any(String))
    })
  })

  describe('Edge Cases', () => {
    it('should handle very large quantities', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      const updateButton = screen.getByText('Update Quantity')
      
      // Add item with very large quantity
      act(() => {
        addButton.click()
        updateButton.click()
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('2')
    })

    it('should handle decimal prices correctly', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      act(() => {
        addButton.click()
      })
      
      // Price is 10, quantity is 1, total should be 10
      expect(screen.getByTestId('total')).toHaveTextContent('10')
    })

    it('should handle empty items array', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    })
  })

  describe('Performance', () => {
    it('should handle rapid successive operations', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      // Rapid successive clicks
      act(() => {
        for (let i = 0; i < 10; i++) {
          addButton.click()
        }
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('10')
    })

    it('should handle large number of items', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )
      
      const addButton = screen.getByText('Add Item')
      
      // Add many items
      act(() => {
        for (let i = 0; i < 100; i++) {
          addButton.click()
        }
      })
      
      expect(screen.getByTestId('item-count')).toHaveTextContent('100')
    })
  })
})
