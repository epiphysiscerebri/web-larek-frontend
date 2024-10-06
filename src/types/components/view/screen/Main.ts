import { CardData } from '../partial/Card';

export interface MainData {
	counter: number;
	items: CardData[];
}

export interface MainSettings {
	onOpenBasket: () => void;
	// баг с передачей ид на главной странице
	onOpenProduct: (id: string) => void;
}
