'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Our Fleet', href: '#fleet' },
  { name: 'Services', href: '#services' },
  { name: 'Book Now', href: '#booking' },
  { name: 'Contact', href: '#contact' },
  { name: 'Admin', href: '/admin' },
];

const services = [
  'Airport Transfer',
  'Wedding Transportation',
  'Corporate Travel',
  'Wine Tours',
  'Concert & VIP',
  'Prom & Events',
];

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/misc/logo.png"
                  alt="Elite Limo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold gold-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                ELITE LIMO
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Premium luxury transportation services. Experience the pinnacle of comfort, style, and professionalism.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:bg-gold/10 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive offers and luxury travel tips.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#1a1a1a] border border-gold/15 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="gold-gradient px-3 py-2 rounded-lg text-black hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Elite Limo. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 italic">
            Designed with excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
