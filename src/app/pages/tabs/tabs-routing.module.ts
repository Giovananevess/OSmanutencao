import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'profile-users',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile-users/profile-users.module').then(m => m.ProfileUsersPageModule)
          }
        ]
      },
      {
        path: 'new-os',
        children: [
          {
            path: '',
            loadChildren: () => import('./new-os/new-os.module').then(m => m.NewOsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
