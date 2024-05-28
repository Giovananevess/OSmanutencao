import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalOsPage } from 'src/app/shared/components/modal-os/modal-os.page';
import { Order } from 'src/app/shared/models/order';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  orderServices: Order[] = [];

  isLoading: boolean = false;
  nomeDaConta: string = '';

  constructor(
    private alertController: AlertController,
    private orderService: OrderService,
    private authService: AuthService,
    private storage: StorageService,
    private modalCtrl: ModalController,
    private navCtrl: NavController

  ) { }
  async ngOnInit() {
    this.loadOrders();
    this.nomeDaConta = await this.storage.get('name');
  }

  async ionViewWillEnter() {
    await this.Identify();
  }

  navigateToFAQPage() {
    this.navCtrl.navigateForward('/faq');
  }
  navigateToOrdersPage() {
    this.navCtrl.navigateForward('/list-order');
  }

  async loadOrders() {
    this.orderService.getAllUserOrders().subscribe({
      next: (orders) => {
        this.orderServices = orders.orders;
        this.isLoading = false
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }

  private async Identify() {
    this.authService.identify().subscribe({
      next: async (data) => {
        await this.storage.set('name', data.name);
        await this.storage.set('userId', data.userId);
        await this.storage.set('email', data.email);
        await this.loadOrders();
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }

  deleteCall(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      (data) => {
        console.log("Chamado deletado:", data);
        window.location.reload();
      },
      (error) => {
        console.error("Erro ao deletar chamado:", error);

      }
    );
  }

  onShowOs(id: number) {
    this.modalCtrl
      .create({
        component: ModalOsPage,
        componentProps: {
          osData: this.orderServices.filter((os) => os.id === id)
        },
      })
      .then((modalEl) => {
        modalEl.onDidDismiss().then((modalData) => {
          console.log('Modal Data: ', modalData);
          this.ionViewWillEnter();
        });
        modalEl.present();
      });
  }




  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Fechar'],
      // position: 'top',
    });
    await alert.present();
  }
}
