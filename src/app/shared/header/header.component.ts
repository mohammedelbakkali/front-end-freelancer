import { Component } from '@angular/core';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { SinginComponent } from 'src/app/auth/singin/singin.component';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


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
  filmIcon = faHeart;
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


