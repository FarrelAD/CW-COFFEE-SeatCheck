import { outlets } from "@/lib/data/outlets";
import OutletAdminContent from "./_components/OutletAdminContent";

export function generateStaticParams() {
	return outlets.map((outlet) => ({
		outletId: outlet.id.toString(),
	}));
}

export default async function OutletAdminPage(props: {
	params: Promise<{ outletId: string }> | { outletId: string };
}) {
	const params = await Promise.resolve(props.params);
	const outletId = parseInt(params.outletId, 10);

	return <OutletAdminContent outletId={outletId} />;
}
