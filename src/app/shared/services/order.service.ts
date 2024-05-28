import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConcludeOrders, ConcludeOS, ConcludeOsResponse, Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  create(orderData: FormData): Observable<Order> {
    return this.http.post<Order>(this.API + '/orders/create', orderData);
  }


  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API + '/orders');
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.patch<Order>(this.API + '/orders/' + id, JSON.stringify(order));
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API}/orders/${id}`);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<Order>(`${this.API}/orders/` + id);
  }

  getAllUserOrders(): Observable<{ orders: Order[] }> {
    return this.http.get<{ orders: Order[] }>(`${this.API}/orders/myorders`);
  }

  concludeOs(values: ConcludeOS): Observable<ConcludeOsResponse> {
    return this.http.patch<ConcludeOsResponse>(`${this.API}/ordem-servico/concluir`, values);
  }
}
