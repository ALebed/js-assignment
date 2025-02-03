import {createContext} from "react";
import {User} from "../data/models";

const UserContext = createContext<User>({isPremium: false});

export default UserContext;