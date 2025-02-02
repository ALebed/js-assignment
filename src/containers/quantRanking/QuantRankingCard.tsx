import {FC} from "react";
import Card from "../../components/card/Card";
import List from "../../components/list/List";
import {withPremium} from "../../hocs/withPremium";
import {isObjectEmpty} from "../../utils/objectUtils";
import {QuantRanking} from "../../hooks/normalizeData";
import {Item} from "../../components/list/ListItem";
import {capitalize} from "../../utils/stringUtils";

interface Props {
    data: QuantRanking;
}

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

const QuantRankingCard: FC<Props> = ({data}: Props) => {
    if (isObjectEmpty(data)) return null;

    return (
        <Card header="Quant Ranking">
            <List items={createListItems(data)} />
            <a href="/" className="has-text-weight-semibold">Quant Ratings Beat The Market</a>
        </Card>
    );
};


export default withPremium<Props>(QuantRankingCard);