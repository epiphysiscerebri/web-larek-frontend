import { IClickable } from '../../base/View';

export interface ProductData {
	id: string;
	image: string;
	category: string;
	title: string;
	description: string;
	price: number;
}

export interface ProductSettings extends IClickable<ProductData> {
	action: string;
	image: string;
	category: string;
	title: string;
	description: string;
	price: string;
	compactClass: string;
	isCompact?: boolean;
}
