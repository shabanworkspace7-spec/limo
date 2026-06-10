'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Airport Transfer',
    description: 'Seamless airport pickup and drop-off with flight tracking and meet & greet service. Never worry about delays again.',
    image: '/images/services/airport.png',
  },
  {
    title: 'Wedding Transportation',
    description: 'Make your special day unforgettable with our elegant wedding fleet. Red carpet service and champagne included.',
    image: '/images/services/wedding.png',
  },
  {
    title: 'Corporate Travel',
    description: 'Executive-class transportation for business meetings, conferences, and corporate events with WiFi and privacy.',
    image: '/images/services/corporate.png',
  },
  {
    title: 'Prom & Special Events',
    description: 'Arrive in style at your prom, gala, or special event. Make memories that last a lifetime.',
    image: '/images/services/prom.png',
  },
  {
    title: 'Wine Tours',
    description: 'Explore vineyards in luxury. Our chauffeur-driven wine tours offer a safe and sophisticated experience.',
    image: '/images/services/wine-tour.png',
  },
  {
    title: 'Concert & VIP Events',
    description: 'VIP transportation for concerts, sporting events, and exclusive gatherings. Skip the traffic and arrive like a star.',
    image: '/images/services/concert.png',
  },
];

export default function ServicesSection() {
  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 sm:py-28 relative">
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
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-3 block">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our <span className="gold-text">Services</span>
          </h2>
          <div className="w-24 h-[2px] gold-gradient mx-auto mb-4" />
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
              className="group glass rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500 gold-glow-hover cursor-pointer"
              onClick={scrollToBooking}
            >
              {/* Service Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3
                  className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
