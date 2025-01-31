import {FC, ReactNode} from "react";

export interface Props {
    title: string;
    description: ReactNode;
}

const ListItem: FC<Props> = ({title, description}: Props) => {
    return (
        <li className="list-item">
            <div className="list-item-title">{title}</div>
            <div className="list-item-description">{description}</div>
        </li>
    );
};

export default ListItem;