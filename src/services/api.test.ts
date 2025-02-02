import api from "./api";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("api", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("makes a GET request and returns response data", async () => {
        const mockData = { message: "Success" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const response = await api("test-get-endpoint");

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://seekingalpha.free.beeceptor.com/test-get-endpoint", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        expect(response).toEqual(mockData);
    });

    it("makes a POST request with body and returns response data", async () => {
        const mockData = { id: 1, message: "Created" };
        const requestBody = { name: "Test" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const response = await api("test-post-endpoint", "POST", requestBody);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://seekingalpha.free.beeceptor.com/test-post-endpoint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });
        expect(response).toEqual(mockData);
    });

    it("throws an error when response is not ok", async () => {
        fetchMock.mockResponseOnce("Unauthorized", { status: 401, statusText: "Unauthorized" });

        await expect(api("test-endpoint")).rejects.toThrow("Error: 401 Unauthorized");
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("includes additional headers when provided", async () => {
        const mockData = { message: "Success" };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const response = await api("test-endpoint", "GET", null, { Authorization: "Bearer token" });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://seekingalpha.free.beeceptor.com/test-endpoint", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer token",
            },
        });
        expect(response).toEqual(mockData);
    });
});
