import { IChangeable } from '../../base/View';

export interface ContactsData {
	email: string;
	phone: string;
}

export interface PaymentData {
	address: string;
	payment: string;
}

export interface OrderData extends ContactsData, PaymentData {}

export interface OrderSettings extends IChangeable<OrderData> {
	payment: string;
	address: string;
	email: string;
	phone: string;
}
