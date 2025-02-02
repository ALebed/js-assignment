import {
    FactorGradesDTO,
    QuantRankingDTO,
    RatingsSummaryDTO,
    UserDTO
} from "../services/DTOs";
import {toCamelCase, toSpaceCase} from "../utils/stringUtils";

// User data
export interface User {isPremium: boolean}
export const normalizeUser = (userDTO: UserDTO): User => ({isPremium: userDTO.premium});


// Quant Ranking data
export interface Ranking {
    type: string;
    rank: number;
    total: number;
}
export interface QuantRanking {
    sector: string;
    industry: string;
    rankings: Ranking[];
}
export const normalizeQuantRanking = ({sector, industry, rankings}: QuantRankingDTO): QuantRanking => {
    return {
        sector,
        industry,
        rankings: Object.entries(rankings).map(([key, {rank, total}]): Ranking => (
            {
                type: toCamelCase(key),
                rank,
                total,
            }
        )),
    };
};


// Ratings Summary
export interface RatingsSummary {
    label: string;
    rating: string;
    score: number;
}
export const normalizeRatingsSummary = (ratingsSummaryDTO: RatingsSummaryDTO): RatingsSummary[] => {
    return Object.entries(ratingsSummaryDTO).map(([key, {rating, score}]) => {
        return {
            label: toSpaceCase(key),
            rating,
            score,
        };
    });
};


// Factor Grades
type FactorGradesLabel = "Valuation" | "Growth" | "Profitability" | "Momentum" | "Revisions";
export interface FactorGrades {
    label: FactorGradesLabel;
    current: string;
    threeMonths: string;
    sixMonths: string;
}
const isOfTypeFactorGradesLabel =  (label: string): label is FactorGradesLabel => {
    const validLabels: FactorGradesLabel[] = ["Valuation", "Growth", "Profitability", "Momentum", "Revisions"];
    return validLabels.includes(label as FactorGradesLabel);
};
export const normalizeFactorGrades = (dataDTO: FactorGradesDTO ): FactorGrades[] => {
    const [current, threeMonths, sixMonths]: FactorGradesDTO = dataDTO;
    const data: FactorGrades[] = [];
    Object.entries(current).map(([label, {current}]) => {
        if (isOfTypeFactorGradesLabel(label)) {
            data.push({
                label,
                current,
                threeMonths: threeMonths[label],
                sixMonths: sixMonths.data.find(([l]) => l === label)?.[1] || "",
            });
        }
    });
    return data;
};