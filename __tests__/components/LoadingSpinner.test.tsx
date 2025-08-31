import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../../app/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  describe('Default Variant', () => {
    it('should render default loading spinner', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    it('should have default size classes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-8', 'h-8')
    })

    it('should have default color classes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-t-primary-600')
    })

    it('should have animation classes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('animate-spin')
    })
  })

  describe('Size Variants', () => {
    it('should render small size correctly', () => {
      render(<LoadingSpinner size="sm" />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-4', 'h-4')
    })

    it('should render medium size correctly', () => {
      render(<LoadingSpinner size="md" />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-8', 'h-8')
    })

    it('should render large size correctly', () => {
      render(<LoadingSpinner size="lg" />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-12', 'h-12')
    })
  })

  describe('Text Variants', () => {
    it('should render default text correctly', () => {
      render(<LoadingSpinner />)
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should render custom text correctly', () => {
      render(<LoadingSpinner text="Please wait..." />)
      
      expect(screen.getByText('Please wait...')).toBeInTheDocument()
    })

    it('should not render text when text is empty', () => {
      render(<LoadingSpinner text="" />)
      
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })

  describe('Combined Variants', () => {
    it('should handle size and text combinations', () => {
      render(<LoadingSpinner size="lg" text="Processing..." />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-12', 'h-12')
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })

    it('should handle all variant combinations', () => {
      render(<LoadingSpinner size="sm" text="Please wait..." />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-4', 'h-4')
      expect(screen.getByText('Please wait...')).toBeInTheDocument()
    })
  })

  describe('Styling and Classes', () => {
    it('should have correct base classes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(
        'animate-spin',
        'rounded-full',
        'border-2',
        'border-gray-200',
        'border-t-primary-600'
      )
    })

    it('should have correct animation classes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('animate-spin')
    })

    it('should have correct border classes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-2', 'border-gray-200', 'border-t-primary-600')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveAttribute('role', 'status')
    })

    it('should announce loading state to screen readers', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle invalid size gracefully', () => {
      render(<LoadingSpinner size="invalid" as any />)
      
      // Should fallback to default size
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-8', 'h-8')
    })

    it('should handle undefined props gracefully', () => {
      render(<LoadingSpinner size={undefined} text={undefined} />)
      
      // Should use default values
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-8', 'h-8')
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should handle null props gracefully', () => {
      render(<LoadingSpinner size={null as any} text={null as any} />)
      
      // Should use default values
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-8', 'h-8')
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now()
      
      render(<LoadingSpinner />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render within reasonable time (less than 50ms)
      expect(renderTime).toBeLessThan(50)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('should handle rapid re-renders', () => {
      const { rerender } = render(<LoadingSpinner />)
      
      // Should not crash on rapid re-renders
      expect(screen.getByRole('status')).toBeInTheDocument()
      
      rerender(<LoadingSpinner size="lg" />)
      expect(screen.getByRole('status')).toHaveClass('w-12', 'h-12')
      
      rerender(<LoadingSpinner size="sm" text="Processing..." />)
      expect(screen.getByRole('status')).toHaveClass('w-4', 'h-4')
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should work within other components', () => {
      render(
        <div>
          <h1>Loading Page</h1>
          <LoadingSpinner />
          <p>Please wait...</p>
        </div>
      )
      
      // Should render within component tree
      expect(screen.getByText('Loading Page')).toBeInTheDocument()
      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.getByText('Please wait...')).toBeInTheDocument()
    })

    it('should work with conditional rendering', () => {
      const { rerender } = render(
        <div>
          {true && <LoadingSpinner />}
        </div>
      )
      
      // Should render when condition is true
      expect(screen.getByRole('status')).toBeInTheDocument()
      
      rerender(
        <div>
          {false && <LoadingSpinner />}
        </div>
      )
      
      // Should not render when condition is false
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should maintain consistent sizing across screen sizes', () => {
      render(<LoadingSpinner size="md" />)
      
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('w-8', 'h-8')
      
      // Size should not change based on screen size
      expect(spinner).not.toHaveClass('sm:w-10', 'md:w-12', 'lg:w-16')
    })
  })
})
