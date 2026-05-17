'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, CheckCircle, Star, X, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { plansAPI } from '@/lib/api';
import { Plan } from '@/types';

interface PlanForm {
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string;
  popular: boolean;
}

const defaultForm: PlanForm = {
  name: '', duration: '', price: '', description: '', features: '', popular: false,
};

function PlanFormModal({ isOpen, onClose, onSuccess, editPlan }: {
  isOpen: boolean; onClose: () => void; onSuccess: () => void; editPlan?: Plan | null;
}) {
  const [form, setForm] = useState<PlanForm>(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPlan) {
      setForm({
        name: editPlan.name,
        duration: String(editPlan.duration),
        price: String(editPlan.price),
        description: editPlan.description,
        features: editPlan.features.join('\n'),
        popular: editPlan.popular,
      });
    } else {
      setForm(defaultForm);
    }
  }, [editPlan, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.duration || !form.price) {
      toast.error('Name, duration, and price are required');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        duration: Number(form.duration),
        price: Number(form.price),
        description: form.description,
        features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
        popular: form.popular,
      };
      if (editPlan) {
        await plansAPI.update(editPlan._id, payload);
        toast.success('Plan updated');
      } else {
        await plansAPI.create(payload);
        toast.success('Plan created');
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-brand-card border border-brand-border rounded-2xl w-full max-w-lg z-10 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <h2 className="font-display text-xl font-bold text-white">{editPlan ? 'Edit Plan' : 'Create Plan'}</h2>
              <button onClick={onClose} className="text-brand-sub hover:text-white"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Plan Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    placeholder="e.g. 3 Months" className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm" />
                </div>
                <div>
                  <label className="form-label">Duration (months) *</label>
                  <input type="number" value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))}
                    placeholder="e.g. 3" min="1" className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm" />
                </div>
              </div>
              <div>
                <label className="form-label">Price (₹) *</label>
                <input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))}
                  placeholder="e.g. 3999" min="0" className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm" />
              </div>
              <div>
                <label className="form-label">Description</label>
                <input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
                  placeholder="Brief plan description..." className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm" />
              </div>
              <div>
                <label className="form-label">Features (one per line)</label>
                <textarea value={form.features} onChange={e => setForm(f => ({...f, features: e.target.value}))}
                  placeholder={"All Equipment Access\nLocker Room\nPersonal Trainer"} rows={5}
                  className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm(f => ({...f, popular: !f.popular}))}
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${form.popular ? 'bg-[#7B2FFF] border-[#7B2FFF]' : 'border-brand-border'}`}>
                  {form.popular && <CheckCircle size={12} className="text-white" />}
                </button>
                <label className="text-brand-text text-sm font-body font-semibold cursor-pointer" onClick={() => setForm(f => ({...f, popular: !f.popular}))}>
                  Mark as Most Popular
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn-secondary flex-1 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">
                  {loading ? 'Saving...' : editPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await plansAPI.getAll();
      setPlans(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await plansAPI.delete(deleteId);
      toast.success('Plan removed');
      setDeleteId(null);
      fetchPlans();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Membership Plans</h1>
            <p className="text-brand-sub text-sm font-body mt-1">Manage pricing and plan features</p>
          </div>
          <button onClick={() => { setEditPlan(null); setModalOpen(true); }}
            className="btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">
            <Plus size={16} /> New Plan
          </button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-brand-muted rounded mb-3 w-1/2" />
                <div className="h-10 bg-brand-muted rounded mb-4 w-3/4" />
                <div className="space-y-2">{[1,2,3].map(j => <div key={j} className="h-3 bg-brand-muted rounded" />)}</div>
              </div>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center">
            <CreditCard size={48} className="text-brand-sub mx-auto mb-4" />
            <p className="text-brand-sub font-body font-semibold text-lg">No plans yet</p>
            <p className="text-brand-sub/60 text-sm font-body mt-1">Create your first membership plan</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative glass-card rounded-2xl p-6 flex flex-col ${plan.popular ? 'border-[#7B2FFF]/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#FF2D55] text-white text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                    <Star size={9} fill="white" /> Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-black gradient-text">₹{plan.price.toLocaleString()}</span>
                    <span className="text-brand-sub text-xs font-body">/{plan.duration}mo</span>
                  </div>
                  {plan.description && <p className="text-brand-sub text-xs font-body mt-2 leading-relaxed">{plan.description}</p>}
                </div>
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-brand-sub text-xs font-body">
                      <CheckCircle size={12} className="text-[#7B2FFF] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button onClick={() => { setEditPlan(plan); setModalOpen(true); }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-secondary text-xs font-body font-semibold uppercase tracking-wide">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(plan._id)}
                    className="w-10 flex items-center justify-center rounded-xl bg-brand-muted hover:bg-[#FF2D55]/20 hover:text-[#FF2D55] text-brand-sub transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <PlanFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchPlans} editPlan={editPlan} />
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleteLoading}
        title="Remove Plan" message="Are you sure you want to remove this plan? Existing members with this plan won't be affected." />
    </AdminLayout>
  );
}
