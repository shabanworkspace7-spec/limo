'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Shield, Clock, Car, DollarSign, Award, Plane, Heart } from 'lucide-react';

const benefits = [
  { icon: Award, text: 'Professional Chauffeurs' },
  { icon: Clock, text: '24/7 Availability' },
  { icon: Car, text: 'Luxury Fleet' },
  { icon: DollarSign, text: 'Competitive Pricing' },
  { icon: Shield, text: 'On-Time Guarantee' },
  { icon: Heart, text: 'Safety First' },
  { icon: Plane, text: 'Meet & Greet Service' },
  { icon: Shield, text: 'Flight Tracking' },
];

export default function WhyChooseUs() {
  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-us" className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
          {/* Left side - Benefits list on white background */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] mb-3 block font-medium">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                The Elite <span className="gradient-text-gold">Difference</span>
              </h2>
              <p className="text-gray-500 max-w-lg text-base sm:text-lg">
                Experience luxury transportation that goes beyond expectations. Here&apos;s why thousands trust Elite Limo for their most important journeys.
              </p>
            </motion.div>

            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c9a84c]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors duration-300">
                    <CheckCircle className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <span className="text-base text-gray-700 group-hover:text-[#c9a84c] transition-colors duration-300 font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Dark card with gold accent */}
          <div className="flex-1 lg:max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#0a0a0a] rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-center relative overflow-hidden border border-[#c9a84c]/20"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c] via-[#d4af37] to-[#e8c84a]" />

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-[#c9a84c]/5" />
              <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-[#c9a84c]/5" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-black" />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Why Choose Us
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  With over 15 years of experience, Elite Limo provides unmatched luxury transportation. Our commitment to excellence, punctuality, and personalized service makes us the premier choice for discerning travelers.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold gradient-text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>15+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold gradient-text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>99%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Satisfaction</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToBooking}
                  className="w-full gold-gradient py-4 rounded-full text-black font-semibold text-base hover:shadow-xl hover:shadow-[#c9a84c]/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Book Your Ride
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
