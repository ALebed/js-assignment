import {FC, useState} from "react";
import QuantRankingCard from "./containers/quantRanking/QuantRankingCard";
import UserContext, {User} from "./services/user/UserContext";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

const App: FC = () => {
    const [hasError] = useState<boolean>(false);
    const [user] = useState<User>({isPremium: true});
    const mockData = [
        {title: "title1", description: "descr1"},
        {title: "title2", description: "descr2"},
        {title: "title3", description: "descr3"},
    ];

    return (
        <ErrorBoundary hasError={hasError}>
            <UserContext.Provider value={user}>
                <main className="content">
                    <nav className="navbar">
                        <h1 className="title">Seeking Alpha - Cards</h1>
                    </nav>
                    <section className="section container">
                        <QuantRankingCard data={mockData} />
                    </section>
                </main>
            </UserContext.Provider>
        </ErrorBoundary>
    );
};

export default App;