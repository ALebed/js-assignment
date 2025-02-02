import {FC, memo, useMemo} from "react";
import Table from "../../components/table/Table";
import {BaseType} from "../../components/table/TableRow";
import {FactorGrades, normalizeFactorGrades} from "../../data/normalizeData";
import {FactorGradesDTO} from "../../services/DTOs";
import {columns} from "./config";

interface Props {
    data: FactorGradesDTO;
}

const FactorGradesContent: FC<Props> = ({data}: Props) => {
    const rows: (FactorGrades & BaseType)[] = useMemo(() => {
        return normalizeFactorGrades(data).map((row: FactorGrades) => ({
            ...row,
            id: row.label,
        }));
    }, [data]);

    return <Table rows={rows} columns={columns} />
};

export default memo(FactorGradesContent);