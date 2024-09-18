import { Api, ApiListResponse } from '../base/Api';
import { IProduct, IOrder, IOrderResult, IWebLarekApi } from '../../types';

export class WebLarekApi extends Api implements IWebLarekApi {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	// запрос на получение продукта
	async getProduct(id: string): Promise<IProduct> {
		return await this.get(`/product/${id}`).then((data: IProduct) => data);
	}

	// запрос на получение списка продуктов
	async getProductList(): Promise<IProduct[]> {
		return await this.get(`/product`).then(
			(data: ApiListResponse<IProduct>) => data.items
		);
	}
	// запрос на формирование заказа
	async postOrder(order: IOrder): Promise<IOrderResult> {
		return await this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}
