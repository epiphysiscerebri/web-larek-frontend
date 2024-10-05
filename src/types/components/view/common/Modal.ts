import { IView } from '../../base/View';

export interface ModalData<C> {
	content: C;
	// message?: string;
	isActive: boolean;
}

export interface ModalSettings<C> {
	close: string;
	content: string;
	contentView: IView<C>;
	// message: string;
	actions: HTMLElement[];
	activeClass: string;
	messageErrorClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
