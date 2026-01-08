"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCamera } from "./hooks/useCamera";
import { useQRScanner } from "./hooks/useQRScanner";
import { useCheckIn } from "@/lib/hooks/use-checkin";
import { useGeolocation } from "@/lib/hooks/use-geolocation";
import { parseSeatQRData } from "@/lib/utils/qr-utils";
import { getOutletBySlug } from "@/lib/data/outlets";
import { validateLocationForOutlet } from "@/lib/services/geolocation-service";
import ScannerFrame from "./ScannerFrame";
import ScannerControls from "./ScannerControls";
import ScannerInstructions from "./ScannerInstructions";
import type { CheckInRecord, GeoCoordinates } from "@/lib/types";

export default function QRScannerModal({
	isOpen,
	onClose,
	onSuccess,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: (record: CheckInRecord) => void;
}) {
	const params = useParams();
	const outletSlug = params.outletName as string;
	const outlet = getOutletBySlug(outletSlug);

	const [scanError, setScanError] = useState<string | null>(null);
	const [locationValidated, setLocationValidated] = useState(false);
	const [userLocation, setUserLocation] = useState<GeoCoordinates | null>(null);

	// Camera management
	const { videoRef, error: cameraError, startCamera, stopCamera } = useCamera();

	// Geolocation management
	const {
		position,
		error: locationError,
		loading: locationLoading,
		requestLocation,
		isSupported: isLocationSupported,
	} = useGeolocation();

	// Check-in management
	const {
		checkIn,
		loading: checkInLoading,
		error: checkInError,
	} = useCheckIn();

	// QR Scanner management
	const {
		isScanning,
		scannedData,
		startScanning,
		stopScanning,
		resetScannedData,
	} = useQRScanner(async (data) => {
		// Stop scanning and camera
		stopScanning();
		stopCamera();
		setScanError(null);

		try {
			// Parse QR data
			const qrData = parseSeatQRData(data);
			console.log("QR Data:", qrData);

			if (!qrData) {
				setScanError("Invalid QR code. Please scan a valid seat QR code.");
				// Restart camera for retry
				setTimeout(async () => {
					await startCamera();
					if (videoRef.current) {
						startScanning(videoRef.current);
					}
				}, 2000);
				return;
			}

			console.log("Performing check-in...");

			// Perform check-in with location data
			const record = await checkIn(qrData, userLocation || undefined);

			// Call success callback
			if (onSuccess) {
				console.log("Check-in successful. Record:", record);
				onSuccess(record);
			} else {
				console.log("No success callback provided.");
			}
		} catch (err) {
			console.error("Check-in error:", err);
			const errorMessage =
				err instanceof Error ? err.message : "Failed to check in";
			setScanError(errorMessage);

			// Restart camera for retry after error
			setTimeout(async () => {
				await startCamera();
				if (videoRef.current) {
					startScanning(videoRef.current);
				}
			}, 2000);
		}
	});

	/**
	 * Handle scan button toggle
	 */
	const handleToggleScan = async () => {
		// Don't allow scanning if location not validated
		if (!locationValidated && !isScanning) {
			return;
		}

		if (isScanning) {
			stopScanning();
			stopCamera();
		} else {
			await startCamera();
			if (videoRef.current) {
				startScanning(videoRef.current);
			}
		}
	};

	/**
	 * Handle retry after error
	 */
	const handleRetry = async () => {
		await startCamera();
		if (videoRef.current) {
			startScanning(videoRef.current);
		}
	};

	/**
	 * Handle modal close
	 */
	const handleClose = () => {
		stopScanning();
		stopCamera();
		resetScannedData();
		onClose();
	};

	/**
	 * Handle escape key press
	 */
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	/**
	 * Cleanup on unmount
	 */
	useEffect(() => {
		return () => {
			stopScanning();
			stopCamera();
		};
	}, []);
	/**
	 * Request and validate location when modal opens
	 */
	useEffect(() => {
		if (isOpen) {
			setLocationValidated(false);
			setUserLocation(null);
			setScanError(null);

			// Check if location is supported
			if (!isLocationSupported) {
				setScanError("Your browser doesn't support location services.");
				return;
			}

			// Skip location validation if outlet has no coordinates
			if (!outlet?.coordinates) {
				console.log("Outlet has no coordinates, skipping location validation");
				setLocationValidated(true);
				return;
			}

			// Request user location
			requestLocation()
				.then((coords) => {
					console.log("User location:", coords);

					// Validate location
					const validation = validateLocationForOutlet(
						coords,
						outlet.coordinates!,
						outlet.checkInRadius
					);

					console.log(
						`Distance from outlet: ${validation.distance.toFixed(2)}m (limit: ${outlet.checkInRadius || 50}m)`
					);

					if (validation.valid) {
						setUserLocation(coords);
						setLocationValidated(true);
					} else {
						setScanError(
							validation.error || "You must be at the cafe to check in."
						);
					}
				})
				.catch((err) => {
					console.error("Location error:", err);
					const errorMessage =
						err instanceof Error ? err.message : "Failed to get location";
					setScanError(errorMessage);
				});
		}
	}, [isOpen, outlet, requestLocation, isLocationSupported]);

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
				onClick={handleClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div className="bg-[#E8E9ED] rounded-3xl w-full max-w-sm p-6 relative">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						{/* Close Button */}
						<button
							onClick={handleClose}
							className="w-10 h-10 bg-midnight-blue rounded-full flex items-center justify-center hover:bg-[#082050] transition-colors"
						>
							<X className="w-5 h-5 text-white" />
						</button>

						{/* CW Scan Button */}
						<div className="bg-midnight-blue text-yellow-400 font-bold px-6 py-2.5 rounded-xl">
							CW Scan
						</div>
					</div>

					{/* QR Code Scanner Area */}
					{locationLoading ? (
						<div className="bg-white rounded-2xl aspect-square w-full flex items-center justify-center">
							<div className="text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue mx-auto mb-4"></div>
								<p className="text-gray-600 font-medium">
									Getting your location...
								</p>
							</div>
						</div>
					) : (
						<ScannerFrame
							videoRef={videoRef}
							isScanning={isScanning}
							error={cameraError || scanError || checkInError}
							onRetry={handleRetry}
						/>
					)}

					{/* Scan Button */}
					<ScannerControls
						isScanning={isScanning || checkInLoading}
						scannedData={scannedData}
						onToggleScan={handleToggleScan}
						disabled={locationLoading || (!locationValidated && !isScanning)}
					/>

					{/* Instructions */}
					<ScannerInstructions
						isScanning={isScanning}
						scannedData={scannedData}
					/>
				</div>
			</div>
		</>
	);
}
