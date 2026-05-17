'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle, IndianRupee, UserCheck, UserX, CalendarClock, Zap } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { membersAPI } from '@/lib/api';
import { Analytics, Member } from '@/types';
import Link from 'next/link';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [expiringMembers, setExpiringMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [analyticsRes, membersRes] = await Promise.all([
          membersAPI.analytics(),
          membersAPI.getAll({ limit: '100' }),
        ]);
        setAnalytics(analyticsRes.data.data);
        const allMembers: Member[] = membersRes.data.data;
        const now = new Date();
        const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        setExpiringMembers(allMembers.filter(m => {
          const exp = new Date(m.expiryDate);
          return exp >= now && exp <= in7Days;
        }).slice(0, 5));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = analytics ? [
    { label: 'Total Members', value: analytics.totalMembers, icon: Users, color: '#7B2FFF', bg: 'from-[#7B2FFF]/20 to-[#7B2FFF]/5' },
    { label: 'Active Members', value: analytics.activeMembers, icon: UserCheck, color: '#00C878', bg: 'from-[#00C878]/20 to-[#00C878]/5' },
    { label: 'Expired', value: analytics.expiredMembers, icon: UserX, color: '#FF2D55', bg: 'from-[#FF2D55]/20 to-[#FF2D55]/5' },
    { label: 'New This Month', value: analytics.newThisMonth, icon: TrendingUp, color: '#7B2FFF', bg: 'from-[#7B2FFF]/20 to-[#FF2D55]/10' },
    { label: 'Expiring in 7 Days', value: analytics.expiringIn7Days, icon: AlertTriangle, color: '#FFAA00', bg: 'from-[#FFAA00]/20 to-[#FFAA00]/5' },
    { label: 'Monthly Revenue', value: `₹${analytics.monthlyRevenue.toLocaleString()}`, icon: IndianRupee, color: '#00C878', bg: 'from-[#00C878]/20 to-[#00C878]/5' },
    { label: 'Total Revenue', value: `₹${analytics.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: '#7B2FFF', bg: 'from-[#7B2FFF]/20 to-[#FF2D55]/10' },
    { label: 'Plan Types', value: analytics.planDistribution.length, icon: Zap, color: '#FF2D55', bg: 'from-[#FF2D55]/20 to-[#FF2D55]/5' },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-brand-sub text-sm font-body mt-1">Welcome back. Here's your gym at a glance.</p>
        </div>

        {/* Stat Cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="stat-card animate-pulse">
                <div className="h-4 bg-brand-muted rounded w-3/4 mb-3" />
                <div className="h-8 bg-brand-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="stat-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-brand-sub text-xs font-body font-semibold tracking-wide uppercase">{label}</p>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${bg} flex items-center justify-center`}>
                    <Icon size={16} style={{ color }} />
                  </div>
                </div>
                <p className="font-display text-2xl font-bold text-white">{value}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Plan Distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-base font-bold text-white mb-5">Plan Distribution</h2>
            {analytics ? (
              <div className="space-y-3">
                {analytics.planDistribution.map((p) => {
                  const pct = analytics.totalMembers > 0 ? Math.round((p.count / analytics.totalMembers) * 100) : 0;
                  return (
                    <div key={p._id}>
                      <div className="flex justify-between text-sm font-body mb-1.5">
                        <span className="text-brand-text">{p._id}</span>
                        <span className="text-brand-sub">{p.count} members ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-brand-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#FF2D55]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-8 bg-brand-muted rounded animate-pulse" />)}</div>}
          </motion.div>

          {/* Expiring Soon */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-base font-bold text-white">Expiring in 7 Days</h2>
              <Link href="/admin/members" className="text-[#7B2FFF] text-xs font-body font-semibold hover:underline">View All</Link>
            </div>
            {expiringMembers.length === 0 ? (
              <div className="text-center py-8">
                <CalendarClock size={32} className="text-brand-sub mx-auto mb-3" />
                <p className="text-brand-sub text-sm font-body">No memberships expiring soon</p>
              </div>
            ) : (
              <div className="space-y-3">
                {expiringMembers.map(member => (
                  <div key={member._id} className="flex items-center justify-between py-2 border-b border-brand-border last:border-0">
                    <div>
                      <p className="text-white text-sm font-body font-semibold">{member.fullName}</p>
                      <p className="text-brand-sub text-xs font-body">{member.mobileNumber} · {member.membershipPlan}</p>
                    </div>
                    <span className="badge badge-expiring">
                      {member.daysRemaining}d left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
