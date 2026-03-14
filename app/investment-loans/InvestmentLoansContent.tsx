"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { TrendingUp, CheckCircle, ArrowRight, BarChart2, Shield, Zap } from "lucide-react";

const strategies = [
  {
    icon: <BarChart2 size={24} />,
    title: "Interest-Only Loans",
    description: "Maximise cash flow during the early phase of your investment by paying interest only. We'll help you assess whether this strategy suits your goals.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Portfolio Structuring",
    description: "We help you structure your loans across multiple properties to maximise borrowing capacity and manage risk effectively across your portfolio.",
  },
  {
    icon: <Shield size={24} />,
    title: "Equity Leverage",
    description: "Use the equity in existing properties to fund deposits on new acquisitions — growing your portfolio without additional out-of-pocket costs.",
  },
  {
    icon: <Zap size={24} />,
    title: "SMSF Lending",
    description: "Self-managed super fund property investments require specialist lenders. We connect you with SMSF-approved lenders who understand your strategy.",
  },
];

const benefits = [
  "Investor-focused loan products",
  "Interest-only options up to 5 years",
  "Access equity to fund further purchases",
  "Portfolio-wide loan structuring advice",
  "Tax-effective loan structuring",
  "Competitive investor rates from 25+ lenders",
  "SMSF lending expertise",
  "Ongoing portfolio reviews",
];

export default function InvestmentLoansContent() {
  return (
    <>
      <PageHero
        eyebrow="Investment Loans"
        title="Build Wealth Through Property"
        subtitle="We specialise in investment lending for Australian property investors — from your first investment purchase to sophisticated multi-property portfolio financing."
        breadcrumb={[{ label: "Investment Loans", href: "/investment-loans" }]}
      />

      {/* Intro + benefits */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                Investment Lending
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
                Smart Finance For Smart Investors
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="space-y-4 font-inter text-sm text-charcoal/60 leading-relaxed">
                <p>
                  Investment lending is more complex than owner-occupier lending — lenders assess risk differently, and the wrong loan structure can limit your ability to grow your portfolio.
                </p>
                <p>
                  At Baset Finance, we understand what investors need. We identify lenders with investor-friendly policies, help you structure loans for maximum borrowing capacity, and ensure your finance strategy aligns with your long-term wealth goals.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={15} className="text-gold flex-shrink-0" />
                    <span className="font-inter text-sm text-charcoal/70">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {strategies.map((strategy) => (
                <div
                  key={strategy.title}
                  className="group flex gap-5 bg-marble-100 border border-marble-300 p-6 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
                >
                  <div className="text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    {strategy.icon}
                  </div>

                  <div>
                    <h3 className="font-playfair text-base font-semibold text-charcoal mb-1">
                      {strategy.title}
                    </h3>
                    <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                      {strategy.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding marble-bg">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-charcoal p-12 relative text-center"
          >
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold/30" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-gold/30" />

            <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
              Ready to Grow Your Portfolio?
            </p>
            <h2 className="font-playfair text-3xl font-semibold text-white mb-4">
              Let's Build Your Investment Strategy
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-5" />
            <p className="font-inter text-sm text-white/50 max-w-xl mx-auto mb-8">
              Whether you're purchasing your first investment property or expanding an existing portfolio, our brokers have the expertise to find the right finance solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                Book a Strategy Session
                <ArrowRight size={16} />
              </Link>
              <Link href="/calculators/borrowing-capacity" className="btn-outline-gold border-white/30 text-white hover:bg-gold hover:border-gold">
                Check Borrowing Capacity
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
