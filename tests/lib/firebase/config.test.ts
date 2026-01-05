/**
 * Unit Test: Firebase Configuration
 *
 * This test demonstrates how to write unit tests for utility functions.
 */

import { firebaseConfig, validateFirebaseConfig } from "@/lib/firebase/config";

describe("Firebase Configuration", () => {
	describe("firebaseConfig", () => {
		it("should have all required configuration properties", () => {
			expect(firebaseConfig).toHaveProperty("apiKey");
			expect(firebaseConfig).toHaveProperty("authDomain");
			expect(firebaseConfig).toHaveProperty("projectId");
			expect(firebaseConfig).toHaveProperty("storageBucket");
			expect(firebaseConfig).toHaveProperty("messagingSenderId");
			expect(firebaseConfig).toHaveProperty("appId");
		});

		it("should load values from environment variables", () => {
			expect(firebaseConfig.apiKey).toBe("test-api-key");
			expect(firebaseConfig.projectId).toBe("test-project");
		});
	});

	describe("validateFirebaseConfig", () => {
		it("should not throw error when all required fields are present", () => {
			expect(() => validateFirebaseConfig()).not.toThrow();
		});

		it("should warn when fields are missing", () => {
			const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

			// Temporarily remove a required field
			const originalApiKey = firebaseConfig.apiKey;
			(firebaseConfig as any).apiKey = undefined;

			validateFirebaseConfig();

			expect(consoleSpy).toHaveBeenCalled();

			// Restore the field
			(firebaseConfig as any).apiKey = originalApiKey;
			consoleSpy.mockRestore();
		});
	});
});
