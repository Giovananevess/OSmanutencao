import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-os',
  templateUrl: './modal-os.page.html',
  styleUrls: ['./modal-os.page.scss'],
  providers: [DatePipe]
})
export class ModalOsPage implements OnInit {


  @Input() osData: Order[] = [];
  relatorio: string = '';
  materiais: string = '';
  uploadedImages: any[] = [];
  id!: number;


  constructor(
    private modalCtrl: ModalController,
    private datePipe: DatePipe,
    private orderService: OrderService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.osData.length > 0) {
      console.log('OS Data: ', this.osData[0]);
      this.id = this.osData[0].id;
    }
  }

  orders: any[] = [{}]; // Inicializa com um formulário

  addOrder() {
    this.orders.push({});
  }

  onClose() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onImagePick(images: any) {
    for (let image of images) {
      console.log('event: ', image.filepath);
      this.uploadedImages.push(image);
    }
  }

  // async editOrder() {
  //   try {
  //     if (this.osData.length > 0) {
  //       const updatedOrder = this.osData[0];
  //       await this.orderService.updateOrder(updatedOrder.id, updatedOrder).toPromise();
  //       console.log('Ordem atualizada com sucesso');

  //       // Navega para a página de consulta de ordens após 2 segundos
  //       setTimeout(() => {
  //         this.router.navigate(['/consultar/ordens']);
  //       }, 2000);
  //     } else {
  //       console.error('Nenhuma ordem disponível para atualização');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao atualizar a ordem', error);
  //     // Exibe o erro no console
  //   }
  // }



  // onConcludeOs() {
  //   if (!this.relatorio) {
  //     return;
  //   }


  //   const formData = new FormData();
  //   const processedFiles = new Set<string>();

  //   if (this.uploadedImages.length > 0) {
  //     for (let image of this.uploadedImages) {
  //       if (image.data) {
  //         if (!processedFiles.has(image.filepath)) {

  //           processedFiles.add(image.filepath);
  //           const blob = this.dataURItoBlob(image.data);
  //           formData.append('file', blob!, image.filepath);
  //         }
  //       } else {
  //         console.error('A propriedade "data" na imagem é undefined ou null:', image);
  //       }
  //     }
  //   }

  //   const data_final = new Date();

  //   formData.append('ordem_servico_id', this.id as any);
  //   formData.append('relatorio', this.relatorio);
  //   formData.append('material', this.materiais);
  //   formData.append('data_final', this.datePipe.transform(data_final, 'yyyy/MM/dd') ?? '');

  //   console.log('formData: ', formData);

  //   this.loadingCtrl.create({
  //     message: 'Concluindo OS...'
  //   }).then(loadingEl => {
  //     loadingEl.present();
  //     this.os.concludeOs(formData as unknown as ConcludeOS).subscribe({
  //       next: (res) => {
  //         console.log('conclude_os_res: ', res);
  //         this.loadingCtrl.dismiss();
  //         this.modalCtrl.dismiss();
  //       },
  //       error: (err) => {
  //         console.error('Erro: ', err);
  //       }
  //     });

  //   })
  // }


  dataURItoBlob(dataURI: string): Blob | null {
    if (!dataURI) {
      console.error('dataURI is undefined or null');
      return null;
    }

    const base64Index = dataURI.indexOf('base64,');
    if (base64Index === -1) {
      console.error('Invalid dataURI format');
      return null;
    }

    const byteString = atob(dataURI.slice(base64Index + 'base64,'.length));
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/jpeg' });
  }

}
