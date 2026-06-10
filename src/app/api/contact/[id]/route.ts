import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const message = await db.contactMessage.findUnique({ where: { id } });
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    if (body.read !== undefined) {
      data.read = Boolean(body.read);
    }

    const message = await db.contactMessage.update({
      where: { id },
      data,
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await db.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
