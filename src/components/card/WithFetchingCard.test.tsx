import { render, screen } from "@testing-library/react";
import { useDataFetch } from "../../hooks/useDataFetch";
import { ReactNode } from "react";
import WithFetchingCard from "./WithFetchingCard";

jest.mock("../../hooks/useDataFetch");

jest.mock("../loader/Loader", () => function Component() {
    return <div data-testid="loader" />;
});
jest.mock("./Card", () => function Component({ children }: { children: ReactNode }) {
    return <div data-testid="card">{children}</div>;
});

describe("WithFetchingCard component", () => {
    const renderComponent = (mockedState: unknown) => {
        (useDataFetch as jest.Mock).mockReturnValue(mockedState);
        render(
            <WithFetchingCard
                config={{ path: "/test-endpoint", initialState: {} }}
                render={(state) => <div data-testid="content">{JSON.stringify(state)}</div>}
            />
        );
    };

    it("renders loader while loading", () => {
        renderComponent({ state: {}, hasError: false, isLoaded: false });
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders error message when fetch fails", () => {
        renderComponent({ state: {}, hasError: true, isLoaded: true });
        expect(screen.getByText("We could not load data. Please try again.")).toBeInTheDocument();
    });

    it("renders fetched data when loaded successfully", () => {
        const mockData = { id: 1, name: "Test Data" };
        renderComponent({ state: mockData, hasError: false, isLoaded: true });
        expect(screen.getByTestId("content").textContent).toBe(JSON.stringify(mockData));
    });
});