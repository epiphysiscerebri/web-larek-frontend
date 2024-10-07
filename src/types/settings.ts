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
		price: string;
	};

	pageSelector: string;
	pageSettings: {
		wrapper: string;
		counter: string;
		basket: string;
		lockedClass: string;
	};

	// modals settings

	modalTemplate: string;
	modalSettings: {
		close: string;
		content: string;
		footer: string;
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
		price: string;
		compactClass: string;
	};
	productModal: {
		title: string;
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
		title: string;
		nextLabel: string;
		nextSettings: ElementCreator;
		totalLabel: string;
	};

	paymentTemplate: string;
	paymentSettings: {
		payment: string;
		address: string;
	};
	paymentModal: {
		titlePayment: string;
		titleAdress: string;
		nextLabel: string;
		nextSettings: ElementCreator;
	};

	contactsTemplate: string;
	contactsSettings: {
		email: string;
		phone: string;
	};
	contactsModal: {
		titleEmail: string;
		titlePhone: string;
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
		title: string;
		description: string;
		action: string;
	};

	appState: {
		formatCurrency: (value: number) => string;
	};
}
