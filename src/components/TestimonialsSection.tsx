'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    service: 'Wedding Transportation',
    quote: 'Elite Limo made our wedding day absolutely magical. The white limousine was immaculate, and the chauffeur was incredibly professional. It was the perfect touch to our special day.',
    rating: 5,
    initial: 'SM',
  },
  {
    name: 'David Chen',
    service: 'Corporate Travel',
    quote: 'As a CEO, I need reliable and professional transportation. Elite Limo delivers every single time. The WiFi and privacy partition allow me to work during transit. Exceptional service.',
    rating: 5,
    initial: 'DC',
  },
  {
    name: 'Emily Rodriguez',
    service: 'Wine Tour',
    quote: 'Our wine tour was the highlight of our anniversary trip. The chauffeur knew all the best vineyards and was so accommodating. The luxury SUV was comfortable and stylish.',
    rating: 5,
    initial: 'ER',
  },
  {
    name: 'Michael Thompson',
    service: 'Airport Transfer',
    quote: 'After a long international flight, having Elite Limo waiting at arrivals was a godsend. Flight tracking, meet & greet, and a smooth ride home. This is the only way to travel.',
    rating: 5,
    initial: 'MT',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#f8f7f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] mb-3 block font-medium">
            Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our <span className="gradient-text-gold">Clients Say</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto" />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative mb-12">
          <div className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 shadow-sm min-h-[280px] sm:min-h-[260px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full text-center"
              >
                <Quote className="w-12 h-12 text-[#c9a84c]/20 mx-auto mb-4" />
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-black text-sm font-bold">
                    {testimonials[current].initial}
                  </div>
                  <div className="text-left">
                    <h4 className="text-[#c9a84c] font-semibold" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonials[current].service}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/5 hover:border-[#c9a84c]/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-[#c9a84c] w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/5 hover:border-[#c9a84c]/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Cards Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#c9a84c]/20 shadow-sm hover:shadow-md transition-all duration-300 card-hover-lift"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-[#c9a84c] fill-[#c9a84c]" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4 italic line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-black text-xs font-bold">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#c9a84c]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
