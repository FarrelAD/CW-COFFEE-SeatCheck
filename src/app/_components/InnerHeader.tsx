import Link from "next/link";

/**
 * Breadcrumb navigation component for inner pages.
 * Displays a horizontal navigation path showing the user's current location in the site hierarchy.
 * Optionally displays a page title below the breadcrumbs.
 *
 * @param {Object} props - Component props
 * @param {Array<{label: string, href?: string}>} props.breadcrumbs - Array of breadcrumb items.
 *   Items with `href` render as links, items without `href` render as plain text (current page).
 * @param {string} [props.title] - Optional page title to display below the breadcrumbs.
 *
 * @example
 * <InnerHeader
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Posts", href: "/category" },
 *     { label: "Outlet" }
 *   ]}
 *   title="Outlet"
 * />
 */
export default function InnerHeader({
	breadcrumbs,
	title,
}: {
	breadcrumbs: {
		label: string;
		href?: string;
	}[];
	title?: string;
}) {
	return (
		<>
			{/* Breadcrumb Section */}
			<div className="bg-white py-6">
				<div className="container mx-auto px-4 max-w-7xl">
					<nav className="flex items-center justify-center gap-2 text-sm">
						{breadcrumbs.map((item, index) => {
							const isLast = index === breadcrumbs.length - 1;

							return (
								<div key={index} className="flex items-center gap-2">
									{item.href ? (
										<Link
											href={item.href}
											className="text-gray-600 hover:text-[#1a2b4a] transition-colors"
										>
											{item.label}
										</Link>
									) : (
										<span className="text-gray-900 font-medium">
											{item.label}
										</span>
									)}

									{!isLast && <span className="text-gray-400">›</span>}
								</div>
							);
						})}
					</nav>
				</div>
			</div>

			{/* Page Title */}
			{title && (
				<div className="bg-white pb-6">
					<div className="container mx-auto px-4 max-w-7xl">
						<h1 className="text-4xl md:text-5xl font-bold text-[#1a2b4a] text-center">
							{title}
						</h1>
					</div>
				</div>
			)}
		</>
	);
}
