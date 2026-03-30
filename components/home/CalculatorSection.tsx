"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, DollarSign, ArrowRight, Info, Home, RefreshCw } from "lucide-react";

type CalcTab = "borrowing" | "repayment" | "purchase" | "refinance";
type Frequency = "monthly" | "fortnightly" | "weekly";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyDecimal(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

// ─── Purchase Costs Calculator ───
interface PurchaseInputs {
  propertyValue: string;
  conveyancerFees: string;
  buildingPestFees: string;
}

const defaultPurchase: PurchaseInputs = {
  propertyValue: "600000",
  conveyancerFees: "2000",
  buildingPestFees: "550",
};

const REGISTRATION_FEE = 238.14;

function calcStampDuty(value: number): number {
  // VIC general stamp duty rates
  if (value <= 25000) return value * 0.014;
  if (value <= 130000) return 350 + (value - 25000) * 0.024;
  if (value <= 960000) return 2870 + (value - 130000) * 0.06;
  return 52670 + (value - 960000) * 0.055;
}

function calcTransferFee(value: number): number {
  // VIC approximate land transfer registration fee
  if (value <= 130000) return 1134;
  if (value <= 440000) return 1134 + (value - 130000) * 0.0023;
  if (value <= 960000) return 1847 + (value - 440000) * 0.0018;
  return 2783 + (value - 960000) * 0.0014;
}

function calcPurchaseCosts(d: PurchaseInputs) {
  const value = parseFloat(d.propertyValue) || 0;
  if (value <= 0) return null;
  const stampDuty = calcStampDuty(value);
  const transferFee = calcTransferFee(value);
  const registrationFee = REGISTRATION_FEE;
  const conveyancerFees = parseFloat(d.conveyancerFees) || 2000;
  const buildingPestFees = parseFloat(d.buildingPestFees) || 550;
  const total = stampDuty + transferFee + registrationFee + conveyancerFees + buildingPestFees;
  return { stampDuty, transferFee, registrationFee, conveyancerFees, buildingPestFees, total };
}

// ─── Refinance Calculator ───
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

function calcRefinance(d: RefinanceInputs) {
  const P = parseFloat(d.currentBalance) || 0;
  const curRateRaw = parseFloat(d.currentRate);
  const curTerm = parseInt(d.remainingTerm) || 25;
  const newRateRaw = parseFloat(d.newRate);
  const newTerm = parseInt(d.newTerm) || 25;
  if (P <= 0 || isNaN(curRateRaw) || curRateRaw <= 0 || isNaN(newRateRaw) || newRateRaw <= 0) return null;

  const curRate = curRateRaw / 100;
  const newRate = newRateRaw / 100;
  const curR = curRate / 12;
  const curN = curTerm * 12;
  const curMonthly = (P * curR * Math.pow(1 + curR, curN)) / (Math.pow(1 + curR, curN) - 1);

  const newR = newRate / 12;
  const newN = newTerm * 12;
  const newMonthly = (P * newR * Math.pow(1 + newR, newN)) / (Math.pow(1 + newR, newN) - 1);

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

function InputRow({
  label, value, onChange, prefix, suffix, placeholder, hint, min, max, step, disabled,
}: {
  label: string; value: string; onChange: (v: string) => void;
  prefix?: string; suffix?: string; placeholder?: string; hint?: string;
  min?: string; max?: string; step?: string; disabled?: boolean;
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
          disabled={disabled}
          className={`w-full px-4 py-3 bg-white/5 border border-white/10 text-white font-inter text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 placeholder:text-white/30 disabled:opacity-50 ${prefix ? "pl-8" : ""} ${suffix ? "pr-12" : ""}`}
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

  // Purchase costs state
  const [pForm, setPForm] = useState<PurchaseInputs>(defaultPurchase);
  const [pCalculated, setPCalculated] = useState(false);
  const pUpdate = (field: keyof PurchaseInputs) => (value: string) =>
    setPForm((p) => ({ ...p, [field]: value }));

  // Refinance state
  const [refForm, setRefForm] = useState<RefinanceInputs>(defaultRefinance);
  const [refCalculated, setRefCalculated] = useState(false);
  const refUpdate = (field: keyof RefinanceInputs) => (value: string) =>
    setRefForm((p) => ({ ...p, [field]: value }));

  const bResult = useMemo(() => bCalculated ? calcBorrowing(bForm) : null, [bForm, bCalculated]);
  const rResult = useMemo(() => rCalculated ? calcRepayment(rForm) : null, [rForm, rCalculated]);
  const pResult = useMemo(() => pCalculated ? calcPurchaseCosts(pForm) : null, [pForm, pCalculated]);
  const refResult = useMemo(() => refCalculated ? calcRefinance(refForm) : null, [refForm, refCalculated]);

  const tabs: { key: CalcTab; label: string; icon: React.ReactNode }[] = [
    { key: "borrowing", label: "Borrowing", icon: <DollarSign size={16} /> },
    { key: "repayment", label: "Repayment", icon: <Calculator size={16} /> },
    { key: "purchase", label: "Purchase Costs", icon: <Home size={16} /> },
    { key: "refinance", label: "Refinance", icon: <RefreshCw size={16} /> },
  ];

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
            Use our free calculators to understand your borrowing power, repayments, purchase costs, and refinancing savings.
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
          <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-4 font-inter text-xs sm:text-sm tracking-wide transition-all duration-300 border-b-2 -mb-px whitespace-nowrap ${
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

          {/* ── Borrowing Capacity Tab ── */}
          {activeTab === "borrowing" && (
            <motion.div key="borrowing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={(e) => { e.preventDefault(); setBCalculated(true); }} className="space-y-5">
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
                <div>
                  {bResult ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/30" />
                        <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">Estimated Borrowing Capacity</p>
                        <div className="font-playfair text-4xl font-semibold text-white mt-2">{formatCurrency(bResult.capacity)}</div>
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
                      <Link href="/contact" className="btn-gold w-full justify-center">Speak with a Broker <ArrowRight size={16} /></Link>
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

          {/* ── Loan Repayment Tab ── */}
          {activeTab === "repayment" && (
            <motion.div key="repayment" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={(e) => { e.preventDefault(); setRCalculated(true); }} className="space-y-5">
                  <InputRow label="Loan Amount *" value={rForm.loanAmount} onChange={rUpdate("loanAmount")} prefix="$" placeholder="500000" min="10000" />
                  <InputRow label="Interest Rate (p.a.) *" value={rForm.interestRate} onChange={rUpdate("interestRate")} suffix="%" placeholder="6.50" min="0.1" max="20" step="0.05" hint="Enter your own interest rate" />
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
                <div>
                  {rResult ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/30" />
                        <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">
                          {rForm.frequency.charAt(0).toUpperCase() + rForm.frequency.slice(1)} Repayment
                        </p>
                        <div className="font-playfair text-4xl font-semibold text-white mt-2">{formatCurrency(rResult.repayment)}</div>
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
                      <Link href="/contact" className="btn-gold w-full justify-center">Speak with a Broker <ArrowRight size={16} /></Link>
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

          {/* ── Purchase Costs Tab ── */}
          {activeTab === "purchase" && (
            <motion.div key="purchase" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={(e) => { e.preventDefault(); setPCalculated(true); }} className="space-y-5">
                  <InputRow label="Property Value *" value={pForm.propertyValue} onChange={pUpdate("propertyValue")} prefix="$" placeholder="600000" min="0" hint="Purchase price of the property" />
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-inter text-xs uppercase tracking-wider text-gold mb-4">Adjustable Estimates</p>
                    <div className="grid grid-cols-2 gap-4">
                      <InputRow label="Conveyancer Fees" value={pForm.conveyancerFees} onChange={pUpdate("conveyancerFees")} prefix="$" placeholder="2000" min="0" hint="Estimated conveyancer/solicitor fees" />
                      <InputRow label="Building & Pest" value={pForm.buildingPestFees} onChange={pUpdate("buildingPestFees")} prefix="$" placeholder="550" min="0" hint="Estimated building and pest inspection" />
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-inter text-xs uppercase tracking-wider text-white/40 mb-3">Fixed Fees</p>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-inter text-sm text-white/50">Registration Fees</span>
                      <span className="font-inter text-sm text-white">{formatCurrencyDecimal(REGISTRATION_FEE)}</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center">
                    <Home size={16} />
                    Calculate Purchase Costs
                  </button>
                </form>
                <div>
                  {pResult ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/30" />
                        <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">Total Purchase Costs</p>
                        <div className="font-playfair text-4xl font-semibold text-white mt-2">{formatCurrency(pResult.total)}</div>
                        <div className="w-8 h-px bg-gold my-4" />
                        <div className="space-y-3">
                          {[
                            { label: "Stamp Duty", value: pResult.stampDuty, note: "Based on property value" },
                            { label: "Transfer Fees", value: pResult.transferFee, note: "Based on property value" },
                            { label: "Registration Fees", value: pResult.registrationFee, note: "Fixed" },
                            { label: "Conveyancer Fees", value: pResult.conveyancerFees, note: "Estimate" },
                            { label: "Building & Pest", value: pResult.buildingPestFees, note: "Estimate" },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                              <div>
                                <span className="font-inter text-sm text-white/70">{item.label}</span>
                                <span className="font-inter text-[10px] text-white/30 ml-2">{item.note}</span>
                              </div>
                              <span className="font-playfair text-sm font-semibold text-white">{formatCurrency(item.value)}</span>
                            </div>
                          ))}
                          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                            <span className="font-inter text-sm font-medium text-gold">Total</span>
                            <span className="font-playfair text-lg font-semibold text-gold">{formatCurrency(pResult.total)}</span>
                          </div>
                        </div>
                      </div>
                      <Link href="/contact" className="btn-gold w-full justify-center">Speak with a Broker <ArrowRight size={16} /></Link>
                    </div>
                  ) : (
                    <div className="h-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center py-16 text-center">
                      <Home size={36} className="text-gold/30 mb-4" />
                      <p className="font-playfair text-lg text-white/30 italic mb-1">Your cost breakdown will appear here</p>
                      <p className="font-inter text-xs text-white/20">Enter property value and click Calculate</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-5 font-inter text-xs text-white/30 text-center">
                Estimates based on VIC rates. Stamp duty and transfer fees vary by state. Contact us for accurate figures.
              </p>
            </motion.div>
          )}

          {/* ── Refinance Tab ── */}
          {activeTab === "refinance" && (
            <motion.div key="refinance" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={(e) => { e.preventDefault(); setRefCalculated(true); }} className="space-y-5">
                  <InputRow label="Current Loan Balance *" value={refForm.currentBalance} onChange={refUpdate("currentBalance")} prefix="$" placeholder="500000" min="10000" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputRow label="Current Rate (p.a.) *" value={refForm.currentRate} onChange={refUpdate("currentRate")} suffix="%" placeholder="6.50" min="0.1" max="20" step="0.05" hint="Enter your current interest rate" />
                    <InputRow label="Remaining Term *" value={refForm.remainingTerm} onChange={refUpdate("remainingTerm")} suffix="yrs" placeholder="25" min="1" max="30" />
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-inter text-xs uppercase tracking-wider text-gold mb-4">New Loan Details</p>
                    <div className="grid grid-cols-2 gap-4">
                      <InputRow label="New Rate (p.a.) *" value={refForm.newRate} onChange={refUpdate("newRate")} suffix="%" placeholder="5.99" min="0.1" max="20" step="0.05" hint="Enter the new interest rate" />
                      <InputRow label="New Loan Term *" value={refForm.newTerm} onChange={refUpdate("newTerm")} suffix="yrs" placeholder="25" min="1" max="30" />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center">
                    <RefreshCw size={16} />
                    Calculate Savings
                  </button>
                </form>
                <div>
                  {refResult ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-8 relative">
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/30" />
                        <p className="font-inter text-xs tracking-[0.2em] uppercase text-gold mb-2">Monthly Saving</p>
                        <div className="font-playfair text-4xl font-semibold text-white mt-2">
                          {refResult.monthlySaving > 0 ? formatCurrency(refResult.monthlySaving) : "$0"}
                        </div>
                        <p className="font-inter text-xs text-white/40 mt-1">per month</p>
                        <div className="w-8 h-px bg-gold my-4" />
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-inter text-sm text-white/50">Current Monthly</span>
                            <span className="font-playfair text-sm font-semibold text-white">{formatCurrency(refResult.currentMonthly)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-inter text-sm text-white/50">New Monthly</span>
                            <span className="font-playfair text-sm font-semibold text-gold">{formatCurrency(refResult.newMonthly)}</span>
                          </div>
                          <div className="border-t border-white/10 pt-3 flex justify-between">
                            <span className="font-inter text-sm text-white/50">Annual Saving</span>
                            <span className="font-playfair text-sm font-semibold text-white">{formatCurrency(refResult.annualSaving)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-inter text-sm font-medium text-gold">Total Saving Over Life</span>
                            <span className="font-playfair text-lg font-semibold text-gold">
                              {refResult.totalSaving > 0 ? formatCurrency(refResult.totalSaving) : "$0"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link href="/contact" className="btn-gold w-full justify-center">Speak with a Broker <ArrowRight size={16} /></Link>
                    </div>
                  ) : (
                    <div className="h-full bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center py-16 text-center">
                      <RefreshCw size={36} className="text-gold/30 mb-4" />
                      <p className="font-playfair text-lg text-white/30 italic mb-1">Your savings will appear here</p>
                      <p className="font-inter text-xs text-white/20">Enter your current and new loan details</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-5 font-inter text-xs text-white/30 text-center">
                Estimate only. Does not include refinancing costs such as discharge fees or new loan establishment fees.
              </p>
            </motion.div>
          )}

          {/* Link to full calculator page */}
          <div className="mt-8 text-center">
            <Link
              href="/calculators"
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
