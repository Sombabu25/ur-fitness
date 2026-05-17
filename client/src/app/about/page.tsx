'use client';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, Shield } from 'lucide-react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

const values = [
  { icon: Target, title: 'Results-Driven', desc: 'Every program is designed around measurable outcomes. We track your progress and adjust to ensure you hit your goals.' },
  { icon: Heart, title: 'Community First', desc: 'Our gym is more than a fitness center — it\'s a family. Supportive, inclusive, and motivating for everyone.' },
  { icon: Zap, title: 'Elite Standards', desc: 'We hold ourselves to the highest standards in equipment maintenance, cleanliness, and trainer certification.' },
  { icon: Shield, title: 'Safe Environment', desc: 'Your safety is our priority. Certified trainers, spotting assistance, and hygienic facilities guaranteed.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,45,85,0.1)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
              ABOUT <span className="gradient-text">UR FITNESS</span>
            </h1>
            <p className="text-brand-sub font-body text-lg max-w-3xl mx-auto leading-relaxed">
              Founded with a singular mission: to make premium fitness accessible to everyone in Hyderabad. We combine cutting-edge equipment, scientific training methods, and a passionate community to deliver transformational results.
            </p>
          </motion.div>

          {/* Story section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFF]/10 border border-[#7B2FFF]/30 mb-6">
                <span className="text-xs font-body font-semibold text-[#7B2FFF] tracking-widest uppercase">Our Story</span>
              </div>
              <h2 className="font-display text-4xl font-black text-white mb-6">8 Years of <span className="gradient-text">Excellence</span></h2>
              <p className="text-brand-sub font-body leading-relaxed mb-4">
                UR Fitness started as a small community gym in Attapur, Hyderabad, with a dream to bring world-class fitness to our neighborhood. Over 8 years, we've grown into one of the city's most trusted fitness destinations.
              </p>
              <p className="text-brand-sub font-body leading-relaxed">
                With over 2,500 active members, 15+ certified trainers, and a 4.9★ rating, we continue to evolve — adding new equipment, classes, and services to meet our community's needs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {[['2,500+', 'Active Members'], ['15+', 'Expert Trainers'], ['8 Years', 'In Business'], ['4.9★', 'Google Rating']].map(([val, label]) => (
                  <div key={label} className="text-center p-4 rounded-xl bg-brand-muted/50">
                    <div className="font-display text-2xl font-black gradient-text mb-1">{val}</div>
                    <div className="text-brand-sub text-xs font-body font-semibold tracking-wide">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-4xl font-black text-white mb-4">OUR <span className="gradient-text">VALUES</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7B2FFF]/20 to-[#FF2D55]/20 border border-[#7B2FFF]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#7B2FFF]" />
                </div>
                <h3 className="font-display font-bold text-white mb-3">{title}</h3>
                <p className="text-brand-sub text-sm font-body leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
