import {
    FactorGradesDTO,
    QuantRankingDTO,
    RatingsSummaryDTO,
    UserDTO
} from "../services/DTOs";
import {toCamelCase, toSpaceCase} from "../utils/stringUtils";
import {FactorGrades, FactorGradesLabel, QuantRanking, Ranking, RatingsSummary, titleMap, User} from "./models";

export const normalizeUser = (userDTO: UserDTO): User => ({
    isPremium: userDTO.premium,
});

export const normalizeRatingsSummary = (ratingsSummaryDTO: RatingsSummaryDTO): RatingsSummary[] => {
    return Object.entries(ratingsSummaryDTO).map(([key, {rating, score}]) => ({
        label: toSpaceCase(key),
        rating,
        score,
    }));
};

export const getTitleByType = (type: string): string => (titleMap[type] || type);
export const normalizeQuantRanking = ({sector, industry, rankings}: QuantRankingDTO): QuantRanking => {
    return {
        sector,
        industry,
        rankings: Object.entries(rankings).map(([key, {rank, total}]): Ranking => ({
            type: toCamelCase(key),
            rank,
            total,
        })),
    };
};

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