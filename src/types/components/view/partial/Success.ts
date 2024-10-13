import { IClickable } from '../../base/View';

export interface SuccessData {
	description: any;
	action?: string;
}

export interface SuccessSettings extends IClickable<never> {
	title: string;
	description: any;
	action: string;
}
