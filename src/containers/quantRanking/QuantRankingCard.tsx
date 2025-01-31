import Card from "../../components/card/Card";
import List from "../../components/list/List";
import {withPremium} from "../../services/user/withPremium";
import {isObjectEmpty} from "../../utils/isObjectEmpty";

interface Props {
    data: {title: string; description: string}[];
}

const QuantRankingCard = ({data}: Props) => {
    if (isObjectEmpty(data)) return null;

    return (
        <Card header="Quant Ranking">
            <List items={data} />
        </Card>
    );
};

export default withPremium<Props>(QuantRankingCard);