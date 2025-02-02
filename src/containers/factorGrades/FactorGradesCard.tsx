import {FC} from "react";
import {FetchConfig} from "../../hooks/useDataFetch";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {withPremium} from "../../hocs/withPremium";
import FactorGradesContent from "./FactorGradesContent";
import {FactorGradesDTO} from "../../services/DTOs";

const fetchConfig: FetchConfig<FactorGradesDTO, unknown> = {
    path: [
        "factor-grades/now",
        "factor-grades/3m",
        "factor-grades/6m",
    ],
    initialState: [] as unknown as FactorGradesDTO,
};

const FactorGradesCard: FC = () => {
    return (
        <WithFetchingCard
            header="Factor Grades"
            config={fetchConfig}
            render={(data: FactorGradesDTO) => {
                if (data?.length === fetchConfig.path.length) {
                    return <FactorGradesContent data={data} />
                }
                return (<span>We could not load data. Please try again.</span>);
            }}
        />
    );
};

export default withPremium(FactorGradesCard);