import { ElementCreator } from './../types/html';

// Типизировать настройки не обязательно, но это поможет вам не забыть,
// какие настройки есть и какие значения они могут принимать.
// Также это позволит не приводить типы в каждом файле, где используются настройки.
export interface Settings {
	// views settings
	gallerySelector: string;
	gallerySettings: {
		activeItemClass: string;
		itemClass: string;
	};

	cardTemplate: string;
	cardSettings: {
		category: string;
		title: string;
		image: string;
		price: any;
	};

	pageSelector: string;
	pageSettings: {
		wrapper: string;
		counter: string;
		basket: string;
		lockedClass: string;
	};

	// modals settings

	headerTemplate: string;
	headerSettings: {
		title: string;
	};

	modalTemplate: string;
	modalSettings: {
		close: string;
		header: string;
		content: string;
		footer: string;
		message?: string;
		activeClass: string;
		messageErrorClass: string;
	};

	productTemplate: string;
	productSettings: {
		action: string;
		image: string;
		category: string;
		title: string;
		description: string;
		price: any;
		compactClass: string;
	};
	productModal: {
		headerTitle: string;
		nextLabel: string;
		nextSettings: ElementCreator;
		totalLabel: string;
	};

	basketTemplate: string;
	basketSettings: {
		activeItemClass: string;
		itemClass: string;
	};
	basketModal: {
		headerTitle: string;
		nextLabel: string;
		nextSettings: ElementCreator;
		totalLabel: string;
	};

	productInBasketTemplate: string;
	productInBasketSettings: {
		index: any;
		title: string;
		price: any;
		delete: string;
	};

	paymentTemplate: string;
	paymentSettings: {
		payment: string;
		address: string;
	};
	paymentModal: {
		nextLabel: string;
		nextSettings: ElementCreator;
	};

	contactsTemplate: string;
	contactsSettings: {
		email: string;
		phone: string;
	};
	contactsModal: {
		nextLabel: string;
		nextSettings: ElementCreator;
	};

	successTemplate: string;
	successSettings: {
		title: string;
		description: string;
		action: string;
	};
	successModal: {
		description: any;
		action: string;
	};

	appState: {};
}
