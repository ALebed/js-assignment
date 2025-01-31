import {render, screen} from "@testing-library/react";
import {isObjectEmpty} from "../../utils/isObjectEmpty";
import QuantRankingCard from "./QuantRankingCard";

jest.mock("../../utils/isObjectEmpty", () => ({
    isObjectEmpty: jest.fn(),
}));

jest.mock("../../services/user/withPremium", () => ({
    withPremium: (Component: any) => Component,
}));

describe("QuantRankingCard", () => {
    it("renders Card with list of items", () => {
        (isObjectEmpty as jest.Mock).mockReturnValue(false);
        const mockData = [
            {title: "Title 1", description: "Description 1"},
            {title: "Title 2", description: "Description 2"},
        ];

        render(<QuantRankingCard data={mockData} />);

        expect(screen.getByText("Quant Ranking")).toBeInTheDocument();
        expect(screen.getByText("Title 1")).toBeInTheDocument();
        expect(screen.getByText("Description 1")).toBeInTheDocument();
        expect(screen.getByText("Title 2")).toBeInTheDocument();
        expect(screen.getByText("Description 2")).toBeInTheDocument();
    });

    it("renders null if data is empty", () => {
        (isObjectEmpty as jest.Mock).mockReturnValue(true);

        const {container} = render(<QuantRankingCard data={[]} />);
        expect(container.firstChild).toBeNull();
    });
});