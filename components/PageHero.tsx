"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHero({ eyebrow, title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 px-6 marble-bg overflow-hidden">
      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
      <div className="absolute top-20 right-0 w-px h-40 bg-gradient-to-b from-transparent via-gold to-transparent opacity-20" />
      <div className="absolute bottom-0 left-20 w-px h-32 bg-gradient-to-b from-gold to-transparent opacity-10" />

      {/* Circle ornament */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full border border-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-10"
          >
            <Link href="/" className="text-charcoal/40 text-xs font-inter hover:text-gold transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight size={12} className="text-charcoal/30" />
                <Link href={crumb.href} className="text-charcoal/40 text-xs font-inter hover:text-gold transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-5"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal mb-5 max-w-3xl leading-tight"
        >
          {title}
        </motion.h1>

        <div className="w-14 h-px bg-gold mb-6" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-charcoal/60 font-inter text-lg leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
