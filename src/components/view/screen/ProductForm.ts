import { ModalScreen } from './ModalScreen';
import { cloneTemplate } from '../../../utils/html';
import { SETTINGS } from '../../../utils/constants';

import {
	ProductFormData,
	ProductFormSettings,
} from '../../../types/components/view/screen/ProductForm';
import { ProductData } from './../../../types/components/view/partial/Product';
import { ProductView } from '../partial/Product';

/**
 * Экран формы выбраного продукта
 */
export class ProductFormScreen extends ModalScreen<
	ProductData,
	ProductFormData,
	ProductFormSettings
> {
	protected declare _item: ProductData;
	protected init(): void {
		this.nextButton = this.getNextButton(
			SETTINGS.productModal,
			this.settings.onNext
		);

		this.modal = this.getModalView(
			{
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	initContent() {
		return new ProductView(cloneTemplate(SETTINGS.productTemplate), {
			...SETTINGS.productSettings,
			onClick: this.onAddBasket.bind(this),
		});
	}

	protected onAddBasket() {
		this.settings.onClick(this._item);
	}

	set content(value: ProductData) {
		this._item = value;
		this.modal.content = value;
	}

	// Доработать вывод тотл
	set total(total: string) {
		console.log(total);
		// this.modal.message = `${SETTINGS.orderModal.totalLabel} ${total}`;
	}
}
