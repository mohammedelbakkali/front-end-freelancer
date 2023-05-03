import { Component, OnInit  } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Profile } from 'src/app/models/profile.model';
import { MatDialog } from '@angular/material/dialog';
import { EditinfosComponent } from '../editinfos/editinfos.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit {
  showEdit!: boolean;
  subscription!: Subscription;
  panelOpenState = false;
  user : Profile = {
    fullname: '',
    username: '',
    email: '',
    dateOfBirth:'',
    gender: '',
  };

  constructor( 
    private uiService: UiService, 
    private userService: UserService,
    public dialog: MatDialog
  ){}
  

  openDialog() {
    this.dialog.open(EditinfosComponent,{
      data:{
        user:this.user.fullname
      }
    });
  }


  ngOnInit(): void {
    this.userService.getProfile(localStorage.getItem('id')).subscribe({
      next:(res)=>{
          this.user ={
            fullname: res.user.fullname,
            username: res.user.username,
            email: res.user.email,
            dateOfBirth: res.user.dateOfBirth,
            gender: res.user.gender,
          } ;
          console.log(this.user )
      },
      error:(err)=>{
         console.log(err)
      }
    })

  }



}
