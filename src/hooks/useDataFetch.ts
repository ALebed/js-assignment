import {useEffect, useState} from "react";
import {QuantRankingDTO, RatingsSummaryDTO, UserDTO} from "./dataTypes";
import {
    normalizeQuantRanking,
    normalizeUser,
    normalizeRatingsSummary,
    QuantRanking,
    User,
    RatingsSummary,
} from "./normalizeData";
import api from "../services/api";

export interface AppModel {
    user: User;
    ranking: QuantRanking;
    summary: RatingsSummary[],
}

const USER_PATH = "user";
const RATINGS_SUMMARY_PATH = "ratings-summary";
const RANKING_PATH = "quant-ranking";

export const useDataFetch = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [model, setModel] = useState<AppModel>({} as AppModel);

    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                const [
                    userDTO,
                    ratingsSummaryDTO,
                    quantRankingDTO,
                ] = await Promise.all([
                    api<UserDTO>(USER_PATH),
                    api<RatingsSummaryDTO>(RATINGS_SUMMARY_PATH),
                    api<QuantRankingDTO>(RANKING_PATH),
                ]);

                setModel({
                    user: normalizeUser(userDTO),
                    summary: normalizeRatingsSummary(ratingsSummaryDTO),
                    ranking: normalizeQuantRanking(quantRankingDTO),
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("Fetch error:", (error as Error).message);
                setHasError(true);
            } finally {
                setIsLoaded(true);
            }
        }
        fetchAndSetData();
    }, []);

    return {model, isLoaded, hasError};
};