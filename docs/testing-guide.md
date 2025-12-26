# Testing Guide

This guide covers how to write and run tests in the CW Coffee Next.js project using Jest and Cypress.

## Table of Contents

- [Overview](#overview)
- [Running Tests](#running-tests)
- [Writing Unit Tests with Jest](#writing-unit-tests-with-jest)
- [Writing Component Tests](#writing-component-tests)
- [Writing E2E Tests with Cypress](#writing-e2e-tests-with-cypress)
- [Testing Best Practices](#testing-best-practices)
- [Mocking Strategies](#mocking-strategies)
- [CI/CD Integration](#cicd-integration)

## Overview

The project uses two testing frameworks:

- **Jest** + **React Testing Library**: For unit and integration tests
- **Cypress**: For end-to-end (E2E) tests

### Test Structure

```
cw-coffee/
├── __tests__/              # Jest unit and component tests
│   ├── components/         # Component tests
│   └── lib/               # Utility/library tests
├── cypress/               # Cypress E2E tests
│   ├── e2e/              # E2E test files
│   ├── fixtures/         # Test data
│   └── support/          # Custom commands and utilities
├── jest.config.ts        # Jest configuration
├── jest.setup.ts         # Jest setup file
└── cypress.config.ts     # Cypress configuration
```

## Running Tests

### Jest (Unit & Component Tests)

```bash
# Run all tests
pnpm test

# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Cypress (E2E Tests)

```bash
# Open Cypress interactive UI
pnpm cypress:open

# Run Cypress tests in headless mode
pnpm cypress:run

# Run E2E tests (alias for cypress:run)
pnpm e2e

# Run E2E tests with browser visible
pnpm e2e:headed
```

> **Note**: Make sure your dev server is running (`pnpm dev`) before running Cypress tests.

## Writing Unit Tests with Jest

### Basic Test Structure

```typescript
// __tests__/lib/utils.test.ts
import { myFunction } from '@/lib/utils';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(null)).toBeNull();
  });
});
```

### Testing Firebase Utilities

Firebase is mocked globally in `jest.setup.ts`. Example:

```typescript
// __tests__/lib/firebase/config.test.ts
import { firebaseConfig } from '@/lib/firebase/config';

describe('Firebase Configuration', () => {
  it('should have required properties', () => {
    expect(firebaseConfig).toHaveProperty('apiKey');
    expect(firebaseConfig).toHaveProperty('projectId');
  });
});
```

## Writing Component Tests

### Basic Component Test

```typescript
// __tests__/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '@/app/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/app/components/Button';

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Async Components

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import AsyncComponent from '@/app/components/AsyncComponent';

describe('AsyncComponent', () => {
  it('should display loading state then data', async () => {
    render(<AsyncComponent />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument();
    });
  });
});
```

## Writing E2E Tests with Cypress

### Basic E2E Test

```typescript
// cypress/e2e/navigation.cy.ts
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to about page', () => {
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.get('h1').should('contain', 'About');
  });
});
```

### Using Custom Commands

```typescript
// cypress/e2e/custom-commands.cy.ts
describe('Custom Commands', () => {
  it('should use visitAndWait command', () => {
    cy.visitAndWait('/');
    cy.get('body').should('be.visible');
  });

  it('should use getByTestId command', () => {
    cy.visit('/');
    cy.getByTestId('submit-button').click();
  });
});
```

### Testing Forms

```typescript
// cypress/e2e/contact-form.cy.ts
describe('Contact Form', () => {
  it('should submit form successfully', () => {
    cy.visit('/contact');
    
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('Hello!');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.success-message').should('be.visible');
  });
});
```

### Testing Responsive Design

```typescript
// cypress/e2e/responsive.cy.ts
describe('Responsive Design', () => {
  it('should work on mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('.mobile-menu').should('be.visible');
  });

  it('should work on desktop', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('.desktop-nav').should('be.visible');
  });
});
```

## Testing Best Practices

### General Principles

1. **Write Descriptive Test Names**: Use clear, descriptive names that explain what the test does
2. **Follow AAA Pattern**: Arrange, Act, Assert
3. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
4. **Keep Tests Independent**: Each test should run independently
5. **Use Data-TestId for Stable Selectors**: Add `data-testid` attributes for reliable element selection

### Example: Using data-testid

```tsx
// Component
export default function Button() {
  return <button data-testid="submit-button">Submit</button>;
}

// Test
cy.getByTestId('submit-button').click();
```

### Test Coverage Goals

Aim for:
- **Statements**: 50%+
- **Branches**: 50%+
- **Functions**: 50%+
- **Lines**: 50%+

Adjust thresholds in `jest.config.ts` as needed.

### What to Test

**Do Test:**
- ✅ User interactions and flows
- ✅ Edge cases and error handling
- ✅ Component rendering with different props
- ✅ Form validation
- ✅ API integration (mocked)
- ✅ Routing and navigation

**Don't Test:**
- ❌ Third-party libraries (they have their own tests)
- ❌ Implementation details
- ❌ Styling (unless critical to functionality)

## Mocking Strategies

### Mocking Firebase

Firebase is globally mocked in `jest.setup.ts`:

```typescript
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApps: jest.fn(() => []),
}));
```

### Mocking API Calls

```typescript
// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' }),
  })
) as jest.Mock;

// Test
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ data: 'test' });
  expect(fetch).toHaveBeenCalledTimes(1);
});
```

### Mocking Next.js Router

```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));
```

### Cypress Network Stubbing

```typescript
cy.intercept('GET', '/api/data', { fixture: 'data.json' }).as('getData');
cy.visit('/');
cy.wait('@getData');
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run Jest tests
        run: pnpm test:coverage
      
      - name: Build application
        run: pnpm build
      
      - name: Run Cypress tests
        run: pnpm e2e
```

## Debugging Tests

### Jest Debugging

```bash
# Run a specific test file
pnpm test path/to/test.test.ts

# Run tests matching a pattern
pnpm test --testNamePattern="should render"

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Cypress Debugging

```typescript
// Add debugger in test
cy.get('button').click();
cy.debug(); // Pause execution
cy.get('.result').should('exist');

// Use .pause() for interactive debugging
cy.pause();
```

## Common Issues

### Issue: Tests timeout

**Solution**: Increase timeout in test or config

```typescript
// Jest
jest.setTimeout(10000);

// Cypress
cy.get('.slow-element', { timeout: 10000 });
```

### Issue: Firebase initialization errors

**Solution**: Ensure Firebase is mocked in `jest.setup.ts`

### Issue: Cypress can't find elements

**Solution**: 
- Add `cy.wait()` for dynamic content
- Use `data-testid` attributes
- Check element visibility with `.should('be.visible')`

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
