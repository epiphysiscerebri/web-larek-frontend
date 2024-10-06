import { View } from '../../base/View';

import {
	SuccessData,
	SuccessSettings,
} from './../../../types/components/view/partial/Success';

/**
 * Экран успешного совершения заказа с заголовком, описанием и каким-то действием, например, кнопкой "назад".
 */
export class SuccessView extends View<SuccessData, SuccessSettings> {
	init() {
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set description(value: string) {
		this.setValue(this.settings.description, value);
	}

	set action(value: string) {
		this.setValue(this.settings.action, value);
	}
}
