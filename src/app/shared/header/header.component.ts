import { Component } from '@angular/core';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupComponent } from 'src/app/signup/signup.component';



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
  filmIcon = faWandMagicSparkles;
  formGroup! : FormGroup;

  constructor( private _fb :FormBuilder ){}
  cities!: City[];

  selectedCity!: City;

  ngOnInit() {

  }

  
}
