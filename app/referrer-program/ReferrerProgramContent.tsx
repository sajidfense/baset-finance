"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  DollarSign,
  Users,
  Zap,
  BarChart2,
  CheckCircle,
  Send,
  UserPlus,
  Handshake,
  Home,
  Wallet,
  ChevronDown,
  ChevronUp,
  Calculator,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: <DollarSign size={28} />,
    title: "25% Upfront Commission",
    description: "Earn 25% of the upfront commission for every person who settles a loan through your referral. No cap on earnings.",
  },
  {
    icon: <Zap size={28} />,
    title: "Simple Referral Process",
    description: "Just provide a name and contact number. We handle everything from there — no paperwork, no hassle for you.",
  },
  {
    icon: <Wallet size={28} />,
    title: "Fast Payouts",
    description: "Commissions are paid promptly upon loan settlement, typically within 30 days. Direct to your nominated account.",
  },
  {
    icon: <BarChart2 size={28} />,
    title: "Transparent Tracking",
    description: "Know exactly where every referral stands. We keep you updated throughout the process.",
  },
];

const steps = [
  {
    number: "01",
    icon: <UserPlus size={20} />,
    title: "Sign Up",
    description: "Complete the referrer registration form below. We'll review your details and send your welcome pack within 24 hours.",
  },
  {
    number: "02",
    icon: <Users size={20} />,
    title: "Refer Someone",
    description: "When you meet someone who needs a home loan, simply provide us their name and contact number via phone, email, or our referral portal.",
  },
  {
    number: "03",
    icon: <Home size={20} />,
    title: "Loan Settles",
    description: "We take care of everything — assessment, application, approval, and settlement. You stay informed along the way.",
  },
  {
    number: "04",
    icon: <Wallet size={20} />,
    title: "You Get Paid",
    description: "Once the loan settles, your commission is calculated and paid within 30 days. Simple, transparent, reliable.",
  },
];

const referralTypes = [
  "Accountant",
  "Real Estate Agent",
  "Builder / Developer",
  "Financial Planner",
  "Conveyancer / Solicitor",
  "Insurance Broker",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  referralType: string;
  agreedToTerms: boolean;
}

