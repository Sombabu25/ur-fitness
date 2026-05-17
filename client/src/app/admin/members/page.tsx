'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, Users, Filter, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import MemberFormModal from '@/components/admin/MemberFormModal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { membersAPI } from '@/lib/api';
import { Member } from '@/types';
import { format } from 'date-fns';

function getMemberStatusBadge(member: Member) {
  const now = new Date();
  const exp = new Date(member.expiryDate);
  const daysLeft = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return <span className="badge badge-expired">Expired</span>;
  if (daysLeft <= 7) return <span className="badge badge-expiring">{daysLeft}d left</span>;
  return <span className="badge badge-active">Active</span>;
}

function getPaymentBadge(status: string) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (planFilter) params.plan = planFilter;
      const res = await membersAPI.getAll(params);
      setMembers(res.data.data);
      setTotal(res.data.total);
    } finally {
      setLoading(false);
    }
  }, [search, planFilter]);

  useEffect(() => {
    const t = setTimeout(fetchMembers, 350);
    return () => clearTimeout(t);
  }, [fetchMembers]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await membersAPI.delete(deleteId);
      toast.success('Member deleted');
      setDeleteId(null);
      fetchMembers();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  const openAdd = () => { setEditMember(null); setModalOpen(true); };
  const openEdit = (m: Member) => { setEditMember(m); setModalOpen(true); };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Members</h1>
            <p className="text-brand-sub text-sm font-body mt-1">{total} total members</p>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">
            <Plus size={16} /> Add Member
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-sub" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, mobile, email..."
              className="input-dark w-full pl-10 pr-4 py-2.5 rounded-xl font-body text-sm"
            />
          </div>
          <div className="relative">
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-sub" />
            <select
              value={planFilter}
              onChange={e => setPlanFilter(e.target.value)}
              className="input-dark pl-9 pr-8 py-2.5 rounded-xl font-body text-sm appearance-none cursor-pointer"
            >
              <option value="">All Plans</option>
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-sub pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase">Member</th>
                  <th className="text-left px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase hidden md:table-cell">Contact</th>
                  <th className="text-left px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase hidden lg:table-cell">Plan</th>
                  <th className="text-left px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase hidden lg:table-cell">Expiry</th>
                  <th className="text-left px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase">Status</th>
                  <th className="text-left px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase hidden sm:table-cell">Payment</th>
                  <th className="text-right px-5 py-4 text-brand-sub text-xs font-body font-semibold tracking-widest uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(8).fill(0).map((_, i) => (
                    <tr key={i} className="border-b border-brand-border">
                      {[1,2,3,4,5,6,7].map(j => <td key={j} className="px-5 py-4"><div className="h-4 bg-brand-muted rounded animate-pulse" /></td>)}
                    </tr>
                  ))
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <Users size={40} className="text-brand-sub mx-auto mb-3" />
                      <p className="text-brand-sub font-body font-semibold">No members found</p>
                      <p className="text-brand-sub/60 text-sm font-body mt-1">Try adjusting your search or add a new member</p>
                    </td>
                  </tr>
                ) : (
                  members.map((member, i) => (
                    <motion.tr
                      key={member._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="table-row"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B2FFF]/30 to-[#FF2D55]/30 border border-[#7B2FFF]/20 flex items-center justify-center shrink-0">
                            <span className="font-display text-xs font-bold text-white">{member.fullName[0]}</span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-body font-semibold">{member.fullName}</p>
                            <p className="text-brand-sub text-xs font-body">{member.gender} · {member.age}yrs</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-brand-text text-sm font-body">{member.mobileNumber}</p>
                        {member.email && <p className="text-brand-sub text-xs font-body">{member.email}</p>}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <p className="text-white text-sm font-body">{member.membershipPlan}</p>
                        <p className="text-brand-sub text-xs font-body">₹{member.price.toLocaleString()}</p>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <p className="text-brand-text text-sm font-body">
                          {format(new Date(member.expiryDate), 'dd MMM yyyy')}
                        </p>
                        <p className="text-brand-sub text-xs font-body">
                          Joined {format(new Date(member.joiningDate), 'dd MMM yyyy')}
                        </p>
                      </td>
                      <td className="px-5 py-4">{getMemberStatusBadge(member)}</td>
                      <td className="px-5 py-4 hidden sm:table-cell">{getPaymentBadge(member.paymentStatus)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(member)}
                            className="w-8 h-8 rounded-lg bg-brand-muted hover:bg-[#7B2FFF]/20 hover:text-[#7B2FFF] text-brand-sub flex items-center justify-center transition-all">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setDeleteId(member._id)}
                            className="w-8 h-8 rounded-lg bg-brand-muted hover:bg-[#FF2D55]/20 hover:text-[#FF2D55] text-brand-sub flex items-center justify-center transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MemberFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchMembers}
        editMember={editMember}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Member"
        message="Are you sure you want to delete this member? All their data will be permanently removed."
      />
    </AdminLayout>
  );
}
