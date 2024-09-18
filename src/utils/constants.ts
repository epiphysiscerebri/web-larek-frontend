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
		text: '.card__text',
		image: '.card__image',
		title: '.card__title',
		category: '.card__category',
		price: '.card__price',
		compactClass: '.card_compact',
	},

	basketSelector: '.basket',
	basketTemplate: '#basket',
	basketSettings: {
		activeItemClass: '',
		itemClass: '.basket__item',
	},

	orderSelector: '.order',
	orderTemplate: '#order',
	orderSettings: {
		orderCard: '#card',
		orderCash: '#cash',
		address: '#address',
	},
	orderContactsTemplate: '#contacts',
	orderContactsSettings: {
		email: '#email',
		phone: '#phone',
	},

	successSelector: '.order-success',
	successTemplat: '#success',
	successSettings: {
		description: '.order-success__description',
	},
};
