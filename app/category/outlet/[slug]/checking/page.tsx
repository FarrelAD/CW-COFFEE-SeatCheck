import { getOutletCheckingData, getOutletBySlug, getAllOutletSlugs } from "@/app/_repository/outlets";
import { notFound } from "next/navigation";
import CheckingPageClient from "./CheckingPageClient";

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

	return (
		<CheckingPageClient
			outletTitle={outlet.title}
			outletAddress={outlet.address}
			slug={params.slug}
			ac1Available={capacity.ac1.total - capacity.ac1.used}
			ac2Available={capacity.ac2.total - capacity.ac2.used}
			ac1Used={capacity.ac1.used}
			ac2Used={capacity.ac2.used}
		/>
	);
}
