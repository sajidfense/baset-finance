"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import {
  RefreshCw,
  TrendingDown,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  Calculator,
  ChevronDown,
} from "lucide-react";

const reasons = [
  {
    icon: <TrendingDown size={24} />,
    title: "Get a Lower Rate",
    description:
      "Even a 0.5% reduction in your interest rate can save tens of thousands over the life of your loan. We negotiate hard on your behalf.",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Reduce Monthly Repayments",
    description:
      "A lower rate or extended term can free up significant cash flow each month for other goals and investments.",
  },
  {
    icon: <Shield size={24} />,
    title: "Access Your Equity",
    description:
      "Use the equity built in your home to fund renovations, investment purchases, or pay off high-interest debts.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Better Loan Features",
    description:
      "Switch to a loan with offset accounts, redraw facilities, or split options that better suit your current lifestyle.",
  },
];

const signs = [
  "Your fixed rate period is ending soon",
  "Your lender hasn't passed on RBA rate cuts",
  "You've been with the same lender for 3+ years",
  "Your property has significantly increased in value",
  "You want to consolidate multiple debts",
  "Your financial situation has improved since you first borrowed",
  "You want to access equity for renovations or investment",
  "Your current loan lacks features like an offset account",
];

// ─── Refinance Savings Calculator ───
interface RefinanceInputs {
  currentBalance: string;
  currentRate: string;
  remainingTerm: string;
  newRate: string;
  newTerm: string;
}

const defaultRefinance: RefinanceInputs = {
  currentBalance: "500000",
  currentRate: "6.50",
  remainingTerm: "25",
  newRate: "5.99",
  newTerm: "25",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function calcRefinance(d: RefinanceInputs) {
  const P = parseFloat(d.currentBalance) || 0;
  const curRateRaw = parseFloat(d.currentRate);
  const curTerm = parseInt(d.remainingTerm) || 25;
  const newRateRaw = parseFloat(d.newRate);
  const newTerm = parseInt(d.newTerm) || 25;

  if (
    P <= 0 ||
    isNaN(curRateRaw) ||
    curRateRaw <= 0 ||
    isNaN(newRateRaw) ||
    newRateRaw <= 0
  )
    return null;

  const curRate = curRateRaw / 100;
  const newRate = newRateRaw / 100;

  const curR = curRate / 12;
  const curN = curTerm * 12;
  const curMonthly =
    (P * curR * Math.pow(1 + curR, curN)) / (Math.pow(1 + curR, curN) - 1);

  const newR = newRate / 12;
  const newN = newTerm * 12;
  const newMonthly =
    (P * newR * Math.pow(1 + newR, newN)) / (Math.pow(1 + newR, newN) - 1);

  if (!isFinite(curMonthly) || !isFinite(newMonthly)) return null;

  const monthlySaving = curMonthly - newMonthly;
  const totalCurrentCost = curMonthly * curN;
  const totalNewCost = newMonthly * newN;
  const totalSaving = totalCurrentCost - totalNewCost;

  return {
    currentMonthly: curMonthly,
    newMonthly,
    monthlySaving,
    totalCurrentCost,
    totalNewCost,
    totalSaving,
    annualSaving: monthlySaving * 12,
  };
}

function RefinanceCalculator() {
  const [form, setForm] = useState<RefinanceInputs>(defaultRefinance);
  const update =
    (field: keyof RefinanceInputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const result = useMemo(() => calcRefinance(form), [form]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="bg-marble-100 border border-marble-300 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator size={20} className="text-gold" />
          <h3 className="font-playfair text-xl font-semibold text-charcoal">
            Refinance Calculator
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
              Current Loan Balance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">
                $
              </span>
              <input
                type="number"
                value={form.currentBalance}
                onChange={update("currentBalance")}
                className="input-luxury pl-8"
                placeholder="500000"
                min="10000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                Current Rate (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={form.currentRate}
                  onChange={update("currentRate")}
                  className="input-luxury pr-12"
                  placeholder="6.50"
                  min="0.1"
                  max="20"
                  step="0.05"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                Remaining Term
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={form.remainingTerm}
                  onChange={update("remainingTerm")}
                  className="input-luxury pr-14"
                  placeholder="25"
                  min="1"
                  max="30"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">
                  years
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-marble-300">
            <p className="font-inter text-xs uppercase tracking-wider text-gold mb-4 font-semibold">
              New Loan Details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                  New Rate (p.a.)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.newRate}
                    onChange={update("newRate")}
                    className="input-luxury pr-12 border-gold/40 focus:border-gold"
                    placeholder="5.99"
                    min="0.1"
                    max="20"
                    step="0.05"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                  New Loan Term
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.newTerm}
                    onChange={update("newTerm")}
                    className="input-luxury pr-14"
                    placeholder="25"
                    min="1"
                    max="30"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">
                    years
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results — live, no button click required */}
      <div>
        {result ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-charcoal p-8 relative">
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />

              <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                Monthly Saving
              </p>
              <div className="font-playfair text-4xl font-semibold text-white mt-2">
                {result.monthlySaving > 0
                  ? formatCurrency(result.monthlySaving)
                  : "$0"}
              </div>
              <p className="font-inter text-xs text-white/40 mt-1">
                per month
              </p>

              <div className="w-8 h-px bg-gold my-5" />

              <div className="space-y-3">
                <div className="flex justify-between py-1">
                  <span className="font-inter text-sm text-white/50">
                    Current Monthly
                  </span>
                  <span className="font-playfair text-sm font-semibold text-white">
                    {formatCurrency(result.currentMonthly)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-inter text-sm text-white/50">
                    New Monthly
                  </span>
                  <span className="font-playfair text-sm font-semibold text-gold">
                    {formatCurrency(result.newMonthly)}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between py-1">
                  <span className="font-inter text-sm text-white/50">
                    Annual Saving
                  </span>
                  <span className="font-playfair text-sm font-semibold text-white">
                    {result.annualSaving > 0
                      ? formatCurrency(result.annualSaving)
                      : "$0"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-inter text-sm font-medium text-gold">
                    Total Saving Over Life
                  </span>
                  <span className="font-playfair text-xl font-semibold text-gold">
                    {result.totalSaving > 0
                      ? formatCurrency(result.totalSaving)
                      : "$0"}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/contact" className="btn-gold w-full justify-center">
              Get My Free Review
              <ArrowRight size={16} />
            </Link>

            <p className="font-inter text-xs text-charcoal/40 text-center">
              Estimate only. Does not include refinancing costs such as discharge
              fees or new loan establishment fees.
            </p>
          </motion.div>
        ) : (
          <div className="h-full bg-marble-100 border border-dashed border-marble-300 flex flex-col items-center justify-center py-20 text-center">
            <RefreshCw size={40} className="text-gold/30 mx-auto mb-4" />
            <p className="font-playfair text-lg text-charcoal/40 italic mb-2">
              Enter your loan details to see savings
            </p>
            <p className="font-inter text-xs text-charcoal/30">
              Adjust the rates and terms above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ Data & Component ───
const faqs = [
  {
    question: "When should I consider refinancing my home loan?",
    answer:
      "You should consider refinancing when interest rates have dropped since you took out your loan, when your fixed rate period is ending, or when your financial circumstances have changed. If you have been with the same lender for more than two to three years without a rate review, there is a strong chance you are paying more than you need to.",
  },
  {
    question: "How much can I save by refinancing in Brisbane?",
    answer:
      "Brisbane homeowners can often save hundreds of dollars per month by switching to a more competitive rate. Even a reduction of 0.5% on a $500,000 mortgage can save over $50,000 in interest over the life of the loan. Use our refinance calculator above to estimate your specific savings.",
  },
  {
    question: "Are there costs involved in refinancing?",
    answer:
      "Yes, refinancing can involve discharge fees from your current lender, application or establishment fees with the new lender, and potential break costs if you are exiting a fixed rate loan early. A good mortgage broker will calculate all of these costs upfront so you can see whether the net savings still make refinancing worthwhile.",
  },
  {
    question: "Can I refinance if I have less than 20% equity?",
    answer:
      "Yes, it is possible to refinance with less than 20% equity, though you may need to pay Lenders Mortgage Insurance (LMI) again. Some lenders offer LMI waivers or competitive options for borrowers with as little as 10% equity. We can help you find the right solution for your situation.",
  },
  {
    question: "How long does the refinancing process take?",
    answer:
      "The refinancing process typically takes between two and six weeks from application to settlement. Factors such as property valuations, lender processing times, and the complexity of your loan can affect the timeline. We manage the entire process on your behalf to keep things moving efficiently.",
  },
  {
    question: "Will refinancing affect my credit score?",
    answer:
      "Refinancing involves a credit enquiry which may cause a minor, temporary dip in your credit score. However, this impact is generally small and short-lived. Making consistent repayments on your new loan will help maintain and improve your credit rating over time.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section-padding bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Common Questions
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Refinancing FAQs
          </h2>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <p className="text-charcoal/60 font-inter max-w-xl mx-auto">
            Everything you need to know about refinancing your home loan in
            Brisbane and across Australia.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="border border-marble-300 hover:border-gold/40 transition-colors duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-playfair text-lg font-semibold text-charcoal">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gold flex-shrink-0"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="w-8 h-px bg-gold mb-4" />
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RefinancingContent() {
  return (
    <>
      <PageHero
        eyebrow="Refinancing"
        title="Are You Getting the Best Deal?"
        subtitle="Thousands of people are paying more than they should on their home loan. Our free loan health check could save you significantly — with no disruption to your lifestyle."
        breadcrumb={[{ label: "Refinancing", href: "/refinancing" }]}
      />

      {/* Reasons to refinance */}
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
              Why Refinance?
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              The Benefits of Refinancing
            </h2>
            <div className="w-14 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-5 bg-marble-100 border border-marble-300 p-8 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
              >
                <div className="text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                    {reason.title}
                  </h3>
                  <div className="w-6 h-px bg-gold mb-3" />
                  <p className="font-inter text-sm text-charcoal/60 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refinance Calculator Section */}
      <section className="section-padding marble-bg" id="calculator">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
              Calculate Your Savings
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              How Much Could You Save?
            </h2>
            <div className="w-14 h-px bg-gold mx-auto mb-5" />
            <p className="text-charcoal/60 font-inter max-w-xl mx-auto">
              Enter your current loan details and a new rate to instantly see
              your potential monthly and lifetime savings.
            </p>
          </motion.div>

          <RefinanceCalculator />
        </div>
      </section>

      {/* Signs you should refinance */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
                Is It Time?
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-5">
                Signs You Should Refinance
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="font-inter text-sm text-charcoal/60 leading-relaxed mb-8">
                If any of the following apply to you, it may be time for a free
                loan health check with one of our brokers.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {signs.map((sign, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={15} className="text-gold flex-shrink-0" />
                    <span className="font-inter text-sm text-charcoal/70">
                      {sign}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-charcoal p-10 relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />

                <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-4">
                  Free Service
                </p>
                <h3 className="font-playfair text-2xl text-white font-semibold mb-4">
                  Free Loan Health Check
                </h3>
                <div className="w-8 h-px bg-gold mb-5" />
                <p className="font-inter text-sm text-white/50 leading-relaxed mb-8">
                  We'll review your current loan against the market, calculate
                  potential savings, and present you with your best options —
                  completely free and without obligation.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Review your current rate vs market rates",
                    "Calculate potential savings",
                    "Identify best refinance options",
                    "Estimate break costs and net benefit",
                    "Manage the entire application",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                      <span className="font-inter text-sm text-white/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="btn-gold w-full justify-center"
                >
                  Get My Free Review
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <CTABanner />
    </>
  );
}
