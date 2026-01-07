"use client";

/**
 * Authentication Context Provider
 * Manages authentication state and provides auth methods throughout the app
 */

import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthChange } from "../firebase/auth";
import { getAdminUser } from "../services/admin-service";
import type { AdminUser, AuthContextType } from "../types/admin";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AdminUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthChange(async (firebaseUser) => {
			if (firebaseUser) {
				// Fetch admin user data from Firestore
				const adminUser = await getAdminUser(firebaseUser.uid);
				setUser(adminUser);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const signIn = async (email: string, password: string) => {
		const { signIn: signInHelper } = await import("../firebase/auth");
		const adminUser = await signInHelper(email, password);
		setUser(adminUser);
	};

	const signOut = async () => {
		const { signOut: signOutHelper } = await import("../firebase/auth");
		await signOutHelper();
		setUser(null);
	};

	const value: AuthContextType = {
		user,
		loading,
		signIn,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
