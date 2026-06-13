'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: 'K+', label: 'Rides Completed' },
  { value: 200, suffix: '+', label: 'Luxury Vehicles' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const duration = 2000;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * eased));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold gold-text mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

const heroWords = ['Experience', 'Luxury', 'Beyond', 'Compare'];

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/misc/hero-bg.png')",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold diamond */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-16 h-16 border border-[#c9a84c]/15 rotate-45"
          animate={{ y: [0, -20, 0], rotate: [45, 90, 45], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[60%] right-[15%] w-10 h-10 border border-[#c9a84c]/10 rotate-45"
          animate={{ y: [0, 15, 0], rotate: [45, -45, 45], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[20%] w-8 h-8 rounded-full border border-[#c9a84c]/10"
          animate={{ y: [0, -15, 0], scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-[35%] right-[25%] w-6 h-6 bg-[#c9a84c]/5 rotate-12"
          animate={{ y: [0, -10, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#c9a84c]/40 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
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
          className="mb-6"
        >
          <span className="inline-block px-5 py-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c] border border-[#c9a84c]/30 rounded-full bg-[#c9a84c]/5 backdrop-blur-sm">
            Premium Luxury Transportation
          </span>
        </motion.div>

        {/* Headline with text reveal */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <span className="text-white">Experience Luxury</span>
            <br />
            <span className="gold-text">Beyond Compare</span>
          </motion.h1>

          {/* Rotating word highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 h-8 flex items-center justify-center overflow-hidden"
          >
            <motion.span
              key={wordIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl text-[#c9a84c]/80 font-medium tracking-wide"
            >
              {heroWords[wordIndex] === 'Experience' && '✦ Unmatched Comfort & Style'}
              {heroWords[wordIndex] === 'Luxury' && '✦ Professional Chauffeurs'}
              {heroWords[wordIndex] === 'Beyond' && '✦ 24/7 Premium Service'}
              {heroWords[wordIndex] === 'Compare' && '✦ Fleet of 200+ Vehicles'}
            </motion.span>
          </motion.div>
        </div>

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
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#booking')}
            className="gold-gradient px-8 py-4 rounded-full text-black font-semibold text-lg transition-all duration-300 w-full sm:w-auto"
          >
            Book Your Ride
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#fleet')}
            className="px-8 py-4 rounded-full text-[#c9a84c] font-semibold text-lg border border-[#c9a84c]/40 hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Fleet
          </motion.button>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={1.2 + i * 0.15}
            />
          ))}
        </motion.div>
      </div>

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
          <ChevronDown className="w-5 h-5 text-[#c9a84c]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
