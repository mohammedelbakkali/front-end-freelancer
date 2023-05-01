import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
         {
           path:"user",
           loadChildren : ()=>import("./user/user.module").then((mod)=>mod.UserModule)
         },

        {
          path:"account",
          loadChildren : ()=>import("./account/account.module").then((mod)=>mod.AccountModule)
        },
        {
          path:"**",
          component:PageNotFoundComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
