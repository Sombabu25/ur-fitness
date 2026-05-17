'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
} from 'lucide-react';

import toast from 'react-hot-toast';

import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      toast.error('Name and phone are required');
      return;
    }

    setLoading(true);

    const whatsappNumber = '918210787484';

    const text = `
🏋️ New Gym Inquiry

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email || 'Not provided'}

📝 Message:
${form.message || 'No message'}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, '_blank');

    toast.success('Redirecting to WhatsApp...');

    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <section className="pt-32 pb-24 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,47,255,0.1)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
              GET IN <span className="gradient-text">TOUCH</span>
            </h1>

            <p className="text-brand-sub font-body text-lg max-w-xl mx-auto">
              Ready to start your fitness journey? Contact us for membership
              inquiries, free trials, or any questions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: MapPin,
                  label: 'Address',
                  value:
                    '1st Floor Pillar No 86, Sophria Plaza, Hyderabad, Telangana 500006',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+91 63038 89740 | +91 83413 87090',
                },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: '+91 63038 89740',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@urfitness.com',
                },
                {
                  icon: Clock,
                  label: 'Hours',
                  value:
                    'Mon–Sat: 5:00 AM – 11:30 PM | Sun: 6:00 AM – 10:00 PM',
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-card rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B2FFF]/20 to-[#FF2D55]/20 border border-[#7B2FFF]/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#7B2FFF]" />
                  </div>

                  <div>
                    <div className="font-display text-xs font-bold text-[#7B2FFF] tracking-widest uppercase mb-1">
                      {label}
                    </div>

                    <div className="text-brand-text text-sm font-body">
                      {label === 'WhatsApp' ? (
                        <a
                          href="https://wa.me/916303889740"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#25D366] transition-colors"
                        >
                          Chat on WhatsApp →
                        </a>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* MAP CARD */}
              <div className="glass-card rounded-2xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin
                    size={32}
                    className="text-[#7B2FFF] mx-auto mb-2"
                  />

                  <p className="text-brand-sub text-sm font-body">
                    Pillar No. 85-86, Ring Road Attapur
                  </p>

                  <a
                    href="https://maps.google.com/?q=Sophria+Plaza+Pillar+86+Attapur+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#7B2FFF] text-sm font-body font-semibold mt-1 block hover:underline"
                  >
                    Open in Maps →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-brand-sub text-xs font-body font-semibold tracking-widest uppercase block mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Your full name"
                      className="input-dark w-full px-4 py-3 rounded-xl font-body text-sm"
                    />
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-brand-sub text-xs font-body font-semibold tracking-widest uppercase block mb-2">
                        Phone *
                      </label>

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="Mobile number"
                        className="input-dark w-full px-4 py-3 rounded-xl font-body text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-brand-sub text-xs font-body font-semibold tracking-widest uppercase block mb-2">
                        Email
                      </label>

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Email address"
                        className="input-dark w-full px-4 py-3 rounded-xl font-body text-sm"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-brand-sub text-xs font-body font-semibold tracking-widest uppercase block mb-2">
                      Message
                    </label>

                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell us about your fitness goals..."
                      rows={4}
                      className="input-dark w-full px-4 py-3 rounded-xl font-body text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold uppercase tracking-wide"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Redirecting...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}