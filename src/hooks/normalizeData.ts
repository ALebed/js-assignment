import {QuantRankingDTO, RatingsSummaryDTO, UserDTO} from "./dataTypes";
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