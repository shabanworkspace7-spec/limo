'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Briefcase,
  DollarSign,
  CheckCircle2,
  XCircle,
  Car,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
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

interface Vehicle {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  pricePerHour: number;
  image: string;
  features: string;
  description: string;
  available: boolean;
}

const categoryOptions = ['sedan', 'suv', 'limousine', 'bus', 'premium'];

const emptyVehicle = {
  name: '',
  category: 'sedan',
  passengers: 4,
  luggage: 3,
  pricePerHour: 100,
  image: '',
  features: '',
  description: '',
  available: true,
};

export default function VehiclesTab() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState(emptyVehicle);
  const [submitting, setSubmitting] = useState(false);

  const fetchVehicles = useCallback(async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormData(emptyVehicle);
    setFormOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      category: vehicle.category,
      passengers: vehicle.passengers,
      luggage: vehicle.luggage,
      pricePerHour: vehicle.pricePerHour,
      image: vehicle.image,
      features: vehicle.features,
      description: vehicle.description,
      available: vehicle.available,
    });
    setFormOpen(true);
  };

  const handleDelete = (vehicle: Vehicle) => {
    setDeletingVehicle(vehicle);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingVehicle) return;
    try {
      const res = await fetch(`/api/vehicles/${deletingVehicle.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Vehicle deleted successfully');
      fetchVehicles();
    } catch {
      toast.error('Failed to delete vehicle');
    } finally {
      setDeleteOpen(false);
      setDeletingVehicle(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.pricePerHour || !formData.image || !formData.features || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      if (editingVehicle) {
        const res = await fetch(`/api/vehicles/${editingVehicle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Update failed');
        toast.success('Vehicle updated successfully');
      } else {
        const res = await fetch('/api/vehicles/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Create failed');
        toast.success('Vehicle created successfully');
      }
      setFormOpen(false);
      fetchVehicles();
    } catch {
      toast.error(editingVehicle ? 'Failed to update vehicle' : 'Failed to create vehicle');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 bg-[#1a1a1a]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl bg-[#1a1a1a]" />
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
          <h2 className="text-xl font-bold text-white">Vehicle Management</h2>
          <p className="text-sm text-gray-400">{vehicles.length} vehicles in fleet</p>
        </div>
        <Button
          onClick={handleAdd}
          className="gold-gradient text-black font-semibold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
        >
          <Plus className="size-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white placeholder:text-gray-500"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px] bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)]">
            <SelectItem value="all">All Categories</SelectItem>
            {categoryOptions.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize text-gray-200">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle Cards Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-[#111111] border-[rgba(201,168,76,0.15)] overflow-hidden hover:border-[rgba(201,168,76,0.35)] transition-all duration-300">
                {/* Image */}
                <div className="relative h-36 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={`${vehicle.available ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} border text-xs`}
                    >
                      {vehicle.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30 border text-xs capitalize">
                      {vehicle.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-white">{vehicle.name}</h3>
                    <span className="text-sm font-bold text-[#c9a84c]">
                      ${vehicle.pricePerHour}/hr
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" /> {vehicle.passengers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-3.5" /> {vehicle.luggage}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.split(',').slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] text-gray-400 border border-[rgba(201,168,76,0.1)]"
                      >
                        {f.trim()}
                      </span>
                    ))}
                    {vehicle.features.split(',').length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] text-gray-500">
                        +{vehicle.features.split(',').length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[rgba(201,168,76,0.1)]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(vehicle)}
                      className="flex-1 text-gray-400 hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)]"
                    >
                      <Pencil className="size-3.5 mr-1.5" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(vehicle)}
                      className="flex-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="size-3.5 mr-1.5" /> Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Car className="size-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">No vehicles found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Vehicle Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="bg-[#111111] border-[rgba(201,168,76,0.2)] text-white max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingVehicle ? 'Update vehicle information below.' : 'Fill in the details for the new vehicle.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-gray-300">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Luxury Sedan"
                className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)]">
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize text-gray-200">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Price/Hour *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: parseFloat(e.target.value) || 0 })}
                    className="pl-9 bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Passengers *</Label>
                <Input
                  type="number"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) || 0 })}
                  className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Luggage *</Label>
                <Input
                  type="number"
                  value={formData.luggage}
                  onChange={(e) => setFormData({ ...formData, luggage: parseInt(e.target.value) || 0 })}
                  className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Image URL *</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/cars/vehicle.png"
                className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Features * (comma-separated)</Label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="e.g., WiFi, Leather Seats, Bar Area"
                className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this vehicle..."
                rows={3}
                className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)]">
              <div className="flex items-center gap-2">
                {formData.available ? (
                  <CheckCircle2 className="size-4 text-green-400" />
                ) : (
                  <XCircle className="size-4 text-red-400" />
                )}
                <Label className="text-gray-300 cursor-pointer">Available for booking</Label>
              </div>
              <Switch
                checked={formData.available}
                onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setFormOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="gold-gradient text-black font-semibold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            >
              {submitting ? 'Saving...' : editingVehicle ? 'Update Vehicle' : 'Create Vehicle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[#111111] border-[rgba(201,168,76,0.2)] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Vehicle</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete <strong className="text-[#c9a84c]">{deletingVehicle?.name}</strong>? This action cannot be undone and will also remove all associated bookings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1a1a1a] border-[rgba(201,168,76,0.2)] text-gray-300 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
