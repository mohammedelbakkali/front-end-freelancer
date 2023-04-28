import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { SinginComponent } from 'src/app/auth/singin/singin.component';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  formGroup! : FormGroup;
  value:boolean = true;
  valueE:boolean = true;
  valueB:boolean = true;


  constructor( private _fb :FormBuilder , public dialog: MatDialog ){}
  cities!: City[];

  selectedCity!: City;

  ngOnInit() {

  }

  openDialogSingUp(){
    const dialogRef = this.dialog.open(SignupComponent);
  }

  openDialogSingIn(){
    const dialogRef = this.dialog.open(SinginComponent);
  }
  
}


