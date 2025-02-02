import {useEffect, useState} from "react";
import {QuantRankingDTO, UserDTO} from "./dataTypes";
import {
    normalizeQuantRanking,
    normalizeUser,
    QuantRanking,
    User,
} from "./normalizeData";
import api from "../services/api";

export interface AppModel {
    user: User;
    ranking: QuantRanking;
}

const USER_PATH = "user";
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
                    quantRankingDTO,
                ] = await Promise.all([
                    api<UserDTO>(USER_PATH),
                    api<QuantRankingDTO>(RANKING_PATH),
                ]);

                setModel({
                    user: normalizeUser(userDTO),
                    ranking: normalizeQuantRanking(quantRankingDTO),
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("Fetch error:", error);
                setHasError(true);
            } finally {
                setIsLoaded(true);
            }
        }
        fetchAndSetData();
    }, []);

    return {model, isLoaded, hasError};
};