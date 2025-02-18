import { View } from '../../base/View';

import {
	SuccessData,
	SuccessSettings,
} from './../../../types/components/view/partial/Success';

/**
 *  Успешное совершения заказа с заголовком, описанием и каким-то действием, например, кнопкой "Вернуться в главное меню".
 */
export class SuccessView extends View<SuccessData, SuccessSettings> {
	element: HTMLElement;
	settings: SuccessSettings;

	constructor(element: HTMLElement, settings: SuccessSettings) {
		super(element, settings);
	}

	init(): void {
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent): void {
		this.settings.onClick({ event });
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set description(value: any) {
		this.setValue(this.settings.description, `Списано: ${value} синапсов`);
	}

	set action(value: string) {
		this.setValue(this.settings.action, value);
	}
}
