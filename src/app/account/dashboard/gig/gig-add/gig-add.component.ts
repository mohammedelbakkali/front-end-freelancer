import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GigService } from 'src/app/services/gig.service';
import { Category } from 'src/app/models/category.model';
import { subCategory } from 'src/app/models/subCategory.model';
import { Gig } from 'src/app/models/gig.model';
import {MatAccordion} from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
export interface Fruit {
  name: string;
}

export interface FAQ {
  num:number;
  question: string;
  response: string;
  inpt:string
}


@Component({
  selector: 'app-gig-add',
  templateUrl: './gig-add.component.html',
  styleUrls: ['./gig-add.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class GigAddComponent  implements OnInit{
  isChecked = false;
  
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor(private _formBuilder: FormBuilder ,
    private gigService:GigService,
    private toastr:ToastrService,

    ) {}
    categoryTable: Category[] = [];
    objetCategory: Category = {
      name: '',
      _id: ''
    };

    subCategoryTable : subCategory[]  = [];
    subCategoryObjet :subCategory = {
      name: '',
      _id: ''
    }
    gig:Gig = {
      gigtitle:"",
      CategoryId:"",
      subCategoryId:"",
      Positivekeywords:[]
    };
  
   firstFormGroup!: FormGroup;
   secondFormGroup!:FormGroup;
  FormGroup3!:FormGroup;
   displayPackageValue = true;
     faq:FAQ = {
      num:0,
      question:"",
      response:"",
      inpt:""
     };
     inpt=""

      numFAQ:number = 1;

     faqs:FAQ[] = [
    ];



    addFAQElement(){

              if(this.numFAQ<6){
                let a = {
                  num:this.numFAQ,
                  question:"question"+this.numFAQ,
                  response:"response"+this.numFAQ,
                  inpt: "valueInputs"+this.numFAQ
                 }
                this.faqs.push(a);
                this.numFAQ++;
              }else {
                this.toastr.warning("you have added the maximum of FAQs !!!");

              }
    }
    
  ngOnInit(): void {
    this.getCategory();
    this.firstFormGroup = this._formBuilder.group({
      gigtitle: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      keywords: ['', Validators.required],
  
    });

  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });


  this.FormGroup3 = this._formBuilder.group({
    questionfaq:"",
    responsefaq:"",
    htmlContent:""

  });
  }

  setFAQvalue(){
     if(this.FormGroup3.valid){
      console.log(this.FormGroup3.value);
    
     }
  }

  

  displayPackage (){
    this.displayPackageValue != this.displayPackageValue;
 } 

//====================== POST Gig=====================
  setData(){
     if(this.firstFormGroup.valid){

      this.gig.gigtitle = this.firstFormGroup.value.gigtitle;
      this.gig.subCategoryId = this.firstFormGroup.value.subCategory;
      this.gig.CategoryId = this.firstFormGroup.value.category;
      this.gig.Positivekeywords = this.firstFormGroup.value.keywords;
       
      this.gigService.postGig(this.gig).subscribe({
         next:(res)=>{
            console.log(res)
         }
      })
        // this.gigService.postGig()
       console.log(this.gig);
      //  console.log(this.fruits);
     }
  }
//===================================================
 
  isLinear = true;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
      console.log(this.fruits)
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  };

  name:any;

  // Category
  value! :string;
  

  getCategory(){
   this.gigService.getcategory().subscribe({
     next : (res)=>{
        // console.log(res[0].name)
         
        for(let i = 0 ; i < res.length ; i++) {
          this.objetCategory.name = res[i].name;
          this.objetCategory._id = res[i]._id;
          this.categoryTable.push(this.objetCategory) ;
          this.objetCategory = {      name: '',  _id: ''}

        }
       
     },
     error:(err)=>{}
   })
  }

  getOnecategory(_id:any){
    if(_id){
      this.subCategoryTable = [];
      this.gigService.getOnecategory(_id).subscribe({
        next:(res)=>{
          console.log(res.subCategoryListId)
          var array;
          array =res.subCategoryListId;
          for(let i=0; i<array.length; i++){
              console.log(array[i]._id)

              this.subCategoryObjet.name = array[i].name;
              this.subCategoryObjet._id = array[i]._id;
              this.subCategoryTable.push(this.subCategoryObjet) ;
              this.subCategoryObjet = {      name: '',  _id: ''}

          }
            //  if(res.subCategoryListId){
            //     console.log(res.subCategoryListId[0]._id)
            //  }
        },
        error :(err)=>{
          console.log(err)
        }
     })
    }

  }


//========================================================
activePackage(){
  
   if(this.displayPackageValue==true){
    this.displayPackageValue = false;
   }else {
    this.displayPackageValue = true;
   }
}
}
