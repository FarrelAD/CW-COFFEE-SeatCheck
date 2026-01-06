/**
 * Firebase Services
 *
 * Central export point for all Firebase services.
 * Import from this file to access Firebase throughout your application.
 *
 * @example
 * ```typescript
 * import { auth, db, storage } from '@/lib/firebase';
 * ```
 */

// Export Firebase app
export { firebaseApp, getFirebaseApp } from "./app";

// Export Firebase configuration
export { firebaseConfig, validateFirebaseConfig } from "./config";

// Export Firebase services
export { auth } from "./auth";
export { db } from "./firestore";
export { storage } from "./storage";

// Re-export commonly used Firebase types for convenience
export type { FirebaseApp } from "firebase/app";
export type { Auth, User } from "firebase/auth";
export type { Firestore } from "firebase/firestore";
export type { FirebaseStorage } from "firebase/storage";
