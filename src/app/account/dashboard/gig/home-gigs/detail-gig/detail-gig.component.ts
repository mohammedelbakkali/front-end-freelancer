import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gig } from 'src/app/models/gig.model';
import { GigService } from 'src/app/services/gig.service';

@Component({
  selector: 'app-detail-gig',
  templateUrl: './detail-gig.component.html',
  styleUrls: ['./detail-gig.component.scss']
})
export class DetailGigComponent implements OnInit {
  itemId!: string;

  constructor(private route: ActivatedRoute , private  gigservice: GigService ) { 
  
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      // Perform additional actions based on the item ID
    });
    this.gitOneGig();
    
  }

  a:any = {
    gigtitle:"",
    CategoryId:"",
    photo:"",
    subCategoryId:"",
    Positivekeywords:[],
    description:""
  };

  contentHtmlDes!:any;
 

  gitOneGig(){
     this.gigservice.getOneGigById(String(this.itemId)).subscribe({
           next :(res)=>{

               console.log(res)
               this.a  = {
                gigtitle:res.gigtitle,
                CategoryId:res.CategoryId.name,
                photo:"http://localhost:4000/"+res.photo,
                subCategoryId:res.subCategoryId,
                Positivekeywords:res.Positivekeywords,
                description:res.description,
               }

               console.log(res.photo)

               this.contentHtmlDes=res.description;
           },
           error :(err)=>{
            // console.log(err)
           }
     })
  }




  
}
