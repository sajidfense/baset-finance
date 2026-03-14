"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`font-inter text-xs tracking-[0.25em] uppercase mb-4 ${
            light ? "text-gold-300" : "text-gold"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5 ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div className={`${centered ? "mx-auto" : ""} w-14 h-px bg-gold mb-5`} />
      {subtitle && (
        <p
          className={`font-inter text-base leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-charcoal/60"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
