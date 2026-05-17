'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Membership', href: '/membership' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7B2FFF] to-[#FF2D55] flex items-center justify-center glow-purple">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-wider">
              <span className="text-white">UR</span>
              <span className="gradient-text"> FITNESS</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-sub hover:text-white font-body font-semibold tracking-wide text-sm uppercase transition-colors duration-200 hover:text-glow-purple"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-primary px-5 py-2.5 rounded-lg text-sm font-body font-semibold tracking-wide uppercase">
              Join Now
            </Link>
            <Link href="/admin/login" className="btn-secondary px-5 py-2.5 rounded-lg text-sm font-body font-semibold tracking-wide uppercase">
              Admin
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-white">
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:gradient-text transition-all"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary px-8 py-3 rounded-xl text-lg font-body font-semibold">
              Join Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
