import App from './App';
import {render, screen} from "@testing-library/react";

describe(App, () => {
    it('shows up correctly', () => {
        render(<App />);
    });

    it('has heading element', () => {
        render(<App/>);
        const header: HTMLElement = screen.getByRole("heading");
        expect(header).toHaveTextContent("Seeking Alpha - Cards");
    });
});