import {FC} from "react";
import List from "../../components/list/List";
import {normalizeQuantRanking, QuantRanking} from "../../data/normalizeData";
import {QuantRankingDTO} from "../../services/DTOs";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {createListItems} from "./createListItems";
import {FetchConfig} from "../../hooks/useDataFetch";

const fetchConfig: FetchConfig<QuantRanking, QuantRankingDTO> = {
    path: "quant-ranking",
    normalize: normalizeQuantRanking,
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