"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, DollarSign, ArrowRight } from "lucide-react";

export default function CalculatorSection() {
  return (
    <section className="bg-charcoal section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/5 pointer-events-none" />

      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Financial Tools
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4">
            Know Your Numbers
          </h2>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <p className="text-white/50 font-inter max-w-xl mx-auto">
            Use our free calculators to understand your borrowing power and monthly repayments before speaking with a broker.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <DollarSign size={32} />,
              title: "Borrowing Capacity",
              subtitle: "Find out how much you can borrow",
              description:
                "Enter your income, expenses, and existing commitments to discover your estimated borrowing capacity across our lender panel.",
              href: "/calculators/borrowing-capacity",
              cta: "Calculate Now",
            },
            {
              icon: <Calculator size={32} />,
              title: "Loan Repayment",
              subtitle: "Plan your repayments",
              description:
                "See exactly what your monthly, fortnightly, or weekly repayments will look like with our interactive repayment calculator.",
              href: "/calculators/loan-repayment",
              cta: "Calculate Now",
            },
          ].map((calc, index) => (
            <motion.div
              key={calc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-white/5 border border-white/10 hover:border-gold/50 p-10 transition-all duration-300 hover:bg-white/8"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                {calc.icon}
              </div>

              <div className="font-inter text-xs tracking-[0.2em] uppercase text-gold/70 mb-2">
                {calc.subtitle}
              </div>

              <h3 className="font-playfair text-2xl font-semibold text-white mb-3">
                {calc.title}
              </h3>

              <div className="w-8 h-px bg-gold mb-4" />

              <p className="text-white/50 font-inter text-sm leading-relaxed mb-8">
                {calc.description}
              </p>

              <Link
                href={calc.href}
                className="btn-gold text-xs group/btn"
              >
                {calc.cta}
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>

              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/20 group-hover:border-gold/50 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/20 group-hover:border-gold/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
