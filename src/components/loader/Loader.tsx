import {FC} from "react";
import classNames from "classnames";
import "./styles/loader.scss";

interface Props {
    height?: number;
    size?: LoaderSize;
}

export enum LoaderSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

const Loader: FC<Props> = ({height, size = LoaderSize.Medium}: Props) => {
    return (
        <div className="loader-container" style={{height: height ? `${height}px` : "auto"}}>
            <div className="loader-wrapper">
                <div className={classNames(`loader is-loading is-${size}`)}></div>
            </div>
        </div>
    );
};

export default Loader;