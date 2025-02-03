import {render, screen} from "@testing-library/react";
import {withPremium} from "./withPremium";
import UserContext from "./UserContext";
import {User} from "../data/models";

const Component = ({text}: {text?: string}) => {
    return <div data-testid="wrapped-component">{text}</div>
};
const WrappedComponent = withPremium(Component);

describe("withPremium", () => {
    it("renders correctly", () => {
        render(
            <UserContext.Provider value={{} as User}>
                <WrappedComponent/>
            </UserContext.Provider>
        );
    });

    it("renders nothing for regular user", () => {
        const {container} = render(
            <UserContext.Provider value={{isPremium: false}}>
                <WrappedComponent/>
            </UserContext.Provider>
        );
        expect(container.firstChild).toBeNull();
    });

    it("renders component for premium user", () => {
        render(
            <UserContext.Provider value={{isPremium: true}}>
                <WrappedComponent text="Wrapped Component content"/>
            </UserContext.Provider>
        );
        const wrappedComponent = screen.getByTestId("wrapped-component");
        expect(wrappedComponent).toHaveTextContent("Wrapped Component content");
    });
});