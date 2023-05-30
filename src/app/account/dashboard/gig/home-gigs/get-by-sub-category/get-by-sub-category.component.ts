import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GigService } from 'src/app/services/gig.service';

@Component({
  selector: 'app-get-by-sub-category',
  templateUrl: './get-by-sub-category.component.html',
  styleUrls: ['./get-by-sub-category.component.scss']
})
export class GetBySubCategoryComponent {

  itemId!:string;

constructor(private route: ActivatedRoute ,private gigService:GigService ){

  this.route.params.subscribe(params => {
    this.itemId = params['id'];
    // Perform additional actions based on the item ID
  });

  this.getSubCategoryById();

}

gigTable:any[] = [];


getSubCategoryById(){
  this.gigService.getSubCategory(this.itemId).subscribe({
     next:(res)=>{
        //  console.log(res.posts);

         for(let i = 0 ; i < res.posts.length ; i++){
          // console.log(res[i])
                 var a = {
                   
                     gigtitle : res.posts[i].gigtitle,
                     description : res.posts[i].description,
                     status : res.posts[i].status,
                     photo:"http://localhost:4000/"+res.posts[i].photo,
                     CategoryId:res.posts[i].CategoryId.name,
                     nameUser:res.posts[i].userId.fullname,
                     _id:res.posts[i]._id,
                     subCategoryId:res.posts[i].subCategoryId.name,


                 }
                //  console.log(res[0].userId)
                 this.gigTable.push(a);
                 console.log(this.gigTable)

           
                  
         }
     },
     error:()=>{}
  })
}



}
