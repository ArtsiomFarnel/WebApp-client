import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory } from "../interfaces/categories.interfaces";

@Injectable({providedIn: 'root'})
export class CategoriesService {

  //private pathBase: string = "https://localhost:5001/v2/categories/";
  private pathBase: string = "https://leeqviz-web-api.azurewebsites.net/v2/categories/";

  constructor(private http: HttpClient) { }

  public GetCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.pathBase}get_all_categories`);
  }

  public GetAllCategories(params : any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}get_all_categories`, {observe: 'response', params});
  }

  public GetCategoryById(id: any): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.pathBase}get_category/${id}`);
  }

  public AddCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.pathBase}add_category`, category);
  }

  public UpdateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.pathBase}update_category/${category.Id}`, category);
  }

  public DeleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}delete_category/${id}`);
  }
}