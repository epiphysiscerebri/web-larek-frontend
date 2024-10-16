import { View } from '../../base/View';
import {
	CardData,
	CardSettings,
} from './../../../types/components/view/partial/Card';

/**
 * Маленькая карточка продукта для списка
 */
export class CardView extends View<CardData, CardSettings> {
	id: string;

	init() {
		this.element.addEventListener('click', this.onClickHandler.bind(this));
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this.id });
	}

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
		this.setValue<HTMLImageElement>(this.settings.image, {
			alt: value,
		});
	}

	set category(value: string) {
		this.setValue(this.settings.category, value);
	}

	set price(value: string) {
		if (typeof value === 'number') {
			value = value + ' синапсов';
		} else if (!value) {
			value = 'Бесценно';
		}

		this.setValue(this.settings.price, value);
	}
}
