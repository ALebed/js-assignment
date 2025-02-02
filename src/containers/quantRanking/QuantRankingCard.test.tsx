import {render, screen} from "@testing-library/react";
import QuantRankingCard from "./QuantRankingCard";
import {isObjectEmpty} from "../../utils/objectUtils";
import {QuantRanking} from "../../data/normalizeData";

jest.mock("../../utils/objectUtils", () => ({
    isObjectEmpty: jest.fn().mockImplementation(() => false),
}));

describe("QuantRankingCard", () => {
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders Card with list of items", () => {
        render(<QuantRankingCard data={mockData} />);

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
        render(<QuantRankingCard data={mockData} />);
        expect(screen.getByText("Quant Ranking")).toBeInTheDocument();
    });

    it("renders Card component with anchor link", () => {
        render(<QuantRankingCard data={mockData} />);
        expect(screen.getByRole("link")).toHaveTextContent("Quant Ratings Beat The Market");
    });

    it("renders null if data is empty", () => {
        (isObjectEmpty as jest.Mock).mockReturnValueOnce(true);
        const {container} = render(<QuantRankingCard data={{} as QuantRanking} />);
        expect(container.firstChild).toBeNull();
    });
});
