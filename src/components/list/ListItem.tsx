import {FC, ReactNode} from "react";

export interface Item {
    title: string;
    description: ReactNode;
}

const ListItem: FC<Item> = ({title, description}: Item) => {
    return (
        <li className="list-item is-justify-content-space-between">
            <div className="list-item-title">{title}</div>
            <div className="list-item-description has-text-link">{description}</div>
        </li>
    );
};

export default ListItem;