import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GigService } from 'src/app/services/gig.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from '../../../chat/chat.service';

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
    private serviceChat:ChatService,
    private router: Router
    ) { 
  
  }

  idUser = localStorage.getItem('id');

  CreateRoom(){
    const  obj = {
      userRecepteur:this.idOfUserGig,
      userEmetteur:this.idUser
    }
    this.serviceChat.createRoom(obj).subscribe({
       next:(res)=>{
           console.log(res);
           localStorage.setItem('roomId',res._id);
           this.navigateTo()
       },
       error:(err)=>{
           console.log(err);  
       }
    })
 }

 navigateTo(){
  this.router.navigate(['/account/dashboard/room']);
}

  idOfUserGig!:any;

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

              //  console.log(res)
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

               this.idOfUserGig = res.userId._id;

               this.contentHtmlDes=res.description;

              //  console.log(this.gig.packs)

           },
           error :(err)=>{
            // console.log(err)
           }
     })
  }
  
 


  
}
