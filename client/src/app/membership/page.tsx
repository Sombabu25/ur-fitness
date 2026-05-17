'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { plansAPI, membersAPI } from '@/lib/api';
import { Plan } from '@/types';

export default function MembershipPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    plansAPI.getAll()
      .then(res => setPlans(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,47,255,0.15)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 mb-6">
              <Zap size={14} className="text-[#7B2FFF]" />
              <span className="text-xs font-body font-semibold text-[#7B2FFF] tracking-widest uppercase">Membership Plans</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
              INVEST IN YOUR <span className="gradient-text">HEALTH</span>
            </h1>
            <p className="text-brand-sub font-body text-lg max-w-2xl mx-auto">
              Choose a plan that suits your lifestyle. All memberships include access to our premium facilities and expert staff.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-brand-muted rounded mb-4 w-1/2" />
                  <div className="h-10 bg-brand-muted rounded mb-6 w-3/4" />
                  <div className="space-y-3">{[1,2,3,4].map(j => <div key={j} className="h-4 bg-brand-muted rounded" />)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative glass-card rounded-2xl p-6 flex flex-col h-full ${plan.popular ? 'border-[#7B2FFF]/50 glow-purple' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#FF2D55] text-white text-xs font-body font-bold tracking-widest uppercase whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-xl text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="font-display text-4xl font-black gradient-text">₹{plan.price.toLocaleString()}</span>
                      <span className="text-brand-sub text-xs font-body">/{plan.duration}mo</span>
                    </div>
                    <p className="text-brand-sub text-sm font-body">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-brand-sub text-sm font-body">
                        <CheckCircle size={15} className="text-[#7B2FFF] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block text-center py-3.5 rounded-xl text-sm font-body font-semibold uppercase tracking-wide mt-auto ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Join Now — ₹{plan.price.toLocaleString()}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <MembershipChecker />
        </div>
      </section>
      <Footer />
    </div>
  );
}

function MembershipChecker() {
  const [mobile, setMobile] = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkMembership = async () => {
    if (!mobile || mobile.length < 10) { setError('Enter a valid 10-digit mobile number'); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await membersAPI.check(mobile);
      setResult(res.data.data);
    } catch {
      setError('No membership found for this mobile number');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 max-w-lg mx-auto"
    >
      <div className="glass-card rounded-2xl p-8 text-center">
        <h3 className="font-display text-xl font-bold text-white mb-2">Check Membership Status</h3>
        <p className="text-brand-sub text-sm font-body mb-6">Enter your mobile number to check your current membership validity</p>
        <div className="flex gap-3">
          <input
            type="tel"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            className="input-dark flex-1 px-4 py-3 rounded-xl font-body text-sm"
          />
          <button
            onClick={checkMembership}
            disabled={loading}
            className="btn-primary px-6 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide"
          >
            {loading ? '...' : 'Check'}
          </button>
        </div>
        {error && <p className="text-[#FF2D55] text-sm font-body mt-3">{error}</p>}
        {result && (
          <div className="mt-6 text-left space-y-3 border-t border-brand-border pt-6">
            {[
  ['Name', result.fullName as string],
  ['Plan', result.membershipPlan as string],
  ['Joined', new Date(result.joiningDate as string).toLocaleDateString('en-IN')],
  ['Expires', new Date(result.expiryDate as string).toLocaleDateString('en-IN')],
  ['Status', result.isExpired ? '❌ Expired' : `✅ Active (${result.daysRemaining} days left)`],
].map(([label, val]) => (
              <div key={label as string} className="flex justify-between">
                <span className="text-brand-sub text-sm font-body">{label as string}</span>
                <span className="text-white text-sm font-body font-semibold">{val as string}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}