'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Fleet', href: '#fleet' },
  { name: 'Services', href: '#services' },
  { name: 'Book Now', href: '#booking' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/images/misc/logo.png"
                alt="Elite Limo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-wider gold-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                ELITE LIMO
              </span>
              <span className="text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                Luxury Transportation
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
            <a
              href="tel:+18001234567"
              className="flex items-center gap-2 ml-4 text-sm text-gray-400 hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">1-800-123-4567</span>
            </a>
            <motion.a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#booking');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 gold-gradient px-6 py-2.5 rounded-full text-sm font-semibold text-black hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="block px-4 py-3 text-gray-300 hover:text-gold hover:bg-gold/5 rounded-lg transition-all duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#booking');
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="block mt-4 gold-gradient px-6 py-3 rounded-full text-center font-semibold text-black"
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
