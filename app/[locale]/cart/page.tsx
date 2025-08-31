"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useTranslations } from '../../hooks/useTranslations';
import { CONSTANTS } from '../../constants';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function CartPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const { t } = useTranslations();
  const { state: cartState, removeItem, updateQuantity } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const moveToWishlist = (item: any) => {
    try {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category || 'General'
      });
      removeItem(item.id);
    } catch (error) {
      console.error(CONSTANTS.ERRORS.WISHLIST.WISHLIST_ERROR, error);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(itemId);
    try {
      updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error(CONSTANTS.ERRORS.CART.CART_ERROR, error);
    } finally {
      setIsUpdating(null);
    }
  };

  const calculateSubtotal = () => {
    return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.13; // 13% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() >= 50 ? 0 : 10; // Free shipping over $50
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  if (cartState.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('cart.shoppingCart')}</h1>
        <p className="text-gray-600 mb-8">{t('cart.emptyCart')}</p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          {t('cart.continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">{t('cart.shoppingCart')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartState.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}</p>
                  <p className="font-semibold text-primary-600">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={isUpdating === item.id}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    -
                  </button>
                  
                  <span className="w-12 text-center font-medium">
                    {isUpdating === item.id ? '...' : item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={isUpdating === item.id}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => moveToWishlist(item)}
                    className={`p-2 rounded-md transition-colors ${
                      isInWishlist(item.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                    title={t('product.moveToWishlist')}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title={t('cart.removeItem')}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('cart.cartTotal')}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>{t('cart.subtotal')}</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('cart.tax')}</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('cart.shipping')}</span>
                <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>{t('cart.total')}</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors mb-4">
              {t('cart.proceedToCheckout')}
            </button>
            
            <Link
              href={`/${locale}/shop`}
              className="block w-full text-center text-primary-600 hover:text-primary-700 font-medium"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

