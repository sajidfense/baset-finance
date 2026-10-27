/**
 * Refer & Earn results shown on /referrer-program.
 *
 * Update this list (and `asOf`) whenever a referral settles — the programme
 * totals are calculated from these rows.
 */
export interface ReferrerResult {
  name: string;
  referred: number;
  settled: number;
  commission: number;
}

export const referralStatsAsOf = "October 2026";

export const referrerResults: ReferrerResult[] = [
  { name: "Sarah", referred: 2090000, settled: 2090000, commission: 3393 },
  { name: "David", referred: 703500, settled: 703500, commission: 1099 },
];

export const referralTotals = referrerResults.reduce(
  (sum, r) => ({
    referred: sum.referred + r.referred,
    settled: sum.settled + r.settled,
    commission: sum.commission + r.commission,
  }),
  { referred: 0, settled: 0, commission: 0 }
);
