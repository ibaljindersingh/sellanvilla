import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

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
 * component provides the basic HTML structure and context providers.
 * The actual header, footer, and page content are handled by the
 * locale-aware layout in app/[locale]/layout.tsx
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
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}