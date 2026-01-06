"use client";

import { useState } from "react";
import { seedAllOutlets, clearAllSeatData } from "@/lib/utils/seed-data";

export default function AdminSeedPage() {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSeed = async () => {
		setLoading(true);
		setMessage("🌱 Starting to seed database...\n");
		try {
			// Add timeout wrapper to prevent hanging
			const seedPromise = seedAllOutlets();
			const timeoutPromise = new Promise((_, reject) =>
				setTimeout(
					() => reject(new Error("Seeding timeout after 2 minutes")),
					120000
				)
			);

			await Promise.race([seedPromise, timeoutPromise]);
			setMessage((prev) => prev + "\n✅ Database seeded successfully!");
		} catch (error) {
			console.error("Seed error:", error);
			const errorMsg = error instanceof Error ? error.message : "Unknown error";
			setMessage(
				(prev) =>
					prev +
					`\n\n❌ Error: ${errorMsg}\n\nCheck browser console for details.`
			);
		} finally {
			setLoading(false);
		}
	};

	const handleClear = async () => {
		if (
			!confirm(
				"Are you sure you want to clear all seat data? This cannot be undone!"
			)
		) {
			return;
		}
		setLoading(true);
		setMessage("🗑️ Clearing database...\n");
		try {
			await clearAllSeatData();
			setMessage((prev) => prev + "\n✅ Database cleared successfully!");
		} catch (error) {
			console.error("Clear error:", error);
			const errorMsg = error instanceof Error ? error.message : "Unknown error";
			setMessage((prev) => prev + `\n\n❌ Error: ${errorMsg}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">
					Firebase Database Admin
				</h1>

				<div className="space-y-4">
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
						<p className="text-yellow-800 text-sm">
							⚠️ <strong>Important:</strong> You must seed the database before
							using the QR check-in feature. This will create initial seat data
							in Firebase.
						</p>
					</div>

					<button
						onClick={handleSeed}
						disabled={loading}
						className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Processing..." : "🌱 Seed Database"}
					</button>

					<button
						onClick={handleClear}
						disabled={loading}
						className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Processing..." : "🗑️ Clear All Data"}
					</button>

					{message && (
						<div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
							<p className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
								{message}
							</p>
						</div>
					)}

					<div className="mt-8 pt-6 border-t border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900 mb-3">
							What does seeding do?
						</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
							<li>Creates seat data for all outlets in Firebase</li>
							<li>Sets initial status (available/used) for each seat</li>
							<li>Required before QR check-in can work</li>
							<li>Safe to run multiple times (will overwrite existing data)</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
