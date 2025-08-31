
"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import productData from '@/public/products.json';

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

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const products: Product[] = productData as unknown as Product[];
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState<string>(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [layout, setLayout] = useState<'grid' | 'list' | 'masonry'>('grid');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Compute distinct categories and max price
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

  const maxPrice = useMemo(() => {
    try {
      return Math.max(...products.map(p => p.price));
    } catch (error) {
      console.error('Error computing max price:', error);
      return 100;
    }
  }, [products]);

  // Initialize price range with actual product prices
  useEffect(() => {
    try {
      if (maxPrice > 0) {
        setPriceRange([0, Math.ceil(maxPrice)]);
      }
    } catch (error) {
      console.error('Error initializing price range:', error);
      setPriceRange([0, 100]);
    }
  }, [maxPrice]);

  // Handle product selection from URL
  useEffect(() => {
    try {
      const productSlug = searchParams.get('product');
      if (productSlug) {
        const product = products.find(p => p.slug === productSlug);
        if (product) {
          setSelectedProduct(product);
        }
      } else {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error handling product selection:', error);
      setSelectedProduct(null);
    }
  }, [searchParams, products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    try {
      let filtered = products.filter((product) => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        
        return matchesCategory && matchesSearch && matchesPrice;
      });

      // Sort products
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'category':
          filtered.sort((a, b) => a.category.localeCompare(b.category));
          break;
        case 'name':
        default:
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      return filtered;
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  }, [products, activeCategory, searchTerm, priceRange, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    try {
      // Don't update URL if a product is selected to prevent flickering
      if (selectedProduct) return;
      
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (activeCategory !== 'All') params.set('category', activeCategory);
      if (sortBy !== 'name') params.set('sort', sortBy);
      
      const newUrl = params.toString() ? `?${params.toString()}` : '';
      router.replace(`/shop${newUrl}`, { scroll: false });
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  }, [searchTerm, activeCategory, sortBy, router, selectedProduct]);

  const handleLayoutChange = (newLayout: 'grid' | 'list' | 'masonry') => {
    try {
      setLayout(newLayout);
    } catch (error) {
      console.error('Error changing layout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-800/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Collection</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our curated selection of elegant fashion pieces, from comfortable nightwear to stunning jewellery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
              {filteredProducts.length} Products
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
              {categories.length - 1} Categories
            </span>
          </div>
        </div>
      </section>

      {/* Product Detail View */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      )}

      {/* Shop View - Only show when no product is selected */}
      {!selectedProduct && (
        <div className="container mx-auto px-4 py-8">
        {/* Layout Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              {[
                { key: 'grid', icon: '⊞', label: 'Grid' },
                { key: 'list', icon: '☰', label: 'List' },
                { key: 'masonry', icon: '▤', label: 'Masonry' }
              ].map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => handleLayoutChange(key as 'grid' | 'list' | 'masonry')}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    layout === key
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={label}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
          sortBy={sortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={maxPrice}
        />

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          layout={layout}
          loading={loading}
          emptyMessage="No products match your current filters. Try adjusting your search criteria or browse all categories."
        />

        {/* Quick Actions */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Need Help Finding Something?
            </h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Chat on WhatsApp
              </a>
                              <button
                  onClick={() => {
                    try {
                      setSearchTerm('');
                      setActiveCategory('All');
                      setPriceRange([0, maxPrice]);
                      setSortBy('name');
                    } catch (error) {
                      console.error('Error resetting filters:', error);
                    }
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filters
                </button>
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
