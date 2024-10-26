import { Settings } from '../types/settings';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
	// views settings
	gallerySelector: '.gallery',
	gallerySettings: {
		activeItemClass: 'gallery__item_active',
		itemClass: 'gallery__item',
	},

	cardTemplate: '#card-catalog',
	cardSettings: {
		category: '.card__category',
		title: '.card__title',
		image: '.card__image',
		price: '.card__price',
	},

	pageSelector: '.page',
	pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked',
	},

	// modals settings

	headerTemplate: '#modal-head',
	headerSettings: {
		title: '.modal__title',
	},

	modalTemplate: '#modal-container',
	modalSettings: {
		header: '.modal__header',
		close: '.modal__close',
		content: '.modal__content',
		footer: '.modal__footer',
		message: '.modal__message',
		activeClass: 'modal_active',
	},

	productTemplate: '#card-preview',
	productSettings: {
		action: '.card__button',
		image: '.card__image',
		category: '.card__category',
		title: '.card__title',
		description: '.card__text',
		price: '.card__price',
	},
	productModal: {
		headerTitle: '',
		nextLabel: '',
		nextSettings: ['button', { className: 'button' }],
		totalLabel: 'Итого:',
	},

	basketTemplate: '#basket',
	basketSettings: {
		activeItemClass: '',
		itemClass: 'basket__item',
	},
	basketModal: {
		headerTitle: 'Корзина',
		nextLabel: 'Оформить',
		nextSettings: ['button', { className: 'button' }],
		totalLabel: 'Итого:',
	},

	productInBasketTemplate: '#card-basket',
	productInBasketSettings: {
		index: '.basket__item-index',
		title: '.card__title',
		price: '.card__price',
		delete: '.basket__item-delete',
	},

	paymentTemplate: '#payment',
	paymentSettings: {
		payment: '#card',
		address: '#address',
	},
	paymentModal: {
		nextLabel: 'Далее',
		nextSettings: ['button', { className: 'button' }],
	},

	contactsTemplate: '#contacts',
	contactsSettings: {
		email: '#email',
		phone: '#phone',
	},
	contactsModal: {
		nextLabel: 'Далее',
		nextSettings: ['button', { className: 'button' }],
	},

	successTemplate: '#success',
	successSettings: {
		title: '.order-success__title',
		description: '.order-success__description',
		action: '.order-success__close',
	},
	successModal: {
		description: 'Cписано: ',
		action: 'За новыми покупками!',
	},
};
