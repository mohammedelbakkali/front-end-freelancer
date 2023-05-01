import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageDashComponent } from './dashboard/page-dash/page-dash.component';
import { GigComponent } from './dashboard/gig/gig.component';
import { GigAddComponent } from './dashboard/gig/gig-add/gig-add.component';
import { ManageGigsComponent } from './dashboard/gig/manage-gigs/manage-gigs.component';


const routes: Routes = [
  {
    path: '', component:AccountComponent,
    children :[
        {
          path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]
        },
        {
          path:"dashboard",
          component:DashboardComponent,
          children:[
             {
               path:"",
               component:PageDashComponent,
             }, 
             {
              path:"manage_gigs",
              component:GigComponent,
            children:[

              { 

                path:"",
                component:ManageGigsComponent
            
             },
             { 
               path:"add_gig",
               component:GigAddComponent
           
            }
              
            ]
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
export class AccountRoutingModule { }
