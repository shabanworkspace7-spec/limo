'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { target: 15, suffix: '+', label: 'Years of Excellence' },
  { target: 50, suffix: 'K+', label: 'Rides Completed' },
  { target: 200, suffix: '+', label: 'Luxury Vehicles' },
  { target: 99, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = 0;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (target - start) * eased));
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
  }, [target, duration]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold gold-text" style={{ fontFamily: 'var(--font-playfair)' }}>
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background with gold gradient overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <p className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Ready to Experience <span className="gold-text">Luxury</span>?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book your premium ride today and discover why thousands choose Elite Limo for their transportation needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToBooking}
            className="gold-gradient px-10 py-4 rounded-full text-black font-semibold text-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
          >
            Book Your Ride Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
