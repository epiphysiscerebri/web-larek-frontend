import { ModalScreen } from './ModalScreen';
import { cloneTemplate } from '../../../utils/html';
import { SETTINGS } from '../../../utils/constants';

import {
	PaymentFormData,
	PaymentFormSettings,
} from '../../../types/components/view/screen/PaymentForm';
import { PaymentData } from './../../../types/components/view/partial/Payment';
import { PaymentView } from '../partial/Payment';
import { HeaderData } from './../../../types/components/view/common/Header';
import { HeaderView } from './../../../components/view/common/Header';
import { IChangeableEvent } from '../../../types/components/base/View';
import { IClickableEvent } from './../../../types/components/base/View';

/**
 * Экран формы оплаты
 */
export class PaymentFormScreen extends ModalScreen<
	HeaderData,
	PaymentData,
	PaymentFormData,
	PaymentFormSettings
> {
	protected init() {
		this.nextButton = this.getNextButton(
			SETTINGS.paymentModal,
			this.settings.onNext
		);

		this.modal = this.getModalView(
			{
				headerView: this.initHeader(),
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	initHeader() {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
		});
	}

	initContent() {
		return new PaymentView(cloneTemplate(SETTINGS.paymentTemplate), {
			...SETTINGS.paymentSettings,
			onChange: this.onFormChange.bind(this),
			onClick: this.onFormClick.bind(this),
		});
	}

	protected onFormChange({ value }: IChangeableEvent<PaymentData>) {
		this.settings.onChange(value);
	}

	protected onFormClick({ item }: IClickableEvent<PaymentData>) {
		this.settings.onClick(item);
	}

	set payment(value: PaymentData) {
		this.modal.content = value;
	}
}
