import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-editinfos',
  templateUrl: './editinfos.component.html',
  styleUrls: ['./editinfos.component.scss']
})
export class EditinfosComponent {
  showEdit!: boolean;
  subscription: Subscription;

  constructor(private uiService:UiService){
    this.subscription = this.uiService.onToggle()
                                      .subscribe(
                                          value=> this.showEdit = value
                                      );
  }
  toggleEdit() {
    this.uiService.toggleEditInfo();
  }
}
