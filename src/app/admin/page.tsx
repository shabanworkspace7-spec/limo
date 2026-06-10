'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Crown, Lock, User, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Check if already authenticated
  useEffect(() => {
    fetch('/api/auth/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          router.push('/admin/dashboard');
        }
      })
      .catch(() => {});
  }, [router]);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Welcome back, Admin!', {
          description: 'Redirecting to dashboard...',
        });
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        toast.error('Login Failed', {
          description: data.error || 'Invalid credentials',
        });
      }
    } catch {
      toast.error('Connection Error', {
        description: 'Unable to connect to server',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: mousePos.x * 1.5,
            y: mousePos.y * 1.5,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            x: mousePos.x * -1,
            y: mousePos.y * -1,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#c9a84c]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Top decorative line */}
        <div className="h-1 w-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        {/* Main card */}
        <div className="relative bg-[#111111]/80 backdrop-blur-xl border border-[rgba(201,168,76,0.2)] rounded-2xl overflow-hidden">
          {/* Card top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#c9a84c]/5 rounded-full blur-3xl" />

          {/* Shimmer effect on top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

          <div className="relative p-8 sm:p-10">
            {/* Logo & Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', damping: 15 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[rgba(201,168,76,0.3)] mb-5"
              >
                <Crown className="size-10 text-[#c9a84c]" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                Admin Panel
              </h1>
              <p className="text-gray-500 text-sm flex items-center justify-center gap-1.5">
                <Shield className="size-3.5" />
                Secure Authentication Required
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c9a84c] transition-colors">
                    <User className="size-4.5" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a]/60 border border-[rgba(201,168,76,0.15)] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 focus:ring-2 focus:ring-[#c9a84c]/20 transition-all duration-300"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c9a84c] transition-colors">
                    <Lock className="size-4.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-11 pr-12 py-3 bg-[#0a0a0a]/60 border border-[rgba(201,168,76,0.15)] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 focus:ring-2 focus:ring-[#c9a84c]/20 transition-all duration-300"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#c9a84c] transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#c9a84c] via-[#d4af37] to-[#c9a84c] hover:from-[#d4af37] hover:via-[#e8c84a] hover:to-[#d4af37] text-black font-semibold text-base rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/25 disabled:opacity-50 disabled:cursor-not-allowed border-0"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Authenticating...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="login"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="size-4" />
                        Sign In to Dashboard
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.form>

            {/* Security badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-2 text-[11px] text-gray-600"
            >
              <Shield className="size-3" />
              <span>256-bit encrypted session</span>
            </motion.div>
          </div>

          {/* Bottom shimmer line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 text-xs">
            Elite Limo &copy; 2026 &middot; Admin Access Only
          </p>
        </motion.div>

        {/* Bottom decorative line */}
        <div className="h-1 w-32 mx-auto mt-8 rounded-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      </motion.div>

      {/* Sonner Toaster */}
      <Toaster
        theme="dark"
        position="bottom-center"
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
