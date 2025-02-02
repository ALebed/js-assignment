import {FetchConfig} from "../../hooks/useDataFetch";
import {normalizeRatingsSummary, RatingsSummary} from "../../data/normalizeData";
import {RatingsSummaryDTO} from "../../services/DTOs";
import {BaseType, Column} from "../../components/table/TableRow";

export const fetchConfig: FetchConfig<RatingsSummary[], RatingsSummaryDTO> = {
    path: "ratings-summary",
    normalize: normalizeRatingsSummary,
    initialState: [],
};

export const columns: Column<RatingsSummary & BaseType>[] = [
    {id: "label", title: "label"},
    {id: "rating", title: "rating"},
    {id: "score", title: "score"},
];