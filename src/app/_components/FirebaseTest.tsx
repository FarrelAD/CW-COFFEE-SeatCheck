/**
 * Firebase Test Component
 *
 * This is a simple test component to verify Firebase integration.
 * You can use this as a reference or delete it once you've confirmed Firebase works.
 */

"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import type { User } from "firebase/auth";

export default function FirebaseTest() {
	const [firebaseStatus, setFirebaseStatus] = useState<{
		auth: boolean;
		firestore: boolean;
		storage: boolean;
		user: User | null;
	}>({
		auth: false,
		firestore: false,
		storage: false,
		user: null,
	});

	useEffect(() => {
		// Test Firebase initialization
		try {
			// Check if Firebase services are initialized
			const authInitialized = !!auth;
			const firestoreInitialized = !!db;
			const storageInitialized = !!storage;

			setFirebaseStatus({
				auth: authInitialized,
				firestore: firestoreInitialized,
				storage: storageInitialized,
				user: auth.currentUser,
			});

			console.log("Firebase Status:", {
				auth: authInitialized ? "✓ Initialized" : "✗ Not initialized",
				firestore: firestoreInitialized ? "✓ Initialized" : "✗ Not initialized",
				storage: storageInitialized ? "✓ Initialized" : "✗ Not initialized",
			});
		} catch (error) {
			console.error("Firebase initialization error:", error);
		}
	}, []);

	return (
		<div
			style={{
				color: "#0A2463",
				padding: "20px",
				border: "1px solid #ddd",
				borderRadius: "8px",
				maxWidth: "600px",
				margin: "20px auto",
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}
		>
			<h2 style={{ marginTop: 0 }}>🔥 Firebase Integration Test</h2>

			<div style={{ marginBottom: "20px" }}>
				<h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
					Service Status:
				</h3>
				<ul style={{ listStyle: "none", padding: 0 }}>
					<li
						style={{
							padding: "8px",
							backgroundColor: "#f5f5f5",
							marginBottom: "5px",
							borderRadius: "4px",
						}}
					>
						{firebaseStatus.auth ? "✅" : "❌"} Authentication
					</li>
					<li
						style={{
							padding: "8px",
							backgroundColor: "#f5f5f5",
							marginBottom: "5px",
							borderRadius: "4px",
						}}
					>
						{firebaseStatus.firestore ? "✅" : "❌"} Firestore Database
					</li>
					<li
						style={{
							padding: "8px",
							backgroundColor: "#f5f5f5",
							marginBottom: "5px",
							borderRadius: "4px",
						}}
					>
						{firebaseStatus.storage ? "✅" : "❌"} Storage
					</li>
				</ul>
			</div>

			<div
				style={{
					padding: "15px",
					backgroundColor: "#e3f2fd",
					borderRadius: "4px",
					fontSize: "14px",
				}}
			>
				<strong>📝 Note:</strong> If you see ✅ for all services, Firebase is
				properly configured!
				<br />
				<br />
				To use Firebase features, make sure to:
				<ol style={{ marginBottom: 0, paddingLeft: "20px" }}>
					<li>
						Add your Firebase credentials to <code>.env.local</code>
					</li>
					<li>Enable the services you need in Firebase Console</li>
					<li>
						Check the documentation at <code>docs/firebase-setup.md</code>
					</li>
				</ol>
			</div>

			{!firebaseStatus.auth && (
				<div
					style={{
						marginTop: "15px",
						padding: "15px",
						backgroundColor: "#fff3cd",
						borderRadius: "4px",
						fontSize: "14px",
					}}
				>
					<strong>⚠️ Warning:</strong> Firebase services are not initialized.
					Please check your <code>.env.local</code> file and ensure all Firebase
					configuration values are set correctly.
				</div>
			)}
		</div>
	);
}
