import { IModel } from './../../types/index';
import { IProductCard, IFormOrder } from "../../types";
import { ProjectApi } from "../ProjectApi";
import { API_URL } from "../../utils/constants";

export class ComponentModel {
  private _data: IModel;
  private api: ProjectApi;
  constructor() {
    this._data = {
      stateModal : false,
    }
    this.api = new ProjectApi(API_URL)
  }

  // установить в дату продукт
  async setProductCard(product: IProductCard) {
    // затем обрабатываем этот ответ от сервера и возвращаем
    return await this.api.getProductCard(product.id).then((data) => {
      this._data.product = data
    })
  }

  // установить в дату список продуктов
  async setProductList() {
    await this.api.getProductList().then((data) => {
      this._data.cardsList = data
    })
    return this._data.cardsList
  }

  // установить в дату ответ запроса, который отправляет сформированый заказ
  async setPostOrder(order: IFormOrder) {
    // затем обрабатываем этот ответ от сервера и возвращаем
    return await this.api.postOrder(order).then((data) => {
      this._data.order = data
    })
  }
}

