import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Checking - CW Coffee",
	description: "Pengecekan ketersediaan kursi CW Coffee",
};

export default function CheckingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
