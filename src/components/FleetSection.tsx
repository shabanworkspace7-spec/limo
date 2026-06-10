'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  pricePerHour: number;
  image: string;
  features: string;
  description: string;
}

const categories = ['All', 'Sedan', 'SUV', 'Limousine', 'Bus', 'Premium'];

function CarCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((y - centerY) / centerY) * -12;
    const newRotateY = ((x - centerX) / centerX) * 12;
    setRotateX(newRotateX);
    setRotateY(newRotateY);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => card.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, [handleMouseMove]);

  const scrollToBooking = () => {
    const el = document.querySelector('#booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-card"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="perspective-card-inner glass rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Car Image */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-b from-gold/5 to-transparent overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
          {/* Glossy reflection on hover */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${105 + rotateY * 5}deg, transparent 30%, rgba(201,168,76,0.08) 50%, transparent 70%)`,
              }}
            />
          )}
          <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider gold-gradient rounded-full text-black">
            {vehicle.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            {vehicle.name}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{vehicle.description}</p>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gold" />
              <span>{vehicle.passengers}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-gold" />
              <span>{vehicle.luggage}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <DollarSign className="w-4 h-4 text-gold" />
              <span className="text-gold font-semibold">{vehicle.pricePerHour}</span>
              <span className="text-xs text-gray-500">/hr</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {vehicle.features.split(',').slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold/70 border border-gold/20 rounded-full"
              >
                {feature.trim()}
              </span>
            ))}
          </div>

          {/* Book Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToBooking}
            className="w-full py-2.5 rounded-full gold-gradient text-black font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FleetSection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');
        if (res.ok) {
          const data = await res.json();
          setVehicles(data);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles =
    activeCategory === 'All'
      ? vehicles
      : vehicles.filter((v) => v.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="fleet" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      
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
            Our Collection
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Premium <span className="gold-text">Fleet</span>
          </h2>
          <div className="w-24 h-[2px] gold-gradient mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our exclusive collection of luxury vehicles, each maintained to the highest standards of excellence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'gold-gradient text-black shadow-lg shadow-gold/20'
                  : 'text-gray-400 border border-gold/20 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle, i) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
