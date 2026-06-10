'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vehicle {
  id: string;
  name: string;
  pricePerHour: number;
}

const serviceTypes = [
  'Airport Transfer',
  'Wedding Transportation',
  'Corporate Travel',
  'Prom & Special Events',
  'Wine Tour',
  'Concert & VIP Events',
  'Other',
];

export default function BookingSection() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleId: '',
    serviceType: '',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengers: '',
    specialRequests: '',
  });

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
      }
    };
    fetchVehicles();
  }, []);

  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);
  const estimatedPrice = selectedVehicle ? selectedVehicle.pricePerHour * 2 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          totalPrice: estimatedPrice,
        }),
      });

      if (res.ok) {
        toast({
          title: 'Booking Confirmed!',
          description: 'Your luxury ride has been booked. We will contact you shortly with confirmation details.',
        });
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          vehicleId: '',
          serviceType: '',
          pickupDate: '',
          pickupTime: '',
          pickupLocation: '',
          dropoffLocation: '',
          passengers: '',
          specialRequests: '',
        });
      } else {
        const data = await res.json();
        toast({
          title: 'Booking Failed',
          description: data.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit booking. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#1a1a1a] border border-gold/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 text-sm outline-none';

  return (
    <section id="booking" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-3 block">
            Reserve Your Ride
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Book Your <span className="gold-text">Luxury Ride</span>
          </h2>
          <div className="w-24 h-[2px] gold-gradient mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fill out the form below and our team will confirm your reservation within minutes.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 sm:p-8 lg:p-10 border-gold/20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Personal Info */}
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 000-0000"
                className={inputClass}
              />
            </div>

            {/* Divider */}
            <div className="sm:col-span-2 section-divider my-2" />

            {/* Trip Details */}
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Vehicle *</label>
              <select
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} - ${v.pricePerHour}/hr
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Service Type *</label>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select service type</option>
                {serviceTypes.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Pickup Date *</label>
              <input
                type="date"
                name="pickupDate"
                value={form.pickupDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Pickup Time *</label>
              <input
                type="time"
                name="pickupTime"
                value={form.pickupTime}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Pickup Location *</label>
              <input
                type="text"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                required
                placeholder="Airport, hotel, address..."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Dropoff Location *</label>
              <input
                type="text"
                name="dropoffLocation"
                value={form.dropoffLocation}
                onChange={handleChange}
                required
                placeholder="Destination address..."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Number of Passengers *</label>
              <input
                type="number"
                name="passengers"
                value={form.passengers}
                onChange={handleChange}
                required
                min="1"
                max="50"
                placeholder="1"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Estimated Price</label>
              <div className="w-full bg-[#1a1a1a] border border-gold/15 rounded-lg px-4 py-3 text-gold font-semibold text-sm">
                {selectedVehicle ? `$${estimatedPrice} (2hr minimum)` : 'Select a vehicle'}
              </div>
            </div>

            {/* Special Requests */}
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-300 mb-1.5">Special Requests</label>
              <textarea
                name="specialRequests"
                value={form.specialRequests}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requirements, child seats, decorations, etc."
                className={inputClass}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-6 w-full gold-gradient py-4 rounded-full text-black font-semibold text-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Confirm Booking
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
