'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut, Shield } from 'lucide-react';
import DashboardSidebar, { type TabId } from '@/components/dashboard/DashboardSidebar';
import OverviewTab from '@/components/dashboard/OverviewTab';
import VehiclesTab from '@/components/dashboard/VehiclesTab';
import BookingsTab from '@/components/dashboard/BookingsTab';
import MessagesTab from '@/components/dashboard/MessagesTab';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Check authentication
  useEffect(() => {
    fetch('/api/auth/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          router.push('/admin');
        }
      })
      .catch(() => {
        setIsAuth(false);
        router.push('/admin');
      });
  }, [router]);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      setTimeout(() => router.push('/admin'), 500);
    } catch {
      toast.error('Logout failed');
    }
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const tabLabels: Record<TabId, string> = {
    overview: 'Dashboard Overview',
    vehicles: 'Vehicle Management',
    bookings: 'Booking Management',
    messages: 'Contact Messages',
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'vehicles':
        return <VehiclesTab />;
      case 'bookings':
        return <BookingsTab />;
      case 'messages':
        return <MessagesTab />;
      default:
        return <OverviewTab />;
    }
  };

  // Loading state while checking auth
  if (isAuth === null) {
    return (
      <div className="flex h-screen bg-[#0a0a0a] items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full"
          />
          <p className="text-gray-500 text-sm">Verifying authentication...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuth) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Overlay Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64">
            <DashboardSidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              collapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-[rgba(201,168,76,0.15)] bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-gray-400 hover:text-white p-1"
            >
              <Menu className="size-5" />
            </Button>

            <div>
              <h1 className="text-lg font-semibold text-white">{tabLabels[activeTab]}</h1>
              <p className="text-xs text-gray-500 hidden sm:flex items-center gap-1">
                <Shield className="size-3" />
                Elite Limo Admin Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#c9a84c]/10 border border-[rgba(201,168,76,0.2)]">
              <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-[#c9a84c] font-medium">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 gap-1.5"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline text-xs">Logout</span>
            </Button>
            <div className="size-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#d4af37] flex items-center justify-center shadow-lg shadow-[#c9a84c]/20">
              <span className="text-xs font-bold text-black">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Sonner Toaster */}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(201, 168, 76, 0.2)',
            color: '#ffffff',
          },
        }}
      />
    </div>
  );
}
