"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, Target, Award, Clock } from "lucide-react";

const trustItems = [
  {
    icon: <Users size={24} />,
    value: "Our People",
    label: "Love Us",
    description: "Our people love us as we love them",
  },
  {
    icon: <Shield size={24} />,
    value: "40+",
    label: "Lender Panel",
    description: "Access to major banks and specialist lenders",
  },
  {
    icon: <Zap size={24} />,
    value: "Fast",
    label: "Approvals",
    description: "Streamlined process for quick pre-approvals",
  },
  {
    icon: <Target size={24} />,
    value: "Personal",
    label: "Strategy",
    description: "Tailored mortgage strategy for every person",
  },
  {
    icon: <Award size={24} />,
    value: "Expert",
    label: "Advisors",
    description: "Qualified brokers with deep market knowledge",
  },
  {
    icon: <Clock size={24} />,
    value: "Free",
    label: "Consultation",
    description: "No cost, no obligation initial meeting",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white section-padding border-y border-marble-300">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Why Choose Us
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-charcoal font-semibold mb-4">
            Finance Built On Trust
          </h2>
          <div className="w-14 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-marble-300">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col items-center text-center p-8 border-r border-b border-marble-300 last:border-r-0 hover:bg-gold-50 transition-colors duration-300"
            >
              <div className="text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="font-playfair text-2xl font-semibold text-charcoal mb-1">
                {item.value}
              </div>
              <div className="font-inter text-xs tracking-wide text-gold uppercase mb-2">
                {item.label}
              </div>
              <p className="font-inter text-xs text-charcoal/50 leading-relaxed hidden md:block">
                {item.description}
              </p>
              {/* Gold accent on hover */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
