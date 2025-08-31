import { getTranslations } from 'next-intl/server';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-16 h-16 bg-white/10 rounded-full animate-bounce flex items-center justify-center">
            <EnvelopeIcon className="w-8 h-8 text-white/60" />
          </div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-white/15 rounded-full animate-pulse flex items-center justify-center" style={{animationDelay: '1s'}}>
            <PhoneIcon className="w-6 h-6 text-white/70" />
          </div>
          <div className="absolute bottom-32 right-1/4 w-10 h-10 bg-white/10 rounded-full animate-ping flex items-center justify-center" style={{animationDelay: '3s'}}>
            <MapPinIcon className="w-5 h-5 text-white/60" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Ready to start your fashion journey? We're here to help you find the perfect pieces.
            </p>
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L50 100C100 80 200 40 300 30C400 20 500 40 600 50C700 60 800 60 900 70C1000 80 1100 90 1150 100L1200 110V120H0Z" fill="#fef3c7"/>
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Have questions about our products or need assistance? Reach out to us anytime. 
                  We're committed to providing exceptional customer service and helping you find 
                  the perfect fashion pieces.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <EnvelopeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                    <p className="text-gray-600">hello@sellanvilla.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Location</h3>
                    <p className="text-gray-600">Brampton, Ontario, Canada</p>
                    <p className="text-sm text-gray-500">Serving customers worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p className="text-sm text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number (optional)"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="order">Order Status</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="sizing">Sizing & Fit</option>
                    <option value="custom">Custom Orders</option>
                    <option value="wholesale">Wholesale Inquiries</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold py-4 px-8 rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our products and services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What are your shipping options?</h3>
              <p className="text-gray-600">We offer free shipping on orders over $50 within Canada and the US. International shipping is available with competitive rates. Standard delivery takes 3-5 business days, while express shipping takes 1-2 business days.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is your return policy?</h3>
              <p className="text-gray-600">We accept returns within 30 days of purchase for unworn items in original condition. Returns are free for Canadian customers. International customers are responsible for return shipping costs.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Do you offer custom sizing?</h3>
              <p className="text-gray-600">Yes! We offer custom sizing for many of our products. Please contact us with your measurements and we'll work with you to create the perfect fit.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Are your products ethically sourced?</h3>
              <p className="text-gray-600">Absolutely! We're committed to ethical sourcing and sustainable practices. All our products are made with high-quality materials and we work only with suppliers who share our values.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
