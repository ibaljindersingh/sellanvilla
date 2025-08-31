"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { TrashIcon, HeartIcon, ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function WishlistPage() {
  const { state: wishlistState, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleAddToCart = async (item: any) => {
    try {
      setIsProcessing(item.id);
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        size: undefined
      });
      
      // Simulate processing delay
      setTimeout(() => {
        setIsProcessing(null);
      }, 1000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setIsProcessing(null);
    }
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">💝</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">Start adding items you love to your wishlist!</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="text-primary-600 hover:text-primary-700 mr-4">
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <span className="ml-4 text-gray-500">({wishlistState.itemCount} items)</span>
          </div>
          
          <button
            onClick={() => {
              try {
                clearWishlist();
              } catch (error) {
                console.error('Error clearing wishlist:', error);
              }
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistState.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      try {
                        removeItem(item.id);
                      } catch (error) {
                        console.error('Error removing item from wishlist:', error);
                      }
                    }}
                    className="p-2 bg-white bg-opacity-90 text-red-500 hover:text-red-700 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
                    title="Remove from wishlist"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                
                <p className="font-bold text-xl text-primary-600 mb-4">
                  ${item.price.toFixed(2)}
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isProcessing === item.id}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing === item.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    )}
                    {isProcessing === item.id ? 'Adding...' : 'Add to Cart'}
                  </button>
                  
                  <Link
                    href={`/products/${item.id}`}
                    className="flex-1 text-center py-2 px-4 rounded-md border border-primary-600 text-primary-600 text-sm font-medium hover:bg-primary-50 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
