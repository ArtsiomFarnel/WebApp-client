import { IProduct } from "./products.interfaces";

export type NotificationType = 'text' | 'product';

export interface INotification {
  type: NotificationType,
  text: string,
  product?: IProduct,
}