import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef , MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

interface UserSignIn {
  email: string;
  password: string;
}


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent {
  selectedValueDiplome!: string;
  selectedValueMention!: string;
  empForm! : FormGroup;

  constructor(
    private _fb :FormBuilder ,
    private _dialogRef:MatDialogRef<SinginComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
   this.empForm = this._fb.group({
    
         email:'',
         password :''

   })
  }


   setDataSubmit(){
       console.log(this.empForm.value);
   }


  openDialogSingUp(){
    const dialogRef = this.dialog.open(SignupComponent);
  }

}
