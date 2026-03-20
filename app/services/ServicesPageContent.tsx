"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Home, RefreshCw, TrendingUp, Key, HardHat, Building2, CheckCircle, ArrowRight } from "lucide-react";

const services = [
  {
    id: "home-loans",
    icon: <Home size={32} />,
    title: "Home Loans",
    description:
      "Whether you're purchasing your first home or upgrading to your next property, we search our panel of 40+ lenders to find the loan structure and rate that suits your unique situation.",
    benefits: [
      "Competitive interest rates from 40+ lenders",
      "Variable, fixed, and split loan options",
      "Offset accounts and redraw facilities",
      "Owner-occupier and principal & interest structures",
      "Fast pre-approval process",
      "Ongoing loan reviews and support",
    ],
    cta: { label: "Get Started", href: "/contact" },
  },
  {
    id: "refinancing",
    icon: <RefreshCw size={32} />,
    title: "Refinancing",
    description:
      "Refinancing your existing mortgage could save you thousands. We review your current loan, compare it against the market, and negotiate a better deal on your behalf.",
    benefits: [
      "Free loan health check",
      "Lower your existing interest rate",
      "Access equity in your property",
      "Consolidate debts into one loan",
      "Remove lenders mortgage insurance",
      "Restructure to meet your current needs",
    ],
    cta: { label: "Check Your Savings", href: "/refinancing" },
  },
  {
    id: "investment",
    icon: <TrendingUp size={32} />,
    title: "Investment Loans",
    description:
      "Build and manage your property portfolio with smart financing. We specialise in investment lending strategies designed to maximise your returns while managing risk.",
    benefits: [
      "Interest-only loan options",
      "Portfolio loan structuring",
      "Tax-effective loan strategies",
      "SMSF lending advice",
      "Cross-collateralisation guidance",
      "Experienced investor-focused brokers",
    ],
    cta: { label: "Grow Your Portfolio", href: "/investment-loans" },
  },
  {
    id: "first-home",
    icon: <Key size={32} />,
    title: "First Home Buyers",
    description:
      "We make the journey to your first home simple, transparent, and achievable. From understanding your borrowing capacity to navigating grants and schemes.",
    benefits: [
      "First Home Guarantee (FHBG) guidance",
      "First Home Owner Grant (FHOG) assistance",
      "Stamp duty concession advice",
      "Pre-approval before you search",
      "Step-by-step process guidance",
      "No cost to first home buyers",
    ],
    cta: { label: "Start Your Journey", href: "/first-home-buyers" },
  },
  {
    id: "commercial",
    icon: <Building2 size={32} />,
    title: "Commercial Loans",
    description:
      "Financing for commercial properties, business premises, and mixed-use developments. We work with specialist commercial lenders to structure the right facility for your business needs.",
    benefits: [
      "Office, retail, and industrial property finance",
      "Mixed-use development funding",
      "Business premises acquisition",
      "Commercial refinancing options",
      "Tailored loan structures and terms",
      "Access to specialist commercial lenders",
    ],
    cta: { label: "Discuss Commercial Finance", href: "/contact" },
  },
  {
    id: "construction",
    icon: <HardHat size={32} />,
    title: "Construction Loans",
    description:
      "Building your dream home? Construction loans are complex, and we're experienced in guiding you through progressive draw-down structures and builder requirements.",
    benefits: [
      "Progressive drawdown loan structures",
      "Fixed price building contract guidance",
      "Progress payments management",
      "Interest-only during construction",
      "Convert to standard loan at completion",
      "Experienced in owner-builder applications",
    ],
    cta: { label: "Discuss Your Build", href: "/contact" },
  },
];

export default function ServicesPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Mortgage Solutions"
        subtitle="From first home purchases to complex investment structures — we have the expertise to find the right lending solution for every stage of your property journey."
        breadcrumb={[{ label: "Services", href: "/services" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-luxury space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="text-gold mb-6">{service.icon}</div>
                <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
                  {service.title}
                </h2>
                <div className="w-12 h-px bg-gold mb-5" />
                <p className="font-inter text-base text-charcoal/60 leading-relaxed mb-8">
                  {service.description}
                </p>
                <Link href={service.cta.href} className="btn-gold">
                  {service.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Benefits */}
              <div className={`bg-marble-100 border border-marble-300 p-8 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-5">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="font-inter text-sm text-charcoal/70">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
