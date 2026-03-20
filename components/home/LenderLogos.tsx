"use client";

import { motion } from "framer-motion";

const lenders = [
  { name: "Commonwealth Bank", color: "#FFD100", textColor: "#000000", bg: "#FFD100" },
  { name: "Westpac", color: "#D5002B", textColor: "#FFFFFF", bg: "#D5002B" },
  { name: "ANZ", color: "#003D6A", textColor: "#FFFFFF", bg: "#003D6A" },
  { name: "NAB", color: "#C20000", textColor: "#FFFFFF", bg: "#C20000" },
  { name: "Macquarie", color: "#000000", textColor: "#FFFFFF", bg: "#000000" },
  { name: "ING", color: "#FF6200", textColor: "#FFFFFF", bg: "#FF6200" },
  { name: "St.George", color: "#00703C", textColor: "#FFFFFF", bg: "#00703C" },
  { name: "Suncorp", color: "#004B8D", textColor: "#FFFFFF", bg: "#004B8D" },
  { name: "Bank of Melbourne", color: "#5B0078", textColor: "#FFFFFF", bg: "#5B0078" },
  { name: "Bendigo Bank", color: "#B2003C", textColor: "#FFFFFF", bg: "#B2003C" },
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
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-8 items-center flex-shrink-0"
            >
              {[...lenders, ...lenders].map((lender, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: lender.bg,
                    borderColor: lender.bg,
                  }}
                >
                  <span
                    className="font-playfair text-sm font-semibold whitespace-nowrap tracking-wide"
                    style={{ color: lender.textColor }}
                  >
                    {lender.name}
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
