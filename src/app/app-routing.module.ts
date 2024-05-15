import { HomePage } from './pages/tabs/home/home.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-os',
    loadChildren: () => import('./shared/components/modal-os/modal-os.module').then(m => m.ModalOsPageModule)
  },
  {
    path: 'photo-gallery',
    loadChildren: () => import('./shared/components/photo-gallery/photo-gallery.module').then(m => m.PhotoGalleryPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./shared/components/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'list-order',
    loadChildren: () => import('./pages/tabs/list-order/list-order.module').then(m => m.ListOrderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
