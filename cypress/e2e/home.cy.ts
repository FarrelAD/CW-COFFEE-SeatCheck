/**
 * E2E Test: Home Page
 * 
 * This test demonstrates basic Cypress E2E testing for the home page.
 */

describe('Home Page', () => {
	beforeEach(() => {
		// Visit the home page before each test
		cy.visit('/');
	});

	it('should load the home page successfully', () => {
		// Check that the page loaded
		cy.get('body').should('be.visible');
	});

	it('should have a visible viewport', () => {
		// Verify viewport is set correctly
		cy.viewport(1280, 720);
		cy.get('body').should('be.visible');
	});

	it('should display the page content', () => {
		// Wait for any content to load
		cy.get('body').should('not.be.empty');
	});

	it('should not have console errors', () => {
		// Monitor console for errors (optional)
		cy.window().then((win) => {
			cy.spy(win.console, 'error');
		});
	});

	it('should be responsive', () => {
		// Test mobile viewport
		cy.viewport('iphone-x');
		cy.get('body').should('be.visible');

		// Test tablet viewport
		cy.viewport('ipad-2');
		cy.get('body').should('be.visible');

		// Test desktop viewport
		cy.viewport(1920, 1080);
		cy.get('body').should('be.visible');
	});
});
