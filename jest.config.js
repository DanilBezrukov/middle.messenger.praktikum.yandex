/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+.tsx?$': 'ts-jest',
        '^.+\\.hbs$': '<rootDir>/node_modules/handlebars-jest',
    },
};
