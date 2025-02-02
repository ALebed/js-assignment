import {FC, ReactNode} from "react";

export interface Props {
    header?: ReactNode,
    children: ReactNode,
}

const Card: FC<Props> = ({header, children}: Props) => {
    return (
        <article className="box">
            {!!header && <h4 className="title is-4 has-text-grey has-text-weight-semibold">{header}</h4>}
            {children}
        </article>
    );
};

export default Card;