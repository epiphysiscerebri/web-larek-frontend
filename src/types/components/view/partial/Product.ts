import { IClickable } from '../../base/View';

export interface ProductData {
	id: string;
	image: string;
	category: string;
	title: string;
	description: string;
	price: any;
}

export interface ProductSettings extends IClickable<ProductData> {
	action: string;
	image: string;
	category: string;
	title: string;
	description: string;
	price: any;
	compactClass: string;
	isCompact?: boolean;
}
