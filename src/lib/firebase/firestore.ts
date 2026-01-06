/**
 * Firebase Firestore Service
 *
 * This file initializes and exports the Firestore database service.
 * Import this module to use Firestore throughout your application.
 */

import { getFirestore, type Firestore } from "firebase/firestore";
import { firebaseApp } from "./app";

/**
 * Firestore database instance
 * Use this to perform database operations
 */
export const db: Firestore = getFirestore(firebaseApp);

/**
 * Example: Type-safe collection references
 * Uncomment and customize as needed
 */

// import { collection, CollectionReference, DocumentData } from 'firebase/firestore';

// // Define your data types
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: Date;
// }

// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   authorId: string;
//   createdAt: Date;
// }

// // Create typed collection references
// export const usersCollection = collection(db, 'users') as CollectionReference<User>;
// export const postsCollection = collection(db, 'posts') as CollectionReference<Post>;

/**
 * Example helper functions for common Firestore operations
 * Uncomment and customize as needed
 */

// import {
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   updateDoc,
//   deleteDoc,
//   query,
//   where,
//   orderBy,
//   limit,
// } from 'firebase/firestore';

// export async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
//   const docRef = doc(db, collectionName, docId);
//   const docSnap = await getDoc(docRef);
//   return docSnap.exists() ? (docSnap.data() as T) : null;
// }

// export async function setDocument<T>(collectionName: string, docId: string, data: T): Promise<void> {
//   const docRef = doc(db, collectionName, docId);
//   await setDoc(docRef, data);
// }
