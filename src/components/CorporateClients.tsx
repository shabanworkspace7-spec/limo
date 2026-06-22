'use client';

import { motion } from 'framer-motion';
import { Building2, Star, Quote } from 'lucide-react';

const clients = [
  { name: 'Meridian Capital', initial: 'MC', sector: 'Finance' },
  { name: 'Apex Ventures', initial: 'AV', sector: 'Venture Capital' },
  { name: 'Pinnacle Hotels', initial: 'PH', sector: 'Hospitality' },
  { name: 'Sterling Legal', initial: 'SL', sector: 'Law Firm' },
  { name: 'Vertex Media', initial: 'VM', sector: 'Media' },
  { name: 'Atlas Consulting', initial: 'AC', sector: 'Consulting' },
];

const testimonials = [
  {
    quote: 'Elite Limo has been our exclusive transportation partner for five years. Their reliability and professionalism are unmatched in the industry.',
    name: 'Jonathan Reed',
    title: 'CEO, Meridian Capital',
  },
  {
    quote: 'For our VIP clients, only the best will do. Elite Limo delivers a consistently premium experience that reflects our brand values perfectly.',
    name: 'Victoria Chen',
    title: 'Managing Partner, Apex Ventures',
  },
];

export default function CorporateClients() {
  return (
    <section className="py-20 sm:py-28 relative bg-[#0a0a0a] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Gold gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]/70 mb-3 block">
            Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Trusted by <span className="gold-text">Leading Companies</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are proud to be the preferred transportation partner for industry leaders across finance, hospitality, and professional services.
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#c9a84c]/20 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#d4af37]/10 flex items-center justify-center mb-3 group-hover:from-[#c9a84c]/30 group-hover:to-[#d4af37]/20 transition-all duration-500">
                <span className="text-lg font-bold gold-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {client.initial}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-300 text-center group-hover:text-white transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] text-gray-500 mt-1">{client.sector}</span>
            </motion.div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="section-divider mb-16" />

        {/* Corporate Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-500"
            >
              <Quote className="w-10 h-10 text-[#c9a84c]/20 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 italic text-sm sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#c9a84c]/70 text-xs">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <Building2 className="w-4 h-4 text-[#c9a84c]" />
            <span>Interested in corporate partnerships?</span>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#c9a84c] font-medium hover:underline">
              Contact us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
