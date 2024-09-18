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
		text: string;
		image: string;
		title: string;
		category: string;
		price: string;
		compactClass: string;
	};

	basketSelector: string;
	basketTemplate: string;
	basketSettings: {
		activeItemClass: string;
		itemClass: string;
	};

	orderSelector: string;
	orderTemplate: string;
	orderSettings: {
		orderCard: string;
		orderCash: string;
		address: string;
	};

	orderContactsTemplate: string;
	orderContactsSettings: {
		email: string;
		phone: string;
	};

	successSelector: string;
	successTemplat: string;
	successSettings: {
		description: string;
	};
}
