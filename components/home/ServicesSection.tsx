"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, RefreshCw, TrendingUp, Key, Building2, HardHat, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Home size={28} />,
    title: "Home Loans",
    description:
      "Whether you're purchasing your first home or upgrading to your dream property, we find the right loan at the right rate.",
    href: "/services",
    features: ["Competitive rates", "40+ lenders", "Expert guidance"],
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Refinancing",
    description:
      "Could you be getting a better deal? Let us review your existing loan and help you save thousands over the life of your mortgage.",
    href: "/refinancing",
    features: ["Lower your rate", "Access equity", "Reduce repayments"],
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Investment Loans",
    description:
      "Grow your property portfolio with smart financing strategies designed to maximise your investment returns.",
    href: "/investment-loans",
    features: ["Portfolio growth", "Tax optimisation", "Investor expertise"],
  },
  {
    icon: <Key size={28} />,
    title: "First Home Buyers",
    description:
      "We make the first home buying journey simple, transparent, and stress-free — from pre-approval to settlement.",
    href: "/first-home-buyers",
    features: ["FHBG guidance", "Stamp duty help", "Step-by-step support"],
  },
  {
    icon: <Building2 size={28} />,
    title: "Commercial",
    description:
      "Financing for commercial properties, business premises, and mixed-use developments tailored to your business needs.",
    href: "/services#commercial",
    features: ["Commercial property", "Business premises", "Specialist lenders"],
  },
  {
    icon: <HardHat size={28} />,
    title: "Construction",
    description:
      "Build with confidence using progressive drawdown finance structured around your builder contract and milestones.",
    href: "/services#construction",
    features: ["Progressive drawdowns", "Builder contracts", "Interest-only build phase"],
  },
];

export default function ServicesSection() {
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
            Our Services
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-charcoal font-semibold mb-4">
            Lending Solutions Tailored to You
          </h2>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <p className="text-charcoal/60 font-inter max-w-xl mx-auto">
            From first home purchases to sophisticated investment strategies, we have the expertise to guide you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-marble-300">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-10 hover:bg-gold-50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gold accent corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-300" />
              </div>

              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                {service.icon}
              </div>

              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-3 group-hover:text-charcoal-dark transition-colors">
                {service.title}
              </h3>

              <div className="w-8 h-px bg-gold mb-4" />

              <p className="text-charcoal/60 font-inter text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-inter text-charcoal/70">
                    <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={service.href}
                className="inline-flex items-center gap-2 text-sm font-inter text-gold hover:text-gold-dark transition-colors group/link"
              >
                Learn More
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform duration-200"
                />
              </Link>

              {/* Bottom gold line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
