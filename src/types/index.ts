export type PaymentMethod = "card" | "cash"

// Описание единицы продукта
export interface IProduct {
  id: string;
  description: string;
  image: string;  
  title: string;
  category: string;
  price: number | null;
}

// Объект настроек для продукта, который бьудет использоваться во view
export interface IProductSettings {
  text: string;
  image: string;  
  title: string;
  category: string;
  price: number | null;
  compactClass: string;
  isCompact: boolean;
} 

// Описание корзины
// export interface IBasket {
//   items: IProduct[];
// }

// Объект настроек для корзины, который бьудет использоваться во view
export interface IBasketSettings {
  listItem: string;
  price: string;
}

// Описание заказа
export interface IOrder extends IContacts, IPayment {
  total: number;
  items: string[];
}

// Объект настроек для заказа, который бьудет использоваться во view
export interface IOrderSettings {
  card?: string;
  cash?: string;
  address: string;
  email: string;
  phone: string;
}

// Описание результата заказа, который на присылает сервер, когда мы совершаем заказ 
export interface IOrderResult {
  id: string;
  total: number;
}

// Объект настроек для результата заказа, который бьудет использоваться во view
export interface IOrderResultSettings {
  description: string;
}

// Описание АПИ
export interface IWebLarekApi {
  getProduct: (id: string) => Promise<IProduct>;
  getProductList: () => Promise<IProduct[]>;
  postOrder: (order: IOrder) => Promise<IOrderResult>;
}

// Описание Модели данных
export interface AppState {
  // Загружаемые с сервера данные
  products?: Map<string, IProduct>;
  selectedProduct?: IProduct | null;

  // Заполняемые пользователем данные
  openedModal: AppStateModals | null;
  basket:  Map<string, IProduct>;
  basketTotal: number;
  payment: IPayment | null;
  contacts: IContacts | null;
  order: IOrder | null;

  // Состояние интерфейса
  isOrderReady: boolean;
  modalMessage: string | null;
  isError: boolean;

  // Действия с API
  loadProducts(): Promise<void>;
  loadProduct(id: string): Promise<void>;
  orderProducts(): Promise<IOrderResult>;

  // Методы для работы с модальными окнами
  openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;

  // Пользовательские действия
  fillContacts(contacts: Partial<IContacts>): void;
  fillPayment(payment: Partial<IPayment>): void;
  isValidContacts(): boolean;
  isValidPayment(): boolean;
}

// Описание контактов
export interface IContacts {
  email: string;
  phone: string;
}

// Описание оплаты
export interface IPayment {
  payment: PaymentMethod;
  address: string;
}

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
	modalMessage = 'change:modalMessage',
	selectedProduct = 'change:selectedProduct',
	basket = 'change:basket',
	order = 'change:order',
}

// Описание настройки Модели
export interface AppStateSettings {
  currency: string;
  storageKey: string;
  // Эта функция будет вызываться при изменении Модели
  onChange: (changed: AppStateChanges) => void;
}



