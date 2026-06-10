'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Luxury Boulevard', 'Beverly Hills, CA 90210'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['1-800-ELITE-LM', '+1 (310) 555-0199'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['reservations@elitelimo.com', 'info@elitelimo.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['24/7 Available', 'Office: Mon-Sat 8AM-8PM'],
  },
];

export default function ContactSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for reaching out. We will get back to you within 24 hours.',
        });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#1a1a1a] border border-gold/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 text-sm outline-none';

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

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
            Reach Out
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get In <span className="gold-text">Touch</span>
          </h2>
          <div className="w-24 h-[2px] gold-gradient mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 border-gold/20">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Send Us a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your needs..."
                    className={inputClass}
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-6 w-full gold-gradient py-3.5 rounded-full text-black font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-5 rounded-xl border-gold/15 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{info.title}</h4>
                  {info.lines.map((line) => (
                    <p key={line} className="text-xs text-gray-400">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl overflow-hidden border-gold/15 h-48 sm:h-56">
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#1a1a1a] flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201,168,76,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                  }} />
                </div>
                <div className="text-center z-10">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Beverly Hills, CA</p>
                  <p className="text-xs text-gray-500">123 Luxury Boulevard</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
