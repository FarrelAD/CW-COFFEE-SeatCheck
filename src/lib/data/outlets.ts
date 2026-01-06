/**
 * Outlet Data Repository
 * Centralized outlet information for all CW Coffee locations
 */

import type { Outlet } from "@/lib/types";

export const outlets: Outlet[] = [
	{
		id: 1,
		title: "Outlet Malang 3",
		address:
			"Jl. Raya Tlogomas No.10, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144",
		imageUrl: "/outlets/malang-3.jpg",
		slug: "outlet-malang-3",
	},
	{
		id: 2,
		title: "Outlet Mempawah",
		address: "Jl. Ahmad Yani, Tengah, Kec. Mempawah Hilir, Kab. Mempawah",
		imageUrl: "/outlets/mempawah.jpg",
		slug: "outlet-mempawah",
	},
	{
		id: 3,
		title: "Outlet Sungai Duri",
		address: "Jl. Sungai Duri, Bengkayang",
		imageUrl: "/outlets/sungai-duri.jpg",
		slug: "outlet-sungai-duri",
	},
	{
		id: 4,
		title: "Outlet Sepakat 2",
		address: "Jl. Sepakat 2, Kel. Bansir Darat, Kec. Pontianak Tenggara",
		imageUrl: "/outlets/sepakat-2.jpg",
		slug: "outlet-sepakat-2",
	},
	{
		id: 5,
		title: "Outlet Sungai Pinyuh",
		address: "Sungai Pinyuh",
		imageUrl: "/outlets/sungai-pinyuh.jpg",
		slug: "outlet-sungai-pinyuh",
	},
	{
		id: 6,
		title: "Outlet Pemangkat",
		address: "Jl. Moh. Sohar, Pemangkat Kota",
		imageUrl: "/outlets/pemangkat.jpg",
		slug: "outlet-pemangkat",
	},
	{
		id: 7,
		title: "Outlet Sanggau",
		address: "Jl. Jend. Sudirman, Sanggau",
		imageUrl: "/outlets/sanggau.jpg",
		slug: "outlet-sanggau",
	},
	{
		id: 8,
		title: "Outlet Ketapang",
		address: "Jl. DI Panjaitan, Ketapang",
		imageUrl: "/outlets/ketapang.jpg",
		slug: "outlet-ketapang",
	},
	{
		id: 9,
		title: "Outlet Sekurang",
		address: "Jl. Keramat Sekura, Sambas",
		imageUrl: "/outlets/sekurang.jpg",
		slug: "outlet-sekurang",
	},
	{
		id: 10,
		title: "Outlet Ketapang #2",
		address: "Jl. Let. Kol. M. Tahir, Delta Pawan",
		imageUrl: "/outlets/sampit.jpg",
		slug: "outlet-ketapang-2",
	},
	{
		id: 11,
		title: "Outlet Sampit",
		address: "Jl. MT. Haryono, Mentawa Baru Hulu",
		imageUrl: "/outlets/sampit.jpg",
		slug: "outlet-sampit",
	},
	{
		id: 12,
		title: "Outlet Malang #1",
		address:
			"Jl. Simpang Ijen No.39 Blok B, Oro-oro Dowo, Kec. Klojen, Kota Malang",
		imageUrl: "/outlets/pemangkat.jpg",
		slug: "outlet-malang-1",
	},
	{
		id: 13,
		title: "Outlet Sintang #3",
		address: "Jl. Lintas Kalimantan Poros Tengah, Sungai Ukoi",
		imageUrl: "/outlets/sanggau.jpg",
		slug: "outlet-sintang-3",
	},
	{
		id: 14,
		title: "Outlet Tani Makmur",
		address: "Jl. Tani Makmur No.2, Akcaya",
		imageUrl: "/outlets/pemangkat.jpg",
		slug: "outlet-tani-makmur",
	},
	{
		id: 15,
		title: "Outlet GAIA Bumi Raya City",
		address: "Lt.1- 26 Gaia Bumi Raya City Mall, Kubu Raya, Pontianak",
		imageUrl: "/outlets/sanggau.jpg",
		slug: "outlet-gaia-bumi-raya-city",
	},
];

/**
 * Get all outlet slugs for static generation
 */
export function getAllOutletSlugs(): string[] {
	return outlets.map((outlet) => outlet.slug);
}

/**
 * Get outlet by slug
 */
export function getOutletBySlug(slug: string): Outlet | undefined {
	return outlets.find((outlet) => outlet.slug === slug);
}

/**
 * Get outlet by ID
 */
export function getOutletById(id: number): Outlet | undefined {
	return outlets.find((outlet) => outlet.id === id);
}
