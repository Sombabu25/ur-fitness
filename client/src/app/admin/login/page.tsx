'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { authAPI } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const token = Cookies.get('ur_fitness_token');
    if (token) router.push('/admin/dashboard');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const res = await authAPI.login(form.email, form.password);
      Cookies.set('ur_fitness_token', res.data.token, { expires: 7 });
      toast.success(`Welcome back, ${res.data.admin.name}!`);
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7B2FFF]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FF2D55]/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(123,47,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md mx-6 relative z-10"
      >
        <div className="glass-card rounded-3xl p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B2FFF] to-[#FF2D55] flex items-center justify-center mx-auto mb-4 glow-purple">
              <Zap size={28} className="text-white" />
            </div>
            <h1 className="font-display text-2xl font-black text-white tracking-wide">ADMIN PORTAL</h1>
            <p className="text-brand-sub text-sm font-body mt-1">UR Fitness Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-brand-sub text-xs font-body font-semibold tracking-widest uppercase block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sub" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="input-dark w-full pl-11 pr-4 py-3.5 rounded-xl font-body text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-brand-sub text-xs font-body font-semibold tracking-widest uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sub" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="input-dark w-full pl-11 pr-12 py-3.5 rounded-xl font-body text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-sub hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-xl font-body font-semibold uppercase tracking-wide text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : 'Sign In to Admin'}
            </button>
          </form>

          {/* Forgot password hint — no credentials exposed */}
          <p className="text-brand-sub/50 text-xs font-body text-center mt-6">
            Contact your system administrator if you've forgotten your credentials.
          </p>
        </div>
      </motion.div>
    </div>
  );
}