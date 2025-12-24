'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const leftMenuItems = [
	{ label: 'HOME', href: '/' },
	{ label: 'ABOUT US', href: '/about-us' },
	{ label: 'ARTICLE', href: '/category/article' },
	{ label: 'OUR OUTLET', href: '/category/outlet' },
];

const rightMenuItems = [
	{ label: 'OUR MENU', href: '/our-menu' },
	{ label: 'CAREER', href: '/category/career' },
	{ label: 'PROPOSAL', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdPTxg3wmC4eugoVfStVakcxMWqBAZPMlwCLDBUovQmbGlwAQ/viewform?usp=header' },
	{ label: 'CONTACT US', href: '/kontak' },
];

const allMenuItems = [
	...leftMenuItems,
	...rightMenuItems,
];

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<>
			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a2463] text-white font-bold">
				<div className="flex items-center justify-between px-4 py-4">
					<button
						onClick={() => setIsMobileMenuOpen(true)}
						className="p-2 hover:bg-white/10 rounded transition-colors"
						aria-label="Menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					<div className="flex-1 flex justify-center">
						<Link href="/" className="block">
							<Image
								src="/logo-cw-200.png"
								alt="CW Coffee - Coffee And Eatery"
								width={50}
								height={50}
								className="w-12 h-12"
							/>
						</Link>
					</div>

					<div className="w-10"></div>
				</div>
			</div>

			{/* Mobile Menu Sidebar */}
			<div
				className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
					}`}
			>
				{/* Overlay */}
				<div
					className="absolute inset-0 bg-black/50"
					onClick={() => setIsMobileMenuOpen(false)}
				></div>

				{/* Sidebar */}
				<div
					className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
						}`}
				>
					<div className="flex items-center justify-between p-4 border-b">
						<button
							onClick={() => setIsMobileMenuOpen(false)}
							className="p-2 hover:bg-gray-100 rounded transition-colors"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<nav className="p-4">
						<ul className="space-y-1">
							{allMenuItems.map((item, index) => (
								<li key={index}>
									<Link
										href={item.href}
										className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded transition-colors"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>

			{/* Desktop Header */}
			<div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-[#0a2463] text-white font-bold">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-[90px]">
						{/* Left Menu */}
						<nav className="flex-1">
							<ul className="flex items-center gap-6">
								{leftMenuItems.map((item, index) => (
									<li key={index}>
										<Link
											href={item.href}
											className="text-sm font-medium tracking-wide hover:text-gray-200 transition-colors"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Center Logo */}
						<div className="shrink-0 px-8">
							<Link href="/" className="block">
								<Image
									src="/logo-cw-200.png"
									alt="CW Coffee - Coffee And Eatery"
									width={60}
									height={60}
									className="w-16 h-16"
								/>
							</Link>
						</div>

						{/* Right Menu */}
						<nav className="flex-1 flex justify-end">
							<ul className="flex items-center gap-6">
								{rightMenuItems.map((item, index) => (
									<li key={index}>
										<Link
											href={item.href}
											className="text-sm font-medium tracking-wide hover:text-gray-200 transition-colors"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>

			{/* Spacer to prevent content from going under fixed header */}
			<div className="h-[64px] lg:h-[90px]"></div>
		</>
	);
}
