import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      category,
      passengers,
      luggage,
      pricePerHour,
      image,
      features,
      description,
      available,
    } = body;

    if (!name || !category || !passengers || !luggage || !pricePerHour || !image || !features || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const vehicle = await db.vehicle.create({
      data: {
        name,
        category,
        passengers: parseInt(String(passengers)),
        luggage: parseInt(String(luggage)),
        pricePerHour: parseFloat(String(pricePerHour)),
        image,
        features,
        description,
        available: available !== undefined ? Boolean(available) : true,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
