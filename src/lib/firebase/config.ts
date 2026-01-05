/**
 * Firebase Configuration
 * 
 * This file exports the Firebase configuration object using environment variables.
 * Make sure to set up your .env.local file with the correct Firebase credentials.
 */

export const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Validates that all required Firebase configuration values are present
 */
export function validateFirebaseConfig(): void {
	const requiredFields = [
		'apiKey',
		'authDomain',
		'projectId',
		'storageBucket',
		'messagingSenderId',
		'appId',
	] as const;

	const missingFields = requiredFields.filter(
		(field) => !firebaseConfig[field]
	);

	if (missingFields.length > 0) {
		console.warn(
			`Missing Firebase configuration fields: ${missingFields.join(', ')}. ` +
			'Please check your .env.local file.'
		);
	}
}
