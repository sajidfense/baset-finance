"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description: "We begin with a detailed conversation about your goals, financial situation, and what you're looking to achieve.",
  },
  {
    number: "02",
    title: "Loan Assessment",
    description: "We analyse your borrowing capacity and match you with the most suitable lenders and products from our panel.",
  },
  {
    number: "03",
    title: "Application & Approval",
    description: "We manage the entire application process, liaising with lenders and keeping you updated every step of the way.",
  },
  {
    number: "04",
    title: "Settlement & Beyond",
    description: "We see you through to settlement and continue to review your loan to ensure it remains competitive over time.",
  },
];

export default function ProcessSection() {
  return (
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
            How It Works
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-charcoal font-semibold mb-4">
            Simple, Transparent Process
          </h2>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <p className="text-charcoal/60 font-inter max-w-xl mx-auto">
            From first contact to settlement, we guide you through every stage of your home loan journey.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-marble-300" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative text-center group"
              >
                {/* Step number circle */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 border border-gold/20 rounded-full group-hover:border-gold/60 transition-colors duration-300" />
                  <div className="absolute inset-2 border border-gold/10 rounded-full" />
                  <span className="font-playfair text-2xl font-semibold text-gold relative z-10">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>

                <div className="w-6 h-px bg-gold mx-auto mb-3" />

                <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
