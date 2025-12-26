'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname } from "next/navigation";

export default function DashboardOutletHeader() {
	const params = useParams();
	const slug = params.slug as string;
	const pathname = usePathname();

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-md mx-auto px-4 py-3">
				{/* Navigation */}
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo-cw-200.png"
							alt="CW Coffee"
							width={48}
							height={48}
							className="w-12 h-12"
						/>
						<div className="flex flex-col">
							<span className="font-bold text-gray-900 text-lg leading-tight">
								Cw
							</span>
							<span className="font-bold text-gray-900 text-lg leading-tight">
								Coffee
							</span>
						</div>
					</Link>

					{/* Nav Links */}
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className={`text-gray-700 hover:text-midnight-blue hover:font-semibold transition-colors ${pathname === `/category/outlet/${slug}` ? "font-bold" : "font-medium"}`}
						>
							Home
						</Link>
						<Link
							href={`/category/outlet/${slug}/checking`}
							className={`text-gray-700 hover:text-midnight-blue hover:font-semibold transition-colors ${pathname === `/category/outlet/${slug}/checking` ? "font-bold" : "font-medium"}`}
						>
							Checking
						</Link>
					</div>

					{/* QR Scanner Button */}
					<button className="w-12 h-12 bg-midnight-blue rounded-xl flex items-center justify-center hover:bg-[#082050] transition-colors">
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
}