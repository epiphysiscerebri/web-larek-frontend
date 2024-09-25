import {
	IContacts,
	IPayment,
	IWebLarekApi,
	IProduct,
	IOrder,
	IOrderResult,
} from './WebLarekApi';

// Описание корзины
// export interface IBasket {
//   items: IProduct[];
// }

// Описание событий для модальных окон
export enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
	payment = 'modal:payment',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

// Описание событий для изменений Модели
export enum AppStateChanges {
	products = 'change:product',
	modal = 'change:modal',
	// modalMessage = 'change:modalMessage',
	selectedProduct = 'change:selectedProduct',
	basket = 'change:basket',
	order = 'change:order',
}

// Описание Модели данных
export interface AppState {
	// Загружаемые с сервера данные
	products?: Map<string, IProduct>;
	selectedProduct?: IProduct | null;

	// Заполняемые пользователем данные
	openedModal: AppStateModals | null;
	basket: Map<string, IProduct>;
	basketTotal: number;
	payment: IPayment | null;
	contacts: IContacts | null;
	order: IOrder | null;

	// Состояние интерфейса
	isOrderReady: boolean;
	modalMessage: string | null;
	// isError: boolean;

	// Действия с API
	getProductList(): Promise<void>;
	getProduct(id: string): Promise<void>;
	postOrder(): Promise<IOrderResult[]>;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	// setMessage(message: string | null, isError: boolean): void;

	// Пользовательские действия
	addBasket(product: IProduct): void;
	fillContacts(contacts: Partial<IContacts>): void;
	fillPayment(payment: Partial<IPayment>): void;
	removeProduct(id: string): void;
	isValidContacts(): boolean;
	isValidPayment(): boolean;

	// Вспомогательные методы
	formatCurrency(value: number): string;
}

// Описание настройки Модели
export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	// Эта функция будет вызываться при изменении Модели
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new (api: IWebLarekApi, settings: AppStateSettings): AppState;
}
