import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})
export class CategoriesService {

  public pathBase: string = "https://localhost:5001/v2/categories";
  constructor(private http: HttpClient) {}

  public GetCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${this.pathBase}/get_all_categories`);
  }

  public GetAllCategories(params : any):Observable<any> {
    return this.http.get<any>(`${this.pathBase}/get_all_categories`, {params});
  }

  public GetCategoryById(id: any):Observable<Category> {
    return this.http.get<Category>(`${this.pathBase}/get_category/${id}`);
  }

  public AddCategory(category: Category):Observable<Category> {
    return this.http.post<Category>(`${this.pathBase}/add_category`, category);
  }

  public UpdateCategory(category: Category):Observable<Category> {
    return this.http.put<Category>(`${this.pathBase}/update_category/${category.Id}`, category);
  }

  public DeleteCategory(id: any):Observable<any> {
    return this.http.delete<any>(`${this.pathBase}/delete_category/${id}`);
  }
}