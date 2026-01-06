"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { QrCode } from "lucide-react";
import QRScannerModal from "./QRScannerModal";
import SuccessCheckinModal from "./SuccessCheckinModal";
import type { CheckInRecord } from "@/lib/types";

export default function DashboardOutletHeader() {
	const params = useParams();
	const outletName = params.outletName as string;
	const pathname = usePathname();
	const [isQRModalOpen, setIsQRModalOpen] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [checkInRecord, setCheckInRecord] = useState<CheckInRecord | null>(
		null
	);

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
								href={`/category/outlet/${outletName}`}
								className={`text-gray-700 hover:text-midnight-blue hover:font-semibold transition-colors ${pathname === `/category/outlet/${outletName}` ? "font-bold" : "font-medium"}`}
							>
								Home
							</Link>
							<Link
								href={`/category/outlet/${outletName}/checking`}
								className={`text-gray-700 hover:text-midnight-blue hover:font-semibold transition-colors ${pathname === `/category/outlet/${outletName}/checking` ? "font-bold" : "font-medium"}`}
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
				onSuccess={(record) => {
					console.log("Check-in record:", record);
					// Close scanner modal
					setIsQRModalOpen(false);
					// Set check-in record and show success modal
					setCheckInRecord(record);
					setShowSuccessModal(true);
				}}
			/>

			{/* Success Check-in Modal */}
			<SuccessCheckinModal
				isOpen={showSuccessModal}
				checkInRecord={checkInRecord}
				onClose={() => {
					setShowSuccessModal(false);
					setCheckInRecord(null);
				}}
			/>
		</>
	);
}
