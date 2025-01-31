import {FC, ReactNode} from "react";

export interface Props {
    title: string;
    description: ReactNode;
}

const ListItem: FC<Props> = ({title, description}: Props) => {
    return (
        <li className="list-item">
            <div className="list-item__title">{title}</div>
            <div className="list-item__description">{description}</div>
        </li>
    );
};

export default ListItem;