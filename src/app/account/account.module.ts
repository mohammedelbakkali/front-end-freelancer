import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { EditinfosComponent } from './editinfos/editinfos.component';
import { MaterialExampleModule } from '../material.module';

import { GigListComponent } from './dashboard/gig/gig-list/gig-list.component';
import { PageDashComponent } from './dashboard/page-dash/page-dash.component';
import { GigComponent } from './dashboard/gig/gig.component';
import { GigAddComponent } from './dashboard/gig/gig-add/gig-add.component';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 


import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ManageGigsComponent } from './dashboard/gig/manage-gigs/manage-gigs.component';
import { HomeGigsComponent } from './dashboard/gig/home-gigs/home-gigs.component';
import { DetailGigComponent } from './dashboard/gig/home-gigs/detail-gig/detail-gig.component';

import { GetBySubCategoryComponent } from './dashboard/gig/home-gigs/get-by-sub-category/get-by-sub-category.component';

import { CollapseTextPipe } from '../collapse-text.pipe';
import { StarsComponent } from './dashboard/stars/stars.component';
import { ReviewService } from '../services/review.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './dashboard/chat/chat.component';
import { ListRoomComponent } from './dashboard/list-room/list-room.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
import { ScrollToModule } from 'ng2-scroll-to';
import { WishlistComponent } from './wishlist/wishlist.component';


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    DashboardComponent,
    SettingsComponent,
    EditinfosComponent,
    GigComponent,
    GigAddComponent,
    GigListComponent,
    PageDashComponent,
    ManageGigsComponent,
    HomeGigsComponent,
    DetailGigComponent,

    GetBySubCategoryComponent,

    CollapseTextPipe,
      ChatComponent,
      ListRoomComponent,
     StarsComponent,
     WishlistComponent

  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatIconModule,
    ScrollToModule.forRoot(),
    AngularEditorModule
  ],

  providers: [ReviewService],
})
export class AccountModule { }
