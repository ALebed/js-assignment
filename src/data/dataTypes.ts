export interface UserDTO {
    premium: boolean;
}

interface RankDTO { rank: number; total: number}
export interface QuantRankingDTO {
    sector: string;
    industry: string;
    rankings: {
        overall: RankDTO,
        sector: RankDTO,
        industry_specific: RankDTO,
    };
}

interface SummaryDTO {rating: string; score: number}
export interface RatingsSummaryDTO {
    SA_Analysts: SummaryDTO;
    Wall_Street: SummaryDTO;
    Quant: SummaryDTO;
}

interface CurrentDTO {current: string}
export interface FactorGradesCurrentDTO {
    Valuation: CurrentDTO;
    Growth: CurrentDTO;
    Profitability: CurrentDTO;
    Momentum: CurrentDTO;
    Revisions: CurrentDTO;
}
export interface FactorGradesTreeMDTO {
    Valuation: string;
    Growth: string;
    Profitability: string;
    Momentum: string;
    Revisions: string;
}
type SixMonthsLabelDTO = string;
type SixMonthsValueDTO = string;
export interface FactorGradesSixMDTO {
    data: [SixMonthsLabelDTO, SixMonthsValueDTO][];
}
export type DataDTO = [FactorGradesCurrentDTO, FactorGradesTreeMDTO, FactorGradesSixMDTO];