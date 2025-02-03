import {FC} from "react";
import List from "../../components/list/List";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {createListItems} from "./createListItems";
import {fetchConfig} from "./config";
import {QuantRanking} from "../../data/models";

const QuantRankingCard: FC = () => {
    return (
        <WithFetchingCard
            header="Quant Ranking"
            initialHeight={290}
            config={fetchConfig}
            render={(state: QuantRanking) => (
                <>
                    <List items={createListItems(state)} />
                    <a href="/" className="has-text-weight-semibold">Quant Ratings Beat The Market &#x226B;</a>
                </>
            )}
        />
    );
};

export default QuantRankingCard;