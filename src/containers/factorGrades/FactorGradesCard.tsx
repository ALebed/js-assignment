import {FC} from "react";
import {FetchConfig} from "../../hooks/useDataFetch";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {withPremium} from "../../hocs/withPremium";
import FactorGradesContent from "./FactorGradesContent";
import {DataDTO} from "../../data/dataTypes";

const fetchConfig: FetchConfig<DataDTO, unknown> = {
    path: [
        "factor-grades/now",
        "factor-grades/3m",
        "factor-grades/6m",
    ],
    initialState: [] as unknown as DataDTO,
};

const FactorGradesCard: FC = () => {
    return (
        <WithFetchingCard
            header="header"
            config={fetchConfig}
            render={(data: DataDTO) => {
                if (data?.length === fetchConfig.path.length) {
                    return <FactorGradesContent data={data} />
                }
                return (<span>We could not load data. Please try again.</span>);
            }}
        />
    );
};

export default withPremium(FactorGradesCard);