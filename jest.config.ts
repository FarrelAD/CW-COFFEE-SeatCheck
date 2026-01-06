import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: "jsdom",

	// Root directory
	rootDir: ".",

	// Setup files
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

	// Module paths
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},

	// Test match patterns
	testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

	// Coverage configuration
	collectCoverageFrom: [
		"app/**/*.{js,jsx,ts,tsx}",
		"lib/**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/.next/**",
		"!**/coverage/**",
		"!**/cypress/**",
	],

	// Coverage thresholds (optional - adjust as needed)
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50,
		},
	},

	// Ignore patterns
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/.next/",
		"<rootDir>/cypress/",
	],

	// Module file extensions
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default createJestConfig(config);
