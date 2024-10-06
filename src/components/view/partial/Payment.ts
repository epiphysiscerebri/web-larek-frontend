import { View } from '../../base/View';
import {
	PaymentData,
	PaymentSettings,
} from './../../../types/components/view/partial/Payment';

/**
 * Форма с оплатой
 */
export class PaymentView extends View<PaymentData, PaymentSettings> {
	init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('change', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		return false;
	}

	set payment(value: string) {
		this.setValue<HTMLInputElement>(this.settings.payment, {
			value,
		});
	}

	set address(value: string) {
		this.setValue<HTMLInputElement>(this.settings.address, {
			value,
		});
	}

	get data() {
		return {
			payment: this.ensure<HTMLInputElement>(this.settings.payment).value,
			address: this.ensure<HTMLInputElement>(this.settings.address).value,
		};
	}
}
