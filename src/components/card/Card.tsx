import {FC, ReactNode} from "react";

interface Props {
    header?: ReactNode,
    children: ReactNode,
}

const Card: FC<Props> = ({header, children}: Props) => {
    return (
        <article className="card">
            {!!header && <h4 className="card-title">{header}</h4>}
            {children}
        </article>
    );
};

export default Card;