import {FC} from "react";
import Card from "../../components/card/Card";
import Table from "../../components/table/Table";
import {normalizeRatingsSummary, RatingsSummary} from "../../data/normalizeData";
import {Column, Row} from "../../components/table/TableRow";
import {withPremium} from "../../hocs/withPremium";
import {useDataFetch} from "../../hooks/useDataFetch";
import {RatingsSummaryDTO} from "../../data/dataTypes";

const RATINGS_SUMMARY_PATH = "ratings-summary";
const columns: Column[] = [
    {id: "label", title: "label"},
    {id: "rating", title: "rating"},
    {id: "score", title: "score"},
];

const RatingsSummaryCard: FC = () => {
    const {
        state,
        hasError,
        isLoaded,
    } = useDataFetch<RatingsSummary[], RatingsSummaryDTO>(RATINGS_SUMMARY_PATH, normalizeRatingsSummary, []);

    const rows: (RatingsSummary & Row)[] = state.map((row: RatingsSummary) => ({
        ...row,
        id: row.label,
    }));
    // TODO: add LoaderCard and ErrorMessage
    return (
        <Card header="Ratings Summary">
            {hasError && <span>We could not load data. Please try again.</span>}
            {!hasError && !isLoaded && <span>Loading...</span>}
            {!hasError && isLoaded && <Table rows={rows} columns={columns} />}
        </Card>
    );
};

export default withPremium(RatingsSummaryCard);