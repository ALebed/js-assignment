import {FetchConfig} from "../../hooks/useDataFetch";
import {normalizeQuantRanking, QuantRanking} from "../../data/normalizeData";
import {QuantRankingDTO} from "../../services/DTOs";

export const fetchConfig: FetchConfig<QuantRanking, QuantRankingDTO> = {
    path: "quant-ranking",
    normalize: normalizeQuantRanking,
    initialState: {} as QuantRanking,
};

export const titleMap: Record<string, string> = {
    overall: "Ranked Overall",
    sector: "Ranked in Sector",
    industrySpecific: "Ranked in Industry",
};