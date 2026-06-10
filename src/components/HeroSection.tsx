'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Car } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '50K+', label: 'Rides Completed' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Availability' },
];

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/misc/hero-bg.png')",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-gold border border-gold/30 rounded-full">
            Premium Luxury Transportation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Experience Luxury
          <br />
          <span className="gold-text">Beyond Compare</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Premium limousine services for every occasion. From airport transfers to wedding celebrations,
          travel in unparalleled comfort and style.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#booking')}
            className="gold-gradient px-8 py-4 rounded-full text-black font-semibold text-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 w-full sm:w-auto"
          >
            Book Your Ride
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#fleet')}
            className="px-8 py-4 rounded-full text-gold font-semibold text-lg border border-gold/40 hover:border-gold hover:bg-gold/5 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Fleet
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.15 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gold-text mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Car */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1.5, delay: 1.0 }}
        className="absolute right-0 bottom-20 hidden xl:block pointer-events-none"
      >
        <Car className="w-64 h-64 text-gold" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('#fleet')}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
