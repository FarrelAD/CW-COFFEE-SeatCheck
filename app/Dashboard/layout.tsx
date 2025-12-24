import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - CW Coffee",
	description: "Dashboard status CW Coffee",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
