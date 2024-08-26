import { Api, ApiListResponse } from "./base/api";
import { IProductCard, IFormOrder, IFormOrderResult } from "../types";

export class ProjectApi extends Api {

  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options)
  }

  // запрос на получение карточки продукта
  getProductCard(id: string): Promise<IProductCard> {
    return this.get(`/product/${id}`)
      .then((data: IProductCard) => data)
  }

  // запрос на получение списка продуктов
  getProductList(): Promise<IProductCard[]> {
    return this.get(`/product`)
      .then((data: ApiListResponse<IProductCard>) => data.items)
  }
  // запрос на формирование заказа
  postOrder(order: IFormOrder): Promise<IFormOrderResult> {
    return this.post(`/order`, order)
      .then((data: IFormOrderResult) => data)
  }

}

