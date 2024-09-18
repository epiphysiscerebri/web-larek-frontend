import { ProductData } from './../partial/Product';
import { CardData } from '../partial/Card';

export interface ProductItem extends ProductData {
	id: string;
	// cover: string;
}

export interface MainData {
	counter: number;
	items: CardData[];
	selected: ProductItem;
}

export interface MainSettings {
	onOpenBasket: () => void;
	onOpenProduct: (id: string) => void;
}
