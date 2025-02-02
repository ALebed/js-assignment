export const toCamelCase = (string: string) => {
    return string.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export const toSpaceCase = (string: string) => {
    return string.replace(/([-_])/ig, " ");
};

export const capitalize = (string: string): string => {
    return string?.length
        ? (String(string[0]).toUpperCase() + String(string).slice(1))
        : string;
};