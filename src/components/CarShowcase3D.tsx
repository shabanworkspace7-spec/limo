'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RotateCw } from 'lucide-react';

export default function CarShowcase3D() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - dragStart;
    setRotation((prev) => prev + diff * 0.5);
    setDragStart(clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const infoCards = [
    { title: 'Premium Comfort', desc: 'Handcrafted leather interior with climate control' },
    { title: 'Advanced Tech', desc: 'State-of-the-art entertainment and WiFi' },
    { title: 'Privacy & Safety', desc: 'Privacy partitions and professional chauffeurs' },
    { title: 'Full Bar', desc: 'Complimentary beverages for your journey' },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

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
            Interactive Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            3D <span className="gold-text">Showcase</span>
          </h2>
          <div className="w-24 h-[2px] gold-gradient mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto">
            Drag to rotate and explore our flagship Stretch Limousine in full 360° view.
          </p>
        </motion.div>

        {/* 3D Car Display */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Info Cards - Left */}
          <div className="hidden lg:flex flex-col gap-4 w-64">
            {infoCards.slice(0, 2).map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass p-5 rounded-xl border-gold/20 gold-glow-hover transition-all duration-500"
              >
                <h4 className="text-gold font-semibold mb-1 text-sm">{card.title}</h4>
                <p className="text-xs text-gray-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Car Platform */}
          <div className="flex-1 w-full">
            <div
              ref={containerRef}
              className="relative aspect-square max-w-lg mx-auto cursor-grab active:cursor-grabbing"
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
            >
              {/* Rotating platform base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-gold/10 to-transparent rounded-[50%]" />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-4 rounded-[50%]"
                style={{
                  background: 'radial-gradient(ellipse, rgba(201,168,76,0.2), transparent)',
                }}
              />

              {/* 3D Rotating container */}
              <div
                className="w-full h-full"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  animate={{ rotateY: isDragging ? rotation : [rotation, rotation + 360] }}
                  transition={
                    isDragging
                      ? { duration: 0 }
                      : { duration: 20, repeat: Infinity, ease: 'linear' }
                  }
                  style={{
                    transformStyle: 'preserve-3d',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/cars/stretch-limo.png"
                      alt="Stretch Limousine"
                      width={500}
                      height={300}
                      className="object-contain drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(201,168,76,0.15))',
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Rotation indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gold/50 text-xs">
                <RotateCw className="w-3 h-3" />
                <span>Drag to rotate</span>
              </div>
            </div>

            {/* Mobile info cards */}
            <div className="grid grid-cols-2 gap-3 mt-6 lg:hidden">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-4 rounded-xl border-gold/20"
                >
                  <h4 className="text-gold font-semibold mb-1 text-xs">{card.title}</h4>
                  <p className="text-[10px] text-gray-400">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Cards - Right */}
          <div className="hidden lg:flex flex-col gap-4 w-64">
            {infoCards.slice(2).map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.4 }}
                className="glass p-5 rounded-xl border-gold/20 gold-glow-hover transition-all duration-500"
              >
                <h4 className="text-gold font-semibold mb-1 text-sm">{card.title}</h4>
                <p className="text-xs text-gray-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
