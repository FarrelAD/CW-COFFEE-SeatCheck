import { getOutletBySlug, getAllOutletSlugs } from '@/lib/data/outlets';
import { getOutletLayout } from '@/lib/data/outlet-layouts';
import { notFound } from 'next/navigation';
import CheckingPageClient from './CheckingPageClient';

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
		<CheckingPageClient
			outletTitle={outlet.title}
			outletAddress={outlet.address}
			slug={params.outletName}
			outletId={outlet.id}
			layout={layout}
		/>
	);
}
