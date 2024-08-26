export type PaymentMethod = "online" | "offline"

export interface IProductCard {
  id: string;
  description: string;
  image: string;  
  title: string;
  category: string;
  price: number | null;
}

export interface IBasket {
  items: IProductCard[];
  total: number;
}

export interface IFormOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IFormOrderResult {
  id: string;
  total: number;
}

export interface IModel {
  cardsList?: IProductCard[];
  product?: IProductCard;
  basket?: IBasket;
  order?: IFormOrderResult;
  stateModal: Boolean;
}

export interface IController {
  model: IModel;
}


export interface IView {
  mount: (arr: HTMLElement[]) => void;
  controller: IController;
}

