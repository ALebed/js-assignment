import {FC} from "react";
import Card from "../../components/card/Card";
import List from "../../components/list/List";
import {normalizeQuantRanking, QuantRanking} from "../../data/normalizeData";
import {Item} from "../../components/list/ListItem";
import {capitalize} from "../../utils/stringUtils";
import {useDataFetch} from "../../hooks/useDataFetch";
import {QuantRankingDTO} from "../../data/dataTypes";

const RANKING_PATH = "quant-ranking";

const getTitleByType = (type: string): string => {
    const titleMap: Record<string, string> = {
        overall: "Ranked Overall",
        sector: "Ranked in Sector",
        industrySpecific: "Ranked in Industry",
    };
    return titleMap[type] || type;
};

const createListItems = ({rankings, ...rest}: QuantRanking): Item[] => {
    return [
        ...Object.entries(rest).map(([key, description]) => ({
            title: capitalize(key),
            description
        })),
        ...rankings.map(({type, rank, total}) => ({
            title: getTitleByType(type),
            description: <><b>{rank}</b> out of <b>{total}</b></>,
        })),
    ];
};

const QuantRankingCard: FC = () => {
    const {
        state,
        hasError,
        isLoaded,
    } = useDataFetch<QuantRanking, QuantRankingDTO>(RANKING_PATH, normalizeQuantRanking, {} as QuantRanking);

    return (
        <Card header="Quant Ranking">
            {hasError && <span>We could not load data. Please try again.</span>}
            {!hasError && !isLoaded && <span>Loading...</span>}
            {!hasError && isLoaded && (
                <>
                    <List items={createListItems(state)} />
                    <a href="/" className="has-text-weight-semibold">Quant Ratings Beat The Market</a>
                </>
            )}
        </Card>
    );
};


export default QuantRankingCard;