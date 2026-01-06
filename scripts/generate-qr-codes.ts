/**
 * QR Code Generator Script
 * Generates QR codes for all seats in all outlets
 */

import * as QRCode from 'qrcode';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { outlets } from '../src/lib/data/outlets';
import { outletLayouts, parseGridLayout } from '../src/lib/data/outlet-layouts';
import { generateSeatQRString } from '../src/lib/utils/qr-utils';
import type { GridAreaLayout } from '../src/lib/types';

const OUTPUT_DIR = join(process.cwd(), 'qr-codes');

/**
 * Generate QR code for a single seat
 */
async function generateSeatQR(
	outletId: number,
	outletName: string,
	zone: string,
	seatId: string,
	outputPath: string
): Promise<void> {
	const qrData = generateSeatQRString(outletId, outletName, zone, seatId);

	// Generate QR code as PNG
	await QRCode.toFile(outputPath, qrData, {
		width: 300,
		margin: 2,
		color: {
			dark: '#0a2463', // CW Coffee brand color
			light: '#FFFFFF',
		},
	});

	console.log(`✓ Generated QR for ${zone} - ${seatId}`);
}

/**
 * Generate all QR codes for an outlet
 */
async function generateOutletQRCodes(outletId: number): Promise<void> {
	const outlet = outlets.find((o) => o.id === outletId);
	const layout = outletLayouts.find((l) => l.id === outletId);

	if (!outlet || !layout) {
		console.warn(`⚠️  Outlet ${outletId} not found, skipping...`);
		return;
	}

	console.log(`\n📍 Generating QR codes for ${outlet.title}...`);

	// Create outlet directory
	const outletDir = join(OUTPUT_DIR, outlet.slug);
	if (!existsSync(outletDir)) {
		mkdirSync(outletDir, { recursive: true });
	}

	// Process each zone
	for (const zoneLayout of layout.layout) {
		const zoneName = zoneLayout.area;

		// Skip zones without grid data
		if (!('grid' in zoneLayout) || zoneLayout.grid.length === 0) {
			console.log(`  ⏭️  Skipping ${zoneName} (no layout data)`);
			continue;
		}

		console.log(`  📋 Processing ${zoneName}...`);

		// Create zone directory
		const zoneDir = join(outletDir, zoneName.replace(/\s+/g, '-'));
		if (!existsSync(zoneDir)) {
			mkdirSync(zoneDir, { recursive: true });
		}

		// Parse grid to get all seats
		const blocks = parseGridLayout(zoneLayout as GridAreaLayout);
		const chairs = blocks.filter((block) => block.type === 'chair');

		// Generate QR for each chair
		for (const chair of chairs) {
			const outputPath = join(zoneDir, `${chair.id}.png`);
			await generateSeatQR(
				outlet.id,
				outlet.slug,
				zoneName,
				chair.id,
				outputPath
			);
		}

		console.log(`  ✅ Generated ${chairs.length} QR codes for ${zoneName}`);
	}
}

/**
 * Generate QR codes for all outlets
 */
async function generateAllQRCodes(): Promise<void> {
	console.log('🚀 Starting QR code generation...\n');

	// Create output directory
	if (!existsSync(OUTPUT_DIR)) {
		mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	// Generate for all outlets
	for (const outlet of outlets) {
		try {
			await generateOutletQRCodes(outlet.id);
		} catch (error) {
			console.error(`❌ Error generating QR codes for outlet ${outlet.id}:`, error);
		}
	}

	console.log(`\n✅ All QR codes generated successfully!`);
	console.log(`📁 Output directory: ${OUTPUT_DIR}`);
	console.log(`\n💡 Next steps:`);
	console.log(`   1. Print the QR codes`);
	console.log(`   2. Place them on the corresponding seats`);
	console.log(`   3. Test scanning with your phone!`);
}

// Run the generator
generateAllQRCodes().catch((error) => {
	console.error('❌ Fatal error:', error);
	process.exit(1);
});
