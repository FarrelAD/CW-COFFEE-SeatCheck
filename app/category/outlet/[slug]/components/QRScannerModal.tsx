'use client';

import { X, Camera } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import SuccessCheckinModal from './SuccessCheckinModal';

export default function QRScannerModal({ isOpen, onClose, onScan }: {
	isOpen: boolean;
	onClose: () => void;
	onScan?: (data: string) => void;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isScanning, setIsScanning] = useState(false);
	const [scannedData, setScannedData] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	// Initialize camera and start scanning
	const startScanning = async () => {
		try {
			setError(null);
			setIsScanning(true);

			// Check if mediaDevices is supported
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error('Camera access is not supported in this browser.');
			}

			// Request camera permission
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' } // Use back camera on mobile
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();

				// Initialize QR code reader
				if (!codeReaderRef.current) {
					codeReaderRef.current = new BrowserMultiFormatReader();
				}

				// Start scanning loop
				scanQRCode();
			}
		} catch (err: any) {
			console.error('Camera access error:', err);
			setIsScanning(false);

			// Handle specific error types
			if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
				setError('Camera permission denied. Please allow camera access in your browser settings and try again.');
			} else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
				setError('No camera found on this device. Please ensure your device has a camera.');
			} else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
				setError('Camera is already in use by another application. Please close other apps using the camera.');
			} else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
				setError('Camera does not meet requirements. Trying with default camera...');
				// Retry with default camera settings
				setTimeout(() => retryWithDefaultCamera(), 1000);
			} else if (err.name === 'SecurityError') {
				setError('Camera access blocked due to security settings. Please use HTTPS or check browser settings.');
			} else {
				setError(err.message || 'Unable to access camera. Please check your browser permissions and try again.');
			}
		}
	};

	// Scan QR code using requestAnimationFrame
	const scanQRCode = () => {
		if (!videoRef.current || !codeReaderRef.current || !isScanning) {
			return;
		}

		const video = videoRef.current;

		// Check if video is ready
		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			try {
				// Create a canvas to capture video frame
				if (!canvasRef.current) {
					canvasRef.current = document.createElement('canvas');
				}

				const canvas = canvasRef.current;
				const context = canvas.getContext('2d');

				if (context) {
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					context.drawImage(video, 0, 0, canvas.width, canvas.height);

					// Convert canvas to image
					const img = new Image();
					img.src = canvas.toDataURL();

					img.onload = () => {
						// Try to decode from image
						if (codeReaderRef.current) {
							codeReaderRef.current.decodeFromImage(img)
								.then((result) => {
									if (result) {
										const data = result.getText();
										setScannedData(data);
										if (onScan) {
											onScan(data);
										}
										// Stop scanning and show success modal
										stopScanning();
										setShowSuccessModal(true);
									} else {
										// Continue scanning
										if (isScanning) {
											animationFrameRef.current = requestAnimationFrame(scanQRCode);
										}
									}
								})
								.catch((err) => {
									// Continue scanning if no QR code found
									if (!(err instanceof NotFoundException)) {
										console.error('QR Scan error:', err);
									}
									if (isScanning) {
										animationFrameRef.current = requestAnimationFrame(scanQRCode);
									}
								});
						}
					};
				}
			} catch (err) {
				console.error('Scan frame error:', err);
				if (isScanning) {
					animationFrameRef.current = requestAnimationFrame(scanQRCode);
				}
			}
		} else {
			// Video not ready, try again
			if (isScanning) {
				animationFrameRef.current = requestAnimationFrame(scanQRCode);
			}
		}
	};

	// Retry with default camera settings (fallback)
	const retryWithDefaultCamera = async () => {
		try {
			setError(null);
			setIsScanning(true);

			const stream = await navigator.mediaDevices.getUserMedia({
				video: true // Use default camera
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();

				if (!codeReaderRef.current) {
					codeReaderRef.current = new BrowserMultiFormatReader();
				}

				// Start scanning loop
				scanQRCode();
			}
		} catch (err: any) {
			console.error('Retry camera access error:', err);
			setIsScanning(false);
			setError('Failed to access camera. Please check your permissions and try again.');
		}
	};

	// Stop scanning and release camera
	const stopScanning = () => {
		// Cancel animation frame
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}

		// Stop camera stream
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}

		// Reset code reader
		if (codeReaderRef.current) {
			codeReaderRef.current.reset();
		}
		setIsScanning(false);
	};

	// Handle modal close
	const handleClose = () => {
		stopScanning();
		setScannedData(null);
		setError(null);
		onClose();
	};

	// Close modal on ESC key press
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			stopScanning();
		};
	}, []);

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
					<div className="mb-8">
						{/* Camera/Scanner Frame */}
						<div className="relative aspect-square bg-black rounded-3xl overflow-hidden border-4 border-yellow-400">
							{/* Video Element */}
							<video
								ref={videoRef}
								className="w-full h-full object-cover"
								playsInline
								muted
							/>

							{/* Grid Overlay */}
							{isScanning && (
								<div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0 pointer-events-none">
									{Array.from({ length: 16 }).map((_, i) => (
										<div
											key={i}
											className="border border-yellow-400/30"
										/>
									))}
								</div>
							)}

							{/* Placeholder when not scanning */}
							{!isScanning && !scannedData && (
								<div className="absolute inset-0 flex items-center justify-center bg-gray-800">
									<Camera className="w-16 h-16 text-gray-400" />
								</div>
							)}

							{/* Success Message */}
							{scannedData && (
								<div className="absolute inset-0 flex items-center justify-center bg-green-600/90">
									<div className="text-center text-white p-4">
										<div className="text-2xl font-bold mb-2">✓ Scanned!</div>
										<div className="text-sm break-all">{scannedData}</div>
									</div>
								</div>
							)}

							{/* Error Message */}
							{error && (
								<div className="absolute inset-0 flex items-center justify-center bg-red-600/90">
									<div className="text-center text-white p-4">
										<div className="text-lg font-bold mb-2">⚠️ Error</div>
										<div className="text-sm mb-4">{error}</div>
										<button
											onClick={() => {
												setError(null);
												startScanning();
											}}
											className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
										>
											Try Again
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Scan Button */}
					<div className="flex justify-center">
						<button
							onClick={isScanning ? stopScanning : startScanning}
							disabled={!!scannedData}
							className={`w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg ring-4 ${isScanning
								? 'bg-red-600 hover:bg-red-700 ring-red-400/30'
								: scannedData
									? 'bg-green-600 ring-green-400/30 cursor-not-allowed'
									: 'bg-midnight-blue hover:bg-[#082050] ring-yellow-400/30'
								}`}
						>
							<div className={`w-12 h-12 rounded-full ${isScanning ? 'bg-red-700' : scannedData ? 'bg-green-700' : 'bg-midnight-blue'
								}`} />
						</button>
					</div>

					{/* Instructions */}
					<div className="text-center mt-4 text-sm text-gray-600">
						{!isScanning && !scannedData && 'Click the button to start scanning'}
						{isScanning && 'Point camera at QR code'}
						{scannedData && 'QR code scanned successfully!'}
					</div>
				</div>
			</div>

			{/* Success Check-in Modal */}
			<SuccessCheckinModal
				isOpen={showSuccessModal}
				onClose={() => {
					setShowSuccessModal(false);
					setScannedData(null);
					onClose();
				}}
			/>
		</>
	);
}
