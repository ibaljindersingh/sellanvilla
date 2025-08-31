import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import ProductDetail from '../../app/components/ProductDetail';

// Mock product data
const mockProduct = {
  slug: 'test-product',
  name: 'Test Product',
  category: 'Test Category',
  price: 29.99,
  sizes: ['S', 'M', 'L'],
  description: 'A test product description',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]
};

const mockOnBack = jest.fn();

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(
      <ProductDetail product={mockProduct} onBack={mockOnBack} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
  });

  it('renders size selection for products with multiple sizes', () => {
    render(
      <ProductDetail product={mockProduct} onBack={mockOnBack} />
    );

    expect(screen.getByText('Select Size')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('renders size display for single-size products', () => {
    const singleSizeProduct = { ...mockProduct, sizes: ['One Size'] };
    
    render(
      <ProductDetail product={singleSizeProduct} onBack={mockOnBack} />
    );

    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('One Size')).toBeInTheDocument();
    expect(screen.getByText('One size available')).toBeInTheDocument();
  });

  it('renders quantity selector', () => {
    render(
      <ProductDetail product={mockProduct} onBack={mockOnBack} />
    );

    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(
      <ProductDetail product={mockProduct} onBack={mockOnBack} />
    );

    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.getByText('Add to Wishlist')).toBeInTheDocument();
    expect(screen.getByText('Order on WhatsApp')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(
      <ProductDetail product={mockProduct} onBack={mockOnBack} />
    );

    fireEvent.click(screen.getByText('Back to Shop'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('renders image navigation for multiple images', () => {
    render(
      <ProductDetail product={mockProduct} onBack={mockOnBack} />
    );

    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('does not render image navigation for single image', () => {
    const singleImageProduct = { ...mockProduct, images: ['https://example.com/image1.jpg'] };
    
    render(
      <ProductDetail product={singleImageProduct} onBack={mockOnBack} />
    );

    expect(screen.queryByText('1 / 1')).not.toBeInTheDocument();
  });
});
