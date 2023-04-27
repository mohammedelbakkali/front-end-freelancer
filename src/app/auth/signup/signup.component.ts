import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

interface user {
  fullname: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  password :string;
}



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  selectedValueDiplome!: string;
  selectedValueMention!: string;
  empForm! : FormGroup;


    
  constructor(
    private _fb :FormBuilder ,
    private _dialogRef:MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
   this.empForm = this._fb.group({
     
         fullname:['', Validators.required],
         username:['', Validators.required],
         email:['', Validators.required , Validators.email],
         dateOfBirth:['', Validators.required],
         gender:['', Validators.required],
         password:['', Validators.required , Validators.minLength(8)],
         confirmepassword:['', Validators.required]

   })
  }

    setDataSubmit(){
          console.log(this.empForm.value);
          
    }
}


