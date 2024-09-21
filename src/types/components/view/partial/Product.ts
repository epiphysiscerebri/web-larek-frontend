import { IClickable } from '../../base/View';

export interface ProductData {
	id: string;
	text: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ProductSettings extends IClickable<ProductData> {
	text: string;
	image: string;
	title: string;
	category: string;
	price: string | null;
	compactClass: string;
	isCompact: boolean;
}
