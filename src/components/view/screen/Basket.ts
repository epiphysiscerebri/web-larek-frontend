import { ModalScreen } from './../../view/screen/ModalScreen';
import { IClickableEvent } from './../../../types/components/base/View';
import { cloneTemplate } from './../../../utils/html';
import { SETTINGS } from './../../../utils/constants';

import {
	BasketData,
	BasketSettings,
} from './../../../types/components/view/screen/Basket';
import { ListView } from './../../view/common/List';
import { ListData } from './../../../types/components/view/common/List';
import { ProductInBasketData } from './../../../types/components/view/partial/ProductInBasket';
import { ProductInBasketView } from '../partial/ProductInBasket';

/**
 * Экран корзины
 */
export class BasketScreen extends ModalScreen<
	ListData<ProductInBasketData>,
	BasketData,
	BasketSettings
> {
	initContent() {
		return new ListView<ProductInBasketData>(
			cloneTemplate(SETTINGS.basketTemplate),
			{
				...SETTINGS.basketSettings,
				item: new ProductInBasketView(
					cloneTemplate(SETTINGS.productInBasketTemplate),
					{
						...SETTINGS.productInBasketSettings,
						onClick: this.onRemoveProduct.bind(this),
					}
				),
			}
		);
	}

	protected onRemoveProduct({ item }: IClickableEvent<ProductInBasketData>) {
		this.settings.onRemove(item.id);
	}

	set products(products: ProductInBasketData[]) {
		products.forEach((product, idx) => {
			product.index = idx + 1;
		});
		this.modal.content = {
			items: products,
		};
		this.nextButton.disabled = !products.length;
	}

	// Доработать вывод тотл
	set total(total: string) {
		// this.modal.message = `${SETTINGS.basketModal.totalLabel} ${total}`;
	}
}
