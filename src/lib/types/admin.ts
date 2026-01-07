/**
 * Admin User Types and Roles
 * Defines the structure for admin users with role-based access control
 */

export type AdminRole = "super_admin" | "admin";

export interface AdminUser {
	uid: string;
	email: string;
	role: AdminRole;
	assignedOutletId?: number; // Only for outlet admins
	createdAt: Date;
}
