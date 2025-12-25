export const outlets = [
	{
		id: 1,
		title: 'Outlet Mempawah',
		address: 'Jl. Ahmad Yani, Tengah, Kec. Mempawah Hilir, Kab. Mempawah',
		imageUrl: '/images/outlets/mempawah.jpg',
		slug: 'outlet-mempawah',
	},
	{
		id: 2,
		title: 'Outlet Sungai Duri',
		address: 'Jl. Sungai Duri, Bengkayang',
		imageUrl: '/images/outlets/sungai-duri.jpg',
		slug: 'outlet-sungai-duri',
	},
	{
		id: 3,
		title: 'Outlet Sepakat 2',
		address: 'Jl. Sepakat 2, Kel. Bansir Darat, Kec. Pontianak Tenggara',
		imageUrl: '/images/outlets/sepakat-2.jpg',
		slug: 'outlet-sepakat-2',
	},
	{
		id: 4,
		title: 'Outlet Sungai Pinyuh',
		address: 'Sungai Pinyuh',
		imageUrl: '/images/outlets/sungai-pinyuh.jpg',
		slug: 'outlet-sungai-pinyuh',
	},
	{
		id: 5,
		title: 'Outlet Pemangkat',
		address: 'Jl. Moh. Sohar, Pemangkat Kota',
		imageUrl: '/images/outlets/pemangkat.jpg',
		slug: 'outlet-pemangkat',
	},
	{
		id: 6,
		title: 'Outlet Sanggau',
		address: 'Jl. Jend. Sudirman, Sanggau',
		imageUrl: '/images/outlets/sanggau.jpg',
		slug: 'outlet-sanggau',
	},
	{
		id: 7,
		title: 'Outlet Ketapang',
		address: 'Jl. DI Panjaitan, Ketapang',
		imageUrl: '/images/outlets/ketapang.jpg',
		slug: 'outlet-ketapang',
	},
	{
		id: 8,
		title: 'Outlet Sekurang',
		address: 'Jl. Keramat Sekura, Sambas',
		imageUrl: '/images/outlets/sekurang.jpg',
		slug: 'outlet-sekurang',
	},
	{
		id: 9,
		title: 'Outlet Ketapang #2',
		address: 'Jl. Let. Kol. M. Tahir, Delta Pawan',
		imageUrl: '/images/outlets/sampit.jpg',
		slug: 'outlet-ketapang-2',
	},
	{
		id: 10,
		title: 'Outlet Sampit',
		address: 'Jl. MT. Haryono, Mentawa Baru Hulu',
		imageUrl: '/images/outlets/sampit.jpg',
		slug: 'outlet-sampit',
	},
	{
		id: 11,
		title: 'Outlet Malang #1',
		address: 'Jl. Simpang Ijen No.39 Blok B, Oro-oro Dowo, Kec. Klojen, Kota Malang',
		imageUrl: '/images/outlets/pemangkat.jpg',
		slug: 'outlet-malang-1',
	},
	{
		id: 12,
		title: 'Outlet Sintang #3',
		address: 'Jl. Lintas Kalimantan Poros Tengah, Sungai Ukoi',
		imageUrl: '/images/outlets/sanggau.jpg',
		slug: 'outlet-sintang-3',
	},
	{
		id: 13,
		title: 'Outlet Tani Makmur',
		address: 'Jl. Tani Makmur No.2, Akcaya',
		imageUrl: '/images/outlets/pemangkat.jpg',
		slug: 'outlet-tani-makmur',
	},
	{
		id: 14,
		title: 'Outlet GAIA Bumi Raya City',
		address: 'Lt.1- 26 Gaia Bumi Raya City Mall, Kubu Raya, Pontianak',
		imageUrl: '/images/outlets/sanggau.jpg',
		slug: 'outlet-gaia-bumi-raya-city',
	},
];

export const getAllOutletSlugs = () => {
	return outlets.map((outlet) => outlet.slug);
};

export const getOutletBySlug = (slug: string) => {
	return outlets.find((outlet) => outlet.slug === slug);
};

// Mock checking data for each outlet
export const getOutletCheckingData = (slug: string) => {
	// Generate different data based on outlet
	const outlet = getOutletBySlug(slug);
	if (!outlet) return null;

	// Different capacity data for each outlet (mock data)
	const capacityVariations = [
		{ ac1: { used: 150, total: 200 }, ac2: { used: 120, total: 200 } },
		{ ac1: { used: 180, total: 200 }, ac2: { used: 160, total: 200 } },
		{ ac1: { used: 100, total: 200 }, ac2: { used: 90, total: 200 } },
		{ ac1: { used: 140, total: 200 }, ac2: { used: 130, total: 200 } },
	];

	const variation = capacityVariations[outlet.id % capacityVariations.length];

	return {
		outletId: outlet.id,
		outletName: outlet.title,
		outletAddress: outlet.address,
		capacity: {
			ac1: variation.ac1,
			ac2: variation.ac2,
		},
		lastUpdated: new Date().toISOString(),
	};
};
