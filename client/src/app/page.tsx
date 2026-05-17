'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Users, Trophy, Zap, Dumbbell, Heart, Target, CheckCircle, ChevronRight, Flame } from 'lucide-react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { plansAPI } from '@/lib/api';
import { Plan } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const trainers = [
  { name: 'Arjun Mehta', role: 'Head Strength Coach', exp: '8 Years', spec: 'Powerlifting & Bodybuilding' },
  { name: 'Priya Sharma', role: 'Cardio & Zumba Expert', exp: '6 Years', spec: 'Dance Fitness & HIIT' },
  { name: 'Rahul Verma', role: 'Nutrition Consultant', exp: '5 Years', spec: 'Sports Nutrition & Meal Planning' },
  { name: 'Kavya Reddy', role: 'Yoga & Wellness', exp: '7 Years', spec: 'Yoga, Pilates & Flexibility' },
];

const testimonials = [
  { name: 'Vikram S.', plan: '12 Month Member', text: 'UR Fitness completely changed my life. Lost 18kg in 6 months with expert guidance and the best equipment in the city.', rating: 5 },
  { name: 'Sneha R.', plan: '6 Month Member', text: 'The trainers here are phenomenal. Customized diet plans + workout routines = incredible results. Highly recommend!', rating: 5 },
  { name: 'Aditya K.', plan: '3 Month Member', text: 'Premium facilities, hygienic environment, and trainers who actually care about your progress. Worth every rupee!', rating: 5 },
];


const gymImages = [
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    label: 'Weight Training',
  },
  {
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    label: 'Cardio Zone',
  },
  {
    url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    label: 'Personal Training',
  },
  {
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    label: 'HIIT Classes',
  },
  {
    url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    label: 'Strength Zone',
  },
  {
    url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
    label: 'CrossFit',
  },
];


const stats = [
  { value: '2,500+', label: 'Happy Members', icon: Users },
  { value: '15+', label: 'Expert Trainers', icon: Trophy },
  { value: '5★', label: 'Average Rating', icon: Star },
  { value: '8 Yrs', label: 'Of Excellence', icon: Flame },
];

export default function HomePage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const heroRef = useRef(null);

  useEffect(() => {
    plansAPI.getAll().then(res => setPlans(res.data.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0D0A1A] to-[#0A0A0F]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7B2FFF]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#FF2D55]/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(123,47,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 mb-8">
              <Zap size={14} className="text-[#7B2FFF]" />
              <span className="text-xs font-body font-semibold text-[#7B2FFF] tracking-widest uppercase">Hyderabad's #1 Fitness Club</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
              <span className="text-white">FORGE YOUR</span>
              <br />
              <span className="gradient-text">LEGACY</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-brand-sub text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed mb-10">
              State-of-the-art equipment, elite trainers, and a community built on results. Your transformation starts the moment you walk through our doors.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/membership" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-base font-body font-semibold uppercase tracking-wide">
                View Plans <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary flex items-center gap-2 px-8 py-4 rounded-xl text-base font-body font-semibold uppercase tracking-wide">
                Free Trial Day <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-14">
              {['HIIT Classes', 'Personal Training', 'Nutrition Plans', 'Zumba', 'Crossfit'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-sub text-xs font-body font-semibold tracking-wide">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-5 h-8 rounded-full border-2 border-[#7B2FFF]/50 flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-[#7B2FFF] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 border-y border-brand-border bg-brand-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B2FFF]/20 to-[#FF2D55]/20 border border-[#7B2FFF]/20 flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-[#7B2FFF]" />
                </div>
                <div className="font-display text-3xl font-black gradient-text mb-1">{value}</div>
                <div className="text-brand-sub text-sm font-body font-semibold tracking-wide">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ GYM GALLERY ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.06)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 mb-6">
              <span className="text-xs font-body font-semibold text-[#7B2FFF] tracking-widest uppercase">Our Facility</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              TRAIN IN <span className="gradient-text">STYLE</span>
            </h2>
            <p className="text-brand-sub font-body max-w-xl mx-auto">
              State-of-the-art equipment, premium amenities, and an atmosphere built for champions.
            </p>
          </motion.div>

          {/* Main large + side grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Large featured image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative group overflow-hidden rounded-2xl h-72 lg:h-96"
            >
              <img
                src={gymImages[0].url}
                alt={gymImages[0].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="badge badge-active text-xs">{gymImages[0].label}</span>
              </div>
              {/* Purple glow overlay on hover */}
              <div className="absolute inset-0 bg-[#7B2FFF]/0 group-hover:bg-[#7B2FFF]/10 transition-all duration-500" />
            </motion.div>

            {/* Right side 2 stacked */}
            <div className="flex flex-col gap-4">
              {gymImages.slice(1, 3).map((img, i) => (
                <motion.div
                  key={img.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative group overflow-hidden rounded-2xl flex-1 h-44"
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="badge badge-active text-xs">{img.label}</span>
                  </div>
                  <div className="absolute inset-0 bg-[#7B2FFF]/0 group-hover:bg-[#7B2FFF]/10 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row 3 equal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gymImages.slice(3).map((img, i) => (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative group overflow-hidden rounded-2xl h-56"
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="badge badge-active text-xs">{img.label}</span>
                </div>
                <div className="absolute inset-0 bg-[#7B2FFF]/0 group-hover:bg-[#7B2FFF]/10 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MEMBERSHIP PLANS ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.06)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF2D55]/10 border border-[#FF2D55]/30 mb-6">
              <span className="text-xs font-body font-semibold text-[#FF2D55] tracking-widest uppercase">Membership Plans</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              CHOOSE YOUR <span className="gradient-text">PLAN</span>
            </h2>
            <p className="text-brand-sub font-body max-w-xl mx-auto">Flexible memberships designed to fit your goals and budget. No hidden fees, just pure results.</p>
          </motion.div>

          {/* ✅ FIXED: items-stretch on grid, flex flex-col h-full on card, flex-1 on ul, mt-auto on button */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {(plans.length > 0 ? plans : [
              { _id: '1', name: '1 Month', duration: 1, price: 1500, features: ['All Equipment', 'Locker Room', 'Basic Classes'], popular: false },
              { _id: '2', name: '3 Months', duration: 3, price: 3999, features: ['All Equipment', 'All Classes', 'Personal Trainer (2)', 'Diet Plan'], popular: true },
              { _id: '3', name: '6 Months', duration: 6, price: 6999, features: ['All Equipment', 'All Classes', 'Personal Trainer (6)', 'Diet Plan'], popular: false },
              { _id: '4', name: '12 Months', duration: 12, price: 11999, features: ['All Equipment', 'All Classes', 'Personal Trainer (12)', 'Custom Diet', 'Guest Passes'], popular: false },
            ] as Plan[]).map((plan, i) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative glass-card rounded-2xl p-6 flex flex-col h-full ${plan.popular ? 'border-[#7B2FFF]/50 glow-purple' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#FF2D55] text-white text-xs font-body font-bold tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-black gradient-text">₹{plan.price.toLocaleString()}</span>
                    <span className="text-brand-sub text-sm font-body">/{plan.duration} mo</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-brand-sub text-sm font-body">
                      <CheckCircle size={14} className="text-[#7B2FFF] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-3 rounded-xl text-sm font-body font-semibold uppercase tracking-wide mt-auto ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRAINERS ═══ */}
      <section className="py-24 bg-brand-card border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 mb-6">
              <span className="text-xs font-body font-semibold text-[#7B2FFF] tracking-widest uppercase">Our Trainers</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              ELITE <span className="gradient-text">COACHES</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group hover:border-[#7B2FFF]/40 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B2FFF] to-[#FF2D55] mx-auto mb-4 flex items-center justify-center">
                  <span className="font-display text-2xl font-black text-white">{t.name[0]}</span>
                </div>
                <h3 className="font-display font-bold text-white mb-1">{t.name}</h3>
                <p className="text-[#7B2FFF] text-xs font-body font-semibold tracking-wide uppercase mb-2">{t.role}</p>
                <p className="text-brand-sub text-xs font-body">{t.spec}</p>
                <div className="mt-3 px-3 py-1 rounded-full bg-brand-muted inline-block">
                  <span className="text-brand-sub text-xs font-body">{t.exp} Experience</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,45,85,0.06)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              SUCCESS <span className="gradient-text">STORIES</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-brand-sub font-body leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-display font-bold text-white text-sm">{t.name}</div>
                  <div className="text-[#7B2FFF] text-xs font-body font-semibold tracking-wide">{t.plan}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FFF]/20 to-[#FF2D55]/20" />
        <div className="absolute inset-0 border-y border-[#7B2FFF]/20" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Dumbbell size={48} className="text-[#7B2FFF] mx-auto mb-6" />
            <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
              READY TO <span className="gradient-text">START?</span>
            </h2>
            <p className="text-brand-sub font-body text-lg mb-10">Join thousands of members already transforming their lives at UR Fitness.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary flex items-center gap-2 px-10 py-4 rounded-xl text-base font-body font-semibold uppercase tracking-wide justify-center">
                Start Today <ArrowRight size={18} />
              </Link>
              <Link href="/membership" className="btn-secondary flex items-center gap-2 px-10 py-4 rounded-xl text-base font-body font-semibold uppercase tracking-wide justify-center">
                View Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}