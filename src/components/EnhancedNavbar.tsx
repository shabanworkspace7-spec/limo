'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, Car, Plane, Heart, Building2, Music, Wine, Gem, Bus, Crown, Truck } from 'lucide-react';
import Image from 'next/image';

const fleetItems = [
  { name: 'Sedan', icon: Car, href: '#fleet' },
  { name: 'SUV', icon: Truck, href: '#fleet' },
  { name: 'Limousine', icon: Crown, href: '#fleet' },
  { name: 'Bus', icon: Bus, href: '#fleet' },
  { name: 'Premium', icon: Gem, href: '#fleet' },
];

const serviceItems = [
  { name: 'Airport Transfer', icon: Plane, href: '#services' },
  { name: 'Wedding', icon: Heart, href: '#services' },
  { name: 'Corporate', icon: Building2, href: '#services' },
  { name: 'Prom & Events', icon: Music, href: '#services' },
  { name: 'Wine Tour', icon: Wine, href: '#services' },
  { name: 'Concert & VIP', icon: Crown, href: '#services' },
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Fleet', href: '#fleet', dropdown: 'fleet' },
  { name: 'Services', href: '#services', dropdown: 'services' },
  { name: 'About', href: '#why-us' },
  { name: 'Book Now', href: '#booking' },
  { name: 'Contact', href: '#contact' },
];

export default function EnhancedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdown(mobileDropdown === key ? null : key);
  };

  const renderDropdown = (type: string) => {
    const items = type === 'fleet' ? fleetItems : serviceItems;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden z-50"
      >
        <div className="p-2">
          {items.map((item, i) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleNavClick(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#c9a84c] transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-[#c9a84c]/10 flex items-center justify-center transition-colors duration-200">
                <item.icon className="w-4 h-4 text-[#c9a84c]" />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav shadow-lg'
          : 'bg-transparent'
      }`}
      onMouseLeave={() => { setActiveDropdown(null); setHoveredItem(null); }}
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
              <span className={`text-lg sm:text-xl font-bold tracking-wider ${scrolled ? 'gold-text' : 'gold-text'}`} style={{ fontFamily: 'var(--font-playfair)' }}>
                ELITE LIMO
              </span>
              <span className={`text-[10px] tracking-[0.3em] uppercase ${scrolled ? 'text-[#c9a84c]/60' : 'text-gold/60'}`}>
                Luxury Transportation
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => {
                  if (link.dropdown) setActiveDropdown(link.dropdown);
                  setHoveredItem(link.name);
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (!link.dropdown) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                    scrolled
                      ? 'text-gray-700 hover:text-[#c9a84c]'
                      : 'text-gray-300 hover:text-gold'
                  }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.dropdown ? 'rotate-180' : ''}`} />
                  )}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#c9a84c] transition-all duration-300 ${hoveredItem === link.name ? 'w-3/4' : 'w-0'}`} />
                </a>
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.dropdown && renderDropdown(link.dropdown)}
                </AnimatePresence>
              </div>
            ))}
            <a
              href="tel:+18001234567"
              className={`flex items-center gap-2 ml-3 text-sm transition-colors ${
                scrolled ? 'text-gray-500 hover:text-[#c9a84c]' : 'text-gray-400 hover:text-gold'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">1-800-123-4567</span>
            </a>
            <motion.a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#booking');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 gold-gradient px-6 py-2.5 rounded-full text-sm font-semibold text-black hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all duration-300"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden relative w-10 h-10 flex items-center justify-center ${scrolled ? 'text-[#c9a84c]' : 'text-gold'}`}
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
            className="lg:hidden bg-white overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.dropdown ? (
                      <button
                        onClick={() => toggleMobileDropdown(link.dropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#c9a84c] hover:bg-gray-50 rounded-lg transition-all duration-200"
                      >
                        <span className="font-medium">{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === link.dropdown ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className="block px-4 py-3 text-gray-700 hover:text-[#c9a84c] hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                      >
                        {link.name}
                      </a>
                    )}
                    <AnimatePresence>
                      {link.dropdown && mobileDropdown === link.dropdown && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 py-1 space-y-1">
                            {(link.dropdown === 'fleet' ? fleetItems : serviceItems).map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(item.href);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#c9a84c] rounded-lg transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-[#c9a84c]" />
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
              <motion.a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#booking');
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
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
