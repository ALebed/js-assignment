import TableRow, {BaseType, Column} from "./TableRow";
import "./styles/table.scss";

interface Props<T> {
    rows: T[];
    columns: Column<T>[];
}

const Table = <T extends BaseType >({rows, columns}: Props<T>) => {
    if (!rows?.length || !columns?.length) return null;
    const showHeader: boolean = columns?.some((column) => column.header);

    return (
        <table className="table">
            {showHeader && (
                <thead>
                    <tr>
                        {columns.map(column => <th key={column.id}>{column.header}</th>)}
                    </tr>
                </thead>
            )}
            <tbody>
                {rows.map(row => <TableRow key={row.id} columns={columns} row={row} />)}
            </tbody>
        </table>
    );
};

export default Table;