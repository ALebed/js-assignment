import {render, screen, within} from "@testing-library/react";
import App from "./App";
import {useDataFetch} from "./hooks/useDataFetch";

jest.mock("./hooks/useDataFetch");
jest.mock("./containers/quantRanking/QuantRankingCard", () => jest.fn(() => <div>Mocked QuantRankingCard</div>));
jest.mock("./components/loader/Loader", () => function Component() {
    return <div data-testid="loader" />;
})

describe("App", () => {
    it("renders the title in navbar", () => {
        (useDataFetch as jest.Mock).mockReturnValue({
            model: { user: {}, ranking: {} },
            hasError: false,
            isLoaded: false,
        });

        render(<App />);
        const navbar = screen.getByRole("navigation");
        const header = within(navbar).getByRole("heading");

        expect(header).toHaveTextContent("Seeking Alpha - Cards");
    });

    it("shows loading state before data is loaded", () => {
        (useDataFetch as jest.Mock).mockReturnValue({
            model: { user: {}, ranking: {} },
            hasError: false,
            isLoaded: false,
        });

        render(<App />);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders QuantRankingCard when data is loaded", () => {
        (useDataFetch as jest.Mock).mockReturnValue({
            model: { user: {}, ranking: { someData: true } },
            hasError: false,
            isLoaded: true,
        });

        render(<App />);

        expect(screen.getByText("Mocked QuantRankingCard")).toBeInTheDocument();
    });

    it("handles error state with ErrorBoundary", () => {
        (useDataFetch as jest.Mock).mockReturnValue({
            model: { user: {}, ranking: {} },
            hasError: true,
            isLoaded: false,
        });

        render(<App />);

        expect(screen.getByText(/Page cannot be loaded/i)).toBeInTheDocument();
    });
});