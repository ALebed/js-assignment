import {FC} from "react";
import QuantRankingCard from "./containers/quantRanking/QuantRankingCard";
import UserContext, {User} from "./hocs/UserContext";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import {useDataFetch} from "./hooks/useDataFetch";
import RatingsSummaryCard from "./containers/summary/RatingsSummaryCard";
import {UserDTO} from "./data/dataTypes";
import {normalizeUser} from "./data/normalizeData";

const USER_PATH = "user";

const App: FC = () => {
    const {
        state: user,
        hasError,
        isLoaded,
    } = useDataFetch<User, UserDTO>(USER_PATH, normalizeUser, {isPremium: false});

    return (
        <ErrorBoundary hasError={hasError}>
            <UserContext.Provider value={user}>
                <main className="content">
                    <nav className="navbar">
                        <h1 className="title">Seeking Alpha - Cards</h1>
                    </nav>
                    {
                        isLoaded ? (
                            <section className="section container">
                                <RatingsSummaryCard />
                                <QuantRankingCard />
                            </section>
                        ) : (
                            <div>Data Loading...</div> // TODO: add spinner
                        )
                    }
                </main>
            </UserContext.Provider>
        </ErrorBoundary>
    );
};

export default App;