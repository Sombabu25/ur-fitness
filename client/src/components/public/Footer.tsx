import Link from 'next/link';
import { Zap, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-card">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7B2FFF] to-[#FF2D55] flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">UR</span>
                <span className="gradient-text"> FITNESS</span>
              </span>
            </div>
            <p className="text-brand-sub text-sm leading-relaxed font-body">
              Transform your body, transform your life. Premium fitness club with state-of-the-art equipment and expert trainers.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-brand-muted flex items-center justify-center text-brand-sub hover:text-white hover:bg-[#7B2FFF] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-widest uppercase mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[['Home', '/'], ['Membership Plans', '/membership'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-brand-sub text-sm font-body hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-widest uppercase mb-4">Services</h4>
            <ul className="space-y-3 text-brand-sub text-sm font-body">
              {['Personal Training', 'Group Classes', 'HIIT Training', 'Nutrition Consulting', 'Cardio & Weights', 'Yoga & Zumba'].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-widest uppercase mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-sub text-sm font-body">
                <MapPin size={16} className="text-[#7B2FFF] mt-0.5 shrink-0" />
                1st Floor Pillar No 86, Sophria Plaza, Hyderabad, Telangana 500006
              </li>
              <li className="flex items-center gap-3 text-brand-sub text-sm font-body">
                <Phone size={16} className="text-[#7B2FFF] shrink-0" />
                +91 63038 89740
              </li>
              <li className="flex items-center gap-3 text-brand-sub text-sm font-body">
                <Mail size={16} className="text-[#7B2FFF] shrink-0" />
                hello@urfitness.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-sub text-sm font-body">© 2024 UR Fitness. All rights reserved.</p>
          <p className="text-brand-sub text-xs font-body">Powered by passion & iron 🔥</p>
        </div>
      </div>
    </footer>
  );
}
