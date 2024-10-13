import { IView } from '../../base/View';

export interface ModalData<H, C> {
	header?: H;
	content: C;
	message?: string;
	isActive: boolean;
}

export interface ModalSettings<H, C> {
	close: string;
	header: string;
	content: string;
	headerView: IView<H>;
	contentView: IView<C>;
	footer: string;
	message?: string;
	actions: HTMLElement[];
	activeClass: string;
	messageErrorClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
