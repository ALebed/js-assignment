import {FC} from "react";
import Table from "../../components/table/Table";
import {BaseType} from "../../components/table/TableRow";
import {withPremium} from "../../hocs/withPremium";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {columns, fetchConfig} from "./config";
import {RatingsSummary} from "../../data/models";

const RatingsSummaryCard: FC = () => {
    const enhanceData = (data: RatingsSummary[]): (RatingsSummary & BaseType)[] => data.map((row: RatingsSummary) => ({
        ...row,
        id: row.label,
    }));

    return (
        <WithFetchingCard
            header="Ratings Summary"
            initialHeight={122}
            config={fetchConfig}
            render={(data: RatingsSummary[]) => (
                <Table rows={enhanceData(data)} columns={columns} />
            )}
        />
    );
};

export default withPremium(RatingsSummaryCard);