import {FC} from "react";
import TableRow, {Column, Row} from "./TableRow";

interface Props<T> {
    rows: T[];
    columns: Column[];
}

const Table: FC<Props<Row>> = <T extends Row>({rows, columns}: Props<T>) => {
    if (!rows?.length || !columns?.length) return null;

    return (
        <table className="table">
            <tbody>
                {rows.map(row => <TableRow key={row.id} columns={columns} row={row} />)}
            </tbody>
        </table>
    );
};

export default Table;