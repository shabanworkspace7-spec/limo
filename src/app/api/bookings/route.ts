import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      include: { vehicle: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      vehicleId,
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      serviceType,
      passengers,
      specialRequests,
      totalPrice,
    } = body;

    if (!firstName || !lastName || !email || !phone || !vehicleId || !pickupDate || !pickupTime || !pickupLocation || !dropoffLocation || !serviceType || !passengers || !totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const vehicle = await db.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    const booking = await db.booking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        vehicleId,
        pickupDate: new Date(pickupDate),
        pickupTime,
        pickupLocation,
        dropoffLocation,
        serviceType,
        passengers: parseInt(passengers),
        specialRequests: specialRequests || null,
        totalPrice: parseFloat(totalPrice),
        status: 'pending',
      },
      include: { vehicle: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
