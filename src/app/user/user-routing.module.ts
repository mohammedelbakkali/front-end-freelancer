import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './list-user/edit-user/edit-user.component';

const routes: Routes = [
  {
    path : "",
    component:UserComponent,
    children : [
         {
          path:"add-user",
          component:AddUserComponent
         },{
          path:"list-users",
          component:ListUserComponent,
          children : [
             {
              path:"edit-user",
              component:EditUserComponent
             }

          ]
         }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
