"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { CheckInRecord } from "@/lib/types";

export default function SuccessCheckinModal({
	isOpen,
	onClose,
	checkInRecord,
}: {
	isOpen: boolean;
	onClose: () => void;
	checkInRecord: CheckInRecord | null;
}) {
	if (!isOpen) return null;

	// Format timestamp
	const formatTime = (timestamp: number) => {
		return new Date(timestamp).toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div className="bg-white rounded-3xl w-full max-w-sm p-8 relative">
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X className="w-5 h-5" />
					</button>

					{/* Success Illustration */}
					<div className="mb-6 flex justify-center">
						<div className="relative w-64 h-64">
							<Image
								src="/Illustration-success-check-in.png"
								alt="Success"
								fill
								className="object-contain"
							/>
						</div>
					</div>

					{/* Success Message */}
					<div className="text-center mb-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-3">
							Berhasil Check-in
						</h2>

						{checkInRecord ? (
							<div className="space-y-2">
								<p className="text-gray-600 text-sm">
									<span className="font-semibold">{checkInRecord.zone}</span>
								</p>
								<p className="text-gray-600 text-sm">
									Kursi:{" "}
									<span className="font-semibold">{checkInRecord.seatId}</span>
								</p>
								<p className="text-gray-400 text-xs">
									Check-in pada {formatTime(checkInRecord.checkedInAt)}
								</p>
							</div>
						) : (
							<p className="text-gray-400 text-base">
								Selamat anda bisa menggunakan
								<br />
								Meja ini
							</p>
						)}
					</div>

					{/* Done Button */}
					<button
						onClick={onClose}
						className="w-full bg-midnight-blue text-yellow-400 font-bold py-4 rounded-2xl hover:bg-[#082050] transition-colors text-lg"
					>
						Selesai
					</button>
				</div>
			</div>
		</>
	);
}
