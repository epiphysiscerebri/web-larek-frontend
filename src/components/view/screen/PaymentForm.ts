import { ModalScreen } from './ModalScreen';
import { cloneTemplate } from '../../../utils/html';
import { SETTINGS } from '../../../utils/constants';

import {
	PaymentFormData,
	PaymentFormSettings,
} from '../../../types/components/view/screen/PaymentForm';
import { PaymentData } from './../../../types/components/view/partial/Payment';
import { PaymentView } from '../partial/Payment';
import { IChangeableEvent } from '../../../types/components/base/View';

/**
 * Экран формы оплаты
 */
export class PaymentFormScreen extends ModalScreen<
	PaymentData,
	PaymentFormData,
	PaymentFormSettings
> {
	initContent() {
		return new PaymentView(cloneTemplate(SETTINGS.paymentTemplate), {
			...SETTINGS.paymentSettings,
			onChange: this.onFormChange.bind(this),
		});
	}

	protected onFormChange({ value }: IChangeableEvent<PaymentData>) {
		this.settings.onChange(value);
	}

	set payment(value: PaymentData) {
		this.modal.content = value;
	}

	// Доработать вывод тотл
	set total(total: string) {
		console.log(total);
		// this.modal.message = `${SETTINGS.orderModal.totalLabel} ${total}`;
	}
}
