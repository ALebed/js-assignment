import App from "./App";
import {render, screen, within} from "@testing-library/react";

describe("App", () => {
    it("shows up correctly", () => {
        render(<App />);
    });

    it("has heading element in navbar", () => {
        render(<App />);
        const navbar = screen.getByRole("navigation");
        const header = within(navbar).getByRole("heading");
        expect(header).toHaveTextContent("Seeking Alpha - Cards");
    });

    it("has section element", () => {
        render(<App/>);
        expect(screen.getByRole("section")).toBeInTheDocument();
    });
});