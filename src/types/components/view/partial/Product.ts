export interface ProductData {
	text: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ProductSettings {
	text: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	compactClass: string;
	isCompact: boolean;
}
