import { getAllOutletSlugs } from "@/app/_repository/outlets";
import DashboardOutletClient from "./DashboardOutletClient";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export default function DashboardOutletPage() {
	return <DashboardOutletClient />;
}
