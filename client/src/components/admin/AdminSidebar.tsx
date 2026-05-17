'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, CreditCard, LogOut, Zap, X, Bell } from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Plans', href: '/admin/plans', icon: CreditCard },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    Cookies.remove('ur_fitness_token');
    toast.success('Logged out');
    router.push('/admin/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-brand-card border-r border-brand-border z-30 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7B2FFF] to-[#FF2D55] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <span className="font-display text-sm font-bold text-white block tracking-wide">UR FITNESS</span>
              <span className="text-brand-sub text-[10px] font-body tracking-widest uppercase">Admin Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-brand-sub hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`sidebar-link ${active ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span className="font-body font-semibold text-sm tracking-wide">{label}</span>
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7B2FFF]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-brand-border space-y-2">
          <Link href="/" className="sidebar-link text-sm">
            <Bell size={18} />
            <span className="font-body font-semibold text-sm tracking-wide">View Site</span>
          </Link>
          <button onClick={logout} className="sidebar-link w-full text-left hover:text-[#FF2D55]">
            <LogOut size={18} />
            <span className="font-body font-semibold text-sm tracking-wide">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
