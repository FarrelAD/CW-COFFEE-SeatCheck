/**
 * Firebase Storage Service
 * 
 * This file initializes and exports the Firebase Storage service.
 * Import this module to use Firebase Storage throughout your application.
 */

import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { firebaseApp } from './app';

/**
 * Firebase Storage instance
 * Use this to perform file storage operations
 */
export const storage: FirebaseStorage = getStorage(firebaseApp);

/**
 * Example helper functions for common Storage operations
 * Uncomment and customize as needed
 */

// import {
//   ref,
//   uploadBytes,
//   uploadString,
//   getDownloadURL,
//   deleteObject,
//   listAll,
//   type StorageReference,
// } from 'firebase/storage';

// export async function uploadFile(
//   path: string,
//   file: File
// ): Promise<string> {
//   const storageRef = ref(storage, path);
//   await uploadBytes(storageRef, file);
//   return getDownloadURL(storageRef);
// }

// export async function uploadBase64(
//   path: string,
//   base64String: string
// ): Promise<string> {
//   const storageRef = ref(storage, path);
//   await uploadString(storageRef, base64String, 'base64');
//   return getDownloadURL(storageRef);
// }

// export async function getFileUrl(path: string): Promise<string> {
//   const storageRef = ref(storage, path);
//   return getDownloadURL(storageRef);
// }

// export async function deleteFile(path: string): Promise<void> {
//   const storageRef = ref(storage, path);
//   await deleteObject(storageRef);
// }

// export async function listFiles(path: string): Promise<StorageReference[]> {
//   const storageRef = ref(storage, path);
//   const result = await listAll(storageRef);
//   return result.items;
// }
