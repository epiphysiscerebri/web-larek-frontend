import { IClickable } from '../../base/View';

export interface ProductData {
	image: string;
	category: string;
	title: string;
	description: string;
	price: number;
}

export interface ProductSettings extends IClickable<ProductData> {
	image: string;
	category: string;
	title: string;
	description: string;
	price: string;
	compactClass: string;
	isCompact: boolean;
}
