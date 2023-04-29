import { Component } from '@angular/core';
import { Emitters } from './Emitters/emitters';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuth!:boolean;

      constructor(    
        private token :TokenService,
        private service :AuthService,
        private router:Router){
         
      }

 
}
