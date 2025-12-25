import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({
	imageUrl,
	title,
	excerpt,
	link,
	imageAlt = '',
}: {
	imageUrl: string;
	title: string;
	excerpt: string;
	link: string;
	imageAlt?: string;
}) {
	return (
		<div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
			{/* Image Container with 16:10 aspect ratio */}
			<Link href={link} className="block relative aspect-16/10 overflow-hidden">
				<Image
					src={imageUrl}
					alt={imageAlt || title}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-300"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</Link>

			{/* Content */}
			<div className="p-6">
				{/* Title */}
				<h3 className="text-xl font-black text-midnight-blue mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
					<Link href={link}>
						{title}
					</Link>
				</h3>

				{/* Excerpt */}
				<p className="text-gray-600 text-sm font-bold line-clamp-3 leading-relaxed">
					{excerpt}
				</p>
			</div>
		</div>
	);
}
