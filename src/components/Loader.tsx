import {FC} from "react";

interface Props {
    height?: number;
    size?: number;
}

const Loader: FC<Props> = ({height}: Props) => {
    // TODO: Add Loader icon
    return (
        <div className="box" style={{height: height ? `${height}px` : "auto"}}>
            Data Loading...
        </div>
    );
};

export default Loader;