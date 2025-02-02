import {FC} from "react";
import Card from "../../components/card/Card";
import Table from "../../components/table/Table";
import {RatingsSummary} from "../../hooks/normalizeData";
import {Column, Row} from "../../components/table/TableRow";
import {withPremium} from "../../hocs/withPremium";

interface Props {
    data: RatingsSummary[];
}

const columns: Column[] = [
    {id: "label", title: "label"},
    {id: "rating", title: "rating"},
    {id: "score", title: "score"},
];

const RatingsSummaryCard: FC<Props> = ({data}: Props) => {
    if (!data?.length) return null;

    const rows: (RatingsSummary & Row)[] = data.map((row: RatingsSummary) => ({
        ...row,
        id: row.label,
    }));

    return (
        <Card header="Ratings Summary">
            <Table rows={rows} columns={columns} />
        </Card>
    );
};

export default withPremium<Props>(RatingsSummaryCard);