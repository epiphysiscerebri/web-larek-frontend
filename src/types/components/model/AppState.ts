import {
	IContacts,
	IPayment,
	IWebLarekApi,
	IProduct,
	IOrder,
	IOrderResult,
} from './WebLarekApi';


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
	payment = 'change:payment',
	contacts = 'change:contacts',
	basket = 'change:basket',
	order = 'change:order'
}

// Описание Модели данных
export interface AppState {
	// Загружаемые с сервера данные
	// Массив с продуктами
	products: Map<string, IProduct>;

	// Заполняемые пользователем данные
	// Выбраный продукт
	selectedProduct: IProduct;
	// Корзина
	basket: Map<string, IProduct>;
	// Итог в корзине
	basketTotal: number;
	// Массив с ид продуктов в корзине
	productsInBasket: string[];
	// Данные об оплате и адресе
	payment: IPayment;
	// Контактные данные
	contacts: IContacts;
	// Данные о заказе
	order: IOrder;

	// Состояние интерфейса
	// Флаг готовности заказа
	isOrderReady: boolean;
	// Открытое модальное окно
	openedModal: AppStateModals;
	// modalMessage: string | null;

	// Действия с API
	// Получение списка продуктов
	getProductList(): Promise<void>;
	// Получение продукта
	getProduct(id: string): Promise<void>;
	// Оформление заказа
	postOrder(): Promise<IOrderResult>;

	// Методы для работы с модальными окнами
	// Открытие модального окна
	openModal(modal: AppStateModals): void;
	// setMessage(message: string | null, isError: boolean): void;

	// Пользовательские действия
	// Добавление в корзину
	addToBasket(product: IProduct): void;
	// Выбор продукта
	selectProduct(id: string): void; 
	// Заполнение контактов
	fillContacts(contacts: Partial<IContacts>): void;
	// Заполнение адреса и оплаты
	fillPayment(payment: Partial<IPayment>): void;
	// Удаление продукта из корзины
	removeProduct(id: string): void;
	// Проверка валидности контаков
	isValidContacts(): boolean;
	// Проверка валидности оплаты
	isValidPayment(): boolean;
}

// Описание настройки Модели
export interface AppStateSettings {
	// Эта функция будет вызываться при изменении Модели
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new (api: IWebLarekApi, settings: AppStateSettings): AppState;
}
