import {createContext} from "react";

export interface User {
    isPremium: boolean;
}

const UserContext = createContext({isPremium: false});

export default UserContext;