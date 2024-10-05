import { IChangeable } from '../../base/View';

export interface PaymentData {
	payment: "card" | "cash";
	address: string;
}

export interface PaymentSettings extends IChangeable<PaymentData> {
	payment: string;
	address: string;
}
