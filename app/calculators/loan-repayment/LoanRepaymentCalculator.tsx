"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PageHero from "@/components/PageHero";
import { Calculator, ArrowRight } from "lucide-react";

type Frequency = "monthly" | "fortnightly" | "weekly";
type CalcTab = "standard" | "extra";

interface LoanInputs {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  frequency: Frequency;
}

interface ExtraInputs extends LoanInputs {
  extraRepayment: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateRepayments(inputs: LoanInputs) {
  const P = parseFloat(inputs.loanAmount) || 0;
  const annualRate = parseFloat(inputs.interestRate) / 100 || 0;
  const years = parseInt(inputs.loanTerm) || 30;

  if (P <= 0 || annualRate <= 0) return null;

  const periodsPerYear = inputs.frequency === "monthly" ? 12 : inputs.frequency === "fortnightly" ? 26 : 52;
  const r = annualRate / periodsPerYear;
  const n = years * periodsPerYear;

  // PMT formula
  const repayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalRepaid = repayment * n;
  const totalInterest = totalRepaid - P;

  // Generate amortisation data (yearly for chart)
  const chartData: { year: string; balance: number; principal: number; interest: number }[] = [];
  let balance = P;
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;

  for (let period = 1; period <= n; period++) {
    const interestPayment = balance * r;
    const principalPayment = repayment - interestPayment;
    balance -= principalPayment;
    yearlyPrincipal += principalPayment;
    yearlyInterest += interestPayment;

    if (period % periodsPerYear === 0 || period === n) {
      const year = Math.ceil(period / periodsPerYear);
      chartData.push({
        year: `Yr ${year}`,
        balance: Math.max(0, balance),
        principal: yearlyPrincipal,
        interest: yearlyInterest,
      });
      yearlyPrincipal = 0;
      yearlyInterest = 0;
    }
  }

  return {
    repayment,
    totalRepaid,
    totalInterest,
    chartData,
    periodsPerYear,
    n,
    years,
  };
}

function calculateExtraRepayments(inputs: ExtraInputs) {
  const P = parseFloat(inputs.loanAmount) || 0;
  const annualRate = parseFloat(inputs.interestRate) / 100 || 0;
  const years = parseInt(inputs.loanTerm) || 30;
  const extraPerPeriod = parseFloat(inputs.extraRepayment) || 0;

  if (P <= 0 || annualRate <= 0) return null;

  const periodsPerYear = inputs.frequency === "monthly" ? 12 : inputs.frequency === "fortnightly" ? 26 : 52;
  const r = annualRate / periodsPerYear;
  const n = years * periodsPerYear;

  // Standard repayment
  const stdRepayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const stdTotalRepaid = stdRepayment * n;
  const stdTotalInterest = stdTotalRepaid - P;

  // Extra repayment scenario
  const totalRepaymentPerPeriod = stdRepayment + extraPerPeriod;

  // Chart data for comparison
  const chartData: {
    year: string;
    standardBalance: number;
    extraBalance: number;
  }[] = [];

  // Standard scenario balance over time
  let stdBalance = P;
  // Extra scenario balance over time
  let extraBalance = P;
  let extraTotalInterest = 0;
  let extraPeriodsToPayoff = 0;
  let extraPaidOff = false;

  for (let period = 1; period <= n; period++) {
    // Standard
    const stdInterest = stdBalance * r;
    const stdPrincipal = stdRepayment - stdInterest;
    stdBalance = Math.max(0, stdBalance - stdPrincipal);

    // Extra
    if (!extraPaidOff) {
      const extraInterestPayment = extraBalance * r;
      extraTotalInterest += extraInterestPayment;
      const extraPrincipalPayment = totalRepaymentPerPeriod - extraInterestPayment;
      extraBalance = Math.max(0, extraBalance - extraPrincipalPayment);
      if (extraBalance <= 0 && !extraPaidOff) {
        extraPaidOff = true;
        extraPeriodsToPayoff = period;
      }
    }

    if (period % periodsPerYear === 0 || period === n) {
      const year = Math.ceil(period / periodsPerYear);
      chartData.push({
        year: `Yr ${year}`,
        standardBalance: Math.max(0, stdBalance),
        extraBalance: Math.max(0, extraBalance),
      });
    }
  }

  if (!extraPaidOff) extraPeriodsToPayoff = n;

  const stdYearsToPayoff = years;
  const extraYearsToPayoff = extraPeriodsToPayoff / periodsPerYear;
  const timeSaved = stdYearsToPayoff - extraYearsToPayoff;
  const interestSaved = stdTotalInterest - extraTotalInterest;

  return {
    stdRepayment,
    totalRepaymentPerPeriod,
    stdTotalInterest,
    extraTotalInterest,
    interestSaved: Math.max(0, interestSaved),
    stdYearsToPayoff,
    extraYearsToPayoff,
    timeSaved: Math.max(0, timeSaved),
    chartData,
    periodsPerYear,
  };
}

const defaultInputs: LoanInputs = {
  loanAmount: "500000",
  interestRate: "6.50",
  loanTerm: "30",
  frequency: "monthly",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-marble-300 p-3 shadow-luxury text-xs font-inter">
        <p className="text-charcoal font-semibold mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function LoanRepaymentCalculator() {
  const [calcTab, setCalcTab] = useState<CalcTab>("standard");
  const [inputs, setInputs] = useState<LoanInputs>(defaultInputs);
  const [extraRepayment, setExtraRepayment] = useState("500");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [hasExtraCalculated, setHasExtraCalculated] = useState(false);

  const update = (field: keyof LoanInputs) => (value: string) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  const liveResults = useMemo(() => calculateRepayments(inputs), [inputs]);
  const displayed = hasCalculated ? liveResults : null;

  const extraResults = useMemo(
    () =>
      hasExtraCalculated
        ? calculateExtraRepayments({ ...inputs, extraRepayment })
        : null,
    [inputs, extraRepayment, hasExtraCalculated]
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const handleExtraCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasExtraCalculated(true);
    // Also calculate standard if not already done
    if (!hasCalculated) setHasCalculated(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Financial Calculator"
        title="Loan Repayment Calculator"
        subtitle="Calculate your mortgage repayments and see how your loan balance reduces over time."
        breadcrumb={[
          { label: "Calculators", href: "/calculators/borrowing-capacity" },
          { label: "Loan Repayment", href: "/calculators/loan-repayment" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-luxury space-y-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-marble-300">
            {([
              { key: "standard" as CalcTab, label: "Standard Repayments" },
              { key: "extra" as CalcTab, label: "Extra Repayments" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCalcTab(tab.key)}
                className={`px-6 py-3 font-inter text-sm tracking-wide transition-all duration-300 border-b-2 -mb-px ${
                  calcTab === tab.key
                    ? "text-gold border-gold font-medium"
                    : "text-charcoal/40 border-transparent hover:text-charcoal/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Standard Tab */}
          {calcTab === "standard" && (
            <motion.div
              key="standard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Inputs + Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-marble-100 border border-marble-300 p-8"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Calculator size={20} className="text-gold" />
                      <h2 className="font-playfair text-xl font-semibold text-charcoal">
                        Loan Details
                      </h2>
                    </div>

                    <form onSubmit={handleCalculate} className="space-y-5">
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Loan Amount *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">$</span>
                          <input
                            type="number"
                            value={inputs.loanAmount}
                            onChange={(e) => update("loanAmount")(e.target.value)}
                            className="input-luxury pl-8"
                            placeholder="500000"
                            min="10000"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Interest Rate (p.a.) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={inputs.interestRate}
                            onChange={(e) => update("interestRate")(e.target.value)}
                            className="input-luxury pr-12"
                            placeholder="6.50"
                            min="0.1"
                            max="20"
                            step="0.05"
                            required
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">%</span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Loan Term *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={inputs.loanTerm}
                            onChange={(e) => update("loanTerm")(e.target.value)}
                            className="input-luxury pr-16"
                            placeholder="30"
                            min="1"
                            max="30"
                            required
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">years</span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Repayment Frequency
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["monthly", "fortnightly", "weekly"] as Frequency[]).map((freq) => (
                            <button
                              key={freq}
                              type="button"
                              onClick={() => update("frequency")(freq)}
                              className={`py-2.5 text-xs font-inter capitalize border transition-all duration-200 ${
                                inputs.frequency === freq
                                  ? "bg-gold text-white border-gold"
                                  : "bg-white text-charcoal/60 border-marble-300 hover:border-gold hover:text-gold"
                              }`}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button type="submit" className="btn-gold w-full justify-center">
                        <Calculator size={16} />
                        Calculate Repayments
                      </button>
                    </form>
                  </motion.div>
                </div>

                {/* Results Summary */}
                <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                    {displayed ? (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        {/* Primary result */}
                        <div className="bg-charcoal p-8 relative">
                          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
                          <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                            {inputs.frequency.charAt(0).toUpperCase() + inputs.frequency.slice(1)} Repayment
                          </p>
                          <div className="font-playfair text-5xl font-semibold text-white mt-2 mb-1">
                            {formatCurrency(displayed.repayment)}
                          </div>
                          <p className="font-inter text-xs text-white/40">
                            per {inputs.frequency === "monthly" ? "month" : inputs.frequency === "fortnightly" ? "fortnight" : "week"}
                          </p>
                        </div>

                        {/* Breakdown */}
                        <div className="grid grid-cols-3 gap-px bg-marble-300">
                          {[
                            { label: "Loan Amount", value: formatCurrency(parseFloat(inputs.loanAmount) || 0) },
                            { label: "Total Interest", value: formatCurrency(displayed.totalInterest) },
                            { label: "Total Repaid", value: formatCurrency(displayed.totalRepaid) },
                          ].map((item) => (
                            <div key={item.label} className="bg-marble-100 p-5 text-center">
                              <div className="font-inter text-xs text-charcoal/50 uppercase tracking-wider mb-1">
                                {item.label}
                              </div>
                              <div className="font-playfair text-lg font-semibold text-charcoal">
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Interest vs Principal visual */}
                        <div className="bg-white border border-marble-300 p-6">
                          <div className="flex justify-between mb-3">
                            <span className="font-inter text-xs text-charcoal/60">Principal vs Interest split</span>
                            <span className="font-inter text-xs text-charcoal/60">
                              {Math.round((parseFloat(inputs.loanAmount) / displayed.totalRepaid) * 100)}% principal
                            </span>
                          </div>
                          <div className="h-3 bg-marble-300 relative overflow-hidden">
                            <div
                              className="absolute left-0 top-0 h-full bg-gold"
                              style={{
                                width: `${(parseFloat(inputs.loanAmount) / displayed.totalRepaid) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="flex gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-gold" />
                              <span className="font-inter text-xs text-charcoal/60">Principal</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-marble-300" />
                              <span className="font-inter text-xs text-charcoal/60">Interest</span>
                            </div>
                          </div>
                        </div>

                        <Link href="/contact" className="btn-gold w-full justify-center">
                          Speak with a Broker
                          <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full bg-marble-100 border border-dashed border-marble-300 flex flex-col items-center justify-center py-20 text-center"
                      >
                        <Calculator size={40} className="text-gold/30 mx-auto mb-4" />
                        <p className="font-playfair text-lg text-charcoal/40 italic mb-2">
                          Your results will appear here
                        </p>
                        <p className="font-inter text-xs text-charcoal/30">
                          Enter your loan details and click Calculate
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Amortisation Chart */}
              <AnimatePresence>
                {displayed && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-marble-100 border border-marble-300 p-8 mt-8"
                  >
                    <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                      Loan Balance Over Time
                    </h3>
                    <div className="w-10 h-px bg-gold mb-8" />
                    <ResponsiveContainer width="100%" height={320}>
                      <AreaChart data={displayed.chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C8A96A" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#C8A96A" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8F7A4F" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#8F7A4F" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 11, fontFamily: "var(--font-inter)", fill: "#9A9A9A" }}
                          tickLine={false}
                          axisLine={{ stroke: "#E5E5E5" }}
                        />
                        <YAxis
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 11, fontFamily: "var(--font-inter)", fill: "#9A9A9A" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-inter)" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          name="Remaining Balance"
                          stroke="#C8A96A"
                          strokeWidth={2}
                          fill="url(#balanceGrad)"
                        />
                        <Area
                          type="monotone"
                          dataKey="interest"
                          name="Annual Interest"
                          stroke="#8F7A4F"
                          strokeWidth={1.5}
                          fill="url(#interestGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Extra Repayments Tab */}
          {calcTab === "extra" && (
            <motion.div
              key="extra"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <div className="bg-marble-100 border border-marble-300 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Calculator size={20} className="text-gold" />
                      <h2 className="font-playfair text-xl font-semibold text-charcoal">
                        Extra Repayment Details
                      </h2>
                    </div>

                    <form onSubmit={handleExtraCalculate} className="space-y-5">
                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Loan Amount *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">$</span>
                          <input
                            type="number"
                            value={inputs.loanAmount}
                            onChange={(e) => update("loanAmount")(e.target.value)}
                            className="input-luxury pl-8"
                            placeholder="500000"
                            min="10000"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Interest Rate (p.a.) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={inputs.interestRate}
                            onChange={(e) => update("interestRate")(e.target.value)}
                            className="input-luxury pr-12"
                            placeholder="6.50"
                            min="0.1"
                            max="20"
                            step="0.05"
                            required
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">%</span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Loan Term *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={inputs.loanTerm}
                            onChange={(e) => update("loanTerm")(e.target.value)}
                            className="input-luxury pr-16"
                            placeholder="30"
                            min="1"
                            max="30"
                            required
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">years</span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-2">
                          Repayment Frequency
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["monthly", "fortnightly", "weekly"] as Frequency[]).map((freq) => (
                            <button
                              key={freq}
                              type="button"
                              onClick={() => update("frequency")(freq)}
                              className={`py-2.5 text-xs font-inter capitalize border transition-all duration-200 ${
                                inputs.frequency === freq
                                  ? "bg-gold text-white border-gold"
                                  : "bg-white text-charcoal/60 border-marble-300 hover:border-gold hover:text-gold"
                              }`}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-marble-300">
                        <label className="block font-inter text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                          Extra Repayment (per {inputs.frequency === "monthly" ? "month" : inputs.frequency === "fortnightly" ? "fortnight" : "week"}) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-charcoal/50">$</span>
                          <input
                            type="number"
                            value={extraRepayment}
                            onChange={(e) => setExtraRepayment(e.target.value)}
                            className="input-luxury pl-8 border-gold/40 focus:border-gold"
                            placeholder="500"
                            min="1"
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-gold w-full justify-center">
                        <Calculator size={16} />
                        Calculate Savings
                      </button>
                    </form>
                  </div>
                </div>

                {/* Extra Repayment Results */}
                <div className="lg:col-span-3">
                  {extraResults ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      {/* Savings highlights */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-charcoal p-6 relative">
                          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30" />
                          <p className="font-inter text-xs tracking-[0.15em] uppercase text-gold mb-2">
                            Interest Saved
                          </p>
                          <div className="font-playfair text-3xl font-semibold text-white">
                            {formatCurrency(extraResults.interestSaved)}
                          </div>
                        </div>
                        <div className="bg-charcoal p-6 relative">
                          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30" />
                          <p className="font-inter text-xs tracking-[0.15em] uppercase text-gold mb-2">
                            Time Saved
                          </p>
                          <div className="font-playfair text-3xl font-semibold text-white">
                            {extraResults.timeSaved >= 1
                              ? `${Math.floor(extraResults.timeSaved)} yr${Math.floor(extraResults.timeSaved) !== 1 ? "s" : ""} ${Math.round((extraResults.timeSaved % 1) * 12)} mo`
                              : `${Math.round(extraResults.timeSaved * 12)} months`}
                          </div>
                        </div>
                      </div>

                      {/* Comparison table */}
                      <div className="bg-white border border-marble-300">
                        <div className="grid grid-cols-3 gap-px bg-marble-300">
                          <div className="bg-marble-100 p-4">
                            <div className="font-inter text-xs text-charcoal/40 uppercase tracking-wider">&nbsp;</div>
                          </div>
                          <div className="bg-marble-100 p-4 text-center">
                            <div className="font-inter text-xs text-charcoal/50 uppercase tracking-wider font-semibold">Without Extra</div>
                          </div>
                          <div className="bg-marble-100 p-4 text-center">
                            <div className="font-inter text-xs text-gold uppercase tracking-wider font-semibold">With Extra</div>
                          </div>
                        </div>
                        {[
                          {
                            label: "Repayment",
                            std: formatCurrency(extraResults.stdRepayment),
                            extra: formatCurrency(extraResults.totalRepaymentPerPeriod),
                          },
                          {
                            label: "Total Interest",
                            std: formatCurrency(extraResults.stdTotalInterest),
                            extra: formatCurrency(extraResults.extraTotalInterest),
                          },
                          {
                            label: "Loan Paid Off In",
                            std: `${extraResults.stdYearsToPayoff} years`,
                            extra: `${extraResults.extraYearsToPayoff.toFixed(1)} years`,
                          },
                        ].map((row) => (
                          <div key={row.label} className="grid grid-cols-3 gap-px bg-marble-300">
                            <div className="bg-white p-4">
                              <span className="font-inter text-xs text-charcoal/60">{row.label}</span>
                            </div>
                            <div className="bg-white p-4 text-center">
                              <span className="font-inter text-sm text-charcoal">{row.std}</span>
                            </div>
                            <div className="bg-white p-4 text-center">
                              <span className="font-inter text-sm text-gold font-semibold">{row.extra}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link href="/contact" className="btn-gold w-full justify-center">
                        Speak with a Broker
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="h-full bg-marble-100 border border-dashed border-marble-300 flex flex-col items-center justify-center py-20 text-center">
                      <Calculator size={40} className="text-gold/30 mx-auto mb-4" />
                      <p className="font-playfair text-lg text-charcoal/40 italic mb-2">
                        See how extra repayments save you money
                      </p>
                      <p className="font-inter text-xs text-charcoal/30">
                        Enter your loan details and extra repayment amount
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Chart */}
              <AnimatePresence>
                {extraResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-marble-100 border border-marble-300 p-8 mt-8"
                  >
                    <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                      Loan Balance Comparison
                    </h3>
                    <p className="font-inter text-xs text-charcoal/50 mb-2">
                      See how much sooner you can pay off your loan and how much interest you save with extra repayments.
                    </p>
                    <div className="w-10 h-px bg-gold mb-8" />
                    <ResponsiveContainer width="100%" height={360}>
                      <AreaChart data={extraResults.chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="stdGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8F7A4F" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#8F7A4F" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="extraGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 11, fontFamily: "var(--font-inter)", fill: "#9A9A9A" }}
                          tickLine={false}
                          axisLine={{ stroke: "#E5E5E5" }}
                        />
                        <YAxis
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 11, fontFamily: "var(--font-inter)", fill: "#9A9A9A" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-inter)" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="standardBalance"
                          name="Without Extra Repayments"
                          stroke="#8F7A4F"
                          strokeWidth={2}
                          fill="url(#stdGrad)"
                        />
                        <Area
                          type="monotone"
                          dataKey="extraBalance"
                          name="With Extra Repayments"
                          stroke="#22C55E"
                          strokeWidth={2}
                          fill="url(#extraGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
