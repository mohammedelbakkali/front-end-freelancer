import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './list-user/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AddUserComponent,
    UserComponent,
    ListUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
