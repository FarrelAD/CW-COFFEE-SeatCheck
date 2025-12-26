import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',

		// Viewport settings
		viewportWidth: 1280,
		viewportHeight: 720,

		// Test file patterns
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

		// Support file
		supportFile: 'cypress/support/e2e.ts',

		// Video and screenshot settings
		video: true,
		screenshotOnRunFailure: true,

		// Timeouts
		defaultCommandTimeout: 10000,
		pageLoadTimeout: 30000,

		setupNodeEvents(on, config) {
			// implement node event listeners here
			return config;
		},
	},

	// Component testing configuration (optional)
	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
		specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
	},

	// Folder structure
	fixturesFolder: 'cypress/fixtures',
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	downloadsFolder: 'cypress/downloads',
});
