export interface IProduct {
  Id?: number;
  Name: string;
  Description: string;
  Cost: number;
  ImagePath: string;
  Category: string;
  Provider: string;
}

export interface IProductDTO {
  Id?: number;
  Name: string;
  Description: string;
  Cost: number;
  ImagePath: string;
  CategoryId: number;
  ProviderId: number;
}