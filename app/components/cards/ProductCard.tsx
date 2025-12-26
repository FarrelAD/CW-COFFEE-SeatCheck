import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
	imageUrl,
	title,
	link = '#'
}: {
	imageUrl: string;
	title: string;
	link?: string;
}) {
	return (
		<div className="group shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
			{/* Image Container */}
			<Link href={link} className="block relative aspect-square overflow-hidden bg-linear-to-br from-amber-50 to-amber-100">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-300"
					sizes="256px"
				/>
			</Link>

			{/* Product Title */}
			<div className="p-4 text-center">
				<h3 className="text-base font-black text-midnight-blue uppercase tracking-wide">
					<Link href={link} className="hover:text-yellow-600 transition-colors">
						{title}
					</Link>
				</h3>
			</div>
		</div>
	);
}
