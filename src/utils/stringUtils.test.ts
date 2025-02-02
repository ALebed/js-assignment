import {toCamelCase, toSpaceCase, capitalize} from "./stringUtils";

describe("toCamelCase", () => {
    it("should convert kebab-case to camelCase", () => {
        expect(toCamelCase("hello-world")).toBe("helloWorld");
    });

    it("should convert snake_case to camelCase", () => {
        expect(toCamelCase("hello_world")).toBe("helloWorld");
    });

    it("should handle mixed delimiters", () => {
        expect(toCamelCase("hello-world_test")).toBe("helloWorldTest");
    });

    it("should return the same string if no delimiters are present", () => {
        expect(toCamelCase("helloworld")).toBe("helloworld");
    });

    it("should handle capital letters correctly", () => {
        expect(toCamelCase("Hello-World")).toBe("HelloWorld");
    });

    it("should return an empty string if input is empty", () => {
        expect(toCamelCase("")).toBe("");
    });
});

describe("toSpaceCase", () => {
    it("should replace delimiters in kebab-case with spaces", () => {
        expect(toSpaceCase("hello-world")).toBe("hello world");
    });

    it("should replace delimiters in snake_case with spaces", () => {
        expect(toSpaceCase("hello_world")).toBe("hello world");
    });

    it("should handle mixed delimiters", () => {
        expect(toSpaceCase("hello-world_test")).toBe("hello world test");
    });

    it("should return the same string if no delimiters are present", () => {
        expect(toSpaceCase("helloworld")).toBe("helloworld");
    });

    it("should handle capital letters correctly", () => {
        expect(toSpaceCase("Hello-World")).toBe("Hello World");
    });

    it("should return an empty string if input is empty", () => {
        expect(toSpaceCase("")).toBe("");
    });
});

describe("capitalize", () => {
    it("should capitalize the first letter of a lowercase word", () => {
        expect(capitalize("hello")).toBe("Hello");
    });

    it("should keep the first letter capitalized if already capitalized", () => {
        expect(capitalize("Hello")).toBe("Hello");
    });

    it("should handle single-character strings", () => {
        expect(capitalize("h")).toBe("H");
    });

    it("should handle empty strings", () => {
        expect(capitalize("")).toBe("");
    });

    it("should handle strings with spaces", () => {
        expect(capitalize(" hello")).toBe(" hello");
    });

    it("should handle special characters", () => {
        expect(capitalize("@hello")).toBe("@hello");
    });
});
