import RatingsSummaryCard from "../summary/RatingsSummaryCard";
import FactorGradesCard from "../factorGrades/FactorGradesCard";
import QuantRankingCard from "../quantRanking/QuantRankingCard";
import "./styles/sideBar.scss";

const CardsSideBar = () => {
    return (
        <aside className="section aside">
            <RatingsSummaryCard />
            <FactorGradesCard />
            <QuantRankingCard />
        </aside>
    );
};

export default CardsSideBar;