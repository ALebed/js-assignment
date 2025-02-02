import {FC} from "react";
import Table from "../../components/table/Table";
import {normalizeRatingsSummary, RatingsSummary} from "../../data/normalizeData";
import {Column, Row} from "../../components/table/TableRow";
import {withPremium} from "../../hocs/withPremium";
import {RatingsSummaryDTO} from "../../data/dataTypes";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {FetchConfig} from "../../hooks/useDataFetch";

const RATINGS_SUMMARY_PATH = "ratings-summary";
const fetchConfig: FetchConfig<RatingsSummary[], RatingsSummaryDTO> = {
    path: RATINGS_SUMMARY_PATH,
    normalizer: normalizeRatingsSummary,
    initialState: [],
};
const columns: Column[] = [
    {id: "label", title: "label"},
    {id: "rating", title: "rating"},
    {id: "score", title: "score"},
];

const RatingsSummaryCard: FC = () => {
    const enhanceData = (data: RatingsSummary[]): (RatingsSummary & Row)[] => data.map((row: RatingsSummary) => ({
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