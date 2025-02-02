import {FC} from "react";
import List from "../../components/list/List";
import {QuantRanking} from "../../data/normalizeData";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {createListItems} from "./createListItems";
import {fetchConfig} from "./config";

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