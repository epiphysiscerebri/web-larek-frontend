import { ProductData } from './../partial/Product';

export interface ProductFormData {
	content: ProductData;
	isActive: boolean;
	isDisabled: boolean;
}

export interface ProductFormSettings {
	onClick: (item: ProductData) => void;
	onClose: () => void;
	onNext: () => void;
}
