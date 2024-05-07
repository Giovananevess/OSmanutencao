import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, from } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ChangePassword, CheckUser, Login, LoginResponse } from '../models/auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService) { }


  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/users/login`, login);
  }

  checkUser(): Observable<CheckUser> {
    return this.http.get<CheckUser>(`${this.API}/users/checkuser`);
  }

  changePassword(id: number, values: ChangePassword): Observable<ChangePassword> {
    return this.http.patch<ChangePassword>(`${this.API}/users/password/${id}`, values)
  }


}
