import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOsPageRoutingModule } from './modal-os-routing.module';

import { ModalOsPage } from './modal-os.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOsPageRoutingModule
  ],
  declarations: [ModalOsPage]
})
export class ModalOsPageModule {}
