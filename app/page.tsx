import NewsGrid from './_components/NewsGrid';
import OutletGrid from './_components/OutletGrid';
import ProductsSection from './_components/ProductsSection';
import PromoCarousel from './_components/PromoCarousel';
import ContactSection from './_components/ContactSection';
import { outlets } from './_repository/outlets';

export default function Home() {
	// Example promo slides - replace with your actual promo images
	const promoSlides = [
		{
			id: 1,
			imageUrl: 'Promo-Ice-Cream-2061x700px.png',
			alt: 'Ice Cream Promo',
			link: '#',
		},
		{
			id: 2,
			imageUrl: 'Promo-Power-Up-2061x700px-min.png',
			alt: 'Power Up Promo',
			link: '#',
		},
	];

	// Example news data - need at least 5 items (1 featured + 4 side)
	const newsItems = [
		{
			id: 1,
			imageUrl: 'News-Khatulistiwa-Coffee-Event-2025.png',
			title: 'Khatulistiwa Coffee Event 2025 : Eksplorasi Rasa dan Temu Sapa',
			excerpt: 'Ada sebuah kehangatan istimewa yang selalu kami rasakan setiap kali menyebut nama Pontianak. Kota ini bukan hanya sekadar lokasi, tetapi rumah yang namanya abadi. Di setiap kesempatan, kami selalu ingin menjadi bagian dari denyut nadinya. Belum lama ini, kami…',
			link: '#',
		},
		{
			id: 2,
			imageUrl: 'News-Tempat-Nongkrong-Seru-Dimana-Setiap-Tegukan-Kopi-Ditemani-Tawa.png',
			title: 'Tempat Nongkrong Seru Dimana Setiap Tegukan Kopi Ditemani Tawa & Setiap Kunjungan Menjadi Memori Berharga Bersama CW Coffee',
			excerpt: 'Siapa bilang ngopi hanya soal rasa? Di CW Coffee,…Cap…',
			link: '#',
		},
		{
			id: 3,
			imageUrl: 'News-Merayakan-Grand-Opening-Outlet-ke-54.png',
			title: 'Merayakan Grand Opening Outlet ke-54 dan Terbesar di Indonesia: CW Coffee Malang 3 Resmi Dibuka',
			excerpt: 'CW Coffee Malang 3 Mengusung Konsep Family Resto CW…',
			link: '#',
		},
		{
			id: 4,
			imageUrl: 'News-Solidaritas-di-Tengah-Bencana.png',
			title: 'Solidaritas di Tengah Bencana: CW Coffee & Standupindo Pontianak Bersatu untuk Korban Banjir',
			excerpt: 'Awal tahun 2025 menjadi masa yang sulit bagi masyarakat…',
			link: '#',
		},
		{
			id: 5,
			imageUrl: 'News-Kemeriahan-Cap-Go-Meh-2025-Bersama-CW-Coffee.png',
			title: 'Kemeriahan Cap Go Meh 2025 Bersama CW Coffee',
			excerpt: 'Perpaduan Budaya dan Balutan Toleransi di Indonesia Perayaan Cap…',
			link: '#',
		},
	];

	// Product categories with example data
	const productCategories = [
		{
			name: 'POPULAR',
			products: [
				{ id: 1, imageUrl: 'products/cyber-french-fries.jpg', title: 'Cyber French Fries', link: '#' },
				{ id: 2, imageUrl: 'products/ebi-yakimeshi.jpg', title: 'Ebi Yakimeshi', link: '#' },
				{ id: 3, imageUrl: 'products/cyber-fried-noodle.jpg', title: 'Cyber Fried Noodle', link: '#' },
				{ id: 4, imageUrl: 'products/cyber-fried-chicken.jpg', title: 'Cyber Fried Chicken', link: '#' },
				{ id: 5, imageUrl: 'products/hakau.jpg', title: 'Hakau', link: '#' },
				{ id: 6, imageUrl: 'products/cw-mix-snack.jpg', title: 'CW Mix Snack', link: '#' },
				{ id: 7, imageUrl: 'products/crispy-banana-keju-susu.jpg', title: 'Crispy Banana Keju Susu', link: '#' },
			],
		},
		{
			name: 'NEW PRODUCTS',
			products: [
				{ id: 7, imageUrl: 'products/matcha-latte.jpg', title: 'Matcha Latte', link: '#' },
				{ id: 8, imageUrl: 'products/chocolate-frappe.jpg', title: 'Chocolate Frappe', link: '#' },
				{ id: 9, imageUrl: 'products/caramel-macchiato.jpg', title: 'Caramel Macchiato', link: '#' },
				{ id: 10, imageUrl: 'products/vanilla-ice-cream.jpg', title: 'Vanilla Ice Cream', link: '#' },
			],
		},
		{
			name: 'TOP RATED',
			products: [
				{ id: 11, imageUrl: 'products/espresso.jpg', title: 'Espresso', link: '#' },
				{ id: 12, imageUrl: 'products/americano.jpg', title: 'Americano', link: '#' },
				{ id: 13, imageUrl: 'products/mocha.jpg', title: 'Mocha', link: '#' },
				{ id: 14, imageUrl: 'products/affogato.jpg', title: 'Affogato', link: '#' },
			],
		},
	];

	return (
		<div className="bg-icy-lavender min-h-screen">
			{/* Promo Carousel */}
			<PromoCarousel slides={promoSlides} autoplayInterval={5000} />

			{/* News Section */}
			<section className="container mx-auto px-4 py-12">
				<h2 className="text-3xl font-bold text-center text-midnight-blue mb-8">OUR NEWS</h2>

				<NewsGrid newsItems={newsItems} />
			</section>

			{/* Location Section */}
			<section className="container mx-auto px-4 py-12">
				<h2 className="text-3xl font-bold text-center text-midnight-blue mb-8">OUR LOCATION</h2>

				<OutletGrid outlets={outlets} />
			</section>

			{/* Products Section */}
			<section className="container mx-auto px-4 py-12">
				<h2 className="text-3xl font-bold text-center text-midnight-blue mb-8">OUR PRODUCTS</h2>

				<ProductsSection categories={productCategories} />
			</section>

			<ContactSection />
		</div>
	);
}
