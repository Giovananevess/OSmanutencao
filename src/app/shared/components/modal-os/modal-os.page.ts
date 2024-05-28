import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-os',
  templateUrl: './modal-os.page.html',
  styleUrls: ['./modal-os.page.scss'],
  providers: [DatePipe]
})
export class ModalOsPage implements OnInit {

  @Input() osData!: Order[];
  orders: Order[] = [];
  relatorio: string = '';
  materiais: string = '';
  uploadedImages: any[] = [];
  osId!: number;

  constructor(
    private modalCtrl: ModalController,
    private datePipe: DatePipe,
    private osService: OrderService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    if (this.osData && this.osData.length > 0) {
      this.orders = this.osData; // Inicializa a propriedade orders
      this.osId = this.osData[0].id;
    } else {
      console.error('No OS Data provided.');
      this.modalCtrl.dismiss(null, 'cancel');
    }
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

  async onConcludeOs() {
    // if (!this.relatorio) {
    //   console.warn('Relatório é obrigatório.');
    //   return;
    // }

    const formData = new FormData();
    const processedFiles = new Set<string>();

    if (this.uploadedImages.length > 0) {
      for (let image of this.uploadedImages) {
        if (image.data) {
          if (!processedFiles.has(image.filepath)) {
            processedFiles.add(image.filepath);
            const blob = this.dataURItoBlob(image.data);
            if (blob) {
              formData.append('file', blob, image.filepath);
            } else {
              console.error('Erro ao converter dataURI para Blob:', image.filepath);
            }
          }
        } else {
          console.error('A propriedade "data" na imagem é undefined ou null:', image);
        }
      }
    }

    const data_final = new Date();

    formData.append('ordem_servico_id', this.osId.toString());
    formData.append('relatorio', this.relatorio);
    formData.append('material', this.materiais);
    formData.append('data_final', this.datePipe.transform(data_final, 'yyyy/MM/dd') ?? '');

    console.log('formData: ', formData);

    const loading = await this.loadingCtrl.create({
      message: 'Concluindo OS...'
    });
    await loading.present();

    // this.osService.concludeOs(formData).subscribe({
    //   next: (res) => {
    //     console.log('conclude_os_res: ', res);
    //     loading.dismiss();
    //     this.modalCtrl.dismiss();
    //   },
    //   error: (err) => {
    //     console.error('Erro ao concluir a OS:', err);
    //     loading.dismiss();
    //     // Opcional: mostrar um toast ou alerta para o usuário sobre o erro
    //   }
    // });
  }

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
