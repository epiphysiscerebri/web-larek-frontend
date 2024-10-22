import { View } from '../../base/View';
import {
	ProductInBasketData,
	ProductInBasketSettings,
} from './../../../types/components/view/partial/ProductInBasket';

/**
 * Отображение продукта в корзине
 */
export class ProductInBasketView extends View<
	ProductInBasketData,
	ProductInBasketSettings
> {
	protected _item!: ProductInBasketData;
	element: HTMLElement;
	settings: ProductInBasketSettings;

	constructor(element: HTMLElement, settings: ProductInBasketSettings) {
		super(element, settings);
	}

	init(): void {
		this.ensure(this.settings.delete).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent): void {
		this.settings.onClick({ event, item: this._item });
	}

	set index(value: string) {
		this.setValue(this.settings.index, value);
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set price(value: string) {
		if (typeof value === 'number') {
			value = value + ' синапсов';
		} else if (!value) {
			value = 'Бесценно';
		}
		this.setValue(this.settings.price, value);
	}

	render(data: ProductInBasketData): HTMLElement {
		this._item = data;
		return super.render(data);
	}
}
