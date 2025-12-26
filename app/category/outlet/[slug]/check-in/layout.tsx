import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Check In - CW Coffee",
	description: "Check In di Outlet CW Coffee",
};

export default function CheckInLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
