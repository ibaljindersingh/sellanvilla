"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    category: string;
    price: number;
    sizes: string[];
    description: string;
    images: string[];
  };
  variant?: 'default' | 'featured' | 'compact';
  showCartActions?: boolean;
  productLink?: string; // Custom product link override
}

export default function ProductCard({ product, variant = 'default', showCartActions = false, productLink }: ProductCardProps) {
  // Default product link if none provided
  const defaultProductLink = `/shop?product=${product.slug}`;
  const finalProductLink = productLink || defaultProductLink;
  
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Use contexts directly
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageHover = () => {
    try {
      if (product.images && product.images.length > 1) {
        setImageIndex(1);
      }
    } catch (error) {
      console.error('Error handling image hover:', error);
    }
  };

  const handleImageLeave = () => {
    try {
      setImageIndex(0);
    } catch (error) {
      console.error('Error handling image leave:', error);
    }
  };

  const handleAddToCart = () => {
    if (!isClient) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/og-sellanvilla.jpg',
        quantity: 1,
        size: product.sizes && product.sizes[0] ? product.sizes[0] : 'One Size'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleWishlistToggle = () => {
    if (!isClient) return;
    
    try {
      if (isInWishlist(product.slug)) {
        removeFromWishlist(product.slug);
      } else {
        addToWishlist({
          id: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0] || '/og-sellanvilla.jpg',
          category: product.category
        });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="relative h-32 w-full overflow-hidden">
          <Link href={finalProductLink} className="block h-full">
            <Image
              src={product.images && product.images[imageIndex] ? product.images[imageIndex] : '/og-sellanvilla.jpg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/og-sellanvilla.jpg';
              }}
            />
          </Link>
        </div>
        <div className="p-3">
          <Link href={finalProductLink} className="block">
            <h3 className="font-medium text-sm text-gray-800 truncate">{product.name}</h3>
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
            <p className="font-semibold text-primary-600">${product.price.toFixed(2)}</p>
          </Link>
          
          {showCartActions && isClient && (
            <div className="flex space-x-2 mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                disabled={isAddingToCart}
                className="flex-1 bg-primary-600 text-white py-1 px-2 rounded text-xs font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isAddingToCart ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                ) : (
                  <ShoppingCartIcon className="w-3 h-3 mr-1" />
                )}
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWishlistToggle();
                }}
                className={`p-1 border border-gray-300 rounded transition-colors ${
                  isInWishlist(product.slug) 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
                title={isInWishlist(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist(product.slug) ? (
                  <HeartIconSolid className="w-3 h-3" />
                ) : (
                  <HeartIcon className="w-3 h-3" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
        <div className="relative h-64 w-full overflow-hidden">
          <Link href={finalProductLink} className="block h-full">
            <Image
              src={product.images && product.images[imageIndex] ? product.images[imageIndex] : '/og-sellanvilla.jpg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/og-sellanvilla.jpg';
              }}
            />
            <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          </Link>
        </div>
        <div className="p-5">
          <Link href={finalProductLink} className="block">
            <div className="mb-3">
              <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mb-2">
                {product.category}
              </span>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-2xl text-primary-600">${product.price.toFixed(2)}</p>
              <div className="text-xs text-gray-500">
                {product.sizes && product.sizes.length > 1 ? `${product.sizes.length} sizes` : 'One size'}
              </div>
            </div>
          </Link>
          
          {showCartActions && isClient && (
            <div className="flex space-x-2 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                disabled={isAddingToCart}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isAddingToCart ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                )}
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWishlistToggle();
                }}
                className={`p-2 border border-gray-300 rounded-md transition-colors ${
                  isInWishlist(product.slug) 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
                title={isInWishlist(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist(product.slug) ? (
                  <HeartIconSolid className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={finalProductLink} className="block h-full">
          <Image
            src={product.images && product.images[imageIndex] ? product.images[imageIndex] : '/og-sellanvilla.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/og-sellanvilla.jpg';
            }}
          />
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              +{product.images.length - 1}
            </div>
          )}
        </Link>
      </div>
      <div className="p-4">
        <Link href={finalProductLink} className="block">
          <div className="mb-2">
            <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-xl text-primary-600">${product.price.toFixed(2)}</p>
            <div className="text-xs text-gray-500">
              {product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : 'One size'}
            </div>
          </div>
        </Link>
        
        {showCartActions && isClient && (
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={isAddingToCart}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isAddingToCart ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
              )}
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistToggle();
              }}
              className={`p-2 border border-gray-300 rounded-md transition-colors ${
                isInWishlist(product.slug) 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title={isInWishlist(product.slug) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist(product.slug) ? (
                <HeartIconSolid className="w-5 h-5" />
                ) : (
                <HeartIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
