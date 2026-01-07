"use client";

/**
 * Firebase Data Seeding Page
 * Admin utility to initialize Firebase with seat data
 */

import { useState } from "react";
import {
	seedOutletZone,
	seedOutlet,
	seedAllOutlets,
} from "@/lib/utils/seed-firebase";

export default function SeedDataPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<string>("");

	const handleSeedZone = async () => {
		setLoading(true);
		setResult("");
		try {
			const res = await seedOutletZone(1, "Zona AC 1");
			if (res.success) {
				setResult(`✅ Success! Created ${res.seatsCreated} seats in Zona AC 1`);
			} else {
				setResult(`❌ Error: ${res.error}`);
			}
		} catch (error) {
			setResult(
				`❌ Error: ${error instanceof Error ? error.message : "Unknown"}`
			);
		}
		setLoading(false);
	};

	const handleSeedOutlet = async () => {
		setLoading(true);
		setResult("");
		try {
			const res = await seedOutlet(1);
			if (res.success) {
				setResult(
					`✅ Success! Seeded ${res.zonesSeeded} zones with ${res.totalSeats} total seats\n${res.errors.length > 0 ? `\n⚠️ Errors:\n${res.errors.join("\n")}` : ""}`
				);
			} else {
				setResult(`❌ Errors:\n${res.errors.join("\n")}`);
			}
		} catch (error) {
			setResult(
				`❌ Error: ${error instanceof Error ? error.message : "Unknown"}`
			);
		}
		setLoading(false);
	};

	const handleSeedAll = async () => {
		setLoading(true);
		setResult("");
		try {
			const res = await seedAllOutlets();
			if (res.success) {
				setResult(
					`✅ Success! Seeded ${res.outletsSeeded} outlets, ${res.totalZones} zones, ${res.totalSeats} total seats\n${Object.keys(res.errors).length > 0 ? `\n⚠️ Errors:\n${JSON.stringify(res.errors, null, 2)}` : ""}`
				);
			} else {
				setResult(`❌ Errors:\n${JSON.stringify(res.errors, null, 2)}`);
			}
		} catch (error) {
			setResult(
				`❌ Error: ${error instanceof Error ? error.message : "Unknown"}`
			);
		}
		setLoading(false);
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-midnight-blue mb-6">
				Firebase Data Seeding
			</h1>

			<div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6">
				<p className="text-yellow-900 font-semibold">⚠️ Warning</p>
				<p className="text-yellow-800 text-sm mt-1">
					This will overwrite existing seat data in Firebase. Use with caution!
				</p>
			</div>

			<div className="space-y-4">
				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Seed Single Zone
					</h2>
					<p className="text-gray-600 text-sm mb-4">
						Initialize "Zona AC 1" for Outlet Malang 3
					</p>
					<button
						onClick={handleSeedZone}
						disabled={loading}
						className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Seeding..." : "Seed Zona AC 1"}
					</button>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Seed Entire Outlet
					</h2>
					<p className="text-gray-600 text-sm mb-4">
						Initialize all zones for Outlet Malang 3
					</p>
					<button
						onClick={handleSeedOutlet}
						disabled={loading}
						className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Seeding..." : "Seed Outlet 1"}
					</button>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Seed All Outlets
					</h2>
					<p className="text-gray-600 text-sm mb-4">
						Initialize all outlets with layout data
					</p>
					<button
						onClick={handleSeedAll}
						disabled={loading}
						className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Seeding..." : "Seed All Outlets"}
					</button>
				</div>
			</div>

			{result && (
				<div className="mt-6 bg-gray-900 text-gray-100 rounded-xl p-6 font-mono text-sm whitespace-pre-wrap">
					{result}
				</div>
			)}
		</div>
	);
}
