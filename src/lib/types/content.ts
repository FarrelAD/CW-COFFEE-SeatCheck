/**
 * Content Types
 * Types for marketing and CMS content (news, products, promos)
 */

// ============================================================================
// News Types
// ============================================================================

export interface NewsItem {
	id: number;
	imageUrl: string;
	title: string;
	excerpt: string;
	link: string;
}

// ============================================================================
// Product Types
// ============================================================================

export interface Product {
	id: number;
	imageUrl: string;
	title: string;
	link?: string;
}

export interface ProductCategory {
	name: string;
	products: Product[];
}

// ============================================================================
// Promo Types
// ============================================================================

export interface PromoSlide {
	id: number;
	imageUrl: string;
	alt: string;
	link?: string;
}
