"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { RefreshCw, TrendingDown, DollarSign, Shield, CheckCircle, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: <TrendingDown size={24} />,
    title: "Get a Lower Rate",
    description: "Even a 0.5% reduction in your interest rate can save tens of thousands over the life of your loan. We negotiate hard on your behalf.",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Reduce Monthly Repayments",
    description: "A lower rate or extended term can free up significant cash flow each month for other goals and investments.",
  },
  {
    icon: <Shield size={24} />,
    title: "Access Your Equity",
    description: "Use the equity built in your home to fund renovations, investment purchases, or pay off high-interest debts.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Better Loan Features",
    description: "Switch to a loan with offset accounts, redraw facilities, or split options that better suit your current lifestyle.",
  },
];

const signs = [
  "Your fixed rate period is ending soon",
  "Your lender hasn't passed on RBA rate cuts",
  "You've been with the same lender for 3+ years",
  "Your property has significantly increased in value",
  "You want to consolidate multiple debts",
  "Your financial situation has improved since you first borrowed",
  "You want to access equity for renovations or investment",
  "Your current loan lacks features like an offset account",
];

export default function RefinancingContent() {
  return (
    <>
      <PageHero
        eyebrow="Refinancing"
        title="Are You Getting the Best Deal?"
        subtitle="Thousands of people are paying more than they should on their home loan. Our free loan health check could save you significantly — with no disruption to your lifestyle."
        breadcrumb={[{ label: "Refinancing", href: "/refinancing" }]}
      />

      {/* Reasons to refinance */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
              Why Refinance?
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              The Benefits of Refinancing
            </h2>
            <div className="w-14 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-5 bg-marble-100 border border-marble-300 p-8 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
              >
                <div className="text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                    {reason.title}
                  </h3>
                  <div className="w-6 h-px bg-gold mb-3" />
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs you should refinance */}
      <section className="section-padding marble-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                Is It Time?
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
                Signs You Should Refinance
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-8">
                If any of the following apply to you, it may be time for a free loan health check with one of our brokers.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {signs.map((sign, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={15} className="text-gold flex-shrink-0" />
                    <span className="font-inter text-sm text-charcoal/70">{sign}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-charcoal p-10 relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />

                <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-4">
                  Free Service
                </p>
                <h3 className="font-playfair text-2xl text-white font-semibold mb-4">
                  Free Loan Health Check
                </h3>
                <div className="w-8 h-px bg-gold mb-5" />
                <p className="font-inter text-sm text-white/50 leading-relaxed mb-8">
                  We'll review your current loan against the market, calculate potential savings, and present you with your best options — completely free and without obligation.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Review your current rate vs market rates",
                    "Calculate potential savings",
                    "Identify best refinance options",
                    "Estimate break costs and net benefit",
                    "Manage the entire application",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                      <span className="font-inter text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="btn-gold w-full justify-center">
                  Get My Free Review
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
