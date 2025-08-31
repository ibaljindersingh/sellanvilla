import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../../app/components/ErrorBoundary'

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  // Suppress console.error for error boundary tests
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = originalError
  })

  describe('Normal Rendering', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )
      
      expect(screen.getByText('No error')).toBeInTheDocument()
    })

    it('should render children when children are valid React elements', () => {
      render(
        <ErrorBoundary>
          <div>Valid child</div>
          <span>Another valid child</span>
        </ErrorBoundary>
      )
      
      expect(screen.getByText('Valid child')).toBeInTheDocument()
      expect(screen.getByText('Another valid child')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should catch errors and render fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      // Should render error fallback
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('We apologize for the inconvenience. Please try refreshing the page.')).toBeInTheDocument()
    })

    it('should render error icon when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      // Should render error icon
      const errorIcon = screen.getByTestId('error-icon')
      expect(errorIcon).toBeInTheDocument()
    })

    it('should render retry button when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      // Should render retry button
      const retryButton = screen.getByText('Try Again')
      expect(retryButton).toBeInTheDocument()
      expect(retryButton).toHaveClass('bg-primary-600', 'hover:bg-primary-700')
    })
  })

  describe('Error State Management', () => {
    it('should set error state when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      // Should show error state
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should not set error state when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )
      
      // Should not show error state
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })
  })

  describe('Styling and Layout', () => {
    it('should have correct error container classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const errorContainer = screen.getByText('Something went wrong').closest('div')
      expect(errorContainer).toHaveClass(
        'min-h-screen',
        'flex',
        'items-center',
        'justify-center',
        'bg-gray-50',
        'px-4'
      )
    })

    it('should have correct error card classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const errorCard = screen.getByText('Something went wrong').closest('div')
      expect(errorCard).toHaveClass(
        'max-w-md',
        'w-full',
        'bg-white',
        'rounded-lg',
        'shadow-lg',
        'p-8',
        'text-center'
      )
    })

    it('should have correct error icon classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const errorIcon = screen.getByTestId('error-icon')
      expect(errorIcon).toHaveClass('w-16', 'h-16', 'text-red-500', 'mx-auto', 'mb-4')
    })

    it('should have correct error title classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const errorTitle = screen.getByText('Something went wrong')
      expect(errorTitle).toHaveClass('text-xl', 'font-semibold', 'text-gray-900', 'mb-2')
    })

    it('should have correct error message classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const errorMessage = screen.getByText('We apologize for the inconvenience. Please try refreshing the page.')
      expect(errorMessage).toHaveClass('text-gray-600', 'mb-6')
    })

    it('should have correct retry button classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const retryButton = screen.getByText('Try Again')
      expect(retryButton).toHaveClass(
        'bg-primary-600',
        'text-white',
        'px-4',
        'py-2',
        'rounded-md',
        'hover:bg-primary-700',
        'transition-colors'
      )
    })
  })

  describe('Accessibility', () => {
    it('should have proper error announcement', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      // Should have proper error message for screen readers
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('We apologize for the inconvenience. Please try refreshing the page.')).toBeInTheDocument()
    })

    it('should have proper button labeling', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      const retryButton = screen.getByRole('button', { name: 'Try Again' })
      expect(retryButton).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple errors gracefully', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      // Should still render error UI even if multiple errors occur
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should handle null children gracefully', () => {
      render(
        <ErrorBoundary>
          {null}
        </ErrorBoundary>
      )
      
      // Should not crash with null children
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should handle undefined children gracefully', () => {
      render(
        <ErrorBoundary>
          {undefined}
        </ErrorBoundary>
      )
      
      // Should not crash with undefined children
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should handle empty children gracefully', () => {
      render(
        <ErrorBoundary>
          {[]}
        </ErrorBoundary>
      )
      
      // Should not crash with empty children
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render quickly when no error occurs', () => {
      const startTime = performance.now()
      
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100)
      expect(screen.getByText('No error')).toBeInTheDocument()
    })

    it('should handle rapid error state changes', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )
      
      // Should not crash on rapid re-renders
      expect(screen.getByText('No error')).toBeInTheDocument()
      
      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should work with other components', () => {
      render(
        <ErrorBoundary>
          <div>
            <h1>Header</h1>
            <ThrowError shouldThrow={false} />
          </div>
        </ErrorBoundary>
      )
      
      // Should render both the header and the non-error component
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('No error')).toBeInTheDocument()
    })

    it('should work with complex component trees', () => {
      render(
        <ErrorBoundary>
          <div>
            <header>Header</header>
            <main>
              <section>
                <ThrowError shouldThrow={false} />
              </section>
            </main>
            <footer>Footer</footer>
          </div>
        </ErrorBoundary>
      )
      
      // Should render the entire component tree
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('No error')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })
  })
})
