import type { Metadata } from "next";
import { Roboto, Quicksand } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./_components/ConditionalLayout";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const quicksand = Quicksand({
	variable: "--font-quicksand",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "CW Coffee - Coffee And Eatery",
	description: "Premium coffee and eatery experience",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id">
			<body
				className={`${roboto.variable} ${quicksand.variable} antialiased font-quicksand! bg-midnight-blue!`}
			>
				<AuthProvider>
					<ConditionalLayout>{children}</ConditionalLayout>
				</AuthProvider>
			</body>
		</html>
	);
}
