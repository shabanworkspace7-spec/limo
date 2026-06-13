'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, DollarSign, Eye } from 'lucide-react';
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
      className="card-hover-lift group"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#c9a84c]/20 transition-all duration-500">
        {/* Car Image Container */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-b from-gray-50 to-white overflow-hidden image-zoom-hover">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-contain p-6 transition-transform duration-600 group-hover:scale-105"
          />
          {/* Category badge */}
          <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider gold-gradient rounded-full text-black shadow-sm">
            {vehicle.category}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/5 transition-colors duration-500" />
        </div>

        {/* Gold bottom border that appears on hover */}
        <div className="h-0.5 bg-gradient-to-r from-[#c9a84c] via-[#d4af37] to-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            {vehicle.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{vehicle.description}</p>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#c9a84c]" />
              <span>{vehicle.passengers}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#c9a84c]" />
              <span>{vehicle.luggage}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <DollarSign className="w-4 h-4 text-[#c9a84c]" />
              <span className="text-[#c9a84c] font-semibold">{vehicle.pricePerHour}</span>
              <span className="text-xs text-gray-400">/hr</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {vehicle.features.split(',').slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#c9a84c] bg-[#c9a84c]/5 border border-[#c9a84c]/15 rounded-full"
              >
                {feature.trim()}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToBooking}
              className="flex-1 py-2.5 rounded-full gold-gradient text-black font-semibold text-sm hover:shadow-lg hover:shadow-[#c9a84c]/20 transition-all duration-300"
            >
              Book Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              Details
            </motion.button>
          </div>
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
    <section id="fleet" className="py-20 sm:py-28 relative bg-white">
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
            Our Collection
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Premium <span className="gradient-text-gold">Fleet</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
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
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'gold-gradient text-black shadow-lg shadow-[#c9a84c]/20'
                  : 'text-gray-500 border border-gray-200 hover:border-[#c9a84c]/40 hover:text-[#c9a84c] bg-white'
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
              <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
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
