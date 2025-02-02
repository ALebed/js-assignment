import {FC} from "react";
import WithFetchingCard from "../../components/card/WithFetchingCard";
import {withPremium} from "../../hocs/withPremium";
import FactorGradesContent from "./FactorGradesContent";
import {FactorGradesDTO} from "../../services/DTOs";
import {fetchConfig} from "./config";

const FactorGradesCard: FC = () => {
    return (
        <WithFetchingCard
            header="Factor Grades"
            initialHeight={200}
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