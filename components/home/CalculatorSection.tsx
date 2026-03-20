"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, DollarSign, ArrowRight, Info } from "lucide-react";

type CalcTab = "borrowing" | "repayment";
type Frequency = "monthly" | "fortnightly" | "weekly";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── Borrowing Capacity Calculator ───
interface BorrowingInputs {
  annualIncome: string;
  partnerIncome: string;
  livingExpenses: string;
  existingLoans: string;
  creditCards: string;
  interestRate: string;
  loanTerm: string;
}

const defaultBorrowing: BorrowingInputs = {
  annualIncome: "",
  partnerIncome: "",
  livingExpenses: "2500",
  existingLoans: "0",
  creditCards: "0",
  interestRate: "6.50",
  loanTerm: "30",
};

function calcBorrowing(d: BorrowingInputs) {
  const income = (parseFloat(d.annualIncome) || 0) + (parseFloat(d.partnerIncome) || 0);
  if (income <= 0) return null;
  const netMonthly = (income * 0.78) / 12;
  const available = netMonthly * 0.35 - (parseFloat(d.existingLoans) || 0) - (parseFloat(d.creditCards) || 0) * 0.03 - (parseFloat(d.livingExpenses) || 0);
  if (available <= 0) return { capacity: 0, monthly: 0, annual: 0 };
  const r = ((parseFloat(d.interestRate) || 6.5) + 3) / 100 / 12;
  const n = (parseInt(d.loanTerm) || 30) * 12;
  const capacity = available * ((1 - Math.pow(1 + r, -n)) / r);
  const actualR = (parseFloat(d.interestRate) || 6.5) / 100 / 12;
  const monthly = (capacity * actualR) / (1 - Math.pow(1 + actualR, -n));
  return { capacity: Math.max(0, capacity), monthly: Math.max(0, monthly), annual: Math.max(0, monthly * 12) };
}

// ─── Loan Repayment Calculator ───
interface RepaymentInputs {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  frequency: Frequency;
}

const defaultRepayment: RepaymentInputs = {
  loanAmount: "500000",
  interestRate: "6.50",
  loanTerm: "30",
  frequency: "monthly",
};

function calcRepayment(d: RepaymentInputs) {
  const P = parseFloat(d.loanAmount) || 0;
  const rate = parseFloat(d.interestRate) / 100 || 0;
  const years = parseInt(d.loanTerm) || 30;
  if (P <= 0 || rate <= 0) return null;
  const ppy = d.frequency === "monthly" ? 12 : d.frequency === "fortnightly" ? 26 : 52;
  const r = rate / ppy;
  const n = years * ppy;
  const repayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { repayment, totalRepaid: repayment * n, totalInterest: repayment * n - P };
}

function InputRow({
  label, value, onChange, prefix, suffix, placeholder, hint, min, max, step,
}: {
  label: string; value: string; onChange: (v: string) => void;
  prefix?: string; suffix?: string; placeholder?: string; hint?: string;
  min?: string; max?: string; step?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 font-inter text-xs uppercase tracking-wider text-white/50 mb-2">
        {label}
        {hint && <span title={hint} className="cursor-help"><Info size={11} className="text-white/30" /></span>}
      </label>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-white/40">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full px-4 py-3 bg-white/5 border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-white/30 ${prefix ? "pl-8" : ""} ${suffix ? "pr-12" : ""}`}
        />
        {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inter text-sm text-white/40">{suffix}</span>}
      </div>
    </div>
  );
}

export default function CalculatorSection() {
  const [activeTab, setActiveTab] = useState<CalcTab>("borrowing");

  // Borrowing state
  const [bForm, setBForm] = useState<BorrowingInputs>(defaultBorrowing);
  const [bCalculated, setBCalculated] = useState(false);
  const bUpdate = (field: keyof BorrowingInputs) => (value: string) =>
    setBForm((p) => ({ ...p, [field]: value }));

  // Repayment state
  const [rForm, setRForm] = useState<RepaymentInputs>(defaultRepayment);
  const [rCalculated, setRCalculated] = useState(false);
  const rUpdate = (field: keyof RepaymentInputs) => (value: string) =>
    setRForm((p) => ({ ...p, [field]: value }));

  const bResult = useMemo(() => bCalculated ? calcBorrowing(bForm) : null, [bForm, bCalculated]);
  const rResult = useMemo(() => rCalculated ? calcRepayment(rForm) : null, [rForm, rCalculated]);

  return (
    <section className="bg-charcoal section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/5 pointer-events-none" />

      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Financial Tools
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-4">
            Know Your Numbers
          </h2>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <p className="text-white/50 font-inter max-w-xl mx-auto">
            Use our free calculators to understand your borrowing power and monthly repayments before speaking with a broker.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex border-b border-white/10 mb-8">
            {([
              { key: "borrowing" as CalcTab, label: "Borrowing Capacity", icon: <DollarSign size={16} /> },
              { key: "repayment" as CalcTab, label: "Loan Repayment", icon: <Calculator size={16} /> },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 font-inter text-sm tracking-wide transition-all duration-300 border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "text-gold border-gold"
                    : "text-white/40 border-transparent hover:text-white/70"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Borrowing Capacity Tab */}
          {activeTab === "borrowing" && (
            <motion.div
              key="borrowing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <form
                  onSubmit={(e) => { e.preventDefault(); setBCalculated(true); }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <InputRow label="Annual Income *" value={bForm.annualIncome} onChange={bUpdate("annualIncome")} prefix="$" placeholder="80000" hint="Gross annual income before tax" min="0" />
                    <InputRow label="Partner Income" value={bForm.partnerIncome} onChange={bUpdate("partnerIncome")} prefix="$" placeholder="0" hint="Leave blank if applying solo" min="0" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <InputRow label="Living Expenses" value={bForm.livingExpenses} onChange={bUpdate("livingExpenses")} prefix="$" placeholder="2500" hint="Monthly living costs" min="0" />
                    <InputRow label="Existing Loans" value={bForm.existingLoans} onChange={bUpdate("existingLoans")} prefix="$" placeholder="0" hint="Monthly loan repayments" min="0" />
                    <InputRow label="Credit Cards" value={bForm.creditCards} onChange={bUpdate("creditCards")} prefix="$" placeholder="0" hint="Total credit card limits" min="0" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputRow label="Interest Rate" value={bForm.interestRate} onChange={bUpdate("interestRate")} suffix="%" placeholder="6.50" min="0.1" max="20" step="0.05" />
                    <InputRow label="Loan Term" value={bForm.loanTerm} onChange={bUpdate("loanTerm")} suffix="yrs" placeholder="30" min="5" max="30" />
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center">
                    <Calculator size={16} />
                    Calculate Borrowing Capacity
                  </button>
                </form>

                {/* Result */}
                <div>
                  {bResult ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/30" />
                        <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                          Estimated Borrowing Capacity
                        </p>
                        <div className="font-playfair text-4xl font-semibold text-white mt-2">
                          {formatCurrency(bResult.capacity)}
                        </div>
                        <div className="w-8 h-px bg-gold my-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="font-inter text-xs text-white/40 uppercase tracking-wider mb-1">Monthly Repayment</div>
                            <div className="font-playfair text-lg text-white font-semibold">{formatCurrency(bResult.monthly)}</div>
                          </div>
                          <div>
                            <div className="font-inter text-xs text-white/40 uppercase tracking-wider mb-1">Annual Repayment</div>
                            <div className="font-playfair text-lg text-white font-semibold">{formatCurrency(bResult.annual)}</div>
                          </div>
                        </div>
                      </div>
                      <Link href="/contact" className="btn-gold w-full justify-center">
                        Speak with a Broker <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className="h-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center py-16 text-center">
                      <DollarSign size={36} className="text-gold/30 mb-4" />
                      <p className="font-playfair text-lg text-white/30 italic mb-1">Your results will appear here</p>
                      <p className="font-inter text-xs text-white/20">Enter your details and click Calculate</p>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-5 font-inter text-xs text-white/30 text-center">
                Estimate only. Uses a 3% assessment rate buffer per APRA guidelines. Actual amounts may vary between lenders.
              </p>
            </motion.div>
          )}

          {/* Loan Repayment Tab */}
          {activeTab === "repayment" && (
            <motion.div
              key="repayment"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <form
                  onSubmit={(e) => { e.preventDefault(); setRCalculated(true); }}
                  className="space-y-5"
                >
                  <InputRow label="Loan Amount *" value={rForm.loanAmount} onChange={rUpdate("loanAmount")} prefix="$" placeholder="500000" min="10000" />
                  <InputRow label="Interest Rate (p.a.) *" value={rForm.interestRate} onChange={rUpdate("interestRate")} suffix="%" placeholder="6.50" min="0.1" max="20" step="0.05" />
                  <InputRow label="Loan Term *" value={rForm.loanTerm} onChange={rUpdate("loanTerm")} suffix="yrs" placeholder="30" min="1" max="30" />

                  <div>
                    <label className="block font-inter text-xs uppercase tracking-wider text-white/50 mb-2">Repayment Frequency</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["monthly", "fortnightly", "weekly"] as Frequency[]).map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setRForm((p) => ({ ...p, frequency: freq }))}
                          className={`py-2.5 text-xs font-inter capitalize border transition-all duration-200 ${
                            rForm.frequency === freq
                              ? "bg-gold text-white border-gold"
                              : "bg-white/5 text-white/50 border-white/10 hover:border-gold hover:text-gold"
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

                {/* Result */}
                <div>
                  {rResult ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/30" />
                        <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                          {rForm.frequency.charAt(0).toUpperCase() + rForm.frequency.slice(1)} Repayment
                        </p>
                        <div className="font-playfair text-4xl font-semibold text-white mt-2">
                          {formatCurrency(rResult.repayment)}
                        </div>
                        <p className="font-inter text-xs text-white/40 mt-1">
                          per {rForm.frequency === "monthly" ? "month" : rForm.frequency === "fortnightly" ? "fortnight" : "week"}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-px bg-white/10">
                        {[
                          { label: "Loan Amount", value: formatCurrency(parseFloat(rForm.loanAmount) || 0) },
                          { label: "Total Interest", value: formatCurrency(rResult.totalInterest) },
                          { label: "Total Repaid", value: formatCurrency(rResult.totalRepaid) },
                        ].map((item) => (
                          <div key={item.label} className="bg-charcoal p-4 text-center">
                            <div className="font-inter text-xs text-white/40 uppercase tracking-wider mb-1">{item.label}</div>
                            <div className="font-playfair text-sm font-semibold text-white">{item.value}</div>
                          </div>
                        ))}
                      </div>

                      <Link href="/contact" className="btn-gold w-full justify-center">
                        Speak with a Broker <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className="h-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center py-16 text-center">
                      <Calculator size={36} className="text-gold/30 mb-4" />
                      <p className="font-playfair text-lg text-white/30 italic mb-1">Your results will appear here</p>
                      <p className="font-inter text-xs text-white/20">Enter your loan details and click Calculate</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Link to full calculator pages */}
          <div className="mt-8 text-center">
            <Link
              href={activeTab === "borrowing" ? "/calculators/borrowing-capacity" : "/calculators/loan-repayment"}
              className="inline-flex items-center gap-2 font-inter text-sm text-gold hover:text-gold-light transition-colors"
            >
              Open full calculator page
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
