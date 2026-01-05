/**
 * Firebase App Initialization
 * 
 * This file initializes the Firebase app using the singleton pattern
 * to prevent multiple initializations.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { firebaseConfig, validateFirebaseConfig } from './config';

let app: FirebaseApp;

/**
 * Gets or initializes the Firebase app instance
 * @returns Firebase app instance
 */
export function getFirebaseApp(): FirebaseApp {
	// Check if Firebase app is already initialized
	if (getApps().length > 0) {
		app = getApp();
	} else {
		// Validate configuration before initializing
		validateFirebaseConfig();

		// Initialize Firebase
		app = initializeApp(firebaseConfig);
	}

	return app;
}

// Export the app instance
export const firebaseApp = getFirebaseApp();
