import { getOutletCheckingData, getOutletBySlug, getAllOutletSlugs } from "@/app/repository/outlets";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export default async function CheckingPage(props: {
	params: Promise<{ slug: string }> | { slug: string };
}) {
	const params = await Promise.resolve(props.params);
	const outlet = getOutletBySlug(params.slug);
	const checkingData = getOutletCheckingData(params.slug);

	if (!outlet || !checkingData) {
		notFound();
	}

	const { capacity } = checkingData;

	// Calculate percentages
	const ac1Percentage = (capacity.ac1.used / capacity.ac1.total) * 100;
	const ac2Percentage = (capacity.ac2.used / capacity.ac2.total) * 100;

	// Calculate circle stroke dasharray (circumference = 2 * π * r, where r = 56)
	const circumference = 2 * Math.PI * 56;
	const ac1Dash = (ac1Percentage / 100) * circumference;
	const ac2Dash = (ac2Percentage / 100) * circumference;

	return (
		<main className="max-w-md mx-auto px-4 py-6 pb-24">
			{/* Header Info */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-1">{outlet.title}</h1>
				<p className="text-gray-600 text-sm">{outlet.address}</p>
			</div>

			{/* Status Overview Card */}
			<div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
				<h2 className="text-lg font-bold text-gray-900 mb-4">Status Checking</h2>

				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="bg-green-50 rounded-xl p-4 text-center">
						<div className="text-3xl font-bold text-green-600 mb-1">
							{capacity.ac1.total - capacity.ac1.used}
						</div>
						<div className="text-xs text-gray-600">Tersedia AC 1</div>
					</div>
					<div className="bg-green-50 rounded-xl p-4 text-center">
						<div className="text-3xl font-bold text-green-600 mb-1">
							{capacity.ac2.total - capacity.ac2.used}
						</div>
						<div className="text-xs text-gray-600">Tersedia AC 2</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="bg-red-50 rounded-xl p-4 text-center">
						<div className="text-3xl font-bold text-red-600 mb-1">
							{capacity.ac1.used}
						</div>
						<div className="text-xs text-gray-600">Terpakai AC 1</div>
					</div>
					<div className="bg-red-50 rounded-xl p-4 text-center">
						<div className="text-3xl font-bold text-red-600 mb-1">
							{capacity.ac2.used}
						</div>
						<div className="text-xs text-gray-600">Terpakai AC 2</div>
					</div>
				</div>
			</div>

			{/* Capacity Cards */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				{/* Ruang AC 1 */}
				<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
					<h3 className="text-gray-900 font-bold text-lg mb-1">Kapasitas</h3>
					<p className="text-gray-500 text-sm mb-4">Ruang AC 1</p>

					{/* Circular Progress */}
					<div className="relative w-32 h-32 mx-auto mb-4">
						<svg className="w-full h-full transform -rotate-90">
							{/* Background Circle */}
							<circle
								cx="64"
								cy="64"
								r="56"
								stroke="#E5E7EB"
								strokeWidth="12"
								fill="none"
							/>
							{/* Progress Circle */}
							<circle
								cx="64"
								cy="64"
								r="56"
								stroke="#0a2463"
								strokeWidth="12"
								fill="none"
								strokeDasharray={`${ac1Dash} ${circumference}`}
								strokeLinecap="round"
							/>
						</svg>
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-4xl font-bold text-gray-900">
								{capacity.ac1.used}
							</span>
						</div>
					</div>

					{/* Legend */}
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-midnight-blue"></div>
							<span className="text-sm text-gray-700 font-medium">
								Terpakai
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-gray-300"></div>
							<span className="text-sm text-gray-700">Belum Terpakai</span>
						</div>
					</div>
				</div>

				{/* Ruang AC 2 */}
				<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
					<h3 className="text-gray-900 font-bold text-lg mb-1">Kapasitas</h3>
					<p className="text-gray-500 text-sm mb-4">Ruang AC 2</p>

					{/* Circular Progress */}
					<div className="relative w-32 h-32 mx-auto mb-4">
						<svg className="w-full h-full transform -rotate-90">
							{/* Background Circle */}
							<circle
								cx="64"
								cy="64"
								r="56"
								stroke="#E5E7EB"
								strokeWidth="12"
								fill="none"
							/>
							{/* Progress Circle */}
							<circle
								cx="64"
								cy="64"
								r="56"
								stroke="#0a2463"
								strokeWidth="12"
								fill="none"
								strokeDasharray={`${ac2Dash} ${circumference}`}
								strokeLinecap="round"
							/>
						</svg>
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-4xl font-bold text-gray-900">
								{capacity.ac2.used}
							</span>
						</div>
					</div>

					{/* Legend */}
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-midnight-blue"></div>
							<span className="text-sm text-gray-700 font-medium">
								Terpakai
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-gray-300"></div>
							<span className="text-sm text-gray-700">Belum Terpakai</span>
						</div>
					</div>
				</div>
			</div>

			{/* Back to Dashboard Button */}
			<Link
				href={`/category/outlet/${params.slug}`}
				className="block w-full bg-midnight-blue text-white font-bold py-4 rounded-2xl hover:bg-[#082050] transition-colors text-center"
			>
				Kembali ke Dashboard
			</Link>
		</main>
	);
}
