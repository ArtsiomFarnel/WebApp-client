import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserLogin, UserSignup } from '../interfaces/account.interfaces';

@Injectable({providedIn: 'root'})
export class AccountService {

  public error$: Subject<string> = new Subject<string>();
  private pathBase: string = "https://localhost:5001/";

  constructor(private http: HttpClient) { }

  get token(): string | null {
    const expiresDate = new Date(String(localStorage.getItem('fb-token-exp')));
    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public getUserData(): Observable<any> {
    return this.http.get(`${this.pathBase}account/get_user_data`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public login(user: UserLogin): Observable<any> {
    return this.http.post(`${this.pathBase}account/authenticate`, user).pipe(
      tap((result: any) => this.setToken(result)),
      catchError(this.handleError.bind(this))
    );
  }

  public signup(user: UserSignup): Observable<any> {
    return this.http.post(`${this.pathBase}account/register`, user).pipe(
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
      localStorage.setItem('fb-token-exp', expiresDate.toString());
    } 
    else localStorage.clear(); 
  }
}
