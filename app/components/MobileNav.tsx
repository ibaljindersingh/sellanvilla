"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, ChevronRightIcon, XMarkIcon, MagnifyingGlassIcon, HomeIcon, ShoppingBagIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '../hooks/useTranslations';

interface Category {
  name: string;
  href: string;
  icon: string;
  subcategories: string[];
}

interface MobileNavProps {
  categories: Category[];
}

export default function MobileNav({ categories }: MobileNavProps) {
  const { t } = useTranslations();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'categories'>('main');
  
  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en';
  
  // Determine if we're on the landing page
  const isLandingPage = pathname === `/${locale}`;
  
  // Contact link logic: if on landing page, use anchor link; otherwise, use contact page
  const contactLink = isLandingPage ? `/${locale}#contact` : `/${locale}/contact`;

  // Get current page for active navigation highlighting
  const getCurrentPage = () => {
    if (pathname === `/${locale}`) return 'home';
    if (pathname.startsWith(`/${locale}/shop`)) return 'shop';
    if (pathname.startsWith(`/${locale}/wishlist`)) return 'wishlist';
    if (pathname.startsWith(`/${locale}/contact`)) return 'contact';
    return '';
  };

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    if (segments.length > 0) {
      breadcrumbs.push({ name: 'Home', href: `/${locale}` });
      
      if (segments[1] === 'shop') {
        breadcrumbs.push({ name: 'Shop', href: `/${locale}/shop` });
        
        // Check if there's a category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category) {
          const categoryData = categories.find(cat => cat.href === category);
          if (categoryData) {
            breadcrumbs.push({ name: categoryData.name, href: `/${locale}/shop?category=${category}` });
          }
        }
      } else if (segments[1] === 'wishlist') {
        breadcrumbs.push({ name: 'Wishlist', href: `/${locale}/wishlist` });
      } else if (segments[1] === 'contact') {
        breadcrumbs.push({ name: 'Contact', href: `/${locale}/contact` });
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setCurrentView('main');
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setCurrentView('main');
    document.body.style.overflow = 'unset';
  };

  const showCategories = () => {
    setCurrentView('categories');
  };

  const showMainMenu = () => {
    setCurrentView('main');
  };

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <svg
          className={`h-6 w-6 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

              {/* Mobile menu overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black opacity-100"
              onClick={closeMenu}
            />
            
            {/* Menu panel */}
            <div className="absolute inset-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link href="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                <Image
                  src="/sellanvilla-logo.png"
                  alt="Sellan Villa Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-heading text-lg text-primary-800">Sellan Villa</span>
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>



            {/* Menu content */}
            <div className="flex-1 overflow-y-auto bg-white">
              {currentView === 'main' ? (
                // Main Navigation View
                <div className="p-4 space-y-4 bg-white">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Main Navigation</h3>
                  
                  <div className="space-y-2">
                    <Link
                      href={`/${locale}`}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        getCurrentPage() === 'home'
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                      onClick={closeMenu}
                    >
                      <HomeIcon className="w-5 h-5" />
                      <span className="font-medium">{t('common.home')}</span>
                    </Link>

                    <button
                      onClick={showCategories}
                      className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-gradient-to-br from-amber-100 to-orange-100 rounded flex items-center justify-center text-sm">
                          📂
                        </div>
                        <span className="font-medium">Categories</span>
                      </div>
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/${locale}/shop`}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        getCurrentPage() === 'shop'
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                      onClick={closeMenu}
                    >
                      <ShoppingBagIcon className="w-5 h-5" />
                      <span className="font-medium">{t('common.shop')}</span>
                    </Link>

                    <Link
                      href={contactLink}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        getCurrentPage() === 'contact'
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                      onClick={closeMenu}
                    >
                      <div className="w-5 h-5 bg-gradient-to-br from-amber-100 to-orange-100 rounded flex items-center justify-center text-sm">
                        📞
                      </div>
                      <span className="font-medium">{t('common.contact')}</span>
                    </Link>
                  </div>
                </div>
              ) : (
                // Categories View
                <div className="p-4 space-y-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Categories</h3>
                    <button
                      onClick={showMainMenu}
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      ← Back to Menu
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={`/${locale}/shop?category=${category.href}`}
                        className="block p-3 rounded-lg hover:bg-amber-50 transition-all duration-200 group"
                        onClick={closeMenu}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-200">
                            {category.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                              {category.name}
                            </h4>
                            <div className="text-xs text-gray-500 mt-1">
                              {category.subcategories.slice(0, 2).join(' • ')}
                            </div>
                          </div>
                          <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href={`/${locale}/account`}
                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-white hover:text-amber-600 transition-all duration-200"
                  onClick={closeMenu}
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm">My Account</span>
                </Link>
                <Link
                  href={`/${locale}/wishlist`}
                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-white hover:text-rose-600 transition-all duration-200"
                  onClick={closeMenu}
                >
                  <HeartIcon className="w-4 h-4" />
                  <span className="text-sm">Wishlist</span>
                </Link>
                <Link
                  href={`/${locale}/cart`}
                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-white hover:text-amber-600 transition-all duration-200"
                  onClick={closeMenu}
                >
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span className="text-sm">Shopping Cart</span>
                </Link>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-white font-medium py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                onClick={closeMenu}
              >
                <span className="text-xl">💬</span>
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
