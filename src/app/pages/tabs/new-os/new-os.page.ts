import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-new-os',
  templateUrl: './new-os.page.html',
  styleUrls: ['./new-os.page.scss'],
})
export class NewOsPage implements OnInit {

  orders: any[] = [{}]; // Inicializa com um formulário
  dateTime: any;
  uploadedImages: any[] = [];

  addOrder() {
    this.orders.push({});
    // this.orders.push({} as Order);
  }

  constructor(
    private orderService: OrderService,
    private toastController: ToastController,
    private router: Router,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
  }

  async openDatePicker() {
    await this.dateTime.open();
  }


  onImagePick(images: any) {
    for (let image of images) {
      console.log('event: ', image.filepath);
      this.uploadedImages.push(image);
    }
  }

  async criarChamado(): Promise<void> {
    try {
      for (const order of this.orders) {
        const formData = new FormData();
        formData.append('title', order.title);
        formData.append('description', order.description);
        formData.append('priority', order.priority);
        formData.append('brand', order.brand);
        formData.append('daymaintenance', order.daymaintenance);
        formData.append('machine', order.machine);

        // Adicione aqui a lógica para adicionar as imagens ao formData
        // formData.append('images', image);

        // for (const image of image) { // Altere de 'images' para 'image' aqui
        //   formData.append('image', image);
        // }

        await this.orderService.create(formData).toPromise();
      }
      this.mostrarToast('Chamados criados com sucesso');
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error('Erro ao criar os chamados:', error);
      this.mostrarToast('Erro ao criar os chamados');
    }
  }


  // onFileSelected(event: any, order: Order): void {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     order.images = [file];
  //   }
  // }



  async mostrarToast(mensagem: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

}
