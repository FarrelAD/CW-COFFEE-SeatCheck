"use client";

/**
 * Admin Login Page
 * Handles authentication for admin users
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { user, signIn } = useAuth();

	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			router.push("/admin");
		}
	}, [user, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await signIn(email, password);
			// Redirect will happen via useEffect
		} catch (err) {
			console.error("Login error:", err);
			setError(
				err instanceof Error
					? err.message
					: "Failed to sign in. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
			<div className="max-w-md w-full">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-midnight-blue mb-2">
						CW Coffee Admin
					</h1>
					<p className="text-gray-600">Sign in to manage your outlets</p>
				</div>

				{/* Login Form */}
				<div className="bg-white rounded-2xl shadow-lg p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Email Address
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
								placeholder="admin@example.com"
								disabled={loading}
							/>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-midnight-blue focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
								placeholder="••••••••"
								disabled={loading}
							/>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-xl p-4">
								<p className="text-red-800 text-sm">{error}</p>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-midnight-blue text-white font-bold py-4 rounded-xl hover:bg-[#082050] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
						>
							{loading ? "Signing in..." : "Sign In"}
						</button>
					</form>
				</div>

				{/* Footer */}
				<p className="text-center text-gray-600 text-sm mt-6">
					Contact your system administrator if you need access
				</p>
			</div>
		</div>
	);
}
