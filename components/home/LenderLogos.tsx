"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const lenders = [
  { name: "Commonwealth Bank", logo: "/images/lenders/commonwealth-bank.png" },
  { name: "Westpac", logo: "/images/lenders/westpac.png" },
  { name: "ANZ", logo: "/images/lenders/anz.png" },
  { name: "NAB", logo: "/images/lenders/nab.png" },
  { name: "Macquarie", logo: "/images/lenders/macquarie.png" },
  { name: "ING", logo: "/images/lenders/ing.png" },
  { name: "St.George", logo: "/images/lenders/st-george.png" },
  { name: "Suncorp", logo: "/images/lenders/suncorp.png" },
  { name: "Bank of Melbourne", logo: "/images/lenders/bank-of-melbourne.png" },
  { name: "Bendigo Bank", logo: "/images/lenders/bendigo-bank.png" },
];

export default function LenderLogos() {
  return (
    <section className="py-14 px-6 bg-white border-y border-marble-300 overflow-hidden">
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
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling logos */}
          <div className="flex gap-0 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-0 items-center flex-shrink-0"
            >
              {[...lenders, ...lenders].map((lender, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-4 mx-2 bg-white border border-marble-200 hover:border-gold/30 hover:shadow-gold transition-all duration-300 rounded-sm"
                  style={{ width: 160, height: 100 }}
                >
                  <div className="relative w-full h-12 flex items-center justify-center">
                    <Image
                      src={lender.logo}
                      alt={lender.name}
                      width={120}
                      height={48}
                      className="object-contain max-h-12 w-auto"
                    />
                  </div>
                  <span className="font-inter text-[10px] text-charcoal/40 mt-2 whitespace-nowrap tracking-wide">
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
