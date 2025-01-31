import {render, screen, within} from "@testing-library/react";
import List from "./List";
import {Item} from "./ListItem";

describe("List", () => {
    it("renders correctly", () => {
        render(<List items={undefined as unknown as Item[]} />);
    });

    it("displays informative message for empty data", () => {
        render(<List items={[]} />);
        expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("displays a list of given items", () => {
        render(
            <List items={[
                {title: "title1", description: "description1"},
                {title: "title2", description: "description2"},
            ]} />
        );
        const list = screen.getByRole("list");
        const itemTitles = within(list).getAllByText(/title/);
        const itemDescriptions = within(list).getAllByText(/description/);
        expect(list).toBeInTheDocument();
        expect(itemTitles).toHaveLength(2);
        expect(itemDescriptions).toHaveLength(2);
    });
});