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
import { CardData } from './../../../types/components/view/partial/Card';
import { CardView } from '../partial/Card';

/**
 * Экран корзины
 */
export class BasketScreen extends ModalScreen<
	ListData<CardData>,
	BasketData,
	BasketSettings
> {

	initContent() {
		return new ListView<CardData>(cloneTemplate(SETTINGS.basketTemplate), {
			...SETTINGS.basketSettings,
			item: new CardView(cloneTemplate(SETTINGS.cardTemplate), {
				...SETTINGS.cardSettings,
				onClick: this.onRemoveProduct.bind(this),
			}),
		});
	}

	protected onRemoveProduct({ item }: IClickableEvent<CardData>) {
		this.settings.onRemove(item.id);
	}

	set products(products: CardData[]) {
		this.modal.content = {
			items: products,
		};
		this.nextButton.disabled = !products.length;
	}

	// Доработать вывод тотл
	set total(total: string) {
		console.log(total)
		// this.modal.message = `${SETTINGS.basketModal.totalLabel} ${total}`;
	}
}
