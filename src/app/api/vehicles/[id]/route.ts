import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const vehicle = await db.vehicle.findUnique({
      where: { id },
      include: { bookings: true },
    });
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const existing = await db.vehicle.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    const vehicle = await db.vehicle.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(passengers !== undefined && { passengers: parseInt(String(passengers)) }),
        ...(luggage !== undefined && { luggage: parseInt(String(luggage)) }),
        ...(pricePerHour !== undefined && { pricePerHour: parseFloat(String(pricePerHour)) }),
        ...(image !== undefined && { image }),
        ...(features !== undefined && { features }),
        ...(description !== undefined && { description }),
        ...(available !== undefined && { available: Boolean(available) }),
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await db.vehicle.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    await db.vehicle.delete({ where: { id } });
    return NextResponse.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
