import {
	IOrderResult,
	AppStateSettings,
	IWebLarekApi,
	IPayment,
	AppStateModals,
	AppStateChanges,
	IContacts,
	IProduct,
	AppState,
	IOrder,
} from '../../types';

export class AppStateModel implements AppState {
	products: Map<string, IProduct> = new Map<string, IProduct>();
	_selectedProduct: IProduct | null = null;
	basket: Map<string, IProduct> = new Map<string, IProduct>();
	payment: IPayment | null = null;
	contacts: IContacts | null = null;

	openedModal: AppStateModals = AppStateModals.none;
	modalMessage: string | null = null;
	isError = false;

	constructor(
		protected api: IWebLarekApi,
		protected settings: AppStateSettings
	) {}

	get basketTotal(): number {
		return Array.from(this.basket.values()).reduce<number>(
			(acc, product) => acc + product.price,
			0
		);
	}

	get isOrderReady(): boolean {
		return (
			this.basket.size > 0 && !!this.contacts.email && !!this.contacts.phone
		);
	}

	get selectedProduct(): IProduct | null {
		return this._selectedProduct;
	}

	get order(): IOrder {
		return {
			...this.contacts,
			...this.payment,
			total: this.basketTotal,
			items: Array.from(this.basket.values()).map((product) => product.id),
		};
	}

	// api acitons
	async loadProducts(): Promise<void> {
		this.products.clear();
		const products = await this.api.getProductList();
		for (const product of products) {
			this.products.set(product.id, product);
		}
		// оповещение, что модель поменялась
		// this.notifyChanged(AppStateChanges.products);
	}

	async loadProduct(id: string): Promise<void> {
		const product = await this.api.getProduct(id);
		this._selectedProduct = product;
		// this.notifyChanged(AppStateChanges.sessions);
	}

	async orderProducts(): Promise<IOrderResult> {
		try {
			const result = await this.api.postOrder(this.order);
			this.basket.clear();
			// this.persistState();
			// this.notifyChanged(AppStateChanges.basket);
			return result;
		} catch (err: unknown) {
			// обрабатываем ошибку
			console.log(err);
			// if (err instanceof Error) {
			// 	this.setMessage(err.message, true);
			// }
			// if (typeof err === 'string') {
			// 	this.setMessage(err, true);
			// }
			// return [];
		}
	}

	// user actions
	selectProduct(id: string | null): void {
		this.loadProduct(id);
	}

	removeProduct(id: string): void {
		if (!this.basket.has(id)) {
			throw new Error(`Invalid product key: ${id}`);
		}
		this.basket.delete(id);
		// this.notifyChanged(AppStateChanges.basket);
	}

	fillContacts(contacts: Partial<IContacts>): void {
		this.contacts = {
			...this.contacts,
			...contacts,
		};
		// this.notifyChanged(AppStateChanges.order);
	}

	fillPayment(payment: Partial<IPayment>): void {
		this.payment = {
			...this.payment,
			...payment,
		};
		// this.notifyChanged(AppStateChanges.order);
	}

	isValidContacts(): boolean {
		const error = this.validateContacts(this.contacts);
		if (error) {
			this.setMessage(error, true);
			return false;
		} else {
			this.setMessage(null);
			return true;
		}
	}

	isValidPayment(): boolean {
		const error = this.validatePayment(this.payment);
		if (error) {
			this.setMessage(error, true);
			return false;
		} else {
			this.setMessage(null);
			return true;
		}
	}

	// UI methods
	openModal(modal: AppStateModals): void {
		switch (modal) {
			case AppStateModals.contacts:
				if (this.basket.size === 0) {
					throw new Error(`No products selected`);
				}
				break;
		}
		if (this.openedModal !== modal) {
			this.openedModal = modal;
			// this.notifyChanged(AppStateChanges.modal);
		}
	}

	setMessage(message: string | null, isError = false): void {
		this.modalMessage = message;
		this.isError = isError;
		// this.notifyChanged(AppStateChanges.modalMessage);
	}

	// helpers
	protected notifyChanged(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

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

	protected validatePayment(payment: Partial<IPayment>): string | null {
		const errors: string[] = [];
		if (!payment.payment || !payment.address) {
			errors.push('Нужно указать тип оплаты и адрес');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}
}
