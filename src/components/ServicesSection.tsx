'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Plane, Heart, Building2, Music, Wine, Crown } from 'lucide-react';

const services = [
  {
    title: 'Airport Transfer',
    description: 'Seamless airport pickup and drop-off with flight tracking and meet & greet service. Never worry about delays again.',
    image: '/images/services/airport.png',
    icon: Plane,
  },
  {
    title: 'Wedding Transportation',
    description: 'Make your special day unforgettable with our elegant wedding fleet. Red carpet service and champagne included.',
    image: '/images/services/wedding.png',
    icon: Heart,
  },
  {
    title: 'Corporate Travel',
    description: 'Executive-class transportation for business meetings, conferences, and corporate events with WiFi and privacy.',
    image: '/images/services/corporate.png',
    icon: Building2,
  },
  {
    title: 'Prom & Special Events',
    description: 'Arrive in style at your prom, gala, or special event. Make memories that last a lifetime.',
    image: '/images/services/prom.png',
    icon: Music,
  },
  {
    title: 'Wine Tours',
    description: 'Explore vineyards in luxury. Our chauffeur-driven wine tours offer a safe and sophisticated experience.',
    image: '/images/services/wine-tour.png',
    icon: Wine,
  },
  {
    title: 'Concert & VIP Events',
    description: 'VIP transportation for concerts, sporting events, and exclusive gatherings. Skip the traffic and arrive like a star.',
    image: '/images/services/concert.png',
    icon: Crown,
  },
];

export default function ServicesSection() {
  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 sm:py-28 relative bg-[#0a0a0a]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

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
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our <span className="gold-text">Services</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            From airport transfers to grand celebrations, we provide premium transportation services
            tailored to your every need.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden cursor-pointer card-hover-lift"
              onClick={scrollToBooking}
            >
              <div className="relative bg-white/[0.03] border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-500 rounded-2xl overflow-hidden">
                {/* Service Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden image-zoom-hover">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/10 transition-colors duration-500" />
                  {/* Service icon overlay */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#c9a84c]/20 backdrop-blur-sm flex items-center justify-center border border-[#c9a84c]/20 group-hover:bg-[#c9a84c]/30 transition-all duration-300">
                    <service.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  {/* "Learn More" that slides in on hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 text-[#c9a84c] text-sm font-medium bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3
                    className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#c9a84c] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{service.description}</p>
                  <div className="flex items-center gap-2 text-[#c9a84c] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
