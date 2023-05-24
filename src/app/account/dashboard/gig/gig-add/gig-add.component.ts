import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import { Pack } from 'src/app/models/pack.model';
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



    gig:Gig = {
      gigtitle:"",
      CategoryId:"",
      photo:"",
      subCategoryId:"",
      Positivekeywords:[]
    };
   
    //=============FORMS================

   firstFormGroup!: FormGroup;
   secondFormGroup!:FormGroup;
   FormGroup3!:FormGroup;
   FormPACK!:FormGroup;



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
      keywords: ['', Validators.required]
  
    });

  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });


  this.FormGroup3 = this._formBuilder.group({
    questionfaq:"",
    responsefaq:"",
    htmlContent:""

  });

  this.FormPACK = this._formBuilder.group({

    typeBASIC:'basic',
    nameBASIC:'',
    descriptionBASIC: '',
    deliveryTimeBASIC:'',
    priceBASIC:'',
    
    typeSTANDARD:'standard',
    nameSTANDARD:'',
    descriptionSTANDARD: '',
    deliveryTimeSTANDARD:'',
    priceSTANDARD:'',

    typePREMIUM:'premium',
    namePREMIUM:'',
    descriptionPREMIUM: '',
    deliveryTimePREMIUM:'',
    pricePREMIUM:'',


   
  });



  }

  setFAQvalue(){
     if(this.FormGroup3.valid){
      this.gigService.pushDescription(this.FormGroup3.value.htmlContent,this.postId).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
      
    
     }
  }

  

  displayPackage (){
    this.displayPackageValue != this.displayPackageValue;
 } 

 file!: File | null;

 onFileSelected(event: any) {
  this.file = event.target.files[0];
}

//====================== POST Gig=====================
  setData(){

     if(this.firstFormGroup.valid){
      if (!this.file) {
        console.log('Aucun fichier sélectionné');
        return;
      }
       const arrayTemp:any = [];

        var formData: any = new FormData();
        const userId = localStorage.getItem('id');
        console.log("======================> Id : ",userId);
       formData.append('gigtitle',this.firstFormGroup.value.gigtitle);
       formData.append('subCategoryId',this.firstFormGroup.value.subCategory);
       formData.append('CategoryId',this.firstFormGroup.value.category);
       formData.append('userId',userId);
       formData.append('photo',this.file);

      //  console.log(formData)
      // this.gig.gigtitle = this.firstFormGroup.value.gigtitle;
      // this.gig.subCategoryId = this.firstFormGroup.value.subCategory;
      // this.gig.CategoryId = this.firstFormGroup.value.category;
      // this.gig.photo = this.firstFormGroup.value.photo;

           for(let i = 0 ;i<this.fruits.length ;i++){

        arrayTemp[i]=JSON.stringify(this.fruits[i]);

      }
       //this.gig.Positivekeywords = arrayTemp ;

       
      this.gigService.postGig(formData).subscribe({
         next:(res)=>{
            //  console.log(res._id)
             this.postId=res._id;
         },
         error:(err)=>{
              console.log(err)
         }
      })
        // this.gigService.postGig()
   
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
      this.fruits.push({name: String(value)});
      
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
      this.fruits[index].name =value;
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

      //============================================Category============================================
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
          // console.log(res.subCategoryListId)
          var array;
          array =res.subCategoryListId;
          for(let i=0; i<array.length; i++){
              // console.log(array[i]._id)

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


//============================================Pack============================================
packs: Pack[] = [];
packObjet: Pack = {
  type: '',
  name:'', 
  description : '',
  deliveryTime:new Date(),
  price:0
    };

    postId:any;

    setDataPack(){
       if(this.FormPACK.valid){
        // console.log(this.isChecked);
           if(this.isChecked == false ){

             const t  = {
              type :this.FormPACK.value.typeBASIC,
              name :this.FormPACK.value.nameBASIC,
              description :this.FormPACK.value.descriptionBASIC,
              deliveryTime :this.FormPACK.value.deliveryTimeBASIC,
              price :this.FormPACK.value.priceBASIC,
              postId:this.postId
             }

            //  console.log(t)

            //  this.packs.push(t);
             this.gigService.addPack(t).subscribe({
                next:(res)=>{
                    console.log(res,"data a ete bien envoyé")
                },
                error:(err)=>{
                  console.log(err)
                }
             })

            
             this.packObjet= { type: '',name:'', description : '',deliveryTime:new Date(),price:0 };
             
             

        // this.gigService.addPack()
           }else{

           const c = {
              type :this.FormPACK.value.typeBASIC,
              name :this.FormPACK.value.nameBASIC,
              description :this.FormPACK.value.descriptionBASIC,
              deliveryTime :this.FormPACK.value.deliveryTimeBASIC,
              price :this.FormPACK.value.priceBASIC,
              postId:this.postId
             }

             this.packs.push(c);
            
       //==============================STANDARD===============================
           const  a = {
              type :this.FormPACK.value.typeSTANDARD,
              name :this.FormPACK.value.nameSTANDARD,
              description :this.FormPACK.value.descriptionSTANDARD,
              deliveryTime :this.FormPACK.value.deliveryTimeSTANDARD,
              price :this.FormPACK.value.priceSTANDARD,
              postId:this.postId
             }

             this.packs.push(a);
            
       //=============================================================
         const     b = {
              type :this.FormPACK.value.typePREMIUM,
              name :this.FormPACK.value.namePREMIUM,
              description :this.FormPACK.value.descriptionPREMIUM,
              deliveryTime :this.FormPACK.value.deliveryTimePREMIUM,
              price :this.FormPACK.value.pricePREMIUM,
              postId:this.postId

             }



             this.packs.push(b);
         

             
           }

              for(let i = 0; i < this.packs.length; i++){
                this.gigService.addPack(this.packs[i]).subscribe({
                  next:(res)=>{
                    
                      console.log(res,"data a ete bien envoyé")
                  },
                  error:(err)=>{
                    console.log(err)
                  }
               })
              }

              this.packs = [];
           
         
       }
    }



activePackage(){
  
   if(this.displayPackageValue==true){
    this.displayPackageValue = false;
   }else {
    this.displayPackageValue = true;
   }
}

  
}
