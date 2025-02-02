import {ReactNode} from "react";

export interface BaseType {
    id: string;
}
export interface Column<C> extends BaseType {
    title: keyof C;
}
interface Props<T extends BaseType> {
    row: T;
    columns: Column<T>[];
}

const TableRow = <T extends BaseType>({row, columns}: Props<T>) => {
    return (
        <tr key={row.id}>
            {columns.map((column) => (
                <th key={column.id}>{row[column.title] as ReactNode}</th>
            ))}
        </tr>
    )
};

export default TableRow;