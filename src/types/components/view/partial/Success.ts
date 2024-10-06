import { IClickable } from '../../base/View';

export interface SuccessData {
	title: string;
	description: string;
	action?: string;
}

export interface SuccessSettings extends IClickable<never> {
	title: string;
	description: string;
	action: string;
}
