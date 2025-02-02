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