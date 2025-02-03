import { render, screen } from "@testing-library/react";
import QuantRankingCard from "./QuantRankingCard";
import { QuantRanking } from "../../data/models";
import React, {ReactNode} from "react";

const mockData: QuantRanking = {
    rankings: [
        {type: "overall", rank: 5, total: 100},
        {type: "sector", rank: 2, total: 50},
        {type: "industrySpecific", rank: 3, total: 70},
        {type: "unexpectedType", rank: 7, total: 50},
    ],
    sector: "Tech",
    industry: "Software",
};

interface MockProps {
    header: string;
    render: (state: QuantRanking) => ReactNode;
}

jest.mock("../../components/card/WithFetchingCard", () => function Component({header, render}: MockProps) {
    return (
        <div>
            <h2>{header}</h2>
            {render(mockData)}
        </div>
    );
});

jest.mock("./config", () => ({ fetchConfig: {} }));

describe("QuantRankingCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders Card with list of items", () => {
        render(<QuantRankingCard />);

        expect(screen.getByText("Sector")).toBeInTheDocument();
        expect(screen.getByText("Tech")).toBeInTheDocument();
        expect(screen.getByText("Industry")).toBeInTheDocument();
        expect(screen.getByText("Software")).toBeInTheDocument();
        expect(screen.getByText("Ranked Overall")).toBeInTheDocument();
        expect(screen.getByText("Ranked in Sector")).toBeInTheDocument();
        expect(screen.getByText("Ranked in Industry")).toBeInTheDocument();
        expect(screen.getByText("unexpectedType")).toBeInTheDocument();

        expect(screen.getByText((_, element) =>
            element?.textContent === "5 out of 100"
        )).toBeInTheDocument();

        expect(screen.getByText((_, element) =>
            element?.textContent === "2 out of 50"
        )).toBeInTheDocument();

        expect(screen.getByText((_, element) =>
            element?.textContent === "3 out of 70"
        )).toBeInTheDocument();
    });

    it("renders Card component with header", () => {
        render(<QuantRankingCard />);
        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Quant Ranking");
    });

    it("renders Card component with anchor link", () => {
        render(<QuantRankingCard />);
        expect(screen.getByRole("link")).toHaveTextContent("Quant Ratings Beat The Market");
    });
});
