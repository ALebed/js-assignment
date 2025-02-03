const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
};

export default config;
