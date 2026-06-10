import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await db.booking.findUnique({
      where: { id },
      include: { vehicle: true },
    });
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const allowedFields = [
      'firstName', 'lastName', 'email', 'phone',
      'pickupDate', 'pickupTime', 'pickupLocation', 'dropoffLocation',
      'serviceType', 'passengers', 'specialRequests', 'status', 'totalPrice',
    ];

    const data: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'pickupDate') {
          data[field] = new Date(body[field]);
        } else if (field === 'passengers') {
          data[field] = parseInt(String(body[field]));
        } else if (field === 'totalPrice') {
          data[field] = parseFloat(String(body[field]));
        } else {
          data[field] = body[field];
        }
      }
    }

    const booking = await db.booking.update({
      where: { id },
      data,
      include: { vehicle: true },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await db.booking.delete({ where: { id } });
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
