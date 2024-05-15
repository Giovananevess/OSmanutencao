import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})
export class PhotoGalleryPage implements OnInit {

  @Output() imagePick = new EventEmitter<string | File>();

  constructor(
    public photoService: PhotoService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    this.imagePick.emit(this.photoService.photos as any);
  }

}
