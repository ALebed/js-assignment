import {
    getTitleByType,
    normalizeFactorGrades,
    normalizeQuantRanking,
    normalizeRatingsSummary,
    normalizeUser
} from "./normalizers";
import {FactorGradesDTO, QuantRankingDTO, RatingsSummaryDTO, UserDTO} from "../services/DTOs";

describe("normalizeUser", () => {
    test("should normalize userDTO to User", () => {
        const userDTO: UserDTO = { premium: true };
        expect(normalizeUser(userDTO)).toEqual({ isPremium: true });
    });
});

describe("normalizeQuantRanking", () => {
    test("should normalize QuantRankingDTO to QuantRanking", () => {
        const quantRankingDTO: QuantRankingDTO = {
            sector: "Tech",
            industry: "Software",
            rankings: {
                overall: { rank: 1, total: 100 },
                sector: { rank: 2, total: 100 },
                industry_specific: { rank: 3, total: 100 },
            }
        };
        expect(normalizeQuantRanking(quantRankingDTO)).toEqual({
            sector: "Tech",
            industry: "Software",
            rankings: [
                { type: "overall", rank: 1, total: 100 },
                { type: "sector", rank: 2, total: 100 },
                { type: "industrySpecific", rank: 3, total: 100 },
            ]
        });
    });
});

describe("normalizeRatingsSummary", () => {
    it("should normalize RatingsSummaryDTO to RatingsSummaryList", () => {
        const input: RatingsSummaryDTO = {
            SA_Analysts: { rating: "BUY", score: 85 },
            Wall_Street: { rating: "HOLD", score: 60 },
            Quant: { rating: "BUY", score: 90 },
        };

        const result = normalizeRatingsSummary(input);

        expect(result).toEqual([
            { label: "SA Analysts", rating: "BUY", score: 85 },
            { label: "Wall Street", rating: "HOLD", score: 60 },
            { label: "Quant", rating: "BUY", score: 90 },
        ]);
    });
});

describe("normalizeFactorGrades", () => {
    it("should normalize FactorGradesDTO to FactorGrades", () => {
        const input: FactorGradesDTO = [
            {
                Valuation: { current: "A" },
                Growth: { current: "B" },
                Profitability: { current: "C" },
                Momentum: { current: "D" },
                Revisions: { current: "E" },
            },
            {
                Valuation: "A-",
                Growth: "B+",
                Profitability: "C-",
                Momentum: "D+",
                Revisions: "E+",
            },
            {
                data: [
                    ["Valuation", "A"],
                    ["Growth", "B"],
                    ["Profitability", "C"],
                    ["Momentum", "D"],
                    ["Revisions", "E"],
                ],
            },
        ];

        const result = normalizeFactorGrades(input);

        expect(result).toEqual([
            { label: "Valuation", current: "A", threeMonths: "A-", sixMonths: "A" },
            { label: "Growth", current: "B", threeMonths: "B+", sixMonths: "B" },
            { label: "Profitability", current: "C", threeMonths: "C-", sixMonths: "C" },
            { label: "Momentum", current: "D", threeMonths: "D+", sixMonths: "D" },
            { label: "Revisions", current: "E", threeMonths: "E+", sixMonths: "E" },
        ]);
    });
});

describe("getTitleByType", () => {
    it("should return correct title for known types", () => {
        expect(getTitleByType("overall")).toBe("Ranked Overall");
        expect(getTitleByType("sector")).toBe("Ranked in Sector");
        expect(getTitleByType("industrySpecific")).toBe("Ranked in Industry");
    });

    it("should return input type if not found in titleMap", () => {
        expect(getTitleByType("unknownType")).toBe("unknownType");
    });
});