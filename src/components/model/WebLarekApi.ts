import { Api } from '../base/Api';
import {
	ApiListResponse,
	IProduct,
	IOrder,
	IOrderResult,
	IWebLarekApi,
} from './../../types/components/model/WebLarekApi';

export class WebLarekApi extends Api implements IWebLarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	// запрос на получение продукта
	async getProduct(id: string): Promise<IProduct> {
		return await this._get<IProduct>(`/product/${id}`);
	}

	// запрос на получение списка продуктов
	async getProductList(): Promise<IProduct[]> {
		const data = await this._get<ApiListResponse<IProduct>>('/product');
		return data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	// запрос на формирование заказа
	async postOrder(order: IOrder): Promise<IOrderResult[]> {
		const data = await this._post<ApiListResponse<IOrderResult>>(
			'/order',
			order
		);
		return data.items.map((item) => ({
			...item,
		}));
	}
}
