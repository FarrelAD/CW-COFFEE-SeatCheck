/**
 * Firebase Authentication Service
 * Provides Firebase Auth instance and helper functions with role-based access control
 */

import {
	getAuth,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
	onAuthStateChanged,
	type Auth,
	type User,
} from "firebase/auth";
import { firebaseApp } from "./app";
import { getAdminUser } from "../services/admin-service";
import type { AdminUser } from "../types/admin";

/**
 * Firebase Authentication instance
 * Use this to perform authentication operations
 */
export const auth: Auth = getAuth(firebaseApp);

/**
 * Sign in with email and password
 * Validates that the user is an authorized admin
 */
export async function signIn(
	email: string,
	password: string
): Promise<AdminUser> {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	const adminUser = await getAdminUser(userCredential.user.uid);

	if (!adminUser) {
		await firebaseSignOut(auth);
		throw new Error("User is not authorized as an admin");
	}

	return adminUser;
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
	return firebaseSignOut(auth);
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
	return auth.currentUser;
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(
	callback: (user: User | null) => void
): () => void {
	return onAuthStateChanged(auth, callback);
}
