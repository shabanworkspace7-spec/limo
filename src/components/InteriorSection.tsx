'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Armchair, Thermometer, Music, Wine, Eye, Wifi } from 'lucide-react';

const features = [
  { icon: Armchair, title: 'Leather Seating', desc: 'Premium hand-stitched leather with ergonomic design' },
  { icon: Thermometer, title: 'Climate Control', desc: 'Individual temperature zones for optimal comfort' },
  { icon: Music, title: 'Entertainment System', desc: 'Surround sound with Bluetooth connectivity' },
  { icon: Wine, title: 'Mini Bar', desc: 'Fully stocked bar with premium beverages' },
  { icon: Eye, title: 'Privacy Partition', desc: 'Electric partition for complete privacy' },
  { icon: Wifi, title: 'WiFi', desc: 'High-speed internet for work or leisure' },
];

export default function InteriorSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] mb-3 block font-medium">
            Step Inside
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Interior <span className="gradient-text-gold">Luxury</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Interior Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full h-full">
                <Image
                  src="/images/misc/interior.png"
                  alt="Luxury Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Gold accent border */}
              <div className="absolute inset-0 rounded-2xl border border-[#c9a84c]/20 pointer-events-none" />
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-3 left-3 w-8 h-[2px] bg-gradient-to-r from-[#c9a84c] to-transparent" />
                <div className="absolute top-3 left-3 h-8 w-[2px] bg-gradient-to-b from-[#c9a84c] to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Features List */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#c9a84c]/20 hover:shadow-md transition-all duration-300 card-hover-lift group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gold-gradient flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-[#c9a84c]/20 transition-shadow duration-300">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
