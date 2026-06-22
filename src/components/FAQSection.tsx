'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a limousine?',
    answer: 'Booking a limousine with Elite Limo is simple. You can book directly through our website by filling out the booking form, call us at 1-800-ELITE-LM, or email us at reservations@elitelimo.com. Our team will confirm your reservation within minutes and provide all the details you need.',
  },
  {
    question: 'What types of vehicles do you offer?',
    answer: 'Our fleet includes a wide range of luxury vehicles: Executive Sedans, Premium SUVs, Stretch Limousines, Party Buses, and Specialty Vehicles. Each vehicle is meticulously maintained and comes with professional chauffeur service, climate control, and premium amenities.',
  },
  {
    question: 'Are your chauffeurs professionally trained?',
    answer: 'Absolutely. All our chauffeurs undergo rigorous training programs including defensive driving, customer service excellence, and route optimization. They are fully licensed, insured, and background-checked. Many have over 10 years of experience in luxury transportation.',
  },
  {
    question: 'Can I make last-minute bookings?',
    answer: 'Yes, we accept last-minute bookings based on vehicle availability. While we recommend booking at least 24 hours in advance for the best selection, we understand that plans change. Call us directly for same-day availability and we will do our best to accommodate your needs.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve the greater metropolitan area and surrounding regions. This includes all major airports, hotels, convention centers, and popular venues. For long-distance trips or out-of-state travel, please contact us for custom pricing and availability.',
  },
  {
    question: 'Do you offer airport meet & greet?',
    answer: 'Yes! Our premium meet & greet service includes a professional chauffeur waiting for you at the arrivals terminal with a personalized sign, assistance with luggage, and escort to your vehicle. We also track your flight in real-time to adjust for early arrivals or delays.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 24 hours or more before the scheduled pickup time receive a full refund. Cancellations within 12-24 hours incur a 50% charge. Same-day cancellations are charged at the full rate. We understand emergencies happen, so please contact us as soon as possible.',
  },
  {
    question: 'Can I request special amenities?',
    answer: 'Of course! We offer a range of special amenities including champagne, flowers, decorations, child seats, WiFi hotspots, and custom music playlists. Simply mention your preferences when booking, and we will ensure everything is prepared to your specifications.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#c9a84c]/30 bg-white"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors duration-300 pr-4">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-[#c9a84c] text-black' : 'bg-gray-100 text-[#c9a84c] group-hover:bg-[#c9a84c]/10'
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mb-4" />
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 relative bg-[#f8f7f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] mb-3 block font-medium">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Frequently Asked <span className="gradient-text-gold">Questions</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find answers to the most common questions about our luxury limousine services.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