const defaultForm: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  referralType: "",
  agreedToTerms: false,
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Commission Calculator Component
function CommissionCalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000");

  const loan = parseFloat(loanAmount) || 0;
  const upfrontCommission = loan * 0.0065; // 0.65%
  const referrerCommission = upfrontCommission * 0.25; // 25% of upfront

  return (
    <div className="bg-charcoal p-8 relative">
      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />

      <div className="flex items-center gap-3 mb-6">
        <Calculator size={20} className="text-gold" />
        <h3 className="font-playfair text-xl font-semibold text-white">
          Commission Calculator
        </h3>
      </div>

      <p className="font-inter text-sm text-white/50 mb-6">
        See how much you could earn per referral. In the mortgage industry, the average upfront commission is 0.65% of the loan amount. You receive 25% of that.
      </p>

      <div className="mb-6">
        <label className="block font-inter text-xs uppercase tracking-wider text-gold mb-2">
          Loan Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-white/40">$</span>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-white/30 pl-8"
            placeholder="1000000"
            min="50000"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-white/10">
          <span className="font-inter text-sm text-white/50">Loan Amount</span>
          <span className="font-playfair text-lg text-white font-semibold">{formatCurrency(loan)}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-white/10">
          <span className="font-inter text-sm text-white/50">Upfront Commission (0.65%)</span>
          <span className="font-inter text-sm text-white/60">{formatCurrency(upfrontCommission)}</span>
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="font-inter text-sm text-gold font-semibold">Your Referral Earnings (25%)</span>
          <span className="font-playfair text-2xl text-gold font-semibold">{formatCurrency(referrerCommission)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gold/10 border border-gold/20">
        <div className="flex items-start gap-3">
          <TrendingUp size={16} className="text-gold mt-0.5 flex-shrink-0" />
          <p className="font-inter text-xs text-white/60 leading-relaxed">
            The more you refer, the more you earn. There is no cap on earnings. <span className="text-gold">The upfront commission percentage will be increased even more soon — get in early!</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder Dashboard Component
function ReferrerDashboard() {
  return (
    <div className="bg-marble-100 border border-marble-300 p-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart2 size={20} className="text-gold" />
        <h3 className="font-playfair text-xl font-semibold text-charcoal">
          Referrer Dashboard
        </h3>
        <span className="ml-auto px-3 py-1 bg-gold/10 text-gold text-xs font-inter tracking-wider uppercase">
          Coming Soon
        </span>
      </div>

      <div className="grid grid-cols-3 gap-px bg-marble-300 mb-6">
        {[
          { label: "Referrals Submitted", value: "—" },
          { label: "Approved Referrals", value: "—" },
          { label: "Commission Earned", value: "—" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 text-center">
            <div className="font-playfair text-3xl font-semibold text-charcoal/30 mb-1">
              {stat.value}
            </div>
            <div className="font-inter text-xs text-charcoal/40 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <p className="font-inter text-sm text-charcoal/50 text-center">
        Your personalised referrer dashboard will be available once you've signed up and had your first referral processed.
      </p>
    </div>
  );
}

export default function ReferrerProgramContent() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedToTerms) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Partner Program"
        title="Partner With Baset Finance"
        subtitle="Earn commission by referring people who need home loans. A simple, transparent, and rewarding partnership — open to any Australian citizen."
        breadcrumb={[{ label: "Referrer Program", href: "/referrer-program" }]}
      />

      {/* Benefits */}
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
              Partner Benefits
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              Why Partner With Us?
            </h2>
            <div className="w-14 h-px bg-gold mx-auto mb-5" />
            <p className="text-charcoal/60 font-inter max-w-xl mx-auto">
              Our referrer program is built to reward anyone who trusts us with their referrals. We make it simple, transparent, and genuinely worthwhile. Our people love us as we love them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-marble-300">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-8 hover:bg-gold-50 transition-all duration-300 relative"
              >
                <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-3">
                  {benefit.title}
                </h3>
                <div className="w-6 h-px bg-gold mb-3" />
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Calculator */}
      <section className="section-padding marble-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                Your Earnings
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
                Earn 25% of Upfront Commission
              </h2>
              <div className="w-14 h-px bg-gold mb-6" />
              <div className="space-y-4 text-charcoal/70 font-inter text-sm leading-relaxed">
                <p>
                  When you refer someone who settles a home loan through Baset Finance, you earn <strong className="text-charcoal">25% of the upfront commission</strong> that we receive from the lender.
                </p>
                <p>
                  In the mortgage industry, the average upfront commission is <strong className="text-charcoal">0.65% of the loan amount</strong>. Use the calculator to see exactly what you could earn.
                </p>
                <div className="bg-white border border-marble-300 p-5 mt-4">
                  <p className="font-inter text-xs text-charcoal/50 uppercase tracking-wider mb-3">Example</p>
                  <div className="space-y-2 font-inter text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Loan amount referred</span>
                      <span className="font-semibold text-charcoal">$1,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Upfront commission (0.65%)</span>
                      <span className="text-charcoal/60">$6,500</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-marble-300">
                      <span className="font-semibold text-gold">You receive (25%)</span>
                      <span className="font-playfair text-xl font-semibold text-gold">$1,625</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CommissionCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              The Process
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              How It Works
            </h2>
            <div className="w-14 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative text-center group"
              >
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+48px)] right-0 h-px bg-marble-300 z-0" />
                )}

                <div className="relative inline-flex flex-col items-center z-10">
                  <div className="w-20 h-20 border border-gold/30 flex items-center justify-center mb-5 bg-white group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <div className="text-gold group-hover:text-white transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="font-playfair text-xs text-gold/50 mb-2">{step.number}</div>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <div className="w-6 h-px bg-gold mb-3" />
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referrer Signup Form */}
      <section className="section-padding marble-bg" id="signup">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                  Join The Program
                </p>
                <h2 className="font-playfair text-3xl font-semibold text-charcoal mb-5">
                  Sign Up as a Referrer
                </h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-8">
                  Complete the form and we'll have you set up within 24 hours. Our partner team will be in touch to confirm your onboarding and answer any questions about the program.
                </p>

                {/* Open to everyone */}
                <div className="bg-gold/10 border border-gold/20 p-5 mb-6">
                  <p className="font-playfair text-base font-semibold text-charcoal mb-2">
                    Open to All Australian Citizens
                  </p>
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                    You don't need to be a professional to join our referral program. <strong className="text-charcoal">Any Australian citizen</strong> can sign up and start earning commission by referring friends, family, or colleagues.
                  </p>
                </div>

                {/* Who it's for */}
                <div className="space-y-2">
                  <p className="font-inter text-xs uppercase tracking-wider text-charcoal/50 mb-3">
                    Ideal for (but not limited to):
                  </p>
                  {[
                    "Any Australian Citizen",
                    "Real Estate Agents",
                    "Accountants & Bookkeepers",
                    "Financial Planners",
                    "Builders & Developers",
                    "Conveyancers & Solicitors",
                    "Business Owners",
                  ].map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-gold flex-shrink-0" />
                      <span className={`font-inter text-sm ${type === "Any Australian Citizen" ? "text-gold font-semibold" : "text-charcoal/70"}`}>{type}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-marble-300">
                    <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6">
                      <CheckCircle size={32} className="text-gold" />
                    </div>
                    <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-3">
                      Application Received
                    </h3>
                    <div className="w-10 h-px bg-gold mx-auto mb-4" />
                    <p className="font-inter text-sm text-charcoal/60 max-w-sm">
                      Welcome to the Baset Finance partner network. Our team will reach out within 24 hours to complete your onboarding.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-marble-300 p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="input-luxury"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Email Address <span className="text-gold">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="input-luxury"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Phone Number <span className="text-gold">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className="input-luxury"
                          placeholder="04XX XXX XXX"
                        />
                      </div>
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Company (optional)
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          className="input-luxury"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                        Referral Type <span className="text-gold">*</span>
                      </label>
                      <select
                        required
                        value={form.referralType}
                        onChange={(e) => update("referralType", e.target.value)}
                        className="input-luxury bg-white"
                      >
                        <option value="">Select your background</option>
                        {referralTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            checked={form.agreedToTerms}
                            onChange={(e) => update("agreedToTerms", e.target.checked)}
                            className="sr-only"
                            required
                          />
                          <div
                            className={`w-5 h-5 border transition-all duration-200 flex items-center justify-center ${
                              form.agreedToTerms
                                ? "bg-gold border-gold"
                                : "bg-white border-marble-300 hover:border-gold"
                            }`}
                          >
                            {form.agreedToTerms && (
                              <CheckCircle size={12} className="text-white" />
                            )}
                          </div>
                        </div>
                        <span className="font-inter text-sm text-charcoal/60">
                          I agree to the{" "}
                          <Link href="#" className="text-gold hover:underline">
                            Referrer Terms & Conditions
                          </Link>{" "}
                          and understand the commission structure. <span className="text-gold">*</span>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !form.agreedToTerms}
                      className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        "Processing..."
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Application
                        </>
                      )}
                    </button>

                    <p className="font-inter text-xs text-charcoal/40 text-center">
                      By submitting, you agree to our Privacy Policy. Your information is kept confidential.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder Dashboard */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-2">
                Partner Portal
              </p>
              <h2 className="font-playfair text-2xl font-semibold text-charcoal">
                Referrer Dashboard
              </h2>
            </div>
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="flex items-center gap-2 text-sm font-inter text-gold hover:text-gold-dark transition-colors"
            >
              {showDashboard ? "Hide" : "Preview"}
              {showDashboard ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <AnimatePresence>
            {showDashboard && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ReferrerDashboard />
              </motion.div>
            )}
          </AnimatePresence>

          {!showDashboard && (
            <div className="bg-marble-100 border border-marble-300 p-8 text-center">
              <Handshake size={32} className="text-gold/40 mx-auto mb-4" />
              <p className="font-playfair text-lg text-charcoal/50 italic mb-2">
                Your partner dashboard
              </p>
              <p className="font-inter text-sm text-charcoal/40 mb-4">
                Track referrals, commissions, and loan statuses all in one place.
              </p>
              <button
                onClick={() => setShowDashboard(true)}
                className="btn-outline-gold text-xs"
              >
                Preview Dashboard
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
