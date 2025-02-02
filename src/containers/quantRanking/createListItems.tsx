import {QuantRanking} from "../../data/normalizeData";
import {Item} from "../../components/list/ListItem";
import {capitalize} from "../../utils/stringUtils";
import {titleMap} from "./config";

const getTitleByType = (type: string): string => (titleMap[type] || type);

export const createListItems = ({rankings, ...rest}: QuantRanking): Item[] => {
    return [
        ...Object.entries(rest).map(([key, description]) => ({
            title: capitalize(key),
            description
        })),
        ...rankings.map(({type, rank, total}) => ({
            title: getTitleByType(type),
            description: <><b>{rank}</b> out of <b>{total}</b></>,
        })),
    ];
};