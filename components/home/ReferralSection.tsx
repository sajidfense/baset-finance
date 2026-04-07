"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  Users,
  Zap,
  Wallet,
  ArrowRight,
  Handshake,
} from "lucide-react";

const benefits = [
  {
    icon: <DollarSign size={22} />,
    title: "25% Upfront Commission",
    description:
      "Earn 25% of the upfront commission for every settled home loan referral. No cap on earnings.",
  },
  {
    icon: <Zap size={22} />,
    title: "Simple Process",
    description:
      "Just share a name and contact number. We handle everything from there — no paperwork for you.",
  },
  {
    icon: <Wallet size={22} />,
    title: "Fast Payouts",
    description:
      "Commissions paid within 30 days of loan settlement, direct to your nominated account.",
  },
  {
    icon: <Users size={22} />,
    title: "Open to Everyone",
    description:
      "Any Australian citizen can join. Perfect for accountants, agents, and trusted referrers.",
  },
];

export default function ReferralSection() {
  return (
    <section className="bg-charcoal section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/5 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full border border-gold/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Partner Program
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4">
            Earn With Every Referral
          </h2>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <p className="text-white/50 font-inter max-w-2xl mx-auto leading-relaxed">
            Join the Baset Finance partner program and earn generous commissions by
            referring people who need home loans. Simple, transparent, and rewarding —
            open to all Australian citizens.
          </p>
        </motion.div>

        {/* Featured Earnings Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 border border-white/10 p-8 md:p-10 relative">
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Handshake size={20} className="text-gold" />
                  <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold">
                    Example Earnings
                  </p>
                </div>
                <h3 className="font-playfair text-2xl text-white font-semibold mb-3">
                  Refer a $1M Home Loan
                </h3>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="font-inter text-sm text-white/50 leading-relaxed">
                  When the loan settles, the lender pays a typical upfront commission
                  of 0.65%. You receive 25% of that — straight to your account.
                </p>
              </div>

              <div className="space-y-3 md:border-l md:border-white/10 md:pl-8">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="font-inter text-sm text-white/50">Loan Amount</span>
                  <span className="font-playfair text-lg text-white font-semibold">
                    $1,000,000
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="font-inter text-sm text-white/50">
                    Upfront (0.65%)
                  </span>
                  <span className="font-inter text-sm text-white/60">$6,500</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-inter text-sm text-gold font-semibold">
                    You Earn (25%)
                  </span>
                  <span className="font-playfair text-3xl text-gold font-semibold">
                    $1,625
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-charcoal p-6 hover:bg-white/5 transition-colors duration-300"
            >
              <div className="text-gold mb-4">{benefit.icon}</div>
              <h3 className="font-playfair text-base font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <div className="w-6 h-px bg-gold mb-3" />
              <p className="font-inter text-xs text-white/50 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/referrer-program" className="btn-gold">
            Join the Partner Program
            <ArrowRight size={16} />
          </Link>
          <p className="font-inter text-xs text-white/30 mt-4">
            Free to join — no fees, no minimum referrals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
