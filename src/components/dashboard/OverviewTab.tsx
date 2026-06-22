'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  DollarSign,
  Car,
  MessageSquare,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  bookingsByStatus: Record<string, number>;
  bookingsByServiceType: { type: string; count: number }[];
  monthlyBookings: { month: string; count: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
  totalVehicles: number;
  availableVehicles: number;
  unreadMessages: number;
  topVehicles: { id: string; name: string; category: string; bookingCount: number; pricePerHour: number }[];
  avgBookingValue: number;
}

interface RecentBooking {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  serviceType: string;
  totalPrice: number;
  pickupDate: string;
  vehicle: { name: string };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const serviceTypeColors: string[] = [
  '#c9a84c', '#d4af37', '#e8c84a', '#f0d060', '#a08830', '#8b7226',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function OverviewTab() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, bookingsRes] = await Promise.all([
          fetch('/api/analytics'),
          fetch('/api/bookings'),
        ]);

        const analyticsData = await analyticsRes.json();
        const bookingsData = await bookingsRes.json();

        if (!analyticsRes.ok || !analyticsData || typeof analyticsData !== 'object' || !('bookingsByStatus' in analyticsData)) {
          const errorMessage = analyticsData?.error || 'Invalid analytics response';
          throw new Error(errorMessage);
        }

        if (!bookingsRes.ok || !Array.isArray(bookingsData)) {
          const errorMessage = bookingsData?.error || 'Invalid bookings response';
          throw new Error(errorMessage);
        }

