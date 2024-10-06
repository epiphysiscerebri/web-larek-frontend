import {
	IContacts,
	IPayment,
	IWebLarekApi,
	IProduct,
	IOrder,
	IOrderResult,
} from './../../types/components/model/WebLarekApi';
import {
	AppState,
	AppStateChanges,
	AppStateModals,
	AppStateSettings,
} from './../../types/components/model/AppState';

export class AppStateModel implements AppState {
	// Выбраный продукт
	_selectedProduct: string | null = null;

	// Массив с продуктами
	products: Map<string, IProduct> = new Map<string, IProduct>();

	// Корзина
	basket: Map<string, IProduct> = new Map<string, IProduct>();

	// Данные об оплате и адресе
	payment: IPayment = {
		payment: 'card',
		address: '',
	};

	// Контактные данные
	contacts: IContacts = {
		email: '',
		phone: '',
	};

	// Открытое модальное окно
	openedModal: AppStateModals = AppStateModals.none;

	constructor(
		protected api: IWebLarekApi,
		protected settings: AppStateSettings
	) {}

	// Сумма всех товаров в корзине
	get basketTotal(): number {
		return Array.from(this.basket.values()).reduce<number>(
			(acc, product) => acc + product.price,
			0
		);
	}

	// Проверка на то, правильно ли оформлен заказ
	get isOrderReady(): boolean {
		return (
			this.basket.size > 0 && !!this.contacts.email && !!this.contacts.phone
		);
	}

	// Выбраный продукт
	get selectedProduct(): IProduct | null {
		return this._selectedProduct && this.products.has(this._selectedProduct)
			? this.products.get(this._selectedProduct)
			: null;
	}

	// Продукты в корзине
	get productsInBasket(): string[] {
		return Array.from(this.basket.values()).map((product) => {
			return product.id;
		});
	}

	// Формирование заказа
	get order(): IOrder {
		return {
			...this.contacts,
			...this.payment,
			total: this.basketTotal,
			items: this.productsInBasket,
		};
	}

	// api actions
	// Получение списка продуктов
	async getProductList(): Promise<void> {
		this.products.clear();
		const products = await this.api.getProductList();
		for (const product of products) {
			this.products.set(product.id, product);
		}
		this.notifyChanged(AppStateChanges.products);
	}

	// Получение одного выбранного продукта
	async getProduct(id: string): Promise<void> {
		if (!this.products.has(id)) {
			throw new Error(`Invalid movie id: ${id}`);
		}
		const product = await this.api.getProduct(id);
		this.selectProduct(product.id);
	}

	// Отправка заказа
	async postOrder(): Promise<IOrderResult> {
		try {
			const result = await this.api.postOrder(this.order);
			this.basket.clear();
			this.notifyChanged(AppStateChanges.basket);
			return result;
		} catch (err: unknown) {
			console.log('err', err);
			return;
		}
	}

	// user actions
	// Выбор продукта из галереи
	selectProduct(id: string | null): void {
		if (!id) {
			this._selectedProduct = null;
			this.notifyChanged(AppStateChanges.selectedProduct);
			return;
		}
		if (this.products.has(id)) {
			this._selectedProduct = id;
			this.notifyChanged(AppStateChanges.selectedProduct);
		} else {
			throw new Error(`Invalid movie id: ${id}`);
		}
	}

	// Добавление продукта в корзину
	addToBasket(product: IProduct) {
		this.basket.set(product.id, product);
		this.notifyChanged(AppStateChanges.basket);
	}

	// Удаление продукта из корзины
	removeProduct(id: string): void {
		if (!this.basket.has(id)) {
			throw new Error(`Invalid ticket key: ${id}`);
		}
		this.basket.delete(id);
		this.notifyChanged(AppStateChanges.basket);
	}

	// Заполнение контактов
	fillContacts(contacts: Partial<IContacts>): void {
		this.contacts = {
			...this.contacts,
			...contacts,
		};
		this.notifyChanged(AppStateChanges.contacts);
	}

	// Тригер на корректность заполнения контактов
	isValidContacts(): boolean {
		const error = this.validateContacts(this.contacts);
		if (error) {
			console.log('Контакты заполнены не верно');
			return false;
		} else {
			console.log('Успешное заполнение контактов');
			return true;
		}
	}

	// Заполнение оплаты
	fillPayment(payment: Partial<IPayment>): void {
		this.payment = {
			...this.payment,
			...payment,
		};
		this.notifyChanged(AppStateChanges.payment);
	}

	// Тригер на корректность заполнения оплаты
	isValidPayment(): boolean {
		const error = this.validatePayment(this.payment);
		if (error) {
			console.log('Данные по оплате заполнены не верно');
			return false;
		} else {
			console.log('Успешное заполнение данных по оплате');
			return true;
		}
	}

	// UI methods
	// Открытие одального окна
	openModal(modal: AppStateModals): void {
		switch (modal) {
			case AppStateModals.payment:
				if (this.basket.size === 0) {
					throw new Error(`Нет выбраных продуктов`);
				}
				break;
			case AppStateModals.contacts:
				if (!this.payment.address || !this.payment.payment) {
					throw new Error(`Оплата не выбрана`);
				}
				break;
		}
		if (this.openedModal !== modal) {
			this.openedModal = modal;
			this.notifyChanged(AppStateChanges.modal);
		}
	}

	// helpers
	// Обновление модели
	protected notifyChanged(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

	// Валидация контактов
	protected validateContacts(contacts: Partial<IContacts>): string | null {
		const errors: string[] = [];
		if (!contacts.email || !contacts.phone) {
			errors.push('Email и телефон обязательные поля');
		}
		if (
			contacts.email &&
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(contacts.email)
		) {
			errors.push('Некорректный email');
		}
		if (contacts.phone && !/^\+?[0-9]{10,14}$/.test(contacts.phone)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}

	// Валидация оплаты
	protected validatePayment(payment: Partial<IPayment>): string | null {
		const errors: string[] = [];
		if (!payment.payment || !payment.address) {
			errors.push('Данные по оплате некорректно заполнены');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}
}
