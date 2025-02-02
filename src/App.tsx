import {FC} from "react";
import QuantRankingCard from "./containers/quantRanking/QuantRankingCard";
import UserContext from "./hocs/UserContext";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import {useDataFetch} from "./hooks/useDataFetch";

const App: FC = () => {
    const {model, hasError, isLoaded} = useDataFetch();

    return (
        <ErrorBoundary hasError={hasError}>
            <UserContext.Provider value={model.user}>
                <main className="content">
                    <nav className="navbar">
                        <h1 className="title">Seeking Alpha - Cards</h1>
                    </nav>
                    {
                        isLoaded ? (
                            <section className="section container">
                                <QuantRankingCard data={model.ranking} />
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