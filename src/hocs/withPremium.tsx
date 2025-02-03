import {FC, useContext} from "react";
import UserContext from "./UserContext";
import {User} from "../data/models";

const NullishComponent: FC = () => null;

export const withPremium = <T extends object>(Component: FC<T>) => {
    const WrappedComponent: FC<T> = (props: T) => {
        const user: User = useContext(UserContext);

        if (!user?.isPremium) {
            return <NullishComponent/>;
        }

        return <Component {...props} />;
    };
    return WrappedComponent;
};