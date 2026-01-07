import { getAllOutletSlugs, getOutletBySlug } from "@/lib/data/outlets";
import GuideBookCard from "./_components/GuideBookCard";
import CapacityCard from "./_components/CapacityCard";
import { getOutletLayout } from "@/lib/data/outlet-layouts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		outletName: slug,
	}));
}

export default async function DashboardOutletPage(props: {
	params: Promise<{ outletName: string }> | { outletName: string };
}) {
	const params = await Promise.resolve(props.params);
	const outlet = getOutletBySlug(params.outletName);
	const layout = outlet ? getOutletLayout(outlet.id) : null;

	if (!outlet || !layout) {
		notFound();
	}

	return (
		<main className="max-w-4xl mx-auto px-4 py-6 pb-24">
			{/* Header Info */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-1">
					{outlet.title}
				</h1>
				<p className="text-gray-600 text-sm">{outlet.address}</p>
			</div>

			{/* Guide Book Card */}
			<GuideBookCard />

			{/* Capacity Cards */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				{/* Ruang AC 1 */}
				<CapacityCard zoneName="Ruang AC 1" used={150} total={200} />

				{/* Ruang AC 2 */}
				<CapacityCard zoneName="Ruang AC 2" used={150} total={200} />
			</div>

			{/* Lihat Lainnya Button */}
			<button className="w-full bg-midnight-blue text-white font-bold py-4 rounded-2xl hover:bg-[#082050] transition-colors">
				Lihat Lainnya
			</button>
		</main>
	);
}
