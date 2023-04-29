import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { SinginComponent } from 'src/app/auth/singin/singin.component';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/services/token.service';
import { Emitters } from 'src/app/Emitters/emitters';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



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


  constructor( 
    private _fb :FormBuilder , 
    public dialog: MatDialog , 
    private token :TokenService,
    private service :AuthService,
    private router:Router,)
    {
     
    }
    isAuth!:boolean;
 
  
    ngOnInit() : void {

      Emitters.authEmitter.subscribe(
         (res)=>{
           console.log("listen")
           this.isAuth = this.token.isValid();
           console.log( this.isAuth)
         }
      )
           this.isAuth = this.token.isValid();
  
    }

  openDialogSingUp(){
    const dialogRef = this.dialog.open(SignupComponent);
  }

  openDialogSingIn(){
    const dialogRef = this.dialog.open(SinginComponent);
  }

  logOut(){
     this.service.logOut().subscribe({
       next :(res)=>{
           this.token.remove();
           Emitters.authEmitter.emit(false);

           this.router.navigateByUrl('',{skipLocationChange: true})
       }
     })
  }
  
}


