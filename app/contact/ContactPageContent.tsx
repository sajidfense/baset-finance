"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const loanTypes = [
  "Home Loan",
  "Refinancing",
  "Investment Loan",
  "First Home Buyer",
  "Construction Loan",
  "Other",
];

export default function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Start Your Journey"
        subtitle="Book a free, no-obligation consultation with one of our expert mortgage brokers. We're here to help you find the right solution."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                  Contact Details
                </p>
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-charcoal mb-4">
                  We'd Love to Hear From You
                </h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-10">
                  Whether you have a simple question or are ready to start your mortgage journey, our team is here to help. Reach out via any of the channels below.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Phone size={18} />,
                      label: "Phone",
                      value: "+61 (0) 000 000 000",
                      href: "tel:+61000000000",
                    },
                    {
                      icon: <Mail size={18} />,
                      label: "Email",
                      value: "info@basetfinance.com.au",
                      href: "mailto:info@basetfinance.com.au",
                    },
                    {
                      icon: <MapPin size={18} />,
                      label: "Service Area",
                      value: "Australia Wide",
                      href: null,
                    },
                    {
                      icon: <Clock size={18} />,
                      label: "Hours",
                      value: "Mon–Sat 8am–7pm",
                      href: null,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="text-gold mt-0.5 flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="font-inter text-xs uppercase tracking-wider text-charcoal/40 mb-0.5">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-inter text-sm text-charcoal hover:text-gold transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="font-inter text-sm text-charcoal">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Book a Call block */}
                <div className="mt-10 p-6 bg-charcoal relative">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30" />
                  <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                    Quick Connect
                  </p>
                  <h3 className="font-playfair text-lg text-white font-semibold mb-3">
                    Book a Free Call
                  </h3>
                  <p className="font-inter text-xs text-white/50 leading-relaxed mb-4">
                    Schedule a 20-minute discovery call with a broker. No obligation, no pressure.
                  </p>
                  <a
                    href="tel:+61000000000"
                    className="btn-gold text-xs w-full justify-center"
                  >
                    <Phone size={14} />
                    Call Now
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={32} className="text-gold" />
                    </div>
                    <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-3">
                      Message Received
                    </h3>
                    <div className="w-10 h-px bg-gold mx-auto mb-4" />
                    <p className="font-inter text-sm text-charcoal/60 max-w-sm">
                      Thank you for reaching out. One of our brokers will be in touch within 24 hours to discuss your enquiry.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="input-luxury"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Email Address <span className="text-gold">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input-luxury"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-luxury"
                          placeholder="04XX XXX XXX"
                        />
                      </div>
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Loan Type <span className="text-gold">*</span>
                        </label>
                        <select
                          required
                          value={form.loanType}
                          onChange={(e) => setForm({ ...form, loanType: e.target.value })}
                          className="input-luxury bg-white"
                        >
                          <option value="">Select loan type</option>
                          {loanTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-luxury resize-none"
                        placeholder="Tell us about your situation and goals..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={16} />
                          Send Enquiry
                        </>
                      )}
                    </button>

                    <p className="font-inter text-xs text-charcoal/40 text-center">
                      By submitting, you agree to our Privacy Policy. We'll never share your details.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
