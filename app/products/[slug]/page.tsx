
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '+1234567890'

type Product = {
  slug: string; title: string; category: string; price: number;
  sizes: string[]; images: string[]; tag?: string; description?: string
}

export default function Page({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/products.json', { cache: 'no-store' })
        const all: Product[] = res.ok ? await res.json() : []
        setProduct(all.find(p => p.slug === params.slug) || null)
      } catch {
        setProduct(null)
      }
    })()
  }, [params.slug])

  if (!product) return <main className="mx-auto max-w-4xl px-4 py-16">Loading…</main>

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <img src={product.images?.[0]} alt={product.title} className="w-full h-[420px] object-cover"/>
          <div className="grid grid-cols-4 gap-2 p-2">
            {(product.images || []).slice(1).map((src, i) => (
              <img key={i} src={src} className="h-24 w-full object-cover rounded-lg border border-slate-200"/>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{product.title}</h1>
          <p className="mt-2 text-slate-600">{product.description}</p>
          <div className="mt-4 text-2xl font-semibold text-slate-900">${product.price.toFixed(2)}</div>

          <div className="mt-6">
            <label className="text-sm text-slate-600">Size</label>
            <div className="mt-2 flex gap-2">
              {(product.sizes || []).map(s => (
                <button key={s} className="px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50">{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi SellanVilla! I want to order: ' + product.title + '.')}`} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-rose-600 text-white hover:bg-rose-700">
              <MessageCircle className="w-4 h-4"/> WhatsApp to Order
            </a>
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50">Back to Shop</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
