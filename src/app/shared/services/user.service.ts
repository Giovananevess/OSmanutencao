import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Register, UpdateUser, User, UserLogs } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = environment.API;

  private userSubject = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }


  findMe(): Observable<User> {
    return this.http.get<User>(`${this.API}/users/me`);
  }

  register(values: Register): Observable<Register> {
    return this.http.post<Register>(`${this.API}/users/register`, values).pipe(
      catchError((error) => {
        console.error('Erro ao criar usuário:', error);
        throw error;
      })
    );
  }

  editUser(userId: number, userData: any): Observable<any> {
    const url = `${this.API}/users/edit/${userId}`;
    return this.http.patch(url, userData).pipe(
      catchError((error) => {
        console.error('Erro ao editar usuário:', error);
        throw error;
      })
    );
  }

  // editUser(values: UpdateUser, id: number): Observable<UpdateUser> {
  //   console.log('Values => ', values)
  //   return this.http.patch<UpdateUser>(`${this.API}/users/edit/${id}`, values);
  // }
  // editUser(userId: string, userData: any): Observable<User> {
  //   const url = `${this.API}/users/edit/${userId}`;
  //   return this.http.patch<User>(url, userData).pipe(
  //     catchError((error) => {
  //       console.error('Erro ao editar usuário:', error);
  //       throw error;
  //     })
  //   );
  // }

  getUsuarioLogs(values?: any): Observable<UserLogs[]> {
    let params = new HttpParams();
    for (const key in values) {
      params = params.append(key, values[key]);
    }
    return this.http.get<UserLogs[]>(`${this.API}/users/logs`, { params: params }).pipe(
      catchError((error) => {
        console.error('Erro ao obter logs do usuário:', error);
        throw error;
      })
    );
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.API}/users/${userId}`;
    return this.http.get<User>(url).pipe(
      catchError((error) => {
        console.error('Erro ao obter usuário por ID:', error);
        throw error;
      })
    );
  }
}
