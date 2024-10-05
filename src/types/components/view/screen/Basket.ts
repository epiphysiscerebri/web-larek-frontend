import { ProductData } from './../partial/Product';



export interface BasketData {
	products: ProductData[];
	isActive: boolean;
	isDisabled: boolean;
	total: string;
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}
