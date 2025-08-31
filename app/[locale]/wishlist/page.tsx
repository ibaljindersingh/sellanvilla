"use client";

import { useWishlist } from '../../contexts/WishlistContext';
import { useTranslations } from '../../hooks/useTranslations';
import { CONSTANTS } from '../../constants';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import ProductCard from '../../components/ProductCard';

export default function WishlistPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const { t } = useTranslations();
  const { state: wishlistState, removeItem } = useWishlist();

  if (wishlistState.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wishlist</h1>
        <p className="text-gray-600 mb-8">Your wishlist is empty.</p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          {t('shop.shopNow')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
        <Link
          href={`/${locale}/shop`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {t('shop.shopNow')}
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistState.items.map((item) => (
          <div key={item.id} className="relative">
            <ProductCard
              product={{
                slug: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                sizes: ['One Size'],
                description: '',
                images: [item.image]
              }}
              showCartActions={true}
              productLink={`/${locale}/shop?product=${item.id}`}
            />
            
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove from wishlist"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

