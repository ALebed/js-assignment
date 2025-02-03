import {normalizeQuantRanking, normalizeUser} from "./normalizers";
import {QuantRankingDTO, UserDTO} from "../services/DTOs";

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