import { ModalScreen } from './../../../components/view/screen/ModalScreen';
import { IClickableEvent } from './../../../types/components/base/View';
import { cloneTemplate } from './../../../utils/html';
import { SETTINGS } from './../../../utils/constants';
ModalScreen;
import {
	BasketData,
	BasketSettings,
} from './../../../types/components/view/screen/Basket';
// import { HeaderData } from './../../../types/components/view/common/Header';
import { ListView } from './../../../components/view/common/List';
import { ProductData } from './../../../types/components/view/partial/Product';
import { ProductView } from './../partial/Product';
// import { HeaderView } from './../../../components/view/common/Header';
import { ListData } from './../../../types/components/view/common/List';

/**
 * Экран корзины
 */
export class BasketScreen extends ModalScreen<
	// HeaderData,
	ListData<ProductData>,
	BasketData,
	BasketSettings
> {
	// initHeader() {
	// 	return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
	// 		...SETTINGS.headerSettings,
	// 		onClick: null,
	// 	});
	// }

	initContent() {
		return new ListView<ProductData>(cloneTemplate(SETTINGS.basketTemplate), {
			...SETTINGS.basketSettings,
			item: new ProductView(cloneTemplate(SETTINGS.cardBasketTemplate), {
				...SETTINGS.cardSettings,
				onClick: this.onRemoveProduct.bind(this),
			}),
		});
	}

	protected onRemoveProduct({ item }: IClickableEvent<ProductData>) {
		this.settings.onRemove(item.id);
	}

	set products(products: ProductData[]) {
		this.modal.content = {
			items: products,
		};
		this.nextButton.disabled = !products.length;
	}
}
