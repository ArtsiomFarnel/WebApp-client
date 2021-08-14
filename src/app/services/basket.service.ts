import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class BasketService {

  //private pathBase: string = "https://localhost:5001/v2/baskets/";
  private pathBase: string = "https://leeqviz-web-api.azurewebsites.net/v2/baskets/";

  constructor(private http: HttpClient) { }

  public GetAllBasketItems(params : any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}get_basket`, {observe: 'response', params});
  }

  public AddItemToBasket(id: any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}add_to_basket/${id}`);
  }

  public DeleteItemFromBasket(id: any): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}remove_from_basket/${id}`);
  }
}