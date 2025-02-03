import {FC} from "react";
import ListItem, {Item} from "./ListItem";
import "./styles/list.scss";

interface Props {
    items: Item[];
}

const List: FC<Props> = ({items}: Props) => {
    if (!items?.length) {
        return "No data";
    }

    return (
        <ul className="list">
            {items.map(({title, description}) => {
                return <ListItem key={title} title={title} description={description} />
            })}
        </ul>
    );
};

export default List;