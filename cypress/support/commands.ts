/**
 * Cypress Custom Commands
 * 
 * Add custom commands to extend Cypress functionality.
 * These commands can be used throughout your E2E tests.
 */

/// <reference types="cypress" />

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to visit a page and wait for it to load
			 * @example cy.visitAndWait('/about')
			 */
			visitAndWait(url: string): Chainable<void>;

			/**
			 * Custom command to get element by data-testid
			 * @example cy.getByTestId('submit-button')
			 */
			getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}

// Custom command to visit and wait for page load
Cypress.Commands.add('visitAndWait', (url: string) => {
	cy.visit(url);
	cy.get('body').should('be.visible');
});

// Custom command to get by data-testid
Cypress.Commands.add('getByTestId', (testId: string) => {
	return cy.get(`[data-testid="${testId}"]`);
});

// Example: Custom command for Firebase auth (if needed)
// Cypress.Commands.add('login', (email: string, password: string) => {
//   cy.visit('/login');
//   cy.get('input[name="email"]').type(email);
//   cy.get('input[name="password"]').type(password);
//   cy.get('button[type="submit"]').click();
//   cy.url().should('not.include', '/login');
// });

export { };
