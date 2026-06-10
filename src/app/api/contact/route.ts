import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contactMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        read: false,
      },
    });

    return NextResponse.json(contactMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
