import {renderHook, act} from "@testing-library/react";
import {FetchConfig, useDataFetch} from "./useDataFetch";
import api from "../services/api";
import {normalizeUser} from "../data/normalizers";
import {UserDTO} from "../services/DTOs";
import {User} from "../data/models";

jest.mock("../services/api");

const mockUserDTO: UserDTO = {premium: true};
const mockUser = normalizeUser(mockUserDTO);
const config: FetchConfig<User, UserDTO> = {
    path: "user",
    normalize: normalizeUser,
    initialState: {isPremium: false},
};

describe("useDataFetch", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch and set data correctly", async () => {
        (api as jest.Mock).mockImplementation((path) => {
            if (path === "user") return Promise.resolve(mockUserDTO);
        });

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
        (api as jest.Mock).mockRejectedValue(new Error("API Error"));

        const {result} = renderHook(() => useDataFetch(config));

        await act(async () => {});

        expect(result.current.isLoaded).toBe(true);
        expect(result.current.hasError).toBe(true);
    });
});
