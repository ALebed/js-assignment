import {FC, useState} from "react";
import QuantRankingCard from "./containers/quantRanking/QuantRankingCard";
import UserContext, {User} from "./services/user/UserContext";

const App: FC = () => {
    const [user] = useState<User>({isPremium: true});
    const mockData = [
        {title: "title1", description: "descr1"},
        {title: "title2", description: "descr2"},
        {title: "title3", description: "descr3"},
    ];

    return (
        <UserContext.Provider value={user}>
            <main className="content">
                <nav role="navigation" className="navbar">
                    <h1 className="title">Seeking Alpha - Cards</h1>
                </nav>
                <section role="section" className="section container">
                    <QuantRankingCard data={mockData} />
                </section>
            </main>
        </UserContext.Provider>
    );
};

export default App;