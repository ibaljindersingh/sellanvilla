
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Shirt, ShieldCheck, Star, PhoneCall, Mail, ChevronRight, Search, Filter, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '+1234567890'

const defaultProducts = [
  { slug: 'maternity-nightwear-set', title: 'Maternity Nightwear Set', category: 'Maternity', price: 39, sizes: ['S','M','L','XL'], images: ['/p/maternity-1.jpg'], tag: 'New', description: 'Soft cotton maternity nightwear set with easy nursing access.' },
  { slug: 'satin-night-suit', title: 'Satin Night Suit', category: 'Nightwear', price: 32, sizes: ['S','M','L','XL','XXL'], images: ['/p/satin-1.jpg'], tag: 'Trending', description: 'Smooth satin two‑piece with relaxed fit and breathable lining.' },
  { slug: 'pure-pashmina-shawl', title: 'Pure Pashmina Shawl', category: 'Shawls', price: 99, sizes: ['One size'], images: ['/p/pashmina-1.jpg'], tag: 'Limited', description: 'Hand‑finished pure pashmina with classic drape and warmth.' },
]
type Product = typeof defaultProducts[number]
const CATEGORIES = ['All','Nightwear','Maternity','Shawls'] as const

const features = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Quality Fabrics', text: 'Soft, breathable materials for daily comfort.' },
  { icon: <Star className="w-6 h-6" />, title: 'Size‑Inclusive', text: 'Most sets available from S to XXL; maternity options included.' },
  { icon: <ShoppingCart className="w-6 h-6" />, title: 'Easy Ordering', text: 'WhatsApp to order. Cash on delivery in select regions.' },
];

function useCatalog() {
  const [items, setItems] = useState<Product[]>(defaultProducts)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/products.json', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length) setItems(data)
        }
      } catch {}
    })()
  }, [])
  return items
}

function Nav() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/sellanvilla-logo.png" alt="SellanVilla" className="h-9 w-9 rounded-full object-contain bg-white"/>
          <span className="font-semibold text-slate-900 text-lg">SellanVilla</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a href="#shop" className="hover:text-slate-900">Shop</a>
          <a href="#about" className="hover:text-slate-900">About</a>
          <a href="#reviews" className="hover:text-slate-900">Reviews</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`} className="inline-flex rounded-xl px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 items-center gap-2">
            <MessageCircle className="w-4 h-4"/> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-rose-100 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-pink-100 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs text-rose-700">
            New arrivals • Fall/Winter
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Cozy Nightwear & Elegant <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">Pashmina Shawls</span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg md:text-xl max-w-xl">
            Size‑inclusive sets (incl. maternity) and premium shawls. Soft fabrics. Everyday prices. Updated from our Facebook catalog.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#shop" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-rose-600 text-white hover:bg-rose-700">
              Shop Featured <ChevronRight className="w-4 h-4"/>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50">
              WhatsApp Us
            </a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Star className="w-4 h-4"/> Loved by 1k+ shoppers</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Cash on delivery (select regions)</div>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6, delay:0.1}}>
          <div className="rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <img src="/p/maternity-1.jpg" alt="Hero" className="h-80 w-full object-cover"/>
            <div className="p-4 bg-white">
              <SearchBar />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function SearchBar() {
  const [term, setTerm] = useState('')
  return (
    <form className="grid md:grid-cols-4 gap-3" onSubmit={(e)=>e.preventDefault()}>
      <label className="relative">
        <Shirt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
        <input value={term} onChange={(e)=>setTerm(e.target.value)} className="w-full rounded-xl border border-slate-300 pl-10 pr-3 py-3 outline-none focus:ring-4 ring-rose-100" placeholder="Product (e.g., Maternity)"/>
      </label>
      <select className="w-full rounded-xl border border-slate-300 px-3 py-3 focus:ring-4 ring-rose-100">
        <option>Any Category</option>
        <option>Nightwear</option>
        <option>Maternity</option>
        <option>Shawls</option>
      </select>
      <select className="w-full rounded-xl border border-slate-300 px-3 py-3 focus:ring-4 ring-rose-100">
        <option>Size</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      </select>
      <button type="submit" className="rounded-xl px-4 py-3 bg-rose-600 text-white hover:bg-rose-700 inline-flex items-center justify-center gap-2">
        <Search className="w-4 h-4"/> Search
      </button>
    </form>
  )
}

function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={i} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.4, delay:i*0.05}} className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 grid place-items-center">{f.icon}</div>
            <h3 className="mt-4 font-semibold text-slate-900 text-lg">{f.title}</h3>
            <p className="text-slate-600 mt-1 text-sm">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Filters({ selected, setSelected, size, setSize, term, setTerm }:{ selected:string; setSelected:(v:string)=>void; size:string; setSize:(v:string)=>void; term:string; setTerm:(v:string)=>void; }){
  return (
    <div className="rounded-2xl border border-slate-200 p-4 bg-white flex flex-wrap gap-3 items-center">
      <Filter className="w-4 h-4 text-slate-500"/>
      <div className="flex gap-2">
        {CATEGORIES.map(c => (
          <button key={c} onClick={()=>setSelected(c)} className={`px-3 py-1 rounded-full border ${selected===c?'bg-rose-600 text-white border-rose-600':'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>{c}</button>
        ))}
      </div>
      <select value={size} onChange={e=>setSize(e.target.value)} className="ml-auto rounded-xl border border-slate-300 px-3 py-2">
        <option value="">Any size</option>
        {['One size','S','M','L','XL','XXL'].map(s=> <option key={s} value={s}>{s}</option>)}
      </select>
      <input value={term} onChange={e=>setTerm(e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2" placeholder="Search…"/>
    </div>
  )
}

function Listings() {
  const catalog = useCatalog()
  const [selected, setSelected] = useState<string>('All')
  const [size, setSize] = useState<string>('')
  const [term, setTerm] = useState<string>('')

  const filtered = useMemo(()=> {
    return catalog.filter(p => {
      const byCat = selected === 'All' || p.category === selected
      const bySize = !size || (p.sizes || []).includes(size)
      const byTerm = !term || p.title.toLowerCase().includes(term.toLowerCase())
      return byCat && bySize && byTerm
    })
  }, [catalog, selected, size, term])

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Products</h2>
          <p className="text-slate-600">Best‑sellers hand‑picked from our Facebook catalog.</p>
        </div>
      </div>

      <Filters selected={selected} setSelected={setSelected} size={size} setSize={setSize} term={term} setTerm={setTerm} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map(p => (
          <motion.article key={p.slug} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.4}} className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="relative">
              <img src={p.images?.[0]} alt={p.title} className="h-56 w-full object-cover group-hover:scale-[1.02] transition"/>
              {p.tag && <span className="absolute top-3 left-3 rounded-full bg-white/90 text-slate-800 text-xs px-3 py-1 border border-slate-200">{p.tag}</span>}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">{p.category} • {(p.sizes||[]).join(', ')}</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">${p.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <Link href={`/products/${p.slug}`} className="inline-flex items-center gap-2 text-rose-700 hover:underline">View <ChevronRight className="w-4 h-4"/></Link>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi SellanVilla! I want to order: ' + p.title + ' (' + ((p.sizes||[])[0]||'size?') + ').')}`} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-1 text-rose-700 hover:bg-rose-50">
                    <MessageCircle className="w-4 h-4"/> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 p-8 bg-gradient-to-br from-white to-rose-50">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Shoppers love the SellanVilla comfort</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <div className="flex items-center gap-2 text-amber-500">{'★★★★★'}</div>
              <p className="mt-3 text-slate-700">“Soft fabric and perfect fit. The maternity set was a lifesaver!”</p>
              <p className="mt-3 text-sm text-slate-500">— Verified Buyer</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-3xl border border-rose-200 bg-rose-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">Shop new arrivals</h3>
          <p className="mt-2 text-rose-100 max-w-xl">From satin night suits to pashmina shawls — curated picks updated from our Facebook page.</p>
        </div>
        <a href="#shop" className="rounded-xl bg-white text-rose-700 px-5 py-3 hover:bg-rose-50">Browse now</a>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-slate-200 p-6 bg-white">
          <h3 className="text-xl font-semibold text-slate-900">Order / Enquiry</h3>
          <p className="text-slate-600 mt-1">Tell us the product, size, and color you want. We’ll confirm availability and delivery options.</p>
          <form className="mt-4 grid gap-3">
            <input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="Full name"/>
            <input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="Email or WhatsApp"/>
            <input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="City / Country"/>
            <textarea className="rounded-xl border border-slate-300 px-4 py-3 min-h-[120px]" placeholder="I’d like: Maternity Nightwear Set, size L, color Navy"/>
            <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`} className="rounded-xl px-5 py-3 bg-rose-600 text-white hover:bg-rose-700 w-fit inline-flex items-center gap-2"><MessageCircle className="w-4 h-4"/> Send via WhatsApp</a>
          </form>
          <div className="mt-4 text-sm text-slate-600 space-y-1">
            <div className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> +1 (555) 555‑0199</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> orders@sellanvilla.com</div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 p-6 bg-white" id="about">
          <h3 className="text-xl font-semibold text-slate-900">About SellanVilla</h3>
          <ul className="mt-2 list-disc list-inside text-slate-700 space-y-2">
            <li>Soft, comfy fabrics for all‑day wear</li>
            <li>Maternity and size‑inclusive options</li>
            <li>Fast responses via Facebook/WhatsApp</li>
            <li>Cash on delivery (where available)</li>
          </ul>
          <div className="mt-6 aspect-video rounded-2xl overflow-hidden border border-slate-200">
            <img className="w-full h-full object-cover" src="/p/satin-1.jpg" alt="Textiles"/>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-top border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <img src="/sellanvilla-logo.png" alt="SellanVilla" className="h-9 w-9 rounded-full object-contain bg-white"/>
            <span className="font-semibold text-slate-900 text-lg">SellanVilla</span>
          </div>
          <p className="text-slate-600 mt-3 text-sm">Comfortable nightwear & elegant shawls — updated from our Facebook catalog.</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Explore</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><a className="hover:text-slate-900" href="#shop">Shop</a></li>
            <li><a className="hover:text-slate-900" href="#reviews">Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Company</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><a className="hover:text-slate-900" href="#about">About</a></li>
            <li><a className="hover:text-slate-900" href="#">Policies</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Get in touch</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4"/> +1 (555) 555‑0199</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4"/> orders@sellanvilla.com</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} SellanVilla.com. All rights reserved.</div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Nav />
      <Hero />
      <FeatureGrid />
      <Listings />
      <Reviews />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
