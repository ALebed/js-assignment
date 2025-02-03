import { render, screen } from "@testing-library/react";
import WithFetchingCard from "./WithFetchingCard";
import { useDataFetch } from "../../hooks/useDataFetch";
import { LoaderSize } from "../loader/Loader";
import { FetchConfig } from "../../hooks/useDataFetch";
import { ReactNode } from "react";

jest.mock("../../hooks/useDataFetch");
jest.mock("./Card", () => function Component({ header, children }: { header?: ReactNode; children?: ReactNode }) {
    return (
        <div>
            <div data-testid="card-header">{header}</div>
            <div data-testid="card-content">{children}</div>
        </div>
    );
});

jest.mock("../loader/Loader", () => {
    return {
        __esModule: true,
        default: ({ height, size }: { height?: number; size?: string }) => (
            <div data-testid="loader" data-height={height} data-size={size}></div>
        ),
        LoaderSize: { Medium: "medium" }
    };
});

describe("WithFetchingCard", () => {
    type StateType = { some: string };
    type DataType = unknown;
    const renderMock = jest.fn(() => <div data-testid="content">Rendered Content</div>);
    const configMock: FetchConfig<StateType, DataType> = {} as FetchConfig<StateType, DataType>;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loader while loading", () => {
        (useDataFetch as jest.Mock).mockReturnValue({ state: null, hasError: false, isLoaded: false });
        render(<WithFetchingCard header="Test Header" initialHeight={200} config={configMock} render={renderMock} />);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
        expect(screen.getByTestId("loader")).toHaveAttribute("data-height", "200");
        expect(screen.getByTestId("loader")).toHaveAttribute("data-size", LoaderSize.Medium);
    });

    it("renders error message when fetch fails", () => {
        (useDataFetch as jest.Mock).mockReturnValue({ state: null, hasError: true, isLoaded: false });
        render(<WithFetchingCard header="Test Header" config={configMock} render={renderMock} />);

        expect(screen.getByText("We could not load data. Please try again.")).toBeInTheDocument();
    });

    it("renders fetched data when loaded successfully", () => {
        (useDataFetch as jest.Mock).mockReturnValue({ state: { some: "data" }, hasError: false, isLoaded: true });
        render(<WithFetchingCard header="Test Header" config={configMock} render={renderMock} />);

        expect(renderMock).toHaveBeenCalledWith({ some: "data" });
        expect(screen.getByTestId("content")).toBeInTheDocument();
    });
});