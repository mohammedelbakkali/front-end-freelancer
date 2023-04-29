import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  showEdit!: boolean;
  subscription!: Subscription;

  constructor( 
    private uiService: UiService
  ){
    this.subscription = this.uiService.onToggle()
                                      .subscribe(
                                          value=> this.showEdit = value
                                      ); //we catch the observable that we sent in the uiService
  }

  toggleEdit() {
    this.uiService.toggleEditInfo();
  }

}
