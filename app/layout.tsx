import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SellanVilla — Nightwear, Maternity & Pashmina Shawls',
  description: 'Cozy, size‑inclusive nightwear (incl. maternity) and elegant pashmina shawls. Order via WhatsApp or DM.',
  openGraph: {
    title: 'SellanVilla — Nightwear, Maternity & Pashmina Shawls',
    description: 'Cozy, size‑inclusive nightwear (incl. maternity) and elegant pashmina shawls.',
    url: 'https://sellanvilla.com',
    siteName: 'SellanVilla',
    images: [{ url: '/og-sellanvilla.jpg', width: 1200, height: 630, alt: 'SellanVilla' }],
    locale: 'en_US',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
