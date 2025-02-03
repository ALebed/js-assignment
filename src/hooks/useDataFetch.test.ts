import {renderHook, act} from "@testing-library/react";
import {FetchConfig, useDataFetch} from "./useDataFetch";
import api from "../services/api";
import {normalizeUser} from "../data/normalizers";
import {UserDTO} from "../services/DTOs";
import {User} from "../data/models";

jest.mock("../services/api");

describe("useDataFetch", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch and set data correctly", async () => {
        const mockUserDTO: UserDTO = {premium: true};
        const mockUser = normalizeUser(mockUserDTO);
        const config: FetchConfig<User, UserDTO> = {
            path: "user",
            normalize: normalizeUser,
            initialState: {isPremium: false},
        };

        (api as jest.Mock).mockImplementation(() => Promise.resolve(mockUserDTO));

        const {result} = renderHook(() => useDataFetch(config));

        expect(result.current.isLoaded).toBe(false);
        expect(result.current.hasError).toBe(false);
        expect(result.current.state).toEqual({isPremium: false});

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(false);
        expect(result.current.state).toEqual(mockUser);
    });

    it("should handle API errors", async () => {
        const config: FetchConfig<unknown[], unknown[]> = {
            path: "/endpoint-1",
            initialState: [],
        };
        (api as jest.Mock).mockRejectedValue(new Error("API Error"));

        const {result} = renderHook(() => useDataFetch(config));

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(true);
    });

    it("should fetch multiple paths and update state", async () => {
        const mockData = [{ id: 1 }, { id: 2 }];
        (api as jest.Mock).mockImplementation((path) => {
            return Promise.resolve(mockData.find(item => `/endpoint-${item.id}` === path));
        });

        const config: FetchConfig<unknown[], unknown[]> = {
            path: ["/endpoint-1", "/endpoint-2"],
            initialState: [],
        };

        const { result } = renderHook(() => useDataFetch(config));

        await act(async () => {
            await new Promise((r) => setTimeout(r, 0));
        });

        expect(result.current.state).toEqual(mockData);
        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(false);
    });
});
