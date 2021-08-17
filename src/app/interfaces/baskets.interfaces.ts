export interface IBasketItem {
  Id?: number;
  ProductName: string;
  ProductCost: number;
  ProductImagePath: string;
  Amount: number;
}

export interface IBasketItemAmount {
  Id?: number;
  Amount: number;
}