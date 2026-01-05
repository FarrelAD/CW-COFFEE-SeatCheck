'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname } from "next/navigation";
import { QrCode } from 'lucide-react';
import QRScannerModal from './QRScannerModal';

export default function DashboardOutletHeader() {
	const params = useParams();
	const slug = params.slug as string;
	const pathname = usePathname();
	const [isQRModalOpen, setIsQRModalOpen] = useState(false);

	return (
		<>
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-md mx-auto px-4 py-3">
					{/* Navigation */}
					<div className="flex items-center justify-between">
						{/* Logo */}
						<a href="/" className="flex items-center gap-2">
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
						</a>

						{/* Nav Links */}
						<div className="flex items-center gap-6">
							<Link
								href={`/category/outlet/${slug}`}
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
						<button
							onClick={() => setIsQRModalOpen(true)}
							className="w-12 h-12 bg-midnight-blue rounded-xl flex items-center justify-center hover:bg-[#082050] transition-colors hover:cursor-pointer"
						>
							<QrCode className="w-6 h-6 text-white" />
						</button>
					</div>
				</div>
			</header>

			{/* QR Scanner Modal */}
			<QRScannerModal
				isOpen={isQRModalOpen}
				onClose={() => setIsQRModalOpen(false)}
				onScan={(data) => {
					console.log('QR Code scanned:', data);
					// You can add your custom logic here
					// For example, navigate to a page, show a toast, etc.
					alert(`QR Code scanned: ${data}`);
				}}
			/>
		</>
	);
}