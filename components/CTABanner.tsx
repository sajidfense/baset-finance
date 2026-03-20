"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-charcoal py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center"
      >
        <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
          Ready to Get Started?
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl text-white font-semibold mb-4">
          Your Smarter Home Loan Starts Here
        </h2>
        <div className="w-14 h-px bg-gold mx-auto mb-6" />
        <p className="text-white/50 font-inter text-base max-w-xl mx-auto mb-10">
          Book a free consultation with one of our expert mortgage brokers and discover your borrowing potential today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/calculators" className="btn-gold">
            Check Borrowing Capacity
            <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-outline-gold border-white/30 text-white hover:border-gold hover:text-white hover:bg-gold">
            Speak With a Broker
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
