import { useRef, useState } from "react";
import {
	BrowserMultiFormatReader,
	NotFoundException,
	Result,
} from "@zxing/library";

/**
 * Custom hook to manage QR code scanning logic
 */
export function useQRScanner(onScan?: (data: string) => void | Promise<void>): {
	isScanning: boolean;
	scannedData: string | null;
	startScanning: (videoElement: HTMLVideoElement) => void;
	stopScanning: () => void;
	resetScannedData: () => void;
} {
	const [isScanning, setIsScanning] = useState(false);
	const isScanningRef = useRef(false); // Track scanning state synchronously
	const [scannedData, setScannedData] = useState<string | null>(null);
	const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const videoElementRef = useRef<HTMLVideoElement | null>(null);

	/**
	 * Continue scanning on next animation frame
	 */
	const continueScanning = () => {
		if (isScanningRef.current) {
			animationFrameRef.current = requestAnimationFrame(scanQRCode);
		}
	};

	/**
	 * Handle QR code scan result
	 */
	const handleQRCodeResult = async (result: Result | null) => {
		if (!result) {
			continueScanning();
			return;
		}

		const data = result.getText();
		setScannedData(data);

		// Stop scanning first to prevent multiple scans
		stopScanning();

		// Call onScan callback and wait if it's async
		if (onScan) {
			await onScan(data);
		}
	};

	/**
	 * Handle QR code scan error
	 */
	const handleQRCodeError = (err: unknown) => {
		if (!(err instanceof NotFoundException)) {
			console.error("QR Scan error:", err);
		}
		continueScanning();
	};

	/**
	 * Process video frame and attempt to decode QR code
	 */
	const processVideoFrame = (video: HTMLVideoElement) => {
		// Create canvas if needed
		if (!canvasRef.current) {
			canvasRef.current = document.createElement("canvas");
		}

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		if (!context) return;

		// Capture video frame to canvas
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		// Convert canvas to image
		const img = new Image();
		img.src = canvas.toDataURL();

		img.onload = () => {
			if (!codeReaderRef.current) return;

			codeReaderRef.current
				.decodeFromImage(img)
				.then(handleQRCodeResult)
				.catch(handleQRCodeError);
		};
	};

	/**
	 * Scan QR code using requestAnimationFrame
	 */
	const scanQRCode = () => {
		// Early return if not ready
		if (!codeReaderRef.current || !isScanningRef.current) {
			return;
		}

		const videoElement = videoElementRef.current;
		if (!videoElement) return;

		// Wait for video to be ready
		if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA) {
			continueScanning();
			return;
		}

		// Process the video frame
		try {
			processVideoFrame(videoElement);
		} catch (err) {
			console.error("Scan frame error:", err);
			continueScanning();
		}
	};

	const startScanning = (videoElement: HTMLVideoElement) => {
		setIsScanning(true);
		isScanningRef.current = true;
		videoElementRef.current = videoElement;

		// Initialize QR code reader
		if (!codeReaderRef.current) {
			codeReaderRef.current = new BrowserMultiFormatReader();
		}

		// Start scanning loop
		scanQRCode();
	};

	const stopScanning = () => {
		// Cancel animation frame
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}

		// Reset code reader
		if (codeReaderRef.current) {
			codeReaderRef.current.reset();
		}

		videoElementRef.current = null;
		setIsScanning(false);
		isScanningRef.current = false;
	};

	const resetScannedData = () => {
		setScannedData(null);
	};

	return {
		isScanning,
		scannedData,
		startScanning,
		stopScanning,
		resetScannedData,
	};
}
