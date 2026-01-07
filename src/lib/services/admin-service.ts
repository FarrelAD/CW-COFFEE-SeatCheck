/**
 * Admin User Management Service
 * Handles admin user data in Firestore
 */

import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db as firestore } from "../firebase/firestore";
import type { AdminUser, AdminRole } from "../types/admin";

const ADMIN_COLLECTION = "adminUsers";

/**
 * Get admin user data from Firestore
 */
export async function getAdminUser(uid: string): Promise<AdminUser | null> {
	try {
		const docRef = doc(firestore, ADMIN_COLLECTION, uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			return null;
		}

		const data = docSnap.data();
		return {
			uid: docSnap.id,
			email: data.email,
			role: data.role,
			assignedOutletId: data.assignedOutletId,
			createdAt: data.createdAt?.toDate() || new Date(),
		};
	} catch (error) {
		console.error("Error getting admin user:", error);
		return null;
	}
}

/**
 * Create a new admin user document in Firestore
 * Note: This should be called after creating the user in Firebase Auth
 */
export async function createAdminUser(
	uid: string,
	email: string,
	role: AdminRole,
	assignedOutletId?: number
): Promise<void> {
	try {
		const docRef = doc(firestore, ADMIN_COLLECTION, uid);
		const userData: Record<string, unknown> = {
			email,
			role,
			createdAt: serverTimestamp(),
		};

		if (role === "admin" && assignedOutletId !== undefined) {
			userData.assignedOutletId = assignedOutletId;
		}

		await setDoc(docRef, userData);
	} catch (error) {
		console.error("Error creating admin user:", error);
		throw error;
	}
}

/**
 * Update admin user role and outlet assignment
 */
export async function updateAdminRole(
	uid: string,
	role: AdminRole,
	assignedOutletId?: number
): Promise<void> {
	try {
		const docRef = doc(firestore, ADMIN_COLLECTION, uid);
		const updateData: Record<string, unknown> = { role };

		if (role === "admin" && assignedOutletId !== undefined) {
			updateData.assignedOutletId = assignedOutletId;
		} else if (role === "super_admin") {
			// Remove assignedOutletId for super admins
			updateData.assignedOutletId = null;
		}

		await updateDoc(docRef, updateData);
	} catch (error) {
		console.error("Error updating admin role:", error);
		throw error;
	}
}

/**
 * Check if user can access a specific outlet
 */
export function canAccessOutlet(
	user: AdminUser | null,
	outletId: number
): boolean {
	if (!user) return false;

	// Super admins can access all outlets
	if (user.role === "super_admin") return true;

	// Outlet admins can only access their assigned outlet
	return user.assignedOutletId === outletId;
}
