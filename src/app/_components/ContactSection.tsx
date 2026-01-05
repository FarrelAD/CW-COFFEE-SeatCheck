"use client";

import Link from "next/link";
import { Headphones } from "lucide-react";

export default function ContactSection({
	title = "Contact",
	subtitle = "with us if You've Any Questions",
	supportText = "24/7 Everyday Free Support!",
	buttonText = "Contact",
	buttonLink = "/contact",
	className = "",
}: {
	title?: string;
	subtitle?: string;
	supportText?: string;
	buttonText?: string;
	buttonLink?: string;
	className?: string;
}) {
	return (
		<section className={`py-12 px-4 ${className}`}>
			<div
				className="container mx-auto max-w-4xl relative overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat py-12 px-6"
				style={{ backgroundImage: "url(/doodle-cafe.png)" }}
			>
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					{/* Left side - Heading and Icon */}
					<div className="flex-1 text-center md:text-left">
						<h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
							<span>{title}</span> {subtitle}
						</h2>

						{/* Support Info */}
						<div className="flex items-center justify-center md:justify-start gap-4">
							<div className="w-12 h-12 flex items-center justify-center bg-midnight-blue rounded-full shadow-lg">
								<Headphones className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-midnight-blue">
								{supportText}
							</h3>
						</div>
					</div>

					{/* Right side - Button */}
					<div className="shrink-0">
						<Link
							href={buttonLink}
							className="inline-block px-8 py-3 bg-midnight-blue text-white font-bold rounded-full hover:bg-midnight-blue/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							{buttonText}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
