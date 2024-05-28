import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-new-os',
  templateUrl: './new-os.page.html',
  styleUrls: ['./new-os.page.scss'],
})
export class NewOsPage implements OnInit {

  orders: any[] = [{}]; // Inicializa com um formulário
  uploadedImages: any[] = [];

  constructor(
    private orderService: OrderService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  addOrder() {
    this.orders.push({});
  }

  // onImagePick(images: any) {
  //   for (let image of images) {
  //     console.log('event: ', image.filepath);
  //     this.uploadedImages.push(image);
  //   }
  // }

  onImagePick(images: any) {
    for (let image of images) {
      this.uploadedImages.push(image);
    }
  }

  addImage(image: any) {
    this.uploadedImages.push(image);
  }

  async criarChamado(): Promise<void> {
    try {
      if (!this.isValidOrders()) {
        this.mostrarToast('Preencha todos os campos obrigatórios');
        return;
      }

      for (const order of this.orders) {
        const formData = new FormData();
        formData.append('title', order.title);
        formData.append('description', order.description);
        formData.append('priority', order.priority);
        formData.append('brand', order.brand);
        formData.append('daymaintenance', order.daymaintenance);
        formData.append('machine', order.machine);

        if (this.uploadedImages.length > 0) {
          for (const image of this.uploadedImages) {
            formData.append('images[]', image);
          }
        }

        await this.orderService.create(formData).toPromise();
      }
      this.mostrarToast('Chamados criados com sucesso');
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error('Erro ao criar os chamados:', error);
      this.mostrarToast('Erro ao criar os chamados');
    }
  }

  isValidOrders(): boolean {
    return this.orders.every(order =>
      order.title && order.description && order.priority && order.brand && order.daymaintenance && order.machine
    );
  }

  async mostrarToast(mensagem: string): Promise<void> {
    await this.toastController.create({
      message: mensagem,
      duration: 2000
    }).then(toastEl => {
      toastEl.present();
    }).then(() => {
      this.router.navigate(['/tabs/home'])
    })
  }
}
