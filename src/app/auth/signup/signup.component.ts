import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.model';
import { MatDialogRef , MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SinginComponent } from '../singin/singin.component';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  selectedValueDiplome!: string;
  selectedValueMention!: string;
  valueForm! : FormGroup;
  user! : User;


  // for verification
  valuePassword!:string;
  valuePasswordConfirme!:string;
  progress!:number;
  constructor(
    private _fb :FormBuilder ,
    private _dialogRef:MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service :AuthService,
    private toastr:ToastrService,
    private router:Router,
    public dialog: MatDialog 
    
    ){
      this.valueForm = this._fb.group({
     
        fullname:'',
        username:'',
        email:'',
        dateOfBirth:'',
        gender:'',
        password:'',
        confirmepassword:'',
    
    })
  }

  progressFunction(){
    console.log("haaay");
    if(this.valuePassword.length == 5){
      this.progress=50;
    }
   
  }

  setDataSubmit(){
        if(this.valueForm.valid){

        if(this.valueForm.value.password === this.valueForm.value.confirmepassword){
          this.user =  {
            fullname: this.valueForm.value.fullname,
            username: this.valueForm.value.username,
            email: this.valueForm.value.email,
            dateOfBirth: this.valueForm.value.dateOfBirth,
            gender: this.valueForm.value.gender,
            password :this.valueForm.value.password,

          };
          
          this.service.signUp(this.user).subscribe({
              next:(res)=>{ 
                
                this.toastr.success('the account has been created')
                this.router.navigate([''])
                console.log(res);
              },
              error:(err)=>{console.log(err);}
          })
        }else {
          this.toastr.error('password incorrect !');
            
              
        }
        

        
        }
        
        
  }

  openDialogSingIn(){
    const dialogRef = this.dialog.open(SinginComponent);
  }
}


