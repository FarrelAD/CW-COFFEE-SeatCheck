/**
 * Firebase Authentication Service
 *
 * This file initializes and exports the Firebase Authentication service.
 * Import this module to use Firebase Auth throughout your application.
 */

import { getAuth, type Auth } from "firebase/auth";
import { firebaseApp } from "./app";

/**
 * Firebase Authentication instance
 * Use this to perform authentication operations
 */
export const auth: Auth = getAuth(firebaseApp);

/**
 * Example helper functions for common auth operations
 * Uncomment and customize as needed
 */

// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut as firebaseSignOut,
//   onAuthStateChanged,
//   type User,
// } from 'firebase/auth';

// export async function signIn(email: string, password: string) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

// export async function signUp(email: string, password: string) {
//   return createUserWithEmailAndPassword(auth, email, password);
// }

// export async function signOut() {
//   return firebaseSignOut(auth);
// }

// export function onAuthChange(callback: (user: User | null) => void) {
//   return onAuthStateChanged(auth, callback);
// }
