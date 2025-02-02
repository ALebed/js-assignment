import TableRow, {BaseType, Column} from "./TableRow";

interface Props<T> {
    rows: T[];
    columns: Column<T>[];
}

const Table = <T extends BaseType >({rows, columns}: Props<T>) => {
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