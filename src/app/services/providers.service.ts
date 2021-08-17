import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProvider } from "../interfaces/providers.interfaces";

@Injectable({providedIn: 'root'})
export class ProvidersService {

  //private pathBase: string = "https://localhost:5001/v2/providers/";
  private pathBase: string = "https://leeqviz-web-api.azurewebsites.net/v2/providers/";

  constructor(private http: HttpClient) { }

  public GetProviders(): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(`${this.pathBase}get_all_providers`);
  }

  public GetAllProviders(params : any): Observable<any> {
    return this.http.get<any>(`${this.pathBase}get_all_providers`, {observe: 'response', params});
  }

  public GetProviderById(id: any): Observable<IProvider> {
    return this.http.get<IProvider>(`${this.pathBase}get_provider/${id}`);
  }

  public AddProvider(provider: IProvider): Observable<IProvider> {
    return this.http.post<IProvider>(`${this.pathBase}add_provider`, provider);
  }

  public UpdateProvider(provider: IProvider): Observable<IProvider> {
    return this.http.put<IProvider>(`${this.pathBase}update_provider/${provider.Id}`, provider);
  }

  public DeleteProvider(id: any): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}delete_provider/${id}`);
  }
}