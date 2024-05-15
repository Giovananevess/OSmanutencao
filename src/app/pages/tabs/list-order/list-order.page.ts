import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.page.html',
  styleUrls: ['./list-order.page.scss'],
})
export class ListOrderPage implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = this.orders; // Inicialmente, filteredOrders é igual a orders
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }


  searchOrders() {
    console.log('Search term:', this.searchTerm);
    if (!this.searchTerm.trim()) {
      this.filteredOrders = this.orders.slice(); // Cria uma cópia do array orders
      return;
    }

    this.filteredOrders = this.orders.filter(order =>
      order.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
