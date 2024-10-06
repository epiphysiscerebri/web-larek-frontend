import { IChangeable } from '../../base/View';

export interface PaymentData {
	payment: string;
	address: string;
}

export interface PaymentSettings extends IChangeable<PaymentData> {
	payment: string;
	address: string;
}
