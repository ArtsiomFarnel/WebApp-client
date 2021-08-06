export interface Product {
  Id?: number;
  Name: string;
  Description: string;
  Cost: string;
  Category: string;
  Provider: string;
}

export interface ProductDTO {
  Id?: number;
  Name: string;
  Description: string;
  Cost: number;
  CategoryId: number;
  ProviderId: number;
}