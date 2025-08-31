
# SellanVilla — Next.js Storefront (Netlify)

A lightweight storefront for nightwear, maternity sets, and pashmina shawls. One‑click WhatsApp ordering, filters, product detail page, and a simple JSON CMS.

## 🚀 Quick Start (Local)

```bash
npm i
npm run dev
```
Open http://localhost:3000

Update your WhatsApp number in:
`app/page.tsx` and `app/products/[slug]/page.tsx` → `WHATSAPP_NUMBER`

## 🧩 Simple CMS

Edit `public/products.json`. Each item:
```json
{
  "slug": "satin-night-suit",
  "title": "Satin Night Suit",
  "category": "Nightwear",
  "price": 32,
  "sizes": ["S","M","L","XL","XXL"],
  "images": ["/p/satin-1.jpg"],
  "tag": "Trending",
  "description": "Smooth satin two‑piece with relaxed fit and breathable lining."
}
```

Place product images under `public/p/` and reference them by path.

## 🔎 SEO & Assets
- Favicon: `public/favicon.ico`
- OpenGraph: `public/og-sellanvilla.jpg`
- Logo: `public/sellanvilla-logo.png`

## 🌐 Deploy to Netlify

1. **Create a new site** at https://app.netlify.com and connect your Git repo **or** drag‑and‑drop the zip from this project.
2. In site settings (or `netlify.toml`), Netlify will detect Next.js and use the official plugin:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Ensure Node 18/20 is used (Netlify default is fine).
4. Click **Deploy**. Netlify’s Next.js plugin will handle dynamic routes (`/products/[slug]`).

> If you see image optimization issues on Netlify, this project sets `images.unoptimized = true` in `next.config.mjs` for compatibility.

## 🔧 Optional: Environment variables
None required.

---
Made for SellanVilla.
