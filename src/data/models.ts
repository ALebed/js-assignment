// User data models
export interface User {
    isPremium: boolean;
}

// Ratings Summary
export interface RatingsSummary {
    label: string;
    rating: "BUY" | "HOLD";
    score: number;
}

// Quant Ranking data models
export interface Ranking {
    type: QuantRankingTitleType;
    rank: number;
    total: number;
}
export interface QuantRanking {
    sector: string;
    industry: string;
    rankings: Ranking[];
}
export const titleMap: Record<string, string> = {
    overall: "Ranked Overall",
    sector: "Ranked in Sector",
    industrySpecific: "Ranked in Industry",
};
export type QuantRankingTitleType = keyof typeof titleMap;

// Factor Grades
export type FactorGradesLabel = "Valuation" | "Growth" | "Profitability" | "Momentum" | "Revisions";
export interface FactorGrades {
    label: FactorGradesLabel;
    current: string;
    threeMonths: string;
    sixMonths: string;
}