"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { CheckCircle, ArrowRight, DollarSign, FileText, Home, Award } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <DollarSign size={20} />,
    title: "Understand Your Borrowing Power",
    description: "We start by assessing your income, expenses, and financial situation to determine how much you can borrow.",
    action: "Use our Borrowing Calculator",
    href: "/calculators",
  },
  {
    step: "02",
    icon: <FileText size={20} />,
    title: "Get Pre-Approved",
    description: "A pre-approval gives you confidence to search for your home, knowing exactly what budget you're working with.",
    action: "Book Free Consultation",
    href: "/contact",
  },
  {
    step: "03",
    icon: <Home size={20} />,
    title: "Find Your Property",
    description: "With pre-approval in hand, search with confidence. We remain on standby to answer any finance questions.",
    action: null,
    href: null,
  },
  {
    step: "04",
    icon: <Award size={20} />,
    title: "Settle & Move In",
    description: "We manage the formal loan application, coordinate with your solicitor, and guide you through to settlement day.",
    action: null,
    href: null,
  },
];

const schemes = [
  {
    title: "First Home Guarantee (FHBG)",
    description: "Purchase with as little as 5% deposit and avoid Lenders Mortgage Insurance (LMI) — saving thousands.",
    tag: "Up to $600k property value",
  },
  {
    title: "First Home Owner Grant (FHOG)",
    description: "A government grant available in most states for first home buyers purchasing new or substantially renovated properties.",
    tag: "$10,000 – $30,000 available",
  },
  {
    title: "Stamp Duty Concessions",
    description: "Many states offer full or partial stamp duty exemptions for first home buyers — reducing your upfront costs significantly.",
    tag: "State-specific benefits",
  },
  {
    title: "Family Home Guarantee",
    description: "Single parents with dependants can purchase with as little as 2% deposit with a government guarantee.",
    tag: "2% deposit eligible",
  },
];

export default function FirstHomeBuyersContent() {
  return (
    <>
      <PageHero
        eyebrow="First Home Buyers"
        title="Your First Home Journey Starts Here"
        subtitle="We simplify the complex world of first home buying — from grants and schemes to pre-approval, property search, and settlement. All at no cost to you."
        breadcrumb={[{ label: "First Home Buyers", href: "/first-home-buyers" }]}
      />

      {/* Why choose Baset */}
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
                First Home Buyers
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
                We Make It Simple
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="space-y-4 font-inter text-sm text-charcoal/60 leading-relaxed">
                <p>
                  Buying your first home is one of the most significant financial decisions you'll ever make. The lending landscape can feel overwhelming — hundreds of products, complex eligibility criteria, and government schemes that are hard to navigate alone.
                </p>
                <p>
                  That's where Baset Finance comes in. We work with you from day one, explaining your options in plain English, identifying the grants and schemes you qualify for, and securing the most competitive loan for your situation.
                </p>
                <p>
                  Best of all — our service is completely free to first home buyers. We're paid by the lender, not you.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-gold">
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link href="/calculators" className="btn-outline-gold">
                  Check Borrowing Power
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              {[
                "Free service — no broker fees for first home buyers",
                "Access to 25+ lenders including big 4 banks",
                "Expert guidance on all first home buyer grants",
                "Help with 5% deposit through FHBG scheme",
                "Pre-approval before you start searching",
                "Stamp duty concession advice by state",
                "Simple, jargon-free communication",
                "Support from application to settlement",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-3 bg-marble-100 border border-marble-300 px-5 py-3"
                >
                  <CheckCircle size={16} className="text-gold flex-shrink-0" />
                  <span className="font-inter text-sm text-charcoal/70">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="section-padding marble-bg">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
              Government Support
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              Grants & Schemes You May Qualify For
            </h2>
            <div className="w-14 h-px bg-gold mx-auto mb-5" />
            <p className="text-charcoal/60 font-inter max-w-xl mx-auto">
              There are significant government incentives available to first home buyers. We'll identify every opportunity that applies to your situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemes.map((scheme, index) => (
              <motion.div
                key={scheme.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-marble-300 p-7 hover:border-gold/40 hover:shadow-gold transition-all duration-300 group"
              >
                <div className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-inter tracking-wider uppercase mb-4">
                  {scheme.tag}
                </div>
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                  {scheme.title}
                </h3>
                <div className="w-6 h-px bg-gold mb-3" />
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                  {scheme.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step */}
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
              The Process
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              Your Step-by-Step Journey
            </h2>
            <div className="w-14 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start bg-marble-100 border border-marble-300 p-7 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <span className="font-playfair text-sm font-semibold">{step.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gold">{step.icon}</span>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  {step.action && step.href && (
                    <Link
                      href={step.href}
                      className="inline-flex items-center gap-1.5 text-xs font-inter text-gold hover:text-gold-dark transition-colors"
                    >
                      {step.action}
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
