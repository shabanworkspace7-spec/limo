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
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />

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
            Step Inside
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Interior <span className="gold-text">Luxury</span>
          </h2>
          <div className="w-24 h-[2px] gold-gradient mx-auto" />
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass p-1">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/misc/interior.png"
                  alt="Luxury Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Gold accent border glow */}
              <div className="absolute inset-0 rounded-2xl border border-gold/20 pointer-events-none" />
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
                  className="glass p-4 sm:p-5 rounded-xl group hover:border-gold/40 transition-all duration-500 gold-glow-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gold-gradient flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-gold/20 transition-shadow duration-300">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{feature.desc}</p>
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
