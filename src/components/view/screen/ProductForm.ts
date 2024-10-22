import { ModalView } from './../common/Modal';
import { ModalScreen } from './ModalScreen';
import { cloneTemplate } from '../../../utils/html';
import { SETTINGS } from '../../../utils/constants';

import {
	ProductFormData,
	ProductFormSettings,
} from '../../../types/components/view/screen/ProductForm';
import { ProductData } from './../../../types/components/view/partial/Product';
import { ProductView } from '../partial/Product';
import { HeaderData } from './../../../types/components/view/common/Header';
import { HeaderView } from './../../../components/view/common/Header';

/**
 * Экран формы выбраного продукта
 */
export class ProductFormScreen extends ModalScreen<
	HeaderData,
	ProductData,
	ProductFormData,
	ProductFormSettings
> {
	protected declare _item: ProductData;
	modal: ModalView<HeaderData, ProductData>;
	settings: ProductFormSettings;

	constructor(settings: ProductFormSettings) {
		super(settings);
	}

	initHeader(): HeaderView {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
		});
	}

	initContent(): ProductView {
		return new ProductView(cloneTemplate(SETTINGS.productTemplate), {
			...SETTINGS.productSettings,
			onClick: this.onAddBasket.bind(this),
		});
	}

	protected onAddBasket(): void {
		this.settings.onClick(this._item);
	}

	set content(value: ProductData) {
		this._item = value;
		this.modal.content = value;
	}
}
