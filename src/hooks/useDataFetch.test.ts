import {renderHook, act} from "@testing-library/react";
import {useDataFetch} from "./useDataFetch";
import api from "../services/api";
import {normalizeUser, normalizeQuantRanking, normalizeRatingsSummary} from "./normalizeData";
import {QuantRankingDTO, RatingsSummaryDTO, UserDTO} from "./dataTypes";

jest.mock("../services/api");

const mockUserDTO: UserDTO = {premium: true};
const mockQuantRankingDTO: QuantRankingDTO = {
    sector: "Sector",
    industry: "Industry",
    rankings: {
        industry_specific: {rank: 5, total: 100},
        sector: {rank: 2, total: 50},
        overall: {rank: 3, total: 70},
    },
};
const mockRatingsSummary: RatingsSummaryDTO = {
    SA_Analysts: {rating: "Rating1", score: 3},
    Wall_Street: {rating: "Rating2", score: 5},
    Quant: {rating: "Rating3", score: 2},
};
const mockUser = normalizeUser(mockUserDTO);
const mockQuantRanking = normalizeQuantRanking(mockQuantRankingDTO);
const mockRatingSummaryList = normalizeRatingsSummary(mockRatingsSummary);

describe("useDataFetch Hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch and set data correctly", async () => {
        (api as jest.Mock).mockImplementation((path) => {
            if (path === "user") return Promise.resolve(mockUserDTO);
            if (path === "ratings-summary") return Promise.resolve(mockRatingsSummary);
            if (path === "quant-ranking") return Promise.resolve(mockQuantRankingDTO);
        });

        const {result} = renderHook(() => useDataFetch());

        expect(result.current.isLoaded).toBe(false);
        expect(result.current.hasError).toBe(false);
        expect(result.current.model).toEqual({});

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(false);
        expect(result.current.model).toEqual({
            user: mockUser,
            summary: mockRatingSummaryList,
            ranking: mockQuantRanking,
        });
    });

    it("should handle API errors", async () => {
        (api as jest.Mock).mockRejectedValue(new Error("API Error"));

        const {result} = renderHook(() => useDataFetch());

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(true);
    });
});
