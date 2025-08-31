import { getTranslations } from 'next-intl/server';
import { ShoppingBagIcon, StarIcon, TruckIcon, ShieldCheckIcon, MagnifyingGlassIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, HeartIcon, TagIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { products, Product } from '../data/products';

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  // Get featured products for different sections
  const featuredProducts = products.slice(0, 4);

  // Define categories with their icons and colors
  const categories = [
    { name: 'Nightwear', icon: '🌙', color: 'bg-blue-100 text-blue-800', href: 'nightwear' },
    { name: 'Maternity Wear', icon: '🤱', color: 'bg-pink-100 text-pink-800', href: 'maternity' },
    { name: 'Shawls', icon: '🧣', color: 'bg-purple-100 text-purple-800', href: 'shawls' },
    { name: 'Indian Salwaar Suits', icon: '👗', color: 'bg-orange-100 text-orange-800', href: 'indian-salwaar' },
    { name: 'Jewellery', icon: '💍', color: 'bg-yellow-100 text-yellow-800', href: 'jewellery' },
    { name: 'Accessories', icon: '👜', color: 'bg-green-100 text-green-800', href: 'accessories' }
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION - First Impression & Search */}
      <section className="hero-section relative bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white py-24 overflow-hidden border-0">
        {/* Fashion & Ecommerce Background Animations */}
        <div className="absolute inset-0">
          {/* Floating fashion icons */}
          <div className="absolute top-16 left-16 w-16 h-16 bg-white/10 rounded-full animate-bounce flex items-center justify-center">
            <ShoppingBagIcon className="w-8 h-8 text-white/60" />
          </div>
          
          <div className="absolute top-32 right-20 w-12 h-12 bg-white/15 rounded-full animate-pulse flex items-center justify-center" style={{animationDelay: '1s'}}>
            <HeartIcon className="w-6 h-6 text-white/70" />
          </div>
          
          <div className="absolute top-48 left-1/3 w-14 h-14 bg-white/20 rounded-full animate-bounce flex items-center justify-center" style={{animationDelay: '2s'}}>
            <TagIcon className="w-7 h-7 text-white/80" />
          </div>
          
          <div className="absolute bottom-32 right-1/4 w-10 h-10 bg-white/10 rounded-full animate-ping flex items-center justify-center" style={{animationDelay: '3s'}}>
            <SparklesIcon className="w-5 h-5 text-white/60" />
          </div>
          
          <div className="absolute bottom-20 left-20 w-18 h-18 bg-white/15 rounded-full animate-bounce flex items-center justify-center" style={{animationDelay: '1.5s'}}>
            <StarIcon className="w-9 h-9 text-white/70" />
          </div>
          

          
          <div className="absolute top-1/3 right-1/3 w-16 h-8 bg-white/15 rounded-full animate-bounce flex items-center justify-center" style={{animationDelay: '2.5s'}}>
            <span className="text-xs font-bold text-white/70">SALE</span>
          </div>
          
          {/* Floating clothing items */}
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse flex items-center justify-center" style={{animationDelay: '1.8s'}}>
            <span className="text-lg">👗</span>
          </div>
          
          <div className="absolute top-2/3 right-1/4 w-14 h-14 bg-white/15 rounded-full animate-bounce flex items-center justify-center" style={{animationDelay: '0.8s'}}>
            <span className="text-xl">💍</span>
          </div>
          
          {/* Curved wave overlay - removed to fix border issue */}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Animated heading with staggered entrance */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 animate-gradient-x">
                Sellan Villa
              </span>
            </h1>
            
            {/* Animated description */}
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Discover the epitome of elegance with our curated collection of premium fashion, 
              where tradition meets contemporary style in perfect harmony.
            </p>
            
            {/* Working Search Bar with Fashion Focus */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <form action={`/${locale}/shop`} method="GET" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for nightwear, shawls, jewellery..."
                    className="w-full px-8 py-4 text-lg text-gray-800 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50 pl-16 pr-8 transition-all duration-300 hover:bg-white"
                    list="search-suggestions"
                  />
                  <MagnifyingGlassIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-amber-600" />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Search
                  </button>
                </div>
                
                {/* Search Suggestions */}
                <datalist id="search-suggestions">
                  <option value="nightwear" />
                  <option value="maternity wear" />
                  <option value="shawls" />
                  <option value="salwaar suits" />
                  <option value="jewellery" />
                  <option value="accessories" />
                  <option value="velvet" />
                  <option value="cotton" />
                  <option value="silk" />
                  <option value="embroidery" />
                </datalist>
              </form>
              
              {/* Quick Search Tags */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {['Nightwear', 'Shawls', 'Jewellery', 'Maternity'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/${locale}/shop?category=${tag.toLowerCase().replace(' ', '-')}`}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
              <Link
                href={`/${locale}/shop`}
                className="group inline-flex items-center bg-gradient-to-r from-white via-amber-50 to-white text-amber-600 px-12 py-5 rounded-full text-lg font-bold hover:from-amber-50 hover:via-white hover:to-amber-50 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-amber-200 relative overflow-hidden"
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-white to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110 group-hover:scale-125"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center w-full">
                  <span className="text-xl mr-3 group-hover:rotate-12 transition-transform duration-300">🛍️</span>
                  {t('shop.shopNow')}
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-amber-200/30 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
              </Link>
              <Link
                href="#contact"
                className="group inline-flex items-center border-2 border-white text-white px-12 py-5 rounded-full text-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-500 transform hover:scale-110 backdrop-blur-sm relative overflow-hidden"
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110 group-hover:scale-125"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center w-full">
                  <span className="text-xl mr-3 group-hover:rotate-12 transition-transform duration-300">📧</span>
                  Contact Us
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
              </Link>
            </div>
            
            {/* Social Proof - Fashion Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '1.2s'}}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80 text-sm">Fashion Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L50 100C100 80 200 40 300 30C400 20 500 40 600 50C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V130H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS - Show Value Immediately */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked collection of premium fashion items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                variant="featured"
                showCartActions={true}
                productLink={`/${locale}/shop?product=${product.slug}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/shop`}
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold text-lg rounded-full hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-amber-200 relative overflow-hidden"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110 group-hover:scale-125"></div>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center w-full">
                <ShoppingBagIcon className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                View All Products
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES - Help Users Navigate */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L50 20C100 40 200 80 300 90C400 100 500 80 600 70C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V0H0Z" fill="#fef3c7"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in-up">{t('shop.shopByCategory')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Browse our collections by category to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/${locale}/shop?category=${category.href}`}
                className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-amber-100 animate-fade-in-up"
                style={{animationDelay: `${0.4 + index * 0.1}s`}}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon container with enhanced styling */}
                <div className="relative p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {category.icon}
                  </div>
                  
                  {/* Category name with enhanced typography */}
                  <h3 className="font-bold text-gray-800 group-hover:text-amber-700 transition-colors duration-500 text-base leading-tight">
                    {category.name}
                  </h3>
                  
                  {/* Subtle description */}
                  <p className="text-sm text-gray-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Discover collection
                  </p>
                </div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-amber-300 transition-colors duration-500" />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L50 20C100 40 200 80 300 90C400 100 500 80 600 70C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V0H0Z" fill="white" transform="rotate(180 600 60)"/>
          </svg>
        </div>
      </section>

      {/* 4. TRENDING PRODUCTS - Create Urgency & Interest */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trending Now</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what's capturing hearts in our latest collections
            </p>
          </div>
          <ProductCarousel
            products={products.slice(4, 8)}
            productLink={`/${locale}/shop?product=`}
          />
        </div>
      </section>

      {/* 5. TRUST & CREDIBILITY - Build Confidence */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L50 20C100 40 200 80 300 90C400 100 500 80 600 70C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V0H0Z" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in-up">Why Choose Sellan Villa?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              We're committed to excellence in every aspect of your shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="group text-center p-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-amber-200 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <TruckIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-amber-700 transition-colors">Free Shipping</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors text-lg leading-relaxed">{t('shop.onOrdersOver50')}</p>
            </div>
            
            <div className="group text-center p-10 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-rose-200 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <ShieldCheckIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-rose-700 transition-colors">Quality Guarantee</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors text-lg leading-relaxed">Premium fabrics and exceptional craftsmanship</p>
            </div>
            
            <div className="group text-center p-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-emerald-200 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <StarIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-emerald-700 transition-colors">Customer Satisfaction</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors text-lg leading-relaxed">Dedicated to exceeding your expectations</p>
            </div>
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L50 20C100 40 200 80 300 90C400 100 500 80 600 70C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V0H0Z" fill="#fef3c7" transform="rotate(180 600 60)"/>
          </svg>
        </div>
      </section>

      {/* 6. ABOUT SECTION - Build Connection */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About Sellan Villa</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              We are passionate about bringing you the finest selection of fashion items, 
              carefully curated to match your style and comfort needs. From elegant nightwear 
              to stunning Indian ethnic wear, we have everything to make you feel beautiful, 
              confident, and truly special.
            </p>
            <Link
              href={`/${locale}/shop`}
              className="group inline-flex items-center bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-12 py-5 rounded-full text-lg font-bold hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-amber-200 relative overflow-hidden"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110 group-hover:scale-125"></div>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center">
                <ShoppingBagIcon className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                {t('shop.shopNow')}
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION - Final Call to Action */}
      <section id="contact" className="py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white relative">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L50 20C100 40 200 80 300 90C400 100 500 80 600 70C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V0H0Z" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Ready to start your fashion journey? We're here to help you find the perfect pieces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Have questions about our products or need assistance? Reach out to us anytime.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-white/90">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-white/90">hello@sellanvilla.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-white/90">Brampton, Ontario, Canada</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  />
                </div>
                
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-white text-amber-600 font-bold py-4 px-8 rounded-xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L50 20C100 40 200 80 300 90C400 100 500 80 600 70C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V0H0Z" fill="white" transform="rotate(180 600 60)"/>
          </svg>
        </div>
      </section>
    </div>
  );
}
