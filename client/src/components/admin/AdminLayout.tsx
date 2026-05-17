'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, Search } from 'lucide-react';
import Cookies from 'js-cookie';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, loading } = useAuth();

  useEffect(() => {
    if (!loading && !admin && !Cookies.get('ur_fitness_token')) {
      router.push('/admin/login');
    }
  }, [admin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7B2FFF]/30 border-t-[#7B2FFF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-brand-card border-b border-brand-border flex items-center justify-between px-6 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-brand-sub hover:text-white"
          >
            <Menu size={22} />
          </button>

          <div className="hidden md:flex items-center gap-2 bg-brand-dark border border-brand-border rounded-xl px-4 py-2 w-64">
            <Search size={15} className="text-brand-sub" />
            <span className="text-brand-sub text-sm font-body">Search...</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative text-brand-sub hover:text-white">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF2D55] rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FFF] to-[#FF2D55] flex items-center justify-center">
                <span className="font-display text-xs font-bold text-white">
                  {admin?.name?.[0] || 'A'}
                </span>
              </div>
              <span className="hidden md:block text-white text-sm font-body font-semibold">{admin?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
