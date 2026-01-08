import InnerHeader from "../_components/InnerHeader";
import Image from "next/image";

export default function AboutUs() {
	return (
		<>
			<InnerHeader
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
				title="About Us"
			/>

			<div className="bg-icy-lavender py-12 pb-20">
				<div className="container mx-auto px-4 max-w-7xl">
					{/* First Section: HALO and VISI/MISI */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
						{/* Left Column - HALO */}
						<div className="bg-white rounded-lg p-6 md:p-8 shadow-sm h-full flex flex-col">
							<h2 className="text-4xl md:text-5xl font-bold text-[#F5A623] mb-4">
								HALO
							</h2>
							<h3 className="text-xl md:text-2xl font-semibold text-[#1a2b4a] mb-6">
								SIAPA KITA?
							</h3>
							<div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
								<p>
									Berdiri sebagai <strong>CYBER WORLD ICAFE</strong> pada tahun
									2015 dengan konsep cafe internet kecepatan tinggi yang buka 24
									jam. Pada 2019 kami melakukan peremajaan diri dengan mengubah
									nama CYBER WORLD iCAFE menjadi <strong>CW COFFEE</strong>.
								</p>
								<p>
									Dengan gerakan garis yang dinamis menggambarkan spesialisasi
									CW COFFEE dalam meracik minuman-minuman terbaik untuk konsumen
									kami, yang kemudian kami sebut sebagai{" "}
									<strong>#SAHABATSEJATIKU</strong>.
								</p>
								<p>
									Bukan sembarangan meracik kopi, kami selalu menggunakan bahan
									dari kualitas terbaik sehingga pengalaman menikmati kopi kami
									terasa berbeda dengan kedai kopi manapun!.
								</p>
								<p>
									Terus menyesuaikan diri menghadapi berbagai perubahan, kini
									kami juga menambah berbagai varian hidangan makanan dalam menu
									kami.
								</p>
								<p>
									Dengan sejuta rasa untuk <strong>#BERBAGISEMANGAT</strong>,
									akhirnya petualangan kami keluar <strong>#KALBAR</strong> pun
									dimulai!. Hingga saat ini, CW COFFEE telah memiliki 50++
									outlet yang tersebar di Kalimantan Barat, Kalimantan Tengah,
									Jawa Timur, Jawa Barat, Yogyakarta, Riau hingga Jambi dengan
									target 200+ outlet pada tahun 2024.
								</p>
							</div>
						</div>

						{/* Right Column - VISI and MISI */}
						<div className="flex flex-col gap-6">
							{/* VISI Section */}
							<div className="bg-white rounded-lg p-6 md:p-8 shadow-sm flex-1 flex flex-col">
								<h2 className="text-4xl md:text-5xl font-bold text-[#F5A623] mb-6">
									VISI
								</h2>
								<div className="flex gap-4 items-start">
									<div className="shrink-0">
										<svg
											className="w-12 h-12 text-[#F5A623]"
											fill="currentColor"
											viewBox="0 0 512 512"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z"></path>
										</svg>
									</div>
									<p className="text-gray-700 text-sm md:text-base leading-relaxed">
										Menjadi brand yang diterima di dunia yang memberikan
										semangat dan kasih sayang melalui sajian produk yang
										berkualitas dan pelayanan prima, serta menjadi jembatan
										penghubung terciptanya produktivitas dan kreativitas untuk
										Indonesia dan dunia.
									</p>
								</div>
							</div>

							{/* MISI Section */}
							<div className="bg-white rounded-lg p-6 md:p-8 shadow-sm flex-1 flex flex-col">
								<h2 className="text-4xl md:text-5xl font-bold text-[#F5A623] mb-6">
									MISI
								</h2>
								<div className="space-y-4">
									<div className="flex gap-4 items-start">
										<div className="shrink-0">
											<svg
												className="w-12 h-12 text-[#F5A623]"
												fill="currentColor"
												viewBox="0 0 640 512"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
											</svg>
										</div>
										<p className="text-gray-700 text-sm md:text-base leading-relaxed">
											Berkomitmen untuk menyajikan kopi dan makanan dengan
											kualitas terbaik
										</p>
									</div>
									<div className="flex gap-4 items-start">
										<div className="shrink-0">
											<svg
												className="w-12 h-12 text-[#F5A623]"
												fill="currentColor"
												viewBox="0 0 640 512"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
											</svg>
										</div>
										<p className="text-gray-700 text-sm md:text-base leading-relaxed">
											Menjadi pemimpin dalam industri kopi dan kuliner di
											Indonesia
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Second Section: CW UNTUKMU */}
					<div className="my-8">
						<div
							className="relative overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat py-12 px-6 text-center"
							style={{ backgroundImage: "url(/doodle-cafe.png)" }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4a] leading-tight">
								CW
								<br />
								UNTUKMU
							</h2>
							<p className="text-[#F5A623] font-semibold text-base md:text-lg mt-4">
								#Sahabatsejatiku
							</p>
						</div>
					</div>

					{/* Third Section: Halal Certification */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
						{/* Left - Image */}
						<div className="bg-white rounded-lg overflow-hidden shadow-sm">
							<Image
								src="/about-us/we-are-now-halal-certified.jpg"
								alt="We are now halal certified - CW Coffee"
								width={800}
								height={600}
								className="w-full h-full object-cover"
								priority
							/>
						</div>

						{/* Right - Content */}
						<div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
							<h2 className="text-2xl md:text-3xl font-bold text-[#F5A623] mb-4">
								PRODUK KAMI
							</h2>
							<h3 className="text-xl md:text-2xl font-bold text-[#1a2b4a] mb-6">
								CW COFFEE MERAIH SERTIFIKASI HALAL MUI
							</h3>
							<div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
								<p>
									Pontianak, 10 Januari 2024 – <strong>CW COFFEE</strong>, brand
									coffee shop lokal Pontianak, dengan bangga mengumumkan
									penerimaan sertifikasi halal dari{" "}
									<strong>Majelis Ulama Indonesia (MUI)</strong>. Pencapaian ini
									menandai langkah bersejarah bagi <strong>CW COFFEE</strong>{" "}
									dalam menjunjung tinggi kehalalan produk dan layanan kami.
								</p>
								<p>
									Dengan berbekal komitmen yang kuat terhadap kualitas,{" "}
									<strong>CW COFFEE</strong> kini membawa pengalaman kopi yang
									lebih bermakna bagi pelanggan, sejalan dengan prinsip
									kehalalan yang diakui secara resmi oleh <strong>MUI</strong>.
									Proses perolehan sertifikasi ini mencerminkan dedikasi kami
									terhadap integritas dan kepatuhan pada standar kehalalan
									tertinggi.
								</p>
							</div>
							<p className="text-[#F5A623] font-semibold text-base md:text-lg mt-6">
								#Sahabatsejatiku
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
