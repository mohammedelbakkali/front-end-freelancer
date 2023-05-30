import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { subCategory } from 'src/app/models/subCategory.model';
import { GigService } from 'src/app/services/gig.service';

@Component({
  selector: 'app-update-gig',
  templateUrl: './update-gig.component.html',
  styleUrls: ['./update-gig.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class UpdateGigComponent {
  gigId!:any;
  firstFormGroup!: FormGroup;
  constructor(  private route: ActivatedRoute ,
    private _formBuilder: FormBuilder ,
    private gigService:GigService,
    private toastr:ToastrService, 
    private  gigservice: GigService,){
      this.getCategory();

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gigId = params['id'];
      // Perform additional actions based on the item ID
     
    });
    this.firstFormGroup = this._formBuilder.group({
      gigtitle: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      keywords: ['', Validators.required]
  
    });
     
    this.getOneGig();
  

    
  }

  gigtitle!:string;
  category!:string;
  subCategory!:string;

  contentHtmlDes!:any

  faqArray:any[]=[]
  gig:any;
  // Category
  value! :string;
  //==================================================================
  getOneGig(){
    var faq;
     this.gigservice.getOneGigById(String(this.gigId)).subscribe({
           next :(res)=>{
       
               console.log(res.Faqs[0].question)
               faq = res.Faqs;


               this.gigtitle = res.gigtitle;
               this.category=res.CategoryId.name;
               this.value=res.CategoryId.name;
               this.subCategory=res.subCategoryId.name;


               this.gig  = {
                gigtitle:res.gigtitle,
                Category:res.CategoryId.name,
                photo:"http://localhost:4000/"+res.photo,
                subCategoryId:res.subCategoryId.name,
                Positivekeywords:res.Positivekeywords,
                description:res.description,
                nameUser:res.userId.fullname,
                username:res.userId.username,
                userLanguages:res.userId.languages,
                userSkills:res.userId.skills,
                userDescription:res.userId.description,
                userCreatedAt:res.userId.updatedAt.slice(0,10),
                packs:res.packId,
                userId:res.userId
               
               }

               var obj;

               for(let i = 0 ; i <res.Faqs.length; i++) {
                if(!res.Faqs.response){
                  res.Faqs.response="n'existe pas";
                }
                    obj = {
                      question:res.Faqs[i].question,
                      response:res.Faqs[i].response,  
                    }

                    this.faqArray.push(obj)
               }

            


             

               this.contentHtmlDes=res.description;
               //this function is to fix the bug where if the gig does not have multiple packs it will not show an error
                this.contentHtmlDes=res.description
              
            
                

               
    


           },
           error :(err)=>{
            console.log(err)
           }
     })
  }
  //================================================================




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

            console.log(this.subCategoryObjet)
        },
        error :(err)=>{
          console.log(err)
        }
     })
    }

  }

 


}
