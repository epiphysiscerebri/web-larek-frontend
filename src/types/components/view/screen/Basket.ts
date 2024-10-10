import { ProductData } from './../partial/Product';

export interface BasketData {
	header?: {};
	products: ProductData[];
	isActive: boolean;
	isDisabled: boolean;
	total: number;
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}
