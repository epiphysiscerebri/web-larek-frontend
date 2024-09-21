import { View } from '../../base/View';
import {
	ProductData,
	ProductSettings,
} from './../../../types/components/view/partial/Product';
/**
 * Подробное описание продука
 */
export class ProductView extends View<ProductData, ProductSettings> {
	init() {
		this.isCompact = this.settings.isCompact;
	}

	set isCompact(value: boolean) {
		this.element.classList.toggle(this.settings.compactClass, value);
	}

	set text(value: string) {
		this.setValue(this.settings.text, value);
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
		this.setValue(this.settings.price, value);
	}

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}
}
