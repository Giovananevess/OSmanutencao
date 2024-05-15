import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileUsersPageRoutingModule } from './profile-users-routing.module';

import { ProfileUsersPage } from './profile-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileUsersPageRoutingModule
  ],
  declarations: [ProfileUsersPage]
})
export class ProfileUsersPageModule { }
