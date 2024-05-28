import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOsPageRoutingModule } from './new-os-routing.module';

import { NewOsPage } from './new-os.page';
import { PhotoGalleryPage } from 'src/app/shared/components/photo-gallery/photo-gallery.page';
import { PhotoGalleryPageModule } from 'src/app/shared/components/photo-gallery/photo-gallery.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOsPageRoutingModule,
    PhotoGalleryPageModule,
  ],
  declarations: [NewOsPage]
})
export class NewOsPageModule { }
