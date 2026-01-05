import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Our Outlets - CW Coffee",
	description:
		"Find CW Coffee outlets near you. Premium coffee and eatery experience across multiple locations.",
};

export default function OutletLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <>{children}</>;
}
