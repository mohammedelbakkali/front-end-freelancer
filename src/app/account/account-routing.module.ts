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
import { ListKeyManager } from '@angular/cdk/a11y';
import { GigListComponent } from './dashboard/gig/gig-list/gig-list.component';
import { HomeGigsComponent } from './dashboard/gig/home-gigs/home-gigs.component';
import { DetailGigComponent } from './dashboard/gig/home-gigs/detail-gig/detail-gig.component';
import { GetBySubCategoryComponent } from './dashboard/gig/home-gigs/get-by-sub-category/get-by-sub-category.component';


const routes: Routes = [
  {
    path: '', component:AccountComponent,
    children :[
      {

        path:'',
        component:HomeGigsComponent
  
 
      },{
         path:"detail/:id",
         component:DetailGigComponent
      },
      {
        path:"sub/:id",
        component:GetBySubCategoryComponent
     },
        {
          path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]
        },
        {
          path:"dashboard",
          component:DashboardComponent,
          canActivate:[AuthGuard],
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
