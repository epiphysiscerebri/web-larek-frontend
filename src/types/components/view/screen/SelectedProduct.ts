import { ProductData } from '../partial/Product';
import { HeaderData } from '../common/Header';
// import { PlacesData, SelectedPlace } from '../partial/Places';

export interface SelectProductData {
	product: ProductData;
	header: HeaderData;
	isActive: boolean;
	isDisabled: boolean;
}

export interface SelectProductSettings {
	onClose: () => void;
	onNext: () => void;
	onAddBasket: (product: ProductData) => void;
}
