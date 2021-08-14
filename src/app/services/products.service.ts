import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product, ProductDTO } from "../interfaces/products.interfaces";

@Injectable({providedIn: 'root'})
export class ProductsService {

  //private pathBase: string = "https://localhost:5001/v2/products/";
  private pathBase: string = "https://leeqviz-web-api.azurewebsites.net/v2/products/";

  constructor(private http: HttpClient) { }

  public GetAllProducts(params : any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}get_all_products`, {observe: 'response', params});
  }

  public GetProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.pathBase}get_product/${id}`);
  }

  public AddProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.pathBase}add_product`, product);
  }

  public UpdateProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.pathBase}update_product/${product.Id}`, product);
  }

  public DeleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}delete_product/${id}`);
  }
}