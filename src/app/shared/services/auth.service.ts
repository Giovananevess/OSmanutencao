import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Login, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/users/login`, login).pipe(
      tap(response => {
        if (response && response.token && response.userId) {
          localStorage.setItem('userId', String(response.userId));
          localStorage.setItem('name', response.name); // Armazena o nome do usuário localmente
          this.setIsAuthenticated(true);
        }
      })
    );
  }

  checkUser(): Observable<any> {
    return this.http.get<any>(`${this.API}/users/checkuser`);
  }


  changePassword(id: number, values: any): Observable<any> {
    return this.http.patch<any>(`${this.API}/users/password/${id}`, values);
  }



  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null; // Converte para número se userId existir, caso contrário retorna null
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('name'); // Remove o nome do usuário ao fazer logout
    this.setIsAuthenticated(false);
  }
}
