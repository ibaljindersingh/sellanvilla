import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './components/MobileNav';
import CartIcon from './components/CartIcon';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import ErrorBoundary from './components/ErrorBoundary';
import NoSSR from './components/NoSSR';

const inter = Inter({ subsets: ['latin'] });

// Global metadata applied to every page in the application. When
// individual pages specify their own metadata, those fields will
// override values defined here. See `/app/page.tsx` for custom meta.
export const metadata: Metadata = {
  title: {
    default: 'Sellan Villa - Fashion & Lifestyle',
    template: '%s | Sellan Villa'
  },
  description:
    'Discover a curated selection of nightwear, maternity wear, shawls, Indian salwaar suits, jewellery and more at Sellan Villa. Quality, comfort and elegance at your fingertips.'
};

/**
 * Renders the root layout for the Sellan Villa storefront. This
 * component wraps every page with a consistent header and footer and
 * applies global CSS styles. The children passed into this component
 * represent the specific page contents.
 */
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <WishlistProvider>
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
              <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/sellanvilla-logo.png"
                    alt="Sellan Villa Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="font-heading text-xl text-primary-800">Sellan Villa</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-4 text-sm">
                  <Link href="/" className="hover:underline">Home</Link>
                  <Link href="/shop" className="hover:underline">Shop</Link>
                  <Link href="/wishlist" className="hover:underline">Wishlist</Link>
                  <Link href="#contact" className="hover:underline">Contact</Link>
                </nav>
                <div className="flex items-center space-x-2">
                  <NoSSR>
                    <CartIcon />
                  </NoSSR>
                  <MobileNav />
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-grow container mx-auto px-4 py-6">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>

            {/* Footer */}
            <footer className="bg-primary-900 text-white py-12 mt-12">
              <div className="container mx-auto px-4 text-center space-y-4">
                <div className="flex justify-center space-x-6 mb-6">
                  <a
                    href="https://www.facebook.com/sellanvilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="mailto:orders@sellanvilla.com"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </div>
                <p className="text-white/60 text-sm">
                  Crafted with love in Brampton. Quality fabrics, size-inclusive options.
                </p>
                <p className="font-semibold">&copy; {new Date().getFullYear()} Sellan Villa. All rights reserved.</p>
              </div>
            </footer>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}