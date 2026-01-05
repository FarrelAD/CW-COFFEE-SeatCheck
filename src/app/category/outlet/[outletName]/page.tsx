import { getAllOutletSlugs } from "@/lib/data/outlets";
import DashboardOutletClient from "./DashboardOutletClient";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		outletName: slug,
	}));
}

export default function DashboardOutletPage() {
	return <DashboardOutletClient />;
}
