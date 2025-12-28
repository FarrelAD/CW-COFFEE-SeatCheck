import { getOutletCheckingData, getOutletBySlug, getAllOutletSlugs } from "@/app/_repository/outlets";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const slugs = getAllOutletSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export default async function CheckInPage(props: {
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
		<div>Check in page</div>
	);
}
