import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Gig } from 'src/app/models/gig.model';
import { subCategory } from 'src/app/models/subCategory.model';
import { GigService } from 'src/app/services/gig.service';
// ph pe pes
@Component({
  selector: 'app-home-gigs',
  templateUrl: './home-gigs.component.html',
  styleUrls: ['./home-gigs.component.scss']
})
export class HomeGigsComponent {

   constructor(private gigService:GigService,private  gigservice: GigService , private router: Router){
    this.getCategory();
    this.gitAllgigs();
   }

   value = false;
   valueE = false;

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

   getCategory(){
    this.gigService.getcategory().subscribe({
      next : (res)=>{
         // console.log(res[0].name)
          
         for(let i = 0 ; i < res.length ; i++) {
           this.objetCategory.name = res[i].name;
           this.objetCategory._id = res[i]._id;
           this.categoryTable.push(this.objetCategory) ;
          //  console.log(this.categoryTable);
           this.objetCategory = {      name: '',  _id: ''}
           
         }
        
      },
      error:(err)=>{}
    })
   }

   subCategory(_id:any){
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

   gigTable:any[] = [];

   gig:Gig = {
    gigtitle:"",
    CategoryId:"",
    photo:"",
    subCategoryId:"",
    Positivekeywords:[]
  };
   
  gitAllgigs(){
    this.gigservice.getAllGigs().subscribe({
       next:(res)=>{
        
           for(let i = 0 ; i < res.length ; i++){

            console.log(res[i])
                   var a = {
                       gigtitle : res[i].gigtitle,
                       description : res[i].description,
                       status : res[i].status,
                       photo:"http://localhost:4000/"+res[i].photo,
                       category:res[i].CategoryId.name,
                       subCategory:res[i].subCategoryId.name,
                       nameUser:res[i].userId.fullname,
                       _id:res[i]._id,
                       namePack : res[i].packId[0].name,
                       pricePack : res[i].packId[0].price
                      //  packId:res[i].userId.packId[0].price



                   }
                  //  console.log(res[0].userId)
                   this.gigTable.push(a);

             
                    
           }
          //  console.log(this.gigTable)

       },
       error:(err)=>{
        console.log(err);
       }
    })
 }



goToDetail(itemId: string) {
  this.router.navigate(['/account/detail', itemId]);
}

gitPageBySubCategory(idSubCategory: string) {
  this.router.navigate(['/account/sub', idSubCategory]);
}


 
}
