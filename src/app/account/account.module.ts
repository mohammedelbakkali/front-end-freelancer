import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { EditinfosComponent } from './editinfos/editinfos.component';
import { MaterialExampleModule } from '../material.module';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    DashboardComponent,
    SettingsComponent,
    EditinfosComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialExampleModule
  ]
})
export class AccountModule { }
