import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-os',
  templateUrl: './new-os.page.html',
  styleUrls: ['./new-os.page.scss'],
})
export class NewOsPage implements OnInit {

  orders: any[] = [{}]; // Inicializa com um formulário

  addOrder() {
    this.orders.push({});
  }
  constructor() { }

  ngOnInit() {
  }

}
