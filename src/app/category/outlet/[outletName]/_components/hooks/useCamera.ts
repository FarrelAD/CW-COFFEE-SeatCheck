import { useRef, useState, RefObject } from "react";
/**
 * Custom hook to manage camera access and video stream
 */
export function useCamera(): {
	videoRef: RefObject<HTMLVideoElement | null>;
	isActive: boolean;
	error: string | null;
	startCamera: () => Promise<void>;
	stopCamera: () => void;
	retryWithDefault: () => Promise<void>;
} {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isActive, setIsActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const startCamera = async () => {
		try {
			setError(null);
			setIsActive(true);

			// Check if mediaDevices is supported
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error("Camera access is not supported in this browser.");
			}

			// Request camera permission with back camera preference
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "environment" }, // Use back camera on mobile
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}
		} catch (err: any) {
			console.error("Camera access error:", err);
			setIsActive(false);

			// Handle specific error types
			if (
				err.name === "NotAllowedError" ||
				err.name === "PermissionDeniedError"
			) {
				setError(
					"Camera permission denied. Please allow camera access in your browser settings and try again."
				);
			} else if (
				err.name === "NotFoundError" ||
				err.name === "DevicesNotFoundError"
			) {
				setError(
					"No camera found on this device. Please ensure your device has a camera."
				);
			} else if (
				err.name === "NotReadableError" ||
				err.name === "TrackStartError"
			) {
				setError(
					"Camera is already in use by another application. Please close other apps using the camera."
				);
			} else if (
				err.name === "OverconstrainedError" ||
				err.name === "ConstraintNotSatisfiedError"
			) {
				setError(
					"Camera does not meet requirements. Trying with default camera..."
				);
				// Retry with default camera settings
				setTimeout(() => retryWithDefault(), 1000);
			} else if (err.name === "SecurityError") {
				setError(
					"Camera access blocked due to security settings. Please use HTTPS or check browser settings."
				);
			} else {
				setError(
					err.message ||
						"Unable to access camera. Please check your browser permissions and try again."
				);
			}
		}
	};

	const retryWithDefault = async () => {
		try {
			setError(null);
			setIsActive(true);

			const stream = await navigator.mediaDevices.getUserMedia({
				video: true, // Use default camera
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}
		} catch (err: any) {
			console.error("Retry camera access error:", err);
			setIsActive(false);
			setError(
				"Failed to access camera. Please check your permissions and try again."
			);
		}
	};

	const stopCamera = () => {
		// Stop camera stream
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((track) => track.stop());
			videoRef.current.srcObject = null;
		}
		setIsActive(false);
	};

	return {
		videoRef,
		isActive,
		error,
		startCamera,
		stopCamera,
		retryWithDefault,
	};
}
