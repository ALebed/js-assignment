export const isObjectEmpty = (object: object): boolean => {
    if (!object) return true;
    return Object.keys(object).length === 0 && object.constructor === Object;
};