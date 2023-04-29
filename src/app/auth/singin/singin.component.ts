import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef , MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserSignIn } from 'src/app/models/userSignIn';
import { TokenService } from 'src/app/services/token.service';
import { Emitters } from 'src/app/Emitters/emitters';



@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent {
  selectedValueDiplome!: string;
  selectedValueMention!: string;
  empForm! : FormGroup;
  userSigin!:UserSignIn;
  constructor(
    private _fb :FormBuilder ,
    private _dialogRef:MatDialogRef<SinginComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service :AuthService,
    private toastr:ToastrService,
    private router:Router,
    private token :TokenService
    ){
   this.empForm = this._fb.group({
    
         email:'',
         password :''
    
   })
  }


   setDataSubmit(){
       if(this.empForm.valid){
               this.userSigin = {
                email:this.empForm.value.email ,
                password: this.empForm.value.password
               }
           this.service.signIn(this.userSigin).subscribe({
                next:(res)=>{
                  console.log(res)
                  this.handlResponseToken(res);
                   Emitters.authEmitter.emit(true);
                   this.toastr.success("signin successful");
                  
                   this._dialogRef.close();
                   this.router.navigateByUrl('account/profile');
                },
                error:(err)=>{
                
                  this.toastr.success("account not found");
                }
           })
       }
   }

   handlResponseToken(res:any){
        this.token.handle(res);
        console.log(this.token.isValid());
   }
  openDialogSingUp(){
    const dialogRef = this.dialog.open(SignupComponent);
  }

}
