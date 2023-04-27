import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Diplome {
  value: string;
  viewValue: string;
}

interface Mention {
  value: string;
  viewValue: string;
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

  educations: Diplome[] = [
    {value: 'experience', viewValue: 'licence'},
    {value: 'master', viewValue: 'master'},
    {value: 'ingénieure', viewValue: 'ingénieure'},
  ];

  mentions : Mention[] = [
    {value: 'passable', viewValue: 'passable'},
    {value: 'assez_bien', viewValue: 'assez bien'},
    {value: 'mention_bien', viewValue: 'mention bien'},
    {value: 'mention_très_bien', viewValue: 'mention très bien'},
  ];

    
  constructor(
    private _fb :FormBuilder ,
    private _dialogRef:MatDialogRef<SinginComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
   this.empForm = this._fb.group({
     
         firstName:'',
         lastName:'',
         email:'',
         dateOfBirth:'',
         gender:'',
         education:'',
         mention:'',
         salary:'',
         experience:''
   })
  }
}
