import {FC} from "react";
import List from "../../components/list/List";
import {normalizeQuantRanking, QuantRanking} from "../../data/normalizeData";
import {QuantRankingDTO} from "../../data/dataTypes";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {createListItems} from "./createListItems";
import {FetchConfig} from "../../hooks/useDataFetch";

const RANKING_PATH = "quant-ranking";
const fetchConfig: FetchConfig<QuantRanking, QuantRankingDTO> = {
    path: RANKING_PATH,
    normalizer: normalizeQuantRanking,
    initialState: {} as QuantRanking,
};

const QuantRankingCard: FC = () => {
    return (
        <WithFetchingCard
            header="Quant Ranking"
            initialHeight={300}
            config={fetchConfig}
            render={(state: QuantRanking) => (
                <>
                    <List items={createListItems(state)} />
                    <a href="/" className="has-text-weight-semibold">Quant Ratings Beat The Market</a>
                </>
            )}
        />
    );
};

export default QuantRankingCard;