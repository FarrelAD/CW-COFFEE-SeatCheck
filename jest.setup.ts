/**
 * Jest Setup File
 *
 * This file runs before each test suite.
 * Use it to configure testing utilities and mock global objects.
 */

import "@testing-library/jest-dom";

// Mock environment variables for tests
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = "test-api-key";
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "test-project.firebaseapp.com";
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "test-project";
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "test-project.appspot.com";
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "123456789";
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = "1:123456789:web:abcdef";
process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "G-XXXXXXXXXX";

// Mock Firebase modules to prevent initialization errors in tests
jest.mock("firebase/app", () => ({
	initializeApp: jest.fn(() => ({})),
	getApps: jest.fn(() => []),
	getApp: jest.fn(() => ({})),
}));

jest.mock("firebase/auth", () => ({
	getAuth: jest.fn(() => ({
		currentUser: null,
	})),
}));

jest.mock("firebase/firestore", () => ({
	getFirestore: jest.fn(() => ({})),
}));

jest.mock("firebase/storage", () => ({
	getStorage: jest.fn(() => ({})),
}));

// Suppress console warnings in tests (optional)
// global.console = {
//   ...console,
//   warn: jest.fn(),
//   error: jest.fn(),
// };
