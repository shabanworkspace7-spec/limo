'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  MessageSquare,
  ArrowLeft,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export type TabId = 'overview' | 'vehicles' | 'bookings' | 'messages';

interface DashboardSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

export default function DashboardSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
}: DashboardSidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-[#111111] border-r border-[rgba(201,168,76,0.2)] z-30 shrink-0"
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[rgba(201,168,76,0.15)]">
        <Crown className="size-7 text-[#c9a84c] shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="font-heading text-lg font-bold gold-text whitespace-nowrap overflow-hidden"
            >
              Elite Limo
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[rgba(201,168,76,0.15)] text-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.1)]'
                  : 'text-gray-400 hover:bg-[rgba(201,168,76,0.08)] hover:text-gray-200'
              )}
            >
              <Icon className={cn('size-5 shrink-0', isActive && 'text-[#c9a84c]')} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom: Back to website & Logout */}
      <div className="px-2 pb-4 space-y-1">
        <a
          href="/"
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-[rgba(201,168,76,0.08)] hover:text-gray-200 transition-all duration-200"
        >
          <ArrowLeft className="size-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Back to Website
              </motion.span>
            )}
          </AnimatePresence>
        </a>
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/admin';
          }}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-red-400/70 hover:bg-red-400/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="size-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1a1a1a] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-200 shadow-md z-40"
      >
        {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
      </button>
    </motion.aside>
  );
}
