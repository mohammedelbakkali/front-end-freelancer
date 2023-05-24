import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GigService } from 'src/app/services/gig.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-gig',
  templateUrl: './detail-gig.component.html',
  styleUrls: ['./detail-gig.component.scss']
})
export class DetailGigComponent implements OnInit {
  itemId!: string;

  constructor(
    private route: ActivatedRoute , 
    private  gigservice: GigService,
    private  userService: UserService,
    ) { 
  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      // Perform additional actions based on the item ID
    });
    this.getOneGig();
  }

  gig:any = {
    gigtitle:"",
    CategoryId:"",
    photo:"",
    subCategoryId:"",
    Positivekeywords:[],
    description:""
  };
  
  contentHtmlDes!:any;
 

  getOneGig(){
     this.gigservice.getOneGigById(String(this.itemId)).subscribe({
           next :(res)=>{

               console.log(res)
               this.gig  = {
                gigtitle:res.gigtitle,
                Category:res.CategoryId.name,
                photo:"http://localhost:4000/"+res.photo,
                subCategoryId:res.subCategoryId.name,
                Positivekeywords:res.Positivekeywords,
                description:res.description,
                nameUser:res.userId.fullname,
                username:res.userId.username,
                packs:res.packId,

               }

               this.contentHtmlDes=res.description;
           },
           error :(err)=>{
            // console.log(err)
           }
     })
  }
  
  


  
}
