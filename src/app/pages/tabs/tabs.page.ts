import { Component, OnInit } from '@angular/core';
import { ModalOsPage } from 'src/app/shared/components/modal-os/modal-os.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // async openNewOsModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: NewOsPage,
  //     componentProps: {
  //       osData: [] // Se necessário, você pode passar dados para o modal aqui
  //     }
  //   });
  //   await modal.present();
  // }

}
