import {useEffect, useState} from "react";
import api from "../services/api";

export interface FetchConfig<S, D> {
    path: string;
    normalizer: (data: D) => S;
    initialState: S;
}

export const useDataFetch = <S, D>(config: FetchConfig<S, D>) => {
    const {path, normalizer, initialState} = config;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [state, setState] = useState<S>(initialState);

    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                const data: D = await api<D>(path);
                setState(normalizer(data));
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

    return {state, isLoaded, hasError};
};