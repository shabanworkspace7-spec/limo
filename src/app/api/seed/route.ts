import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const existing = await db.vehicle.count();
    if (existing > 0) {
      return NextResponse.json({ message: 'Database already seeded', count: existing });
    }

    const vehicles = await Promise.all([
      db.vehicle.create({
        data: {
          name: 'Stretch Limousine',
          category: 'limousine',
          passengers: 10,
          luggage: 8,
          pricePerHour: 125,
          image: '/images/cars/stretch-limo.png',
          features: 'Leather Interior,Bar Area,LED Lighting,Sound System,Privacy Partition',
          description: 'Classic stretch limousine perfect for special events and celebrations. Features a fully stocked bar and premium sound system.',
        },
      }),
      db.vehicle.create({
        data: {
          name: 'Wedding Limousine',
          category: 'limousine',
          passengers: 8,
          luggage: 6,
          pricePerHour: 150,
          image: '/images/cars/wedding-limo.png',
          features: 'White Exterior,Red Carpet Service,Champagne,Ribbon Decor,Just Married Sign',
          description: 'Elegant white wedding limousine with premium decorations and red carpet service for your special day.',
        },
      }),
      db.vehicle.create({
        data: {
          name: 'Luxury SUV (Escalade)',
          category: 'suv',
          passengers: 7,
          luggage: 5,
          pricePerHour: 95,
          image: '/images/cars/luxury-suv.png',
          features: 'All-Wheel Drive,Leather Seats,Climate Control,Entertainment System,WiFi',
          description: 'Spacious luxury SUV offering comfort and style. Perfect for airport transfers and corporate travel.',
        },
      }),
      db.vehicle.create({
        data: {
          name: 'Party Bus',
          category: 'bus',
          passengers: 24,
          luggage: 10,
          pricePerHour: 175,
          image: '/images/cars/party-bus.png',
          features: 'Dance Floor,LED Lighting,Premium Sound,Dance Pole,Mini Bar,Smoke Machine',
          description: 'The ultimate party on wheels. Features a dance floor, premium sound system, and full bar for an unforgettable experience.',
        },
      }),
      db.vehicle.create({
        data: {
          name: 'Luxury Sedan (Mercedes)',
          category: 'sedan',
          passengers: 3,
          luggage: 3,
          pricePerHour: 75,
          image: '/images/cars/luxury-sedan.png',
          features: 'Executive Seating,Climate Control,WiFi,Complimentary Water,Phone Charger',
          description: 'Refined luxury sedan offering executive-class comfort for business and personal travel.',
        },
      }),
      db.vehicle.create({
        data: {
          name: 'Rolls Royce Ghost',
          category: 'premium',
          passengers: 4,
          luggage: 3,
          pricePerHour: 250,
          image: '/images/cars/rolls-royce.png',
          features: 'Handcrafted Interior,Starlight Headliner,Bespoke Audio,Umbrella Storage,Rear Theater',
          description: 'The pinnacle of luxury. Handcrafted Rolls Royce Ghost with bespoke features for the most discerning clients.',
        },
      }),
    ]);

    return NextResponse.json({ message: 'Database seeded successfully', count: vehicles.length });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
