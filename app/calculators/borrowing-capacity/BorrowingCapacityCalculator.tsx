"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Calculator, DollarSign, Info, ArrowRight, RefreshCw } from "lucide-react";

interface FormData {
  annualIncome: string;
  partnerIncome: string;
  livingExpenses: string;
  existingLoans: string;
  creditCards: string;
  interestRate: string;
  loanTerm: string;
}

interface Results {
  borrowingCapacity: number;
  monthlyRepayment: number;
  annualRepayment: number;
  netMonthlyIncome: number;
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  hint,
  type = "number",
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  hint?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
        {label}
        {hint && (
          <span title={hint} className="cursor-help">
            <Info size={12} className="text-charcoal/30" />
          </span>
        )}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 font-inter text-sm text-charcoal/50 select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`input-luxury ${prefix ? "!pl-10" : ""} ${suffix ? "!pr-12" : ""}`}
        />
        {suffix && (
          <span className="absolute right-4 font-inter text-sm text-charcoal/50 select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateBorrowingCapacity(data: FormData): Results | null {
  const annualIncome = parseFloat(data.annualIncome) || 0;
  const partnerIncome = parseFloat(data.partnerIncome) || 0;
  const livingExpenses = parseFloat(data.livingExpenses) || 0;
  const existingLoans = parseFloat(data.existingLoans) || 0;
  const creditCards = parseFloat(data.creditCards) || 0;
  const interestRate = parseFloat(data.interestRate) || 6.5;
  const loanTerm = parseInt(data.loanTerm) || 30;

  if (annualIncome <= 0) return null;

  // Total gross annual income
  const totalGrossIncome = annualIncome + partnerIncome;

  // Estimate net monthly income (approx 78% after tax for simplicity)
  const netMonthlyIncome = (totalGrossIncome * 0.78) / 12;

  // Monthly existing commitments (credit card limit at 3% per month)
  const monthlyExistingLoans = existingLoans;
  const monthlyCardCommitment = creditCards * 0.03;
  const monthlyLivingExpenses = livingExpenses;

  // Available for loan repayment (net income minus all expenses and commitments)
  const availableForLoan =
    netMonthlyIncome -
    monthlyLivingExpenses -
    monthlyExistingLoans -
    monthlyCardCommitment;

  if (availableForLoan <= 0) {
    return {
      borrowingCapacity: 0,
      monthlyRepayment: 0,
      annualRepayment: 0,
      netMonthlyIncome,
    };
  }

  // Assessment rate (lenders typically add a buffer of ~3% to stress test)
  const assessmentRate = (interestRate + 3) / 100 / 12;
  const n = loanTerm * 12;

  // Calculate loan amount using PMT formula reversed
  // P = PMT * [1 - (1 + r)^-n] / r
  const borrowingCapacity =
    availableForLoan * ((1 - Math.pow(1 + assessmentRate, -n)) / assessmentRate);

  // Calculate actual monthly repayment on borrowed amount
  const actualRate = interestRate / 100 / 12;
  const monthlyRepayment =
    (borrowingCapacity * actualRate) / (1 - Math.pow(1 + actualRate, -n));

  return {
    borrowingCapacity: Math.max(0, borrowingCapacity),
    monthlyRepayment: Math.max(0, monthlyRepayment),
    annualRepayment: Math.max(0, monthlyRepayment * 12),
    netMonthlyIncome,
  };
}

const defaultForm: FormData = {
  annualIncome: "",
  partnerIncome: "",
  livingExpenses: "2500",
  existingLoans: "0",
  creditCards: "0",
  interestRate: "6.50",
  loanTerm: "30",
};

export default function BorrowingCapacityCalculator() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [results, setResults] = useState<Results | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const update = useCallback(
    (field: keyof FormData) => (value: string) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateBorrowingCapacity(form);
    setResults(res);
    setHasCalculated(true);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResults(null);
    setHasCalculated(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Financial Calculator"
        title="Borrowing Capacity Calculator"
        subtitle="Estimate how much you could borrow based on your income, expenses, and existing financial commitments."
        breadcrumb={[
          { label: "Calculators", href: "/calculators/borrowing-capacity" },
          { label: "Borrowing Capacity", href: "/calculators/borrowing-capacity" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Calculator Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-marble-100 border border-marble-300 p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Calculator size={22} className="text-gold" />
                  <h2 className="font-playfair text-xl font-semibold text-charcoal">
                    Your Financial Details
                  </h2>
                </div>

                <form onSubmit={handleCalculate} className="space-y-5">
                  {/* Income */}
                  <div>
                    <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-gold" />
                      Income
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="Annual Income *"
                        value={form.annualIncome}
                        onChange={update("annualIncome")}
                        prefix="$"
                        placeholder="e.g. 80000"
                        hint="Your gross annual income before tax"
                        min="0"
                      />
                      <InputField
                        label="Partner Income"
                        value={form.partnerIncome}
                        onChange={update("partnerIncome")}
                        prefix="$"
                        placeholder="e.g. 60000"
                        hint="Leave blank if applying solo"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Expenses */}
                  <div>
                    <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-gold" />
                      Monthly Expenses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <InputField
                        label="Living Expenses"
                        value={form.livingExpenses}
                        onChange={update("livingExpenses")}
                        prefix="$"
                        placeholder="2500"
                        hint="Food, utilities, transport, etc. per month"
                        min="0"
                      />
                      <InputField
                        label="Existing Loan Repayments"
                        value={form.existingLoans}
                        onChange={update("existingLoans")}
                        prefix="$"
                        placeholder="0"
                        hint="Monthly repayments on all existing loans"
                        min="0"
                      />
                      <InputField
                        label="Credit Card Limits"
                        value={form.creditCards}
                        onChange={update("creditCards")}
                        prefix="$"
                        placeholder="0"
                        hint="Total credit card limits (not balance)"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Loan Details */}
                  <div>
                    <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-gold" />
                      Loan Parameters
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="Interest Rate"
                        value={form.interestRate}
                        onChange={update("interestRate")}
                        suffix="%"
                        placeholder="6.50"
                        hint="Expected interest rate p.a."
                        min="0.1"
                        max="20"
                        step="0.05"
                      />
                      <InputField
                        label="Loan Term"
                        value={form.loanTerm}
                        onChange={update("loanTerm")}
                        suffix="yrs"
                        placeholder="30"
                        hint="Typical terms: 25 or 30 years"
                        type="number"
                        min="5"
                        max="30"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn-gold flex-1 justify-center">
                      <Calculator size={16} />
                      Calculate Borrowing Capacity
                    </button>
                    {hasCalculated && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn-outline-gold px-4"
                        title="Reset"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}
                  </div>
                </form>

                <p className="mt-4 font-inter text-xs text-charcoal/40 text-center leading-relaxed">
                  This calculator provides an estimate only. Actual borrowing capacity may vary based on lender policies, credit history, and other factors. Speak with a broker for a personalised assessment.
                </p>
              </motion.div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {results ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Main result card */}
                    <div className="bg-charcoal p-8 mb-4 relative">
                      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />

                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={16} className="text-gold" />
                        <span className="font-inter text-xs tracking-[0.2em] uppercase text-gold">
                          Estimated Borrowing Capacity
                        </span>
                      </div>

                      <div className="font-playfair text-4xl md:text-5xl font-semibold text-white mt-3 mb-1 tabular-nums tracking-tight leading-none break-words">
                        {formatCurrency(results.borrowingCapacity)}
                      </div>

                      {results.borrowingCapacity === 0 && (
                        <p className="font-inter text-sm text-white/50 mt-2">
                          Based on your inputs, your current expenses may be too high relative to your income. Consider speaking with a broker.
                        </p>
                      )}

                      <div className="w-8 h-px bg-gold my-4" />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-inter text-xs text-white/40 uppercase tracking-wider mb-1">
                            Monthly Repayment
                          </div>
                          <div className="font-playfair text-xl text-white font-semibold tabular-nums tracking-tight leading-none break-words">
                            {formatCurrency(results.monthlyRepayment)}
                          </div>
                        </div>
                        <div>
                          <div className="font-inter text-xs text-white/40 uppercase tracking-wider mb-1">
                            Annual Repayment
                          </div>
                          <div className="font-playfair text-xl text-white font-semibold tabular-nums tracking-tight leading-none break-words">
                            {formatCurrency(results.annualRepayment)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown card */}
                    <div className="bg-marble-100 border border-marble-300 p-6 mb-4">
                      <h3 className="font-playfair text-base font-semibold text-charcoal mb-4">
                        Income Breakdown
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            label: "Net Monthly Income (est.)",
                            value: formatCurrency(results.netMonthlyIncome),
                          },
                          {
                            label: "Available for Repayments",
                            value: formatCurrency(Math.max(0, results.netMonthlyIncome * 0.35)),
                          },
                          {
                            label: "Monthly Loan Repayment",
                            value: formatCurrency(results.monthlyRepayment),
                            highlight: true,
                          },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between items-center">
                            <span className="font-inter text-xs text-charcoal/60">{row.label}</span>
                            <span
                              className={`font-inter text-sm font-medium tabular-nums ${
                                row.highlight ? "text-gold" : "text-charcoal"
                              }`}
                            >
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      <Link href="/contact" className="btn-gold w-full justify-center">
                        Discuss With a Broker
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        href="/calculators/loan-repayment"
                        className="btn-outline-gold w-full justify-center"
                      >
                        Try Repayment Calculator
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-marble-100 border border-dashed border-marble-300 p-10 text-center"
                  >
                    <Calculator size={40} className="text-gold/30 mx-auto mb-4" />
                    <p className="font-playfair text-lg text-charcoal/40 italic mb-2">
                      Your results will appear here
                    </p>
                    <p className="font-inter text-xs text-charcoal/30">
                      Enter your details and click Calculate
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info card */}
              <div className="mt-6 p-6 border border-gold/20 bg-gold-50">
                <h3 className="font-playfair text-base font-semibold text-charcoal mb-2">
                  Important Note
                </h3>
                <p className="font-inter text-xs text-charcoal/60 leading-relaxed">
                  This estimate uses a 3% assessment rate buffer (as required by APRA guidelines) to stress-test your borrowing capacity. Actual amounts may vary between lenders. Contact us for a precise figure tailored to your situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
