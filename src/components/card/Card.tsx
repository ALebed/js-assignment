import {FC, ReactNode} from "react";

interface Props {
    header?: ReactNode,
    children: ReactNode,
}

const Card: FC<Props> = ({header, children}: Props) => {
    return (
        <article className="box">
            {!!header && <h6 className="title is-6">{header}</h6>}
            {children}
        </article>
    );
};

export default Card;