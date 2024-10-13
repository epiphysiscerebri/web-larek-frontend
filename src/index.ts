import './scss/styles.scss';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';
import { WebLarekAPI } from './components/model/WebLarekApi';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { MainController } from './components/controller/Main';
import { MainScreen } from './components/view/screen/Main';
import {
	AppStateChanges,
	AppStateModals,
} from './types/components/model/AppState';
import { ProductFormScreen } from './components/view/screen/ProductForm';
import { ProductController } from './components/controller/Product';
import { ContactsFormScreen } from './components/view/screen/ContactsForm';
import { ContactsController } from './components/controller/Contacts';
import { PaymentFormScreen } from './components/view/screen/PaymentForm';
import { PaymentController } from './components/controller/Payment';
import { ModalController } from './components/controller/Modal';
import { SuccessScreen } from './components/view/screen/SuccessForm';
import { BasketController } from './components/controller/Basket';
import { BasketScreen } from './components/view/screen/Basket';
import { ModalChange } from './types/components/model/AppStateEmitter';

const api = new WebLarekAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppStateModel);
const main = new MainScreen(new MainController(app.model));
const modal = {
	[AppStateModals.product]: new ProductFormScreen(
		new ProductController(app.model)
	),
	[AppStateModals.contacts]: new ContactsFormScreen(
		new ContactsController(app.model)
	),
	[AppStateModals.payment]: new PaymentFormScreen(
		new PaymentController(app.model)
	),
	[AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.success]: new SuccessScreen(new ModalController(app.model)),
};

app.on(AppStateChanges.products, () => {
	main.items = Array.from(app.model.products.values());
});

app.on(AppStateChanges.selectedProduct, () => {
	main.selected = app.model.selectedProduct;
	modal[AppStateModals.product].render({
		content: app.model.selectedProduct,
		isActive: true,
		isDisabled: !app.model.selectedProduct,
	});
});

app.on(AppStateChanges.modal, ({ previous, current }: ModalChange) => {
	main.page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}
});

app.on(AppStateChanges.basket, () => {
	main.counter = app.model.basket.size;
	modal[AppStateModals.basket].products = Array.from(app.model.basket.values());
	modal[AppStateModals.basket].total = String(app.model.basketTotal);
});

app.on(AppStateModals.basket, () => {
	modal[AppStateModals.basket].render({
		header: {
			title: SETTINGS.basketModal.headerTitle,
		},
		products: Array.from(app.model.basket.values()),
		total: app.model.basketTotal,
		isDisabled: app.model.basket.size === 0,
		isActive: true,
	});
});

app.on(AppStateModals.payment, () => {
	modal[AppStateModals.payment].render({
		payment: app.model.payment,
		isDisabled:
			!app.model.payment.payment.length || !app.model.payment.address.length,
		isActive: true,
	});
});

app.on(AppStateChanges.payment, () => {
	modal[AppStateModals.payment].render({
		payment: app.model.payment,
		isDisabled:
			!app.model.payment.payment.length || !app.model.payment.address.length,
		isActive: true,
	});
});

app.on(AppStateModals.contacts, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.contacts,
		isDisabled:
			!app.model.contacts.email.length || !app.model.contacts.phone.length,
		isActive: true,
	});
});

app.on(AppStateChanges.contacts, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.contacts,
		isDisabled:
			!app.model.contacts.email.length || !app.model.contacts.phone.length,
		isActive: true,
	});
});

app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		content: {
			...SETTINGS.successModal,
			description: app.model.responseOrder.total,
		},

		isActive: true,
	});
});

app.model.getProductList().catch((err: string) => console.log(`Error: `, err));
