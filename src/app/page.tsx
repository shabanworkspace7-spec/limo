'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import ServicesSection from '@/components/ServicesSection';
import InteriorSection from '@/components/InteriorSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });
const CarShowcase3D = dynamic(() => import('@/components/CarShowcase3D'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false });
const StatsSection = dynamic(() => import('@/components/StatsSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <FleetSection />
      <CarShowcase3D />
      <ServicesSection />
      <InteriorSection />
      <BookingSection />
      <TestimonialsSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
