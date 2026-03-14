"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { CheckCircle, Heart, Shield, Star, Users, Award, ArrowRight } from "lucide-react";

const values = [
  {
    icon: <Heart size={22} />,
    title: "People First",
    description: "We genuinely care about our clients' financial wellbeing. Every decision we make is centred on what's best for you, not what earns us the highest commission.",
  },
  {
    icon: <Shield size={22} />,
    title: "Transparent Advice",
    description: "No hidden fees, no confusing jargon. We explain everything clearly so you can make confident, informed decisions about your financial future.",
  },
  {
    icon: <Star size={22} />,
    title: "Excellence",
    description: "We hold ourselves to the highest standards of professionalism and service quality, ensuring every client receives a premium experience.",
  },
  {
    icon: <Users size={22} />,
    title: "Community",
    description: "Baset Finance was built to serve everyday Australians — teachers, tradespeople, families, and professionals — with the same quality of advice as the privileged few.",
  },
];

const whyChoose = [
  "Access to 25+ lenders including major banks and specialist lenders",
  "No cost to you — we're paid by lenders, not clients",
  "End-to-end support from pre-approval to settlement",
  "Ongoing loan reviews to ensure you stay competitive",
  "Fast turnaround with experienced industry knowledge",
  "Personalised strategy tailored to your unique situation",
];

export default function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow="About Baset Finance"
        title="Finance For The People, By The People"
        subtitle="We exist to give every Australian access to expert mortgage advice — transparent, honest, and built around your goals."
        breadcrumb={[{ label: "About", href: "/about" }]}
      />

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                Who We Are
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5 leading-tight">
                A Different Kind of <em className="not-italic text-gold">Mortgage Broker</em>
              </h2>
              <div className="w-14 h-px bg-gold mb-6" />
              <div className="space-y-4 text-charcoal/70 font-inter text-base leading-relaxed">
                <p>
                  Baset Finance was founded on a simple but powerful belief: every Australian deserves access to expert financial guidance, not just the wealthy few. Too often, everyday families and individuals are left navigating the complex world of home loans alone.
                </p>
                <p>
                  We set out to change that. As independent mortgage brokers, we work for you — not the banks. Our role is to cut through the complexity, negotiate on your behalf, and secure you the best possible deal from our panel of 25+ lenders.
                </p>
                <p>
                  Whether you're buying your first home, expanding your investment portfolio, or looking to refinance — we treat every client with the same level of care, dedication, and professionalism.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Stats card */}
              <div className="bg-charcoal p-10 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold/30" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-gold/30" />

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: "1000+", label: "Clients Helped" },
                    { value: "25+", label: "Lender Partners" },
                    { value: "100%", label: "Client Focus" },
                    { value: "Free", label: "Consultation" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-2">
                        {stat.value}
                      </div>
                      <div className="font-inter text-xs text-white/50 tracking-wider uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <p className="font-playfair italic text-white/60 text-sm">
                    "Finance For The People"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-padding marble-bg">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
              Our Mission
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
              Empowering Australians Through Better Finance
            </h2>
            <div className="w-14 h-px bg-gold mx-auto mb-6" />
            <p className="font-playfair italic text-xl md:text-2xl text-charcoal/70 leading-relaxed">
              "To make expert mortgage advice accessible, transparent, and genuinely helpful for every Australian — regardless of where they're starting from."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
              Our Values
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              What We Stand For
            </h2>
            <div className="w-14 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex gap-5 p-8 border border-marble-300 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
              >
                <div className="text-gold mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <div className="w-6 h-px bg-gold mb-3" />
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding marble-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                Why Baset Finance
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
                The Advantages of Working With Us
              </h2>
              <div className="w-14 h-px bg-gold mb-8" />
              <ul className="space-y-4">
                {whyChoose.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="font-inter text-sm text-charcoal/70 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn-gold">
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Meet Your Broker */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white border border-marble-300 p-8 shadow-luxury relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />

                {/* Broker avatar placeholder */}
                <div className="w-20 h-20 bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                  <Award size={32} className="text-gold" />
                </div>

                <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                  Your Mortgage Broker
                </p>
                <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-2">
                  Expert Guidance
                </h3>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-6">
                  Our brokers are fully qualified, MFAA accredited mortgage professionals with deep knowledge of the Australian lending market. We stay up-to-date with the latest products, policies, and market movements to ensure you always receive current, expert advice.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-marble-300">
                  <div className="text-center">
                    <div className="font-playfair text-xl font-semibold text-gold">MFAA</div>
                    <div className="font-inter text-xs text-charcoal/50">Accredited</div>
                  </div>
                  <div className="text-center">
                    <div className="font-playfair text-xl font-semibold text-gold">ASIC</div>
                    <div className="font-inter text-xs text-charcoal/50">Regulated</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
