import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Provider } from "../interfaces/providers.interfaces";

@Injectable({providedIn: 'root'})
export class ProvidersService {

  public pathBase: string = "https://localhost:5001/v2/providers/";

  constructor(private http: HttpClient) { }

  public GetProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.pathBase}get_all_providers`);
  }

  public GetAllProviders(params : any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}get_all_providers`, {observe: 'response', params});
  }

  public GetProviderById(id: any): Observable<Provider> {
    return this.http.get<Provider>(`${this.pathBase}get_provider/${id}`);
  }

  public AddProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(`${this.pathBase}add_provider`, provider);
  }

  public UpdateProvider(provider: Provider): Observable<Provider> {
    return this.http.put<Provider>(`${this.pathBase}update_provider/${provider.Id}`, provider);
  }

  public DeleteProvider(id: any): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}delete_provider/${id}`);
  }
}