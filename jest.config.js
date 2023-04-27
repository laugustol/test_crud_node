module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    coverageReporters: ["html", "text"],
    testEnvironmentOptions: {
        PORT: 4001
    }
};
