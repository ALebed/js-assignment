import {FC} from "react";
import Table from "../../components/table/Table";
import {normalizeRatingsSummary, RatingsSummary} from "../../data/normalizeData";
import {BaseType, Column} from "../../components/table/TableRow";
import {withPremium} from "../../hocs/withPremium";
import {RatingsSummaryDTO} from "../../services/DTOs";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {FetchConfig} from "../../hooks/useDataFetch";

const fetchConfig: FetchConfig<RatingsSummary[], RatingsSummaryDTO> = {
    path: "ratings-summary",
    normalize: normalizeRatingsSummary,
    initialState: [],
};
const columns: Column<RatingsSummary & BaseType>[] = [
    {id: "label", title: "label"},
    {id: "rating", title: "rating"},
    {id: "score", title: "score"},
];

const RatingsSummaryCard: FC = () => {
    const enhanceData = (data: RatingsSummary[]): (RatingsSummary & BaseType)[] => data.map((row: RatingsSummary) => ({
        ...row,
        id: row.label,
    }));

    return (
        <WithFetchingCard
            header="Ratings Summary"
            initialHeight={150}
            config={fetchConfig}
            render={(data: RatingsSummary[]) => (
                <Table rows={enhanceData(data)} columns={columns} />
            )}
        />
    );
};

export default withPremium(RatingsSummaryCard);