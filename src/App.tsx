import {FC} from "react";
import UserContext from "./hocs/UserContext";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import {FetchConfig, useDataFetch} from "./hooks/useDataFetch";
import {UserDTO} from "./services/DTOs";
import {normalizeUser} from "./data/normalizers";
import {User} from "./data/models";
import Loader from "./components/loader/Loader";
import CardsSideBar from "./containers/cards/CardsSideBar";
import MainContentStub from "./containers/content/MainContentStub";

const fetchConfig: FetchConfig<User, UserDTO> = {
    path: "user",
    normalize: normalizeUser,
    initialState: {isPremium: false},
};

const App: FC = () => {
    const {
        state: user,
        hasError,
        isLoaded,
    } = useDataFetch<User, UserDTO>(fetchConfig);

    return (
        <ErrorBoundary hasError={hasError}>
            <UserContext.Provider value={user}>
                <nav className="header">
                    <h1 className="title">Seeking Alpha - Cards</h1>
                </nav>
                <main className="container main">
                {isLoaded ? (
                    <>
                        <MainContentStub />
                        <CardsSideBar />
                    </>
                ) : (
                    <Loader />
                )}
                </main>
            </UserContext.Provider>
        </ErrorBoundary>
    );
};

export default App;