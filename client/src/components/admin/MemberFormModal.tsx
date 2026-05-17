'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { membersAPI, plansAPI } from '@/lib/api';
import { Member, Plan, MemberFormData } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editMember?: Member | null;
}

const defaultForm: MemberFormData = {
  fullName: '', mobileNumber: '', email: '', gender: 'Male',
  age: '', joiningDate: new Date().toISOString().split('T')[0],
  membershipPlan: '1 Month', duration: '1', price: '', paymentStatus: 'Paid', notes: '',
};

export default function MemberFormModal({ isOpen, onClose, onSuccess, editMember }: Props) {
  const [form, setForm] = useState<MemberFormData>(defaultForm);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    plansAPI.getAll().then(res => setPlans(res.data.data));
  }, []);

  useEffect(() => {
    if (editMember) {
      setForm({
        fullName: editMember.fullName,
        mobileNumber: editMember.mobileNumber,
        email: editMember.email || '',
        gender: editMember.gender,
        age: String(editMember.age),
        joiningDate: editMember.joiningDate.split('T')[0],
        membershipPlan: editMember.membershipPlan,
        duration: String(editMember.duration),
        price: String(editMember.price),
        paymentStatus: editMember.paymentStatus,
        notes: editMember.notes || '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [editMember, isOpen]);

  const handlePlanChange = (planName: string) => {
    const plan = plans.find(p => p.name === planName);
    if (plan) {
      setForm(f => ({ ...f, membershipPlan: planName, duration: String(plan.duration), price: String(plan.price) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.mobileNumber || !form.age) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, age: Number(form.age), duration: Number(form.duration), price: Number(form.price) };
      if (editMember) {
        await membersAPI.update(editMember._id, payload);
        toast.success('Member updated successfully');
      } else {
        await membersAPI.create(payload);
        toast.success('Member registered successfully');
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-brand-card border border-brand-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <div>
                <h2 className="font-display text-xl font-bold text-white">{editMember ? 'Edit Member' : 'Register Member'}</h2>
                <p className="text-brand-sub text-xs font-body mt-0.5">{editMember ? 'Update member information' : 'Add a new gym member'}</p>
              </div>
              <button onClick={onClose} className="text-brand-sub hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="form-label">Full Name *</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-sub" />
                    <input value={form.fullName} onChange={e => setForm(f => ({...f, fullName: e.target.value}))}
                      placeholder="Enter full name" className="input-dark w-full pl-10 pr-4 py-3 rounded-xl font-body text-sm" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Mobile Number *</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-sub" />
                    <input value={form.mobileNumber} onChange={e => setForm(f => ({...f, mobileNumber: e.target.value}))}
                      placeholder="10-digit mobile" className="input-dark w-full pl-10 pr-4 py-3 rounded-xl font-body text-sm" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-sub" />
                    <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                      placeholder="Email (optional)" className="input-dark w-full pl-10 pr-4 py-3 rounded-xl font-body text-sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Gender *</label>
                  <select value={form.gender} onChange={e => setForm(f => ({...f, gender: e.target.value}))}
                    className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Age *</label>
                  <input type="number" value={form.age} onChange={e => setForm(f => ({...f, age: e.target.value}))}
                    placeholder="Age" min="10" max="100" className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm" />
                </div>
                <div>
                  <label className="form-label">Joining Date</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-sub" />
                    <input type="date" value={form.joiningDate} onChange={e => setForm(f => ({...f, joiningDate: e.target.value}))}
                      className="input-dark w-full pl-10 pr-3 py-3 rounded-xl font-body text-sm" />
                  </div>
                </div>
              </div>

              {/* Membership */}
              <div className="border-t border-brand-border pt-5">
                <h3 className="font-display text-sm font-bold text-white tracking-wide mb-4">Membership Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Plan *</label>
                    <select value={form.membershipPlan} onChange={e => handlePlanChange(e.target.value)}
                      className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm">
                      {plans.map(p => <option key={p._id} value={p.name}>{p.name} — ₹{p.price}</option>)}
                      {plans.length === 0 && ['1 Month','3 Months','6 Months','12 Months'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Price (₹) *</label>
                    <input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))}
                      placeholder="Amount paid" className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm" />
                  </div>
                  <div>
                    <label className="form-label">Payment Status</label>
                    <select value={form.paymentStatus} onChange={e => setForm(f => ({...f, paymentStatus: e.target.value}))}
                      className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm">
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Duration (months)</label>
                    <input type="number" value={form.duration} readOnly
                      className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm opacity-60 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))}
                  placeholder="Any notes about this member..." rows={2}
                  className="input-dark w-full px-3 py-3 rounded-xl font-body text-sm resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn-secondary flex-1 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">
                  {loading ? 'Saving...' : editMember ? 'Update Member' : 'Register Member'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
