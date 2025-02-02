import {ReactNode} from "react";
import Card from "./Card";
import {FetchConfig, useDataFetch} from "../../hooks/useDataFetch";
import Loader from "../loader/Loader";

interface Props<S, D> {
    header?: ReactNode;
    initialHeight?: number;
    config: FetchConfig<S, D>;
    render: (state: S) => ReactNode;
}

const WithFetchingCard = <S, D>({header, initialHeight, config, render}: Props<S, D>) => {
    const {state, hasError, isLoaded} = useDataFetch<S, D>(config);

    return (
        <Card header={header}>
            {hasError && <span>We could not load data. Please try again.</span>}
            {!hasError && !isLoaded && <Loader height={initialHeight} />}
            {!hasError && isLoaded && render(state)}
        </Card>
    );
};

export default WithFetchingCard;