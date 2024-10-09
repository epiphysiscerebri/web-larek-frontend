import { IClickable } from '../../base/View';

export interface ProductInBasketData {
	id: string;
	index?: any;
	title: string;
	price: any;
}

export interface ProductInBasketSettings
	extends IClickable<ProductInBasketData> {
	index: any;
	title: string;
	price: any;
	delete: string;
}
