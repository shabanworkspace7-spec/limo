'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Car, ClipboardList, CheckCircle2 } from 'lucide-react';
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

const steps = [
  { icon: Car, label: 'Select Vehicle' },
  { icon: ClipboardList, label: 'Details' },
  { icon: CheckCircle2, label: 'Confirm' },
];

export default function BookingSection() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  // Determine step based on form completion
  useEffect(() => {
    if (form.vehicleId && form.serviceType && form.pickupDate && form.pickupTime && form.pickupLocation && form.dropoffLocation) {
      if (form.firstName && form.lastName && form.email && form.phone) {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    } else {
      setCurrentStep(0);
    }
  }, [form]);

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

  const inputClass = (name: string) =>
    `w-full bg-white border ${focusedField === name ? 'border-[#c9a84c] ring-2 ring-[#c9a84c]/10' : 'border-gray-200'} rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10 transition-all duration-300 text-sm outline-none`;

  return (
    <section id="booking" className="py-20 sm:py-28 relative bg-[#0a0a0a] overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c9a84c]/3 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]/70 mb-3 block">
            Reserve Your Ride
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Book Your <span className="gold-text">Luxury Ride</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#d4af37] mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fill out the form below and our team will confirm your reservation within minutes.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-2 sm:gap-4 mb-10"
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4">
              <div className={`flex items-center gap-2 ${i <= currentStep ? 'opacity-100' : 'opacity-40'} transition-opacity duration-500`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  i < currentStep ? 'gold-gradient text-black' :
                  i === currentStep ? 'border-2 border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10' :
                  'border border-gray-600 text-gray-600'
                }`}>
                  {i < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <span className={`text-xs sm:text-sm font-medium hidden sm:inline ${
                  i <= currentStep ? 'text-[#c9a84c]' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-[2px] transition-colors duration-500 ${
                  i < currentStep ? 'bg-[#c9a84c]' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/[0.03] rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/5"
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
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="John"
                className={inputClass('firstName')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="Doe"
                className={inputClass('lastName')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="john@example.com"
                className={inputClass('email')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="+1 (555) 000-0000"
                className={inputClass('phone')}
              />
            </div>

            {/* Divider */}
            <div className="sm:col-span-2 my-2">
              <div className="section-divider" />
            </div>

            {/* Trip Details */}
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Vehicle *</label>
              <select
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                onFocus={() => setFocusedField('vehicleId')}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClass('vehicleId')}
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
                onFocus={() => setFocusedField('serviceType')}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClass('serviceType')}
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
                onFocus={() => setFocusedField('pickupDate')}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClass('pickupDate')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Pickup Time *</label>
              <input
                type="time"
                name="pickupTime"
                value={form.pickupTime}
                onChange={handleChange}
                onFocus={() => setFocusedField('pickupTime')}
                onBlur={() => setFocusedField(null)}
                required
                className={inputClass('pickupTime')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Pickup Location *</label>
              <input
                type="text"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                onFocus={() => setFocusedField('pickupLocation')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="Airport, hotel, address..."
                className={inputClass('pickupLocation')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Dropoff Location *</label>
              <input
                type="text"
                name="dropoffLocation"
                value={form.dropoffLocation}
                onChange={handleChange}
                onFocus={() => setFocusedField('dropoffLocation')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="Destination address..."
                className={inputClass('dropoffLocation')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Number of Passengers *</label>
              <input
                type="number"
                name="passengers"
                value={form.passengers}
                onChange={handleChange}
                onFocus={() => setFocusedField('passengers')}
                onBlur={() => setFocusedField(null)}
                required
                min="1"
                max="50"
                placeholder="1"
                className={inputClass('passengers')}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Estimated Price</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#c9a84c] font-semibold text-sm">
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
                onFocus={() => setFocusedField('specialRequests')}
                onBlur={() => setFocusedField(null)}
                rows={3}
                placeholder="Any special requirements, child seats, decorations, etc."
                className={inputClass('specialRequests')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201,168,76,0.2)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-6 w-full gold-gradient py-4 rounded-full text-black font-semibold text-lg hover:shadow-xl hover:shadow-[#c9a84c]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
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
