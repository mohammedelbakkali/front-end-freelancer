import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '', component:AccountComponent,
    children :[
        {
          path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]
        }
    ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
