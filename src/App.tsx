import {FC} from "react";
import QuantRankingCard from "./containers/quantRanking/QuantRankingCard";
import UserContext, {User} from "./hocs/UserContext";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import {FetchConfig, useDataFetch} from "./hooks/useDataFetch";
import RatingsSummaryCard from "./containers/summary/RatingsSummaryCard";
import {UserDTO} from "./services/DTOs";
import {normalizeUser} from "./data/normalizeData";
import FactorGradesCard from "./containers/factorGrades/FactorGradesCard";

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
                <main className="content">
                    <nav className="navbar">
                        <h1 className="title">Seeking Alpha - Cards</h1>
                    </nav>
                    {
                        isLoaded ? (
                            <section className="section container">
                                <RatingsSummaryCard />
                                <FactorGradesCard />
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