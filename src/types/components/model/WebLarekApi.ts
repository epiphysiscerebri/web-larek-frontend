export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

// Описание единицы продукта
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Описание контактов
export interface IContacts {
	email: string;
	phone: string;
}

// Описание оплаты
export interface IPayment {
	payment: string;
	address: string;
}

// Описание заказа
export interface IOrder extends IContacts, IPayment {
	total: number | null;
	items: string[];
}

// Описание результата заказа, который нам присылает сервер, когда мы совершаем заказ
export interface IOrderResult {
	id: string;
	total: number;
}

// Описание АПИ
export interface IWebLarekApi {
	getProduct: (id: string) => Promise<IProduct>;
	getProductList: () => Promise<IProduct[]>;
	postOrder: (order: IOrder) => Promise<IOrderResult>;
}
