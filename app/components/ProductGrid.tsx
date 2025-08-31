"use client";

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  description: string;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
  layout?: 'grid' | 'list' | 'masonry';
  loading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({ 
  products, 
  layout = 'grid', 
  loading = false,
  emptyMessage = "No products found matching your criteria."
}: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.slug}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
            onMouseEnter={() => {
              try {
                setHoveredProduct(product.slug);
              } catch (error) {
                console.error('Error setting hovered product:', error);
              }
            }}
            onMouseLeave={() => {
              try {
                setHoveredProduct(null);
              } catch (error) {
                console.error('Error clearing hovered product:', error);
              }
            }}
          >
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span>Available sizes: {product.sizes.join(', ')}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                                    <p className="text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</p>
                <Link href={`/shop?product=${product.slug}`} className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-600/90 transition-colors inline-block text-center">
                  View Details
                </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === 'masonry') {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {products.map((product) => (
          <div key={product.slug} className="break-inside-avoid">
            <ProductCard product={product} variant="featured" showCartActions={true} />
          </div>
        ))}
      </div>
    );
  }

  // Default grid layout
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.slug}
          onMouseEnter={() => {
            try {
              setHoveredProduct(product.slug);
            } catch (error) {
              console.error('Error setting hovered product:', error);
            }
          }}
          onMouseLeave={() => {
            try {
              setHoveredProduct(null);
            } catch (error) {
              console.error('Error clearing hovered product:', error);
            }
          }}
        >
          <ProductCard 
            product={product} 
            variant={hoveredProduct === product.slug ? 'featured' : 'default'} 
            showCartActions={true}
          />
        </div>
      ))}
    </div>
  );
}
