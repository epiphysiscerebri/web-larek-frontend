import { ComponentModel } from "../base/ComponentModel";

export class PageController  {
  
  model;

  constructor() {
    // экземпляр модели
    this.model = new ComponentModel()
  }
  
  // метод, который дёргает модель
  processingLoadPage() {
    return this.model.setProductList()
  }
}