import { Settings } from '../types/settings';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
	pageSelector: '.page',
	pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
	},

	gallerySelector: '.gallery',
	gallerySettings: {
		activeItemClass: 'gallery__item_active',
		itemClass: 'gallery__item',
	},

	cardSelector: '.card_full',
	cardCatalogTemplate: '#card-catalog',
	cardPreviewTemplate: '#card-preview',
	cardBasketTemplate: '#card-basket',
	cardSettings: {
		description: '.card__text',
		image: '.card__image',
		title: '.card__title',
		category: '.card__category',
		price: '.card__price',
		compactClass: '.card_compact',
		isCompact: false,
	},

	modalTemplate: '#modal',
	modalSettings: {
		close: '.modal__close',
		content: '.modal__content',
		activeClass: 'modal_active',
		messageErrorClass: 'modal__message_error',
	},

	basketModal: {
		nextLabel: 'Оформить',
		nextSettings: ['button', { className: 'button' }],
		totalLabel: '',
	},
	basketTemplate: '#basket',
	basketSettings: {
		activeItemClass: '',
		itemClass: '.basket__item',
	},

	orderModal: {
		nextLabel: 'Оплатить',
		nextSettings: ['button', { className: 'button' }],
	},
	orderTemplate: '#order',
	orderSettings: {
		// orderCard: '#card',
		// orderCash: '#cash',
		payment: '#card' || '#cash',
		address: '#address',
	},
	orderContactsTemplate: '#contacts',
	orderContactsSettings: {
		email: '#email',
		phone: '#phone',
	},

	headerTemplate: '',
	headerSettings: {
		action: '',
		title: '',
		description: '',
	},

	messageTemplate: '#success',
	messageSettings: {
		title: 'order-success__title',
		description: '.order-success__description',
		action: 'order-success__close',
	},
	successModal: {
		title: 'Заказ оформлен',
		description: 'Списано ',
		action: 'За новыми покупками',
	},
	appState: {
		formatCurrency: (value: number) => `${value} синапсов`,
		storageKey: '__products',
	},
};
