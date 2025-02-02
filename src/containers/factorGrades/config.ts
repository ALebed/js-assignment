import {FetchConfig} from "../../hooks/useDataFetch";
import {FactorGradesDTO} from "../../services/DTOs";
import {BaseType, Column} from "../../components/table/TableRow";
import {FactorGrades} from "../../data/normalizeData";

export const fetchConfig: FetchConfig<FactorGradesDTO, unknown> = {
    path: [
        "factor-grades/now",
        "factor-grades/3m",
        "factor-grades/6m",
    ],
    initialState: [] as unknown as FactorGradesDTO,
};

export const columns: Column<FactorGrades & BaseType>[] = [
    {id: "label", title: "label"},
    {id: "current", title: "current", header: "Now"},
    {id: "threeMonths", title: "threeMonths", header: "3M ago"},
    {id: "sixMonths", title: "sixMonths", header: "6M ago"},
];