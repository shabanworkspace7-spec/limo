import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Total bookings
    const totalBookings = await db.booking.count();

    // Total revenue from completed bookings
    const completedBookings = await db.booking.findMany({
      where: { status: 'completed' },
      select: { totalPrice: true },
    });
    const totalRevenue = completedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    // Bookings by status
    const bookingsByStatus = {
      pending: await db.booking.count({ where: { status: 'pending' } }),
      confirmed: await db.booking.count({ where: { status: 'confirmed' } }),
      completed: await db.booking.count({ where: { status: 'completed' } }),
      cancelled: await db.booking.count({ where: { status: 'cancelled' } }),
    };

    // Bookings by service type
    const allBookings = await db.booking.findMany({
      select: { serviceType: true },
    });
    const serviceTypeMap: Record<string, number> = {};
    for (const b of allBookings) {
      serviceTypeMap[b.serviceType] = (serviceTypeMap[b.serviceType] || 0) + 1;
    }
    const bookingsByServiceType = Object.entries(serviceTypeMap).map(([type, count]) => ({
      type,
      count,
    }));

    // Monthly bookings for last 6 months
    const now = new Date();
    const monthlyBookings = [];
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthName = monthStart.toLocaleString('default', { month: 'short' });

      const count = await db.booking.count({
        where: {
          createdAt: {
            gte: monthStart,
            lt: monthEnd,
          },
        },
      });

      const monthCompleted = await db.booking.findMany({
        where: {
          status: 'completed',
          createdAt: {
            gte: monthStart,
            lt: monthEnd,
          },
        },
        select: { totalPrice: true },
      });

      const revenue = monthCompleted.reduce((sum, b) => sum + b.totalPrice, 0);

      monthlyBookings.push({ month: monthName, count });
      monthlyRevenue.push({ month: monthName, revenue });
    }

    // Vehicle stats
    const totalVehicles = await db.vehicle.count();
    const availableVehicles = await db.vehicle.count({ where: { available: true } });

    // Unread messages
    const unreadMessages = await db.contactMessage.count({ where: { read: false } });

    // Top 5 vehicles by booking count
    const vehicles = await db.vehicle.findMany({
      include: {
        _count: { select: { bookings: true } },
      },
    });
    const topVehicles = vehicles
      .sort((a, b) => b._count.bookings - a._count.bookings)
      .slice(0, 5)
      .map((v) => ({
        id: v.id,
        name: v.name,
        category: v.category,
        bookingCount: v._count.bookings,
        pricePerHour: v.pricePerHour,
      }));

    // Average booking value
    const avgBookingValue = totalBookings > 0
      ? (await db.booking.aggregate({ _avg: { totalPrice: true } }))._avg.totalPrice || 0
      : 0;

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      bookingsByStatus,
      bookingsByServiceType,
      monthlyBookings,
      monthlyRevenue,
      totalVehicles,
      availableVehicles,
      unreadMessages,
      topVehicles,
      avgBookingValue,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
