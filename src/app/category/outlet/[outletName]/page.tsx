import { getAllOutletSlugs } from "@/lib/data/outlets";
import BackButton from "./checking/_components/BackButton";
import GuideBookCard from "./_components/GuideBookCard";
import CapacityCard from "./_components/CapacityCard";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		outletName: slug,
	}));
}

export default function DashboardOutletPage() {
	return (
		<main className="max-w-md mx-auto px-4 py-6 pb-24">
			{/* Back Button */}
			<BackButton />

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
