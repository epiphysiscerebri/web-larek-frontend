import { ContactsData, PaymentData } from './../partial/Order';
import { OrderData } from '../partial/Order';

export interface OrderFormData {
	contacts: ContactsData;
	payment: PaymentData;
	isActive: boolean;
	isDisabled: boolean;
}

export interface OrderFormSettings {
	onChange: (data: OrderData) => void;
	onClose: () => void;
	onNext: () => void;
}
