import { IClickable } from './../../base/View';
import { IChangeable } from '../../base/View';

export interface PaymentData {
	payment: string;
	address: string;
}

export interface PaymentSettings
	extends IChangeable<PaymentData>,
		IClickable<PaymentData> {
	payment: string;
	address: string;
}
