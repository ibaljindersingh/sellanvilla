import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '../../i18n';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';
import ErrorBoundary from '../components/ErrorBoundary';
import LocalizedHeader from '../components/LocalizedHeader';
import LocalizedFooter from '../components/LocalizedFooter';

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

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <WishlistProvider>
              <LocalizedHeader locale={locale} />

              {/* Page content */}
              <main className="flex-grow container mx-auto px-4 py-6">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </main>

              <LocalizedFooter />
            </WishlistProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
