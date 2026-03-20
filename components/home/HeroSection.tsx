"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center marble-bg overflow-hidden pt-20">
      {/* Animated gold accent lines */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.12 }}
        transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-right"
      />

      {/* Vertical gold ornament */}
      <div className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent" />

      {/* Large decorative circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/8 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-gold/5 pointer-events-none"
      />

      {/* ICXC NIKA symbol */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.06, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute top-24 right-[18%] font-playfair text-[200px] text-gold leading-none select-none pointer-events-none"
      >
        ✝
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gold" />
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold">
              Australian Mortgage Brokers
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal leading-[1.05] mb-6"
          >
            Finance{" "}
            <span className="italic text-gold-gradient">For The</span>
            <br />
            People
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-20 h-px bg-gold mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-charcoal/60 font-inter text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
          >
            Secure smarter home loans whilst enjoying the experience. Trust, relationships and empowerment are the foundations of our company. We are with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/calculators/borrowing-capacity" className="btn-gold">
              Check Borrowing Capacity
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-outline-gold">
              Speak With a Broker
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 mt-14 pt-10 border-t border-marble-300"
          >
            {[
              { value: "25+", label: "Lender Panel" },
              { value: "Fast", label: "Approvals" },
              { value: "Free", label: "Consultation" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div>
                  <div className="font-playfair text-xl font-semibold text-charcoal">
                    {stat.value}
                  </div>
                  <div className="font-inter text-xs text-charcoal/50 tracking-wide">
                    {stat.label}
                  </div>
                </div>
                <div className="w-px h-8 bg-marble-300 last:hidden" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
