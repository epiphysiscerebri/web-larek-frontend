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

// app.on(AppStateChanges.modalMessage, () => {
// 	if (app.model.openedModal !== AppStateModals.none) {
// 		modal[app.model.openedModal].render({
// 			message: app.model.modalMessage,
// 			isError: app.model.isError,
// 		});
// 	}
// });

// app.on(AppStateModals.session, () => {
// 	modal[AppStateModals.session].render({
// 		film: app.model.selectedMovie,
// 		schedule: {
// 			sessions: Array.from(app.model.movieSessions.values()),
// 			selected: null,
// 		},
// 		isActive: true,
// 		isDisabled: !app.model.selectedSession,
// 	});
// });

// app.on(AppStateChanges.selectedSession, () => {
// 	modal[AppStateModals.session].isDisabled = !app.model.selectedSession;
// });

// app.on(AppStateModals.place, () => {
// 	modal[AppStateModals.place].render({
// 		header: {
// 			title: SETTINGS.placesModal.headerTitle,
// 			description: app.model.formatMovieDescription({
// 				title: app.model.selectedMovie.title,
// 				day: app.model.selectedSession.day,
// 				time: app.model.selectedSession.time,
// 			}),
// 		},
// 		places: {
// 			hall: {
// 				rows: app.model.selectedSession.rows,
// 				seats: app.model.selectedSession.seats,
// 			},
// 			selected: Array.from(app.model.basket.values()),
// 			taken: app.model.selectedSession.taken,
// 		},
// 		isActive: true,
// 		isDisabled: app.model.basket.size === 0,
// 	});
// });

app.on(AppStateChanges.basket, () => {
	main.counter = app.model.basket.size;
	app.on(AppStateChanges.payment, () => {
		modal[AppStateModals.payment].render({
			payment: app.model.payment,
			isDisabled: !app.model.payment.payment && !app.model.payment.address,
			isActive: true,
		});
	});
	modal[AppStateModals.basket].products = Array.from(app.model.basket.values());
});

app.on(AppStateModals.basket, () => {
	modal[AppStateModals.basket].render({
		products: Array.from(app.model.basket.values()),
		total: app.model.basketTotal,
		isDisabled: app.model.basket.size === 0,
		isActive: true,
	});
});

app.on(AppStateModals.contacts, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.contacts,
		isDisabled: !app.model.contacts.email && !app.model.contacts.phone,
		isActive: true,
	});
});

// app.on(AppStateChanges.payment, () => {
// 	modal[AppStateModals.payment].render({
// 		payment: app.model.payment,
// 		isDisabled: !app.model.payment.payment && !app.model.payment.address,
// 		isActive: true,
// 	});
// });

app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		content: SETTINGS.successModal,
		isActive: true,
	});
});

app.model.getProductList().catch((err: string) => console.log(`Error: `, err));
