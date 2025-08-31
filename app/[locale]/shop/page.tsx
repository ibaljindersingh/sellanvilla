"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from '../../hooks/useTranslations';
import { CONSTANTS } from '../../constants';
import FilterBar from '../../components/FilterBar';
import ProductCard from '../../components/ProductCard';
import ProductDetail from '../../components/ProductDetail';
import { products, Product } from '../../data/products';

export default function ShopPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    // Check for product selection in URL
    const productSlug = searchParams.get('product');
    if (productSlug) {
      const product = products.find(p => p.slug === productSlug);
      if (product) {
        setSelectedProduct(product);
      }
    }
    
    // Check for category filter in URL
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    // Filter and sort products
    let filtered = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
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
      default: // name
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    try {
      setActiveCategory(category);
      updateURL({ category: category === 'all' ? null : category });
    } catch (error) {
      console.error(CONSTANTS.ERRORS.NETWORK.FETCH_FAILED, error);
    }
  };

  const handleSearchChange = (term: string) => {
    try {
      setSearchTerm(term);
      updateURL({ search: term || null });
    } catch (error) {
      console.error(CONSTANTS.ERRORS.NETWORK.FETCH_FAILED, error);
    }
  };

  const handleSortChange = (sort: string) => {
    try {
      setSortBy(sort);
      updateURL({ sort: sort });
    } catch (error) {
      console.error(CONSTANTS.ERRORS.NETWORK.FETCH_FAILED, error);
    }
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    try {
      setPriceRange(range);
    } catch (error) {
      console.error(CONSTANTS.ERRORS.NETWORK.FETCH_FAILED, error);
    }
  };

  const updateURL = (params: Record<string, string | null>) => {
    try {
      const newUrl = new URLSearchParams(searchParams.toString());
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newUrl.delete(key);
        } else {
          newUrl.set(key, value);
        }
      });

      const newUrlString = newUrl.toString();
      const finalUrl = newUrlString ? `?${newUrlString}` : '';
      
      router.replace(`/${locale}/shop${finalUrl}`, { scroll: false });
    } catch (error) {
      console.error(CONSTANTS.ERRORS.NETWORK.FETCH_FAILED, error);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    updateURL({ product: product.slug });
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    updateURL({ product: null });
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  
  // Initialize price range with actual product prices
  const maxPrice = Math.max(...products.map(p => p.price));
  
  useEffect(() => {
    try {
      if (maxPrice > 0) {
        setPriceRange([0, maxPrice]);
      }
    } catch (error) {
      console.error(CONSTANTS.ERRORS.NETWORK.FETCH_FAILED, error);
    }
  }, [maxPrice]);

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleCloseProductDetail}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Shop View - Only show when no product is selected */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shop</h1>
        
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          sortBy={sortBy}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
          maxPrice={maxPrice}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              showCartActions={true}
              productLink={`/${locale}/shop?product=${product.slug}`}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
                setPriceRange([0, maxPrice]);
                setSortBy('name');
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
