import { ElementCreator } from './../types/html';

// Типизировать настройки не обязательно, но это поможет вам не забыть,
// какие настройки есть и какие значения они могут принимать.
// Также это позволит не приводить типы в каждом файле, где используются настройки.
export interface Settings {
	// views settings

	pageSelector: string;
	pageSettings: {
		wrapper: string;
		counter: string;
		basket: string;
	};

	gallerySelector: string;
	gallerySettings: {
		activeItemClass: string;
		itemClass: string;
	};

	cardSelector: string;
	cardCatalogTemplate: string;
	cardPreviewTemplate: string;
	cardBasketTemplate: string;
	cardSettings: {
		description: string;
		image: string;
		title: string;
		category: string;
		price: string;
		compactClass: string;
		isCompact: boolean;
	};

	orderContactsTemplate: string;
	orderContactsSettings: {
		email: string;
		phone: string;
	};

	// modals settings
	modalTemplate: string;
	modalSettings: {
		close: string;
		content: string;
		activeClass: string;
		messageErrorClass: string;
	};

	basketModal: {
		nextLabel: string;
		nextSettings: ElementCreator;
		totalLabel: string;
	};
	basketTemplate: string;
	basketSettings: {
		activeItemClass: string;
		itemClass: string;
	};

	orderModal: {
		nextLabel: string;
		nextSettings: ElementCreator;
	};
	orderTemplate: string;
	orderSettings: {
		// orderCard: string;
		// orderCash: string;
		payment: string;
		address: string;
	};

	headerTemplate: string;
	headerSettings: {
		action?: string;
		title: string;
		description: string;
	};

	messageTemplate: string;
	messageSettings: {
		title: string;
		description: string;
		action?: string;
	};
	successModal: {
		title: string;
		description: string;
		action: string;
	};

	// model settings
	appState: {
		formatCurrency: (value: number) => string;
		storageKey: string;
	};
}
