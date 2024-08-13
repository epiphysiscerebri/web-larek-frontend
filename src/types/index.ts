export type PaymentMethod = "online" | "offline"

export interface IProduct {
  id: string;
  description: string;
  image: string;  
  title: string;
  category: string;
  price: number | null;
}

export interface IBasket {
  items: IProduct[];
  total: number;
}

export interface IOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}


