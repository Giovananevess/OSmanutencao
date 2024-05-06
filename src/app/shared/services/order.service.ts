import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  create(order: Order) {
    return this.http.post(this.API + '/orders', JSON.stringify(order));
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API + '/orders');
  }

  updateOrder(id: number, order: Order): Observable<any> {
    return this.http.put(this.API + '/orders/' + id, JSON.stringify(order));
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API}/orders/${id}`);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<Order>(this.API + '/orders/' + id);
  }

  getAllUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API}/orders/myorders`);
  }


}
