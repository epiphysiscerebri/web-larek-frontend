import { ModalScreen } from './../../../components/view/screen/ModalScreen';
import { cloneTemplate } from './../../../utils/html';
import { SETTINGS } from './../../../utils/constants';
import {
	SelectProductData,
	SelectProductSettings,
} from './../../../types/components/view/screen/SelectedProduct';
import { ProductData } from './../../../types/components/view/partial/Product';
import { HeaderData } from './../../../types/components/view/common/Header';
import { HeaderView } from './../../../components/view/common/Header';
import { ProductView } from './../partial/Product';
import { ProductItem } from './../../../types/components/view/screen/Main';
import { IClickableEvent } from './../../../types/components/base/View';

/**
 * Экран открытой карточки товара
 */
export class SelectProductScreen extends ModalScreen<
	HeaderData,
	Partial<ProductData>,
	SelectProductData,
	SelectProductSettings
> {
	initHeader() {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
			onClick: null,
		});
	}

	initContent() {
		return new ProductView(cloneTemplate(SETTINGS.cardPreviewTemplate), {
			...SETTINGS.cardSettings,
			onClick: this.onClick.bind(this),
		});
	}

	protected onClick({ item }: IClickableEvent<ProductItem>) {
		this.settings.onAddBasket(item);
	}

	set product(value: Partial<ProductData>) {
		this.modal.content = value;
	}
}
