import './scss/styles.scss';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';
import { WebLarekApi } from './components/model/WebLarekApi';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { MainController } from './components/controller/Main';
import { MainScreen } from './components/view/screen/Main';
import {
	AppStateChanges,
	AppStateModals,
} from './types/components/model/AppState';
import { ModalController } from './components/controller/Modal';
import { SuccessScreen } from './components/view/screen/Success';
import { OrderController } from './components/controller/Order';
import { OrderFormScreen } from './components/view/screen/OrderForm';
import { BasketController } from './components/controller/Basket';
import { BasketScreen } from './components/view/screen/Basket';
import { SelectProductScreen } from './components/view/screen/SelectProduct';
import { ProductController } from './components/controller/SelectedProduct';
// import { ModalChange } from './types/components/model/AppStateEmitter';

const api = new WebLarekApi(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppStateModel);
const main = new MainScreen(new MainController(app.model));
const modal = {
	[AppStateModals.product]: new SelectProductScreen(
		new ProductController(app.model)
	),
	[AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.contacts]: new OrderFormScreen(
		new OrderController(app.model)
	),
	[AppStateModals.success]: new SuccessScreen(new ModalController(app.model)),
};

app.on(AppStateChanges.products, () => {
	main.items = Array.from(app.model.products.values());
});

app.on(AppStateChanges.selectedProduct, () => {
	main.selected = app.model.selectedProduct;
});

// app.on(AppStateChanges.modal, ({ previous, current }: ModalChange) => {
// 	main.page.isLocked = current !== AppStateModals.none;
// 	if (previous !== AppStateModals.none) {
// 		modal[previous].render({ isActive: false });
// 	}
// });

// app.on(AppStateChanges.modalMessage, () => {
// 	if (app.model.openedModal !== AppStateModals.none) {
// 		modal[app.model.openedModal].render({
// 			message: app.model.modalMessage,
// 			// isError: app.model.isError,
// 		});
// 	}
// });

app.on(AppStateModals.product, () => {
	modal[AppStateModals.product].render({
		product: app.model.selectedProduct,
		isActive: true,
		isDisabled: !app.model.selectedProduct,
	});
});

// app.on(AppStateChanges.selectedProduct, () => {
// 	modal[AppStateModals.product].isDisabled = !app.model.selectedProduct;
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
	modal[AppStateModals.basket].render({
		products: Array.from(app.model.basket.values()),
		isDisabled: app.model.basket.size === 0,
	});
});

app.on(AppStateModals.basket, () => {
	modal[AppStateModals.basket].render({
		products: Array.from(app.model.basket.values()),
		total: app.model.formatCurrency(app.model.basketTotal),
		isDisabled: app.model.basket.size === 0,
		isActive: true,
	});
});

app.on(AppStateModals.contacts, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.contacts,
		payment: app.model.payment,
		isDisabled: !app.model.contacts.email && !app.model.contacts.phone,
		isActive: true,
	});
});

app.on(AppStateChanges.order, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.contacts,
		payment: app.model.payment,
		isDisabled: !app.model.contacts.email && !app.model.contacts.phone,
	});
});

// добавить окно success
// app.on(AppStateModals.success, () => {
// 	modal[AppStateModals.success].render({
// 		content: SETTINGS.successModal,
// 		isActive: true,
// 	});
// });

app.model
	.getProductList()
	.catch((err: string) => console.log(`Error: `, err));

