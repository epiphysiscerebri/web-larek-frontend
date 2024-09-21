import { IView } from '../../base/View';

export interface ModalData<H, C> {
	header?: H;
	content: C;
	message?: string;
	isActive: boolean;
	// isError?: boolean;
}

export interface ModalSettings<H, C> {
	close: string;
	content: string;
	contentView: IView<C>;
	actions: HTMLElement[];
	activeClass: string;
	messageErrorClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
