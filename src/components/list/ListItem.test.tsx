import {render, screen, within} from "@testing-library/react";
import ListItem from "./ListItem";

describe("ListItem", () => {
    it("renders a list item with title and description", () => {
        render (<ListItem title="title1" description="description1" />);
        const item = screen.getByRole("listitem");
        const itemTitle = within(item).getByText("title1");
        const itemDescription = within(item).getByText("description1");
        expect(item).toBeInTheDocument();
        expect(itemTitle).toBeInTheDocument();
        expect(itemDescription).toBeInTheDocument();
    });
});