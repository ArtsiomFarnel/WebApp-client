export interface Product {
  Id?: number;
  Name: string;
  Description: string;
  Cost: number;
  ImagePath: string;
  Category: string;
  Provider: string;
}

export interface ProductDTO {
  Id?: number;
  Name: string;
  Description: string;
  Cost: number;
  ImagePath: string;
  CategoryId: number;
  ProviderId: number;
}