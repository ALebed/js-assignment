import {renderHook, act} from "@testing-library/react";
import {useDataFetch} from "./useDataFetch";
import api from "../services/api";
import {normalizeUser, normalizeQuantRanking} from "./normalizeData";
import {QuantRankingDTO, UserDTO} from "./dataTypes";

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
const mockUser = normalizeUser(mockUserDTO);
const mockQuantRanking = normalizeQuantRanking(mockQuantRankingDTO);

describe("useDataFetch Hook", () => {
    it("should fetch and set data correctly", async () => {
        (api as jest.Mock).mockImplementation((path) => {
            if (path === "user") return Promise.resolve(mockUserDTO);
            if (path === "quant-ranking") return Promise.resolve(mockQuantRankingDTO);
        });

        const {result} = renderHook(() => useDataFetch());

        expect(result.current.isLoaded).toBe(false);
        expect(result.current.hasError).toBe(false);
        expect(result.current.model).toEqual({});

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(false);
        expect(result.current.model).toEqual({user: mockUser, ranking: mockQuantRanking});
    });

    it("should handle API errors", async () => {
        (api as jest.Mock).mockRejectedValue(new Error("API Error"));

        const {result} = renderHook(() => useDataFetch());

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(true);
    });
});
