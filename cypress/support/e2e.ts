/**
 * Cypress E2E Support File
 * 
 * This file is loaded before every test file.
 * Use it to configure global settings and import custom commands.
 */

// Import custom commands
import './commands';

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
	// Prevent Cypress from failing tests on uncaught exceptions
	// You can customize this to handle specific errors

	// For example, ignore Firebase initialization errors in tests
	if (err.message.includes('Firebase')) {
		return false;
	}

	// Return false to prevent the error from failing the test
	// Remove or modify this based on your needs
	return true;
});

// Example: Set up viewport before each test
// beforeEach(() => {
//   cy.viewport(1280, 720);
// });

// Example: Clear local storage before each test
// beforeEach(() => {
//   cy.clearLocalStorage();
// });
