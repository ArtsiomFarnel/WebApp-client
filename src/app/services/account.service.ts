import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IChangePassword, IUserData, IUserLogin, IUserSignup, IUserValidation } from '../interfaces/account.interfaces';

@Injectable({providedIn: 'root'})
export class AccountService {

  public error$: Subject<string> = new Subject<string>();
  //private pathBase: string = "https://localhost:5001/account/";
  private pathBase: string = "https://leeqviz-web-api.azurewebsites.net/account/";

  constructor(private http: HttpClient) { }

  get token(): string | null {
    const expiresDate = new Date(String(localStorage.getItem('fb-token-exp')));
    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public getUserData(): Observable<IUserData> {
    return this.http.get<IUserData>(`${this.pathBase}get_user_data`);
  }

  public deleteUser(user: IUserValidation): Observable<any> {
    return this.http.delete<any>(`${this.pathBase}delete_user`, {body: user});
  }

  public changePassword(passwords: IChangePassword): Observable<any> {
    return this.http.put<any>(`${this.pathBase}change_password`, passwords);
  }

  public login(user: IUserLogin): Observable<any> {
    return this.http.post(`${this.pathBase}authenticate`, user).pipe(
      tap((result: any) => this.setToken(result)),
      catchError(this.handleError.bind(this))
    );
  }

  public signup(user: IUserSignup): Observable<any> {
    return this.http.post(`${this.pathBase}register`, user).pipe(
      tap((result: any) => this.setToken(result)),
      catchError(this.handleError.bind(this))
    );
  }

  public logout(): void {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public isClient(): boolean {
    if (localStorage.getItem('fb-roles') == 'Client') return true;
    else return false;
  }

  public isAdministrator(): boolean {
    if (localStorage.getItem('fb-roles') == 'Administrator') return true;
    else return false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error;     
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Nonexistent email');
        break;
    }     
    return throwError(error);
  }

  private setToken(response: any | null): void {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + 60 * 60 * 1000);
      localStorage.setItem('fb-token', response.token);
      localStorage.setItem('fb-roles', response.roles);
      localStorage.setItem('fb-token-exp', expiresDate.toString());
    } 
    else localStorage.clear(); 
  }
}
