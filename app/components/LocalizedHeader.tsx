"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingBagIcon, HeartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MobileNav from './MobileNav';
import CartIcon from './CartIcon';
import NoSSR from './NoSSR';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from '../hooks/useTranslations';

interface LocalizedHeaderProps {
  locale: string;
}

export default function LocalizedHeader({ locale }: LocalizedHeaderProps) {
  const { t } = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  
  // Determine if we're on the landing page
  const isLandingPage = pathname === `/${locale}`;
  
  // Contact link logic: if on landing page, use anchor link; otherwise, use contact page
  const contactLink = isLandingPage ? `/${locale}#contact` : `/${locale}/contact`;

  // Categories data
  const categories = [
    {
      name: 'Nightwear',
      href: 'nightwear',
      icon: '🌙',
      subcategories: ['Sleepwear', 'Loungewear', 'Robes']
    },
    {
      name: 'Maternity Wear',
      href: 'maternity',
      icon: '🤱',
      subcategories: ['Dresses', 'Tops', 'Bottoms']
    },
    {
      name: 'Shawls',
      href: 'shawls',
      icon: '🧣',
      subcategories: ['Silk', 'Cotton', 'Embroidered']
    },
    {
      name: 'Indian Salwaar Suits',
      href: 'indian-salwaar',
      icon: '👗',
      subcategories: ['Anarkali', 'Palazzo', 'Churidar']
    },
    {
      name: 'Jewellery',
      href: 'jewellery',
      icon: '💍',
      subcategories: ['Necklaces', 'Earrings', 'Bracelets']
    },
    {
      name: 'Accessories',
      href: 'accessories',
      icon: '👜',
      subcategories: ['Bags', 'Scarves', 'Belts']
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current page for active navigation highlighting
  const getCurrentPage = () => {
    if (pathname === `/${locale}`) return 'home';
    if (pathname.startsWith(`/${locale}/shop`)) return 'shop';
    if (pathname.startsWith(`/${locale}/wishlist`)) return 'wishlist';
    if (pathname.startsWith(`/${locale}/contact`)) return 'contact';
    return '';
  };

  const currentPage = getCurrentPage();

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        {/* Top bar for announcements */}
        <div className="hidden md:block py-2 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium">
            <span className="animate-pulse">✨</span>
            <span>Free shipping on orders over $50</span>
            <span className="animate-pulse">✨</span>
          </div>
        </div>

        {/* Main header content */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/sellanvilla-logo.png"
                alt="Sellan Villa Logo"
                width={48}
                height={48}
                className="rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Sellan Villa
              </span>
              <p className="text-xs text-gray-500 -mt-1">Premium Fashion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href={`/${locale}`} 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group ${
                currentPage === 'home' 
                  ? 'text-amber-600 bg-amber-50' 
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              {t('common.home')}
              {currentPage === 'home' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></div>
              )}
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 flex items-center space-x-1"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <span>Categories</span>
                <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {/* Categories Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
                  <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">Shop by Category</h3>
                    <p className="text-xs text-gray-500">Discover our collections</p>
                  </div>
                  
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={`/${locale}/shop?category=${category.href}`}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-amber-50 transition-all duration-200 group/item"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-md flex items-center justify-center text-sm group-hover/item:scale-110 transition-transform duration-200">
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 group-hover/item:text-amber-600 transition-colors">
                            {category.name}
                          </h4>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center space-x-1">
                            {category.subcategories.slice(0, 2).map((sub, index) => (
                              <span key={sub} className="hover:text-amber-600 transition-colors">
                                {sub}{index < Math.min(1, category.subcategories.length - 1) && ' •'}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRightIcon className="w-3 h-3 text-gray-400 group-hover/item:text-amber-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <Link
                      href={`/${locale}/shop`}
                      className="flex items-center justify-center w-full px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      <ShoppingBagIcon className="w-3 h-3 mr-2" />
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              href={`/${locale}/shop`} 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group ${
                currentPage === 'shop' 
                  ? 'text-amber-600 bg-amber-50' 
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              {t('common.shop')}
              {currentPage === 'shop' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></div>
              )}
            </Link>
            
            <Link 
              href={contactLink} 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group ${
                currentPage === 'contact' 
                  ? 'text-amber-600 bg-amber-50' 
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              {t('common.contact')}
              {currentPage === 'contact' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></div>
              )}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <NoSSR>
              <LanguageSwitcher />
            </NoSSR>

            {/* Wishlist - Icon only, no duplicate */}
            <Link
              href={`/${locale}/wishlist`}
              className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 relative group"
              aria-label="Wishlist"
            >
              <HeartIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                0
              </span>
            </Link>

            {/* Cart */}
            <NoSSR>
              <CartIcon />
            </NoSSR>

            {/* User Account */}
            <Link
              href={`/${locale}/account`}
              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
              aria-label="Account"
            >
              <UserIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                autoFocus
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNav categories={categories} />
    </header>
  );
}
