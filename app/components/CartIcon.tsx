"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CartIcon() {
  const { state: cartState } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
      <ShoppingCartIcon className="w-6 h-6" />
      {isClient && cartState.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {cartState.itemCount > 99 ? '99+' : cartState.itemCount}
        </span>
      )}
    </Link>
  );
}
