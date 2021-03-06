import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getProductsUrl } from "../shared/functions/get-urls";
import { IProductParams } from "../interfaces/params.interfaces";
import { IProduct, IProductDTO } from "../interfaces/products.interfaces";

@Injectable({providedIn: 'root'})
export class ProductsService {

  private pathBase: string = "https://localhost:5001/v1/products/";
  //private pathBase: string = "https://leeqviz-web-api.azurewebsites.net/v1/products/";

  constructor(private http: HttpClient) { }

  /*
  public GetAllProducts(params : any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}get_all_products`, {observe: 'response', params});
  }
  */
  public GetAllProducts(params: IProductParams): Observable<any> {
    return this.http.get<any>(getProductsUrl(`${this.pathBase}get_all_products`, params), { observe: 'response' });
  }

  public GetProductById(id: any): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.pathBase}get_product/${id}`);
  }

  public AddProduct(product: IProductDTO): Observable<IProductDTO> {
    return this.http.post<IProductDTO>(`${this.pathBase}add_product`, product);
  }

  public UpdateProduct(product: IProductDTO): Observable<IProductDTO> {
    return this.http.put<IProductDTO>(`${this.pathBase}update_product/${product.Id}`, product);
  }

  public DeleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}delete_product/${id}`);
  }
}