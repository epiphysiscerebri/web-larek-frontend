import { View } from '../../base/View';
import {
	ProductData,
	ProductSettings,
} from './../../../types/components/view/partial/Product';

/**
 * Подробное описание продукта
 */
export class ProductView extends View<ProductData, ProductSettings> {
	protected declare _item: ProductData;
	init() {
		this.isCompact = this.settings.isCompact;
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}
	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this._item });
	}

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set category(value: string) {
		this.setValue(this.settings.category, value);
	}

	// Может быть поменять value на число
	set price(value: string) {
		if (typeof value === 'number') {
			value = value + ' синапсов';
		} else if (!value) {
			value = 'Бесценно';
		}
		this.setValue(this.settings.price, value);
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
		this.setValue<HTMLImageElement>(this.settings.image, {
			alt: value,
		});
	}

	set description(value: string) {
		this.setValue(this.settings.description, value);
	}

	set isCompact(value: boolean) {
		this.element.classList.toggle(this.settings.compactClass, value);
	}
}
