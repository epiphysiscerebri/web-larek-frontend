import { IClickable } from '../../base/View';

export interface CardData {
	id: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface CardSettings extends IClickable<string> {
	image: string;
	title: string;
	category: string;
	price: number | null;
}
