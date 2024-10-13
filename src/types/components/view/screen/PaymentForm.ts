import { PaymentData } from './../partial/Payment';

export interface PaymentFormData {
	payment: PaymentData;
	isActive: boolean;
	isDisabled: boolean;
}

export interface PaymentFormSettings {
	onChange: (data: PaymentData) => void;
	onClick: (data: PaymentData) => void;
	onClose: () => void;
	onNext: () => void;
}
