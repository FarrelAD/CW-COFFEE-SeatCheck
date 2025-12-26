import type { Metadata } from "next";
import DashboardOutletHeader from "./components/DashboardOutletHeader";

export const metadata: Metadata = {
	title: "Dashboard - CW Coffee",
	description: "Dashboard status CW Coffee",
};

export default function DashboardOutletLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardOutletHeader />
			{children}
		</div>
	);
}
