import {render, screen} from "@testing-library/react";
import {useContext} from "react";
import UserContext from "./UserContext";

describe("UserContext", () => {
    it("has a default value with isPremium set to false", () => {
        const TestComponent = () => {
            const user = useContext(UserContext);
            return <div>{user.isPremium ? "Premium" : "Non-premium"}</div>;
        };

        render(<TestComponent />);
        expect(screen.getByText("Non-premium")).toBeInTheDocument();
    });
});
