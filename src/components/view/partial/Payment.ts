import { View } from '../../base/View';
import {
	PaymentData,
	PaymentSettings,
} from './../../../types/components/view/partial/Payment';

/**
 * Форма с оплатой
 */
export class PaymentView extends View<PaymentData, PaymentSettings> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;
	protected _paymentButtonsContainer: HTMLElement;
	protected _addressInput: HTMLInputElement;
	element: HTMLElement;
	settings: PaymentSettings;

	constructor(element: HTMLElement, settings: PaymentSettings) {
		super(element, settings);
	}

	init(): void {
		this._paymentCard = this.ensure<HTMLButtonElement>('#card', this.element);
		this._paymentCash = this.ensure<HTMLButtonElement>('#cash', this.element);
		this._paymentButtonsContainer = this.ensure<HTMLElement>(
			'.order__buttons',
			this.element
		);
		this._addressInput = this.ensure<HTMLInputElement>(
			'#address',
			this.element
		);

		this._paymentCard.addEventListener('click', () => {
			this.payment = 'card';
			this._paymentCash.classList.remove('button_alt-active');
			this._paymentCard.classList.add('button_alt-active');
		});

		this._paymentCash.addEventListener('click', () => {
			this.payment = 'cash';
			this._paymentCard.classList.remove('button_alt-active');
			this._paymentCash.classList.add('button_alt-active');
		});

		this._paymentButtonsContainer.addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);

		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('input', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent): boolean {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		this._addressInput.focus();
		return false;
	}

	onClickHandler(event: MouseEvent): boolean {
		this.settings.onClick({ event, item: this.data });
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

	get data(): { payment: string; address: string } {
		return {
			payment: this.ensure<HTMLInputElement>(this.settings.payment).value,
			address: this.ensure<HTMLInputElement>(this.settings.address).value,
		};
	}
}
