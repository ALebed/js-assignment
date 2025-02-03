import {FetchConfig} from "../../hooks/useDataFetch";
import {normalizeRatingsSummary} from "../../data/normalizers";
import {RatingsSummaryDTO} from "../../services/DTOs";
import {BaseType, Column} from "../../components/table/TableRow";
import {RatingsSummary} from "../../data/models";

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