'use client';

import dynamic from 'next/dynamic';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import ServicesSection from '@/components/ServicesSection';
import InteriorSection from '@/components/InteriorSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import CorporateClients from '@/components/CorporateClients';
import BookingSection from '@/components/BookingSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const CarShowcase3D = dynamic(() => import('@/components/CarShowcase3D'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false });
const StatsSection = dynamic(() => import('@/components/StatsSection'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen">
      <EnhancedNavbar />
      <HeroSection />
      <FleetSection />
      <CarShowcase3D />
      <ServicesSection />
      <InteriorSection />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection />
      <CorporateClients />
      <BookingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
