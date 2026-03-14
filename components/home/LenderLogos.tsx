"use client";

import { motion } from "framer-motion";

const lenders = [
  "Commonwealth Bank",
  "Westpac",
  "ANZ",
  "NAB",
  "Macquarie",
  "ING",
  "St.George",
  "Suncorp",
  "Bank of Melbourne",
  "Bendigo Bank",
];

export default function LenderLogos() {
  return (
    <section className="py-14 px-6 bg-marble-200 border-y border-marble-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-inter text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-8"
        >
          Our Lender Panel — 25+ Banks & Specialists
        </motion.p>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-marble-200 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-marble-200 to-transparent z-10" />

          {/* Scrolling logos */}
          <div className="flex gap-12 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-12 items-center flex-shrink-0"
            >
              {[...lenders, ...lenders].map((lender, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 border border-marble-300 bg-white"
                >
                  <span className="font-playfair text-sm text-charcoal/50 whitespace-nowrap tracking-wide">
                    {lender}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
