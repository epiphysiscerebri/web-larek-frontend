import { SuccessData } from './../partial/Success';

export interface SuccessFormData {
	content: SuccessData;
	isActive: boolean;
}

export interface SuccessFormSettings {
	onClose: () => void;
}
