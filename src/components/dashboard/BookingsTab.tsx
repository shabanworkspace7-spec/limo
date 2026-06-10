'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Eye,
  RefreshCw,
  Trash2,
  CalendarCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleId: string;
  vehicle: { id: string; name: string; category: string; image: string; pricePerHour: number };
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  serviceType: string;
  passengers: number;
  specialRequests: string | null;
  status: string;
  totalPrice: number;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];
const serviceTypes = ['Airport Transfer', 'Wedding', 'Corporate', 'Prom', 'Wine Tour', 'Concert', 'VIP Service', 'Other'];

export default function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // Dialog states
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailOpen(true);
  };

  const handleUpdateStatus = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setStatusOpen(true);
  };

  const handleDelete = (booking: Booking) => {
    setSelectedBooking(booking);
    setDeleteOpen(true);
  };

  const confirmStatusUpdate = async () => {
    if (!selectedBooking || !newStatus) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success(`Booking status updated to ${newStatus}`);
      fetchBookings();
      setStatusOpen(false);
    } catch {
      toast.error('Failed to update booking status');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedBooking) return;
    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Booking deleted successfully');
      fetchBookings();
    } catch {
      toast.error('Failed to delete booking');
    } finally {
      setDeleteOpen(false);
      setSelectedBooking(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.firstName.toLowerCase().includes(search.toLowerCase()) ||
      b.lastName.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesService = serviceFilter === 'all' || b.serviceType === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 bg-[#1a1a1a]" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl bg-[#1a1a1a]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Booking Management</h2>
          <p className="text-sm text-gray-400">{bookings.length} total bookings</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => { setLoading(true); fetchBookings(); }}
          className="text-gray-400 hover:text-[#c9a84c]"
        >
          <RefreshCw className="size-4 mr-2" /> Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white placeholder:text-gray-500"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)]">
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s} className="capitalize text-gray-200">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)]">
            <SelectItem value="all">All Services</SelectItem>
            {serviceTypes.map((s) => (
              <SelectItem key={s} value={s} className="text-gray-200">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] p-4 hover:border-[rgba(201,168,76,0.3)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-mono">
                        {booking.id.slice(0, 8)}...
                      </span>
                      <Badge
                        className={`${statusColors[booking.status] || ''} capitalize border text-[10px] px-1.5 py-0`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {booking.firstName} {booking.lastName}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{booking.vehicle?.name || 'N/A'}</span>
                      <span className="capitalize">{booking.serviceType}</span>
                      <span>{formatDate(booking.pickupDate)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-sm font-bold text-[#c9a84c]">
                      ${booking.totalPrice.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(booking)}
                      className="text-gray-400 hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] size-8 p-0"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdateStatus(booking)}
                      className="text-gray-400 hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] size-8 p-0"
                    >
                      <RefreshCw className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(booking)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 size-8 p-0"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <CalendarCheck className="size-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">No bookings found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* View Details Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-[#111111] border-[rgba(201,168,76,0.2)] text-white max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              Booking Details
              {selectedBooking && (
                <Badge className={`${statusColors[selectedBooking.status] || ''} capitalize border text-xs`}>
                  {selectedBooking.status}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-mono text-xs">
              ID: {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 py-2">
              {/* Client Info */}
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)] space-y-2">
                <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Client Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="font-medium text-white">{selectedBooking.firstName} {selectedBooking.lastName}</span>
                  </div>
                  <div />
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="size-3.5 shrink-0" />
                    <span className="truncate">{selectedBooking.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="size-3.5 shrink-0" />
                    <span>{selectedBooking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)] space-y-2">
                <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Trip Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="size-3.5 shrink-0 text-green-400" />
                    <span className="truncate">{selectedBooking.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="size-3.5 shrink-0 text-red-400" />
                    <span className="truncate">{selectedBooking.dropoffLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarCheck className="size-3.5 shrink-0" />
                    <span>{formatDate(selectedBooking.pickupDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="size-3.5 shrink-0" />
                    <span>{selectedBooking.pickupTime}</span>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)] space-y-2">
                <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Service Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FileText className="size-3.5 shrink-0" />
                    <span className="capitalize">{selectedBooking.serviceType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="size-3.5 shrink-0" />
                    <span>{selectedBooking.passengers} passengers</span>
                  </div>
                  <div className="col-span-2 text-gray-400">
                    Vehicle: <span className="text-white font-medium">{selectedBooking.vehicle?.name || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Price & Notes */}
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Price</h4>
                  <span className="text-lg font-bold text-[#c9a84c]">
                    ${selectedBooking.totalPrice.toFixed(2)}
                  </span>
                </div>
                {selectedBooking.specialRequests && (
                  <div className="mt-2 pt-2 border-t border-[rgba(201,168,76,0.1)]">
                    <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Special Requests</p>
                    <p className="text-sm text-gray-300">{selectedBooking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
        <DialogContent className="bg-[#111111] border-[rgba(201,168,76,0.2)] text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Update Booking Status</DialogTitle>
            <DialogDescription className="text-gray-400">
              Change status for booking {selectedBooking?.id.slice(0, 8)}...
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <p className="text-sm text-gray-400">
              Current status:{' '}
              <Badge className={`${statusColors[selectedBooking?.status || ''] || ''} capitalize border text-xs`}>
                {selectedBooking?.status}
              </Badge>
            </p>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)]">
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize text-gray-200">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setStatusOpen(false)} className="text-gray-400 hover:text-white">
              Cancel
            </Button>
            <Button
              onClick={confirmStatusUpdate}
              disabled={submitting || newStatus === selectedBooking?.status}
              className="gold-gradient text-black font-semibold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            >
              {submitting ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[#111111] border-[rgba(201,168,76,0.2)] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete booking <strong className="text-[#c9a84c]">{selectedBooking?.id.slice(0, 8)}...</strong> for {selectedBooking?.firstName} {selectedBooking?.lastName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-gray-300 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
