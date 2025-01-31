import {isObjectEmpty} from "./isObjectEmpty";

describe("isObjectEmpty", () => {
    it("returns true for empty object", () => {
        expect(isObjectEmpty({})).toBe(true);
    });

    it("returns false for a non-empty object", () => {
        expect(isObjectEmpty({name: "John"})).toBe(false);
    });

    it("returns true for a non-object input", () => {
        expect(isObjectEmpty(null as unknown as object)).toBe(true);
        expect(isObjectEmpty(undefined as unknown as object)).toBe(true);
    });
});