import { OrderData } from '../partial/Order';

export interface OrderFormData {
	contacts_and_payment: OrderData;
	isActive: boolean;
	isDisabled: boolean;
}

export interface OrderFormSettings {
	onChange: (data: OrderData) => void;
	onClose: () => void;
	onNext: () => void;
}
