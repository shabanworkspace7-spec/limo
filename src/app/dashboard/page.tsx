'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import DashboardSidebar, { type TabId } from '@/components/dashboard/DashboardSidebar';
import OverviewTab from '@/components/dashboard/OverviewTab';
import VehiclesTab from '@/components/dashboard/VehiclesTab';
import BookingsTab from '@/components/dashboard/BookingsTab';
import MessagesTab from '@/components/dashboard/MessagesTab';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <p className="text-xs text-gray-500 hidden sm:block">Elite Limo Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
              <span className="text-xs font-bold text-[#c9a84c]">A</span>
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
