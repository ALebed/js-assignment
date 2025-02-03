import {FetchConfig} from "../../hooks/useDataFetch";
import {normalizeQuantRanking} from "../../data/normalizers";
import {QuantRankingDTO} from "../../services/DTOs";
import {QuantRanking} from "../../data/models";

export const fetchConfig: FetchConfig<QuantRanking, QuantRankingDTO> = {
    path: "quant-ranking",
    normalize: normalizeQuantRanking,
    initialState: {} as QuantRanking,
};
