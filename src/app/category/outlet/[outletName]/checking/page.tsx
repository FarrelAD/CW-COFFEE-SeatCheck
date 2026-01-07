import { getOutletBySlug, getAllOutletSlugs } from "@/lib/data/outlets";
import { getOutletLayout } from "@/lib/data/outlet-layouts";
import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "./_components/BackButton";
import CapacityStats from "./_components/CapacityStats";
import CheckingPageContent from "./_components/CheckingPageContent";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		outletName: slug,
	}));
}

export default async function CheckingPage(props: {
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
			{/* Back Button */}
			<BackButton />

			{/* Header Info */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-1">
					{outlet.title}
				</h1>
				<p className="text-gray-600 text-sm">{outlet.address}</p>
			</div>

			{/* Quick Stats - Real-time Capacity */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<CapacityStats outletId={outlet.id} />
			</div>

			{/* Zone Tabs and Floor Plan */}
			<CheckingPageContent layout={layout} />

			{/* Back to Dashboard Button */}
			<Link
				href={`/category/outlet/${params.outletName}`}
				className="block w-full mt-6 bg-midnight-blue text-white font-bold py-4 rounded-2xl hover:bg-[#082050] transition-colors text-center"
			>
				Kembali ke Dashboard
			</Link>
		</main>
	);
}
