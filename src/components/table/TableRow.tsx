import {FC} from "react";

export interface Row {
    id: string;
}
export interface Column {
    id: string;
    title: string;
}
interface Props {
    row: Row;
    columns: Column[];
}

const TableRow: FC<Props> = ({row, columns}: Props) => {
    return (
        <tr key={row.id}>
            {columns.map((column) => (
                <th key={column.id}>{row[column.title as keyof Row]}</th>
            ))}
        </tr>
    )
};

export default TableRow;