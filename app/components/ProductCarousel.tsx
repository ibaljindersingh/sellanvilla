"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
}

interface ProductCarouselProps {
  products?: Product[];
}

export default function ProductCarousel({ products = [] }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products if not provided as props
  useEffect(() => {
    console.log('ProductCarousel useEffect - products:', products);
    if (products && products.length > 0) {
      // Products provided as props - use them directly
      console.log('Using products from props:', products.length);
      setCarouselProducts(products);
      setIsLoading(false);
      setError(null);
    } else {
      // Only fetch from API if no products provided
      console.log('No products provided, fetching from API');
      const loadProducts = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await fetch('/products.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          if (Array.isArray(data) && data.length > 0) {
            // Take first 5 products for carousel
            setCarouselProducts(data.slice(0, 5));
          } else {
            throw new Error('Invalid products data format');
          }
        } catch (error) {
          console.error('Error loading products for carousel:', error);
          setError('Failed to load products');
          // Don't set fallback products - let the loading state handle it
        } finally {
          setIsLoading(false);
        }
      };
      
      loadProducts();
    }
  }, [products]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || carouselProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselProducts.length]);

  const goToSlide = (index: number) => {
    try {
      if (index >= 0 && index < carouselProducts.length) {
        setCurrentIndex(index);
      }
    } catch (error) {
      console.error('Error going to slide:', error);
    }
  };

  const goToPrevious = () => {
    try {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? carouselProducts.length - 1 : prevIndex - 1
      );
    } catch (error) {
      console.error('Error going to previous slide:', error);
    }
  };

  const goToNext = () => {
    try {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselProducts.length - 1 ? 0 : prevIndex + 1
      );
    } catch (error) {
      console.error('Error going to next slide:', error);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Don't render if no products
  if (carouselProducts.length === 0) {
    return (
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading carousel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl">
      {/* Carousel Images */}
      {carouselProducts.map((product, index) => (
        <div
          key={product.slug}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={product.images[0] || '/og-sellanvilla.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            priority={index === 0}
            onError={(e) => {
              // Fallback to default image if product image fails
              const target = e.target as HTMLImageElement;
              target.src = '/og-sellanvilla.jpg';
            }}
          />
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-4xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl drop-shadow-lg mb-6">
                {product.description}
              </p>
              <div className="space-y-3">
                <p className="text-2xl md:text-3xl font-semibold text-primary-300">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm md:text-base text-primary-200">
                  {product.category}
                </p>
                <Link
                  href={`/shop?product=${product.slug}`}
                  className="inline-block mt-4 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors text-sm md:text-base"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Play Button */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
      >
        {isAutoPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
          </svg>
        )}
      </button>
    </div>
  );
}