        setAnalytics(analyticsData as AnalyticsData);
        setRecentBookings(bookingsData.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl bg-[#1a1a1a]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl bg-[#1a1a1a]" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-6 rounded-3xl bg-[#111111] border border-[rgba(201,168,76,0.15)] text-center text-gray-300">
        <h2 className="text-lg font-semibold text-white mb-2">Unable to load dashboard data</h2>
        <p className="text-sm text-gray-400">{error || 'Server did not return valid analytics data.'}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: analytics.totalBookings,
      icon: CalendarCheck,
      trend: analytics.bookingsByStatus.pending > 0 ? 'up' : 'neutral',
      trendValue: `${analytics.bookingsByStatus.pending} pending`,
      color: '#c9a84c',
    },
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      trend: analytics.totalRevenue > 0 ? 'up' : 'neutral',
      trendValue: `Avg $${analytics.avgBookingValue.toFixed(0)}`,
      color: '#4ade80',
    },
    {
      title: 'Active Vehicles',
      value: `${analytics.availableVehicles}/${analytics.totalVehicles}`,
      icon: Car,
      trend: analytics.availableVehicles === analytics.totalVehicles ? 'up' : 'down',
      trendValue: analytics.availableVehicles === analytics.totalVehicles ? 'All available' : 'Some unavailable',
      color: '#60a5fa',
    },
    {
      title: 'Unread Messages',
      value: analytics.unreadMessages,
      icon: MessageSquare,
      trend: analytics.unreadMessages > 0 ? 'down' : 'up',
      trendValue: analytics.unreadMessages > 0 ? 'Needs attention' : 'All caught up',
      color: '#f472b6',
    },
  ];

  const maxBookingCount = Math.max(...analytics.monthlyBookings.map((m) => m.count), 1);
  const maxRevenue = Math.max(...analytics.monthlyRevenue.map((m) => m.revenue), 1);
  const maxServiceCount = Math.max(...analytics.bookingsByServiceType.map((s) => s.count), 1);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="relative overflow-hidden bg-[#111111] border-[rgba(201,168,76,0.15)] p-5 hover:border-[rgba(201,168,76,0.35)] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="size-3.5 text-green-400" />
                    ) : stat.trend === 'down' ? (
                      <TrendingDown className="size-3.5 text-red-400" />
                    ) : null}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-400' : stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                      {stat.trendValue}
                    </span>
                  </div>
                </div>
                <div
                  className="size-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="size-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 h-0.5"
                style={{ backgroundColor: stat.color, width: '100%', opacity: 0.5 }}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Bookings Bar Chart */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-5">
            <h3 className="text-base font-semibold text-white mb-4">Monthly Bookings</h3>
            <div className="flex items-end gap-3 h-48">
              {analytics.monthlyBookings.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">{item.count}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.count / maxBookingCount) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    className="w-full rounded-t-md min-h-[4px]"
                    style={{
                      background: `linear-gradient(180deg, #c9a84c 0%, #8b7226 100%)`,
                      opacity: 0.85,
                    }}
                  />
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Revenue by Month */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-5">
            <h3 className="text-base font-semibold text-white mb-4">Revenue by Month</h3>
            <div className="relative h-48">
              {/* SVG line chart */}
              <svg className="w-full h-full" viewBox="0 0 300 160" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="300"
                    y2={y}
                    stroke="rgba(201,168,76,0.1)"
                    strokeWidth="1"
                  />
                ))}
                {/* Area fill */}
                {analytics.monthlyRevenue.length > 1 && (
                  <>
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      d={`
                        M 0,${160 - (analytics.monthlyRevenue[0].revenue / maxRevenue) * 140}
                        ${analytics.monthlyRevenue
                          .map((item, i) => {
                            const x = (i / (analytics.monthlyRevenue.length - 1)) * 300;
                            const y = 160 - (item.revenue / maxRevenue) * 140;
                            return `L ${x},${y}`;
                          })
                          .join(' ')}
                        L 300,160 L 0,160 Z
                      `}
                      fill="url(#revenueGradient)"
                    />
                    {/* Line */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                      d={analytics.monthlyRevenue
                        .map((item, i) => {
                          const x = (i / (analytics.monthlyRevenue.length - 1)) * 300;
                          const y = 160 - (item.revenue / maxRevenue) * 140;
                          return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Data points */}
                    {analytics.monthlyRevenue.map((item, i) => {
                      const x = (i / (analytics.monthlyRevenue.length - 1)) * 300;
                      const y = 160 - (item.revenue / maxRevenue) * 140;
                      return (
                        <motion.circle
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.15 }}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#c9a84c"
                          stroke="#0a0a0a"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </>
                )}
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Month labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                {analytics.monthlyRevenue.map((item, i) => (
                  <span key={i} className="text-xs text-gray-500">{item.month}</span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Service Type + Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bookings by Service Type */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-5">
            <h3 className="text-base font-semibold text-white mb-4">Bookings by Service Type</h3>
            {analytics.bookingsByServiceType.length === 0 ? (
              <p className="text-gray-500 text-sm">No booking data yet.</p>
            ) : (
              <div className="space-y-3">
                {analytics.bookingsByServiceType.map((item, i) => (
                  <div key={item.type} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 capitalize">{item.type}</span>
                      <span className="text-gray-400">{item.count}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / maxServiceCount) * 100}%` }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${serviceTypeColors[i % serviceTypeColors.length]}, ${serviceTypeColors[(i + 1) % serviceTypeColors.length]})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Bookings by Status */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-5">
            <h3 className="text-base font-semibold text-white mb-4">Bookings by Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(analytics.bookingsByStatus).map(([status, count], i) => (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)]"
                >
                  <span className="text-2xl font-bold text-white mb-1">{count}</span>
                  <Badge
                    className={`${statusColors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'} capitalize border text-xs`}
                  >
                    {status}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {/* Mini donut chart */}
            <div className="flex justify-center mt-4">
              <div
                className="size-24 rounded-full"
                style={{
                  background: `conic-gradient(
                    #c9a84c 0deg ${(analytics.bookingsByStatus.confirmed / Math.max(analytics.totalBookings, 1)) * 360}deg,
                    #4ade80 ${(analytics.bookingsByStatus.confirmed / Math.max(analytics.totalBookings, 1)) * 360}deg ${((analytics.bookingsByStatus.confirmed + analytics.bookingsByStatus.completed) / Math.max(analytics.totalBookings, 1)) * 360}deg,
                    #facc15 ${((analytics.bookingsByStatus.confirmed + analytics.bookingsByStatus.completed) / Math.max(analytics.totalBookings, 1)) * 360}deg ${((analytics.bookingsByStatus.confirmed + analytics.bookingsByStatus.completed + analytics.bookingsByStatus.pending) / Math.max(analytics.totalBookings, 1)) * 360}deg,
                    #ef4444 ${((analytics.bookingsByStatus.confirmed + analytics.bookingsByStatus.completed + analytics.bookingsByStatus.pending) / Math.max(analytics.totalBookings, 1)) * 360}deg 360deg
                  )`,
                }}
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row: Top Vehicles + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Vehicles */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-5">
            <h3 className="text-base font-semibold text-white mb-4">Top Vehicles</h3>
            {analytics.topVehicles.length === 0 ? (
              <p className="text-gray-500 text-sm">No booking data yet.</p>
            ) : (
              <div className="space-y-3">
                {analytics.topVehicles.map((v, i) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#c9a84c] w-6">#{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{v.name}</p>
                        <p className="text-xs text-gray-400 capitalize">{v.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{v.bookingCount} bookings</p>
                      <p className="text-xs text-gray-400">${v.pricePerHour}/hr</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-5">
            <h3 className="text-base font-semibold text-white mb-4">Recent Bookings</h3>
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No bookings yet.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {booking.firstName} {booking.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{booking.vehicle?.name || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        ${booking.totalPrice.toFixed(2)}
                      </p>
                      <Badge
                        className={`${statusColors[booking.status] || ''} capitalize border text-[10px] px-1.5 py-0`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
