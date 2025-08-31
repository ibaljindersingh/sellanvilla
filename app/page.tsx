"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  StarIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  HeartIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import ProductCarousel from './components/ProductCarousel';
import ProductCard from './components/ProductCard';

// Import products from our simple JSON CMS. The JSON file is statically
// bundled at build time. Note: The `.default` is required because
// TypeScript thinks JSON imports have a `default` property.
import productData from '@/public/products.json';

// Replace this with your actual WhatsApp number (full international
// format, including the leading +). All WhatsApp buttons will
// automatically generate a chat link using this value.
const WHATSAPP_NUMBER = '+9477xxxxxxx';

interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  description: string;
  images: string[];
}

/**
 * Home page of Sellan Villa, featuring a comprehensive landing page with
 * hero section, features, categories showcase, testimonials, and more.
 */
export default function HomePage() {
  const products: Product[] = productData as unknown as Product[];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Compute distinct categories from the products. Prepend "All" to
  // allow resetting the filter.
  const categories = useMemo(() => {
    try {
      const set = new Set<string>();
      products.forEach((p) => set.add(p.category));
      return ['All', ...Array.from(set)];
    } catch (error) {
      console.error('Error computing categories:', error);
      return ['All'];
    }
  }, [products]);

  // Filter products based on the active category and search term.
  const filtered = useMemo(() => {
    try {
      return products.filter((product) => {
        const matchesCategory =
          activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  }, [products, activeCategory, searchTerm]);

  // Get featured products for different sections
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(0, 3);
  const bestSellers = products.slice(0, 3);

  return (
    <div className="min-h-screen">

      
      {/* Hero Carousel Section */}
      <section className="w-full mb-16">
        {products && Array.isArray(products) && products.length > 0 ? (
          <ProductCarousel products={products.slice(0, 5)} />
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center text-gray-500">
              <p>No products available</p>
              <p className="text-sm mt-2">Check console for debug info</p>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TruckIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over $50</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Handcrafted</h3>
            <p className="text-sm text-gray-600">Made with love & care</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">WhatsApp assistance</p>
          </div>
        </div>
      </section>

      {/* Categories Showcase Section */}
      {products && Array.isArray(products) && products.length > 0 && (
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collections designed for comfort, elegance, and everyday luxury
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(cat => cat !== 'All').map((category) => {
              const categoryProducts = products.filter(p => p.category === category);
              const categoryImage = categoryProducts[0]?.images[0] || '/og-sellanvilla.jpg';
              
              return (
                <Link 
                  key={category} 
                  href={`/shop?category=${category}`}
                  className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={categoryImage}
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{category}</h3>
                        <p className="text-sm opacity-90">{categoryProducts.length} Products</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {products && Array.isArray(products) && products.length > 0 && (
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular and trending items, carefully selected for you
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.slug} 
                product={product} 
                showCartActions={true} 
                productLink={`/shop?product=${product.slug}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              View All Products
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {products && Array.isArray(products) && products.length > 0 && (
        <section className="bg-gray-50 py-20 mb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                New Arrivals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fresh styles and latest additions to our collection
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {newArrivals.map((product) => (
                <ProductCard 
                  key={product.slug} 
                  product={product} 
                  variant="featured" 
                  showCartActions={true} 
                  productLink={`/shop?product=${product.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "The quality of their nightwear is exceptional. So comfortable and elegant. Highly recommend!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-semibold">S</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Sarah M.</p>
                <p className="text-sm text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "Amazing customer service! They helped me find the perfect size and the delivery was super fast."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-semibold">A</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Aisha K.</p>
                <p className="text-sm text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "Beautiful traditional wear that's perfect for special occasions. The embroidery is stunning!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-semibold">P</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Priya S.</p>
                <p className="text-sm text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-primary-800 py-16 mb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300 focus:outline-none"
              />
              <button className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram/Collection Preview Section */}
      {products && Array.isArray(products) && products.length > 0 && (
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Follow Our Style
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get inspired by our latest collections and styling tips
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((product, index) => (
              <Link 
                key={product.slug} 
                href={`/shop?product=${product.slug}`}
                className="relative group overflow-hidden rounded-lg block"
              >
                <Image
                  src={product.images[0] || '/og-sellanvilla.jpg'}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl py-12 px-6 text-center text-white mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Discover our collection of elegant fashion pieces and experience the perfect blend of comfort and style
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Shop Now
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold"
            >
              Chat with Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}