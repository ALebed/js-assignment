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

export interface CurrentValueDTO {current: string}
export interface FactorGradesCurrentDTO {
    Valuation: CurrentValueDTO;
    Growth: CurrentValueDTO;
    Profitability: CurrentValueDTO;
    Momentum: CurrentValueDTO;
    Revisions: CurrentValueDTO;
}
export interface FactorGradesThreeDTO {
    Valuation: string;
    Growth: string;
    Profitability: string;
    Momentum: string;
    Revisions: string;
}
export interface FactorGradesSixDTO {
    data: [string, string][];
}
export type FactorGradesDTO = [FactorGradesCurrentDTO, FactorGradesThreeDTO, FactorGradesSixDTO];