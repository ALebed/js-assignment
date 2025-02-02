import {useEffect, useState} from "react";
import api from "../services/api";

export interface FetchConfig<S, D> {
    path: string | string[];
    normalize?: (data: D) => S;
    initialState: S;
}

export const useDataFetch = <S, D>(config: FetchConfig<S, D>) => {
    const {path, normalize, initialState} = config;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [state, setState] = useState<S>(initialState);

    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                if (typeof path === "string") {
                    const data: D = await api<D>(path);
                    if (normalize) {
                        setState(normalize(data));
                    } else {
                        setState(data as unknown as S);
                    }
                } else {
                    const data: unknown[] = await Promise.all(path.map(p => api(p)));
                    setState(data as unknown as S);
                }
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