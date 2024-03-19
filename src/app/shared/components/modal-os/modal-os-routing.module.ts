import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOsPage } from './modal-os.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOsPageRoutingModule {}
