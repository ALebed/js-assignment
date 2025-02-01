import {render, screen, within} from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
    it("renders correctly", () => {
        render(<Card>Simple Card</Card>);
        expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("displays children string", () => {
        render(<Card>Simple Card</Card>);
        expect(screen.getByText("Simple Card")).toBeInTheDocument();
    });

    it("displays children element", () => {
        render(<Card><span data-testid="card-content">Card Content</span></Card>);
        expect(screen.getByTestId("card-content")).toHaveTextContent("Card Content");
    });

    it("renders without header by default", () => {
        render(<Card>Simple Card</Card>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("displays header", () => {
        render(<Card header="Simple Header">Simple Card</Card>);
        expect(screen.queryByRole("heading")).toBeInTheDocument();
    });

    it("includes given string into the header element", () => {
        render(<Card header="Simple Header">Simple Card</Card>);
        expect(screen.queryByRole("heading")).toHaveTextContent("Simple Header");
    });

    it("includes given element into the header element", () => {
        render(
            <Card header={<div data-testid="card-header">Simple Header</div>}>
                Simple Card
            </Card>
        );
        const header = screen.queryByRole("heading");
        const headerContent = within(header as HTMLElement).getByTestId("card-header");
        expect(headerContent).toBeInTheDocument();
    });
});