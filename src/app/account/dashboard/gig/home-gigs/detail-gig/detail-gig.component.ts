import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GigService } from 'src/app/services/gig.service';
import { loadStripe} from '@stripe/stripe-js'
import { UserService } from 'src/app/services/user.service';
import { ChatService } from '../../../chat/chat.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-detail-gig',
  templateUrl: './detail-gig.component.html',
  styleUrls: ['./detail-gig.component.scss']
})
export class DetailGigComponent implements OnInit {
  itemId!: string;
  id = localStorage.getItem('id')
  displayReviewVar : boolean = false;
  packOne: any={};
  packTwo: any={};
  packThree: any={};
  x:boolean = true;
  constructor(
    private route: ActivatedRoute , 
    private  gigservice: GigService,
    private  userService: UserService,
    private serviceChat:ChatService,
    private router: Router,
    private elementRef: ElementRef,
    private http:HttpClient
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
  reviews:any[]=[];
  rating:any[]=[];
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
                userLanguages:res.userId.languages,
                userSkills:res.userId.skills,
                userDescription:res.userId.description,
                userCreatedAt:res.userId.updatedAt.slice(0,10),
                packs:res.packId,
                userId:res.userId
               
               }

               this.idOfUserGig = res.userId._id;

               this.contentHtmlDes=res.description;
               //this function is to fix the bug where if the gig does not have multiple packs it will not show an error
                if(! (this.gig.packs[1]) && !(this.gig.packs[2])){
                  this.x= false
                  this.packOne =this.gig.packs[0]
                }
                else{
                  this.x= true
                  this.packOne =this.gig.packs[0]
                  this.packTwo = this.gig.packs[2]
                  this.packThree = this.gig.packs[1]
                }
                this.contentHtmlDes=res.description
              
                this.reviews=res.reviews;
                

               
                //this function is to hide the review if the user already reviews the seller
                for(var i = 0; i <this.reviews.length; i++){
                  if(this.id==this.reviews[i].userId){
                      this.displayReviewVar =true
                  }
                }
                //the owner of the gig does not have the permission to rate his gig
                if( this.gig.userId._id ==this.id){
                  this.displayReviewVar =true
                }

                this.calculReviewsTotal()


           },
           error :(err)=>{
            console.log(err)
           }
     })
  }
  

  summ:number = 0;
  reviewsTotal:number = 0
  calculReviewsTotal (): void {
    this.summ = 0 
    for( let i = 0; i < this.reviews.length ; i++){
      this.summ += this.reviews[i].rating
    }
    this.reviewsTotal = this.summ / this.reviews.length 
  }
  
// ===============STRIPE==================================================
  onCheckout(product: any):void{
   
    this.http.post('http://localhost:4000/checkout',{
      order: product
    }).subscribe(async(res:any)=>{
      let stripe =await loadStripe('pk_test_51ND7qgBU1CNygU20iQvLfsJmH5xbmW1nQ97TuNaLSQP39i7sMEKcE90TcYLXdcy8SgswyHxivezzKylot8C2lfiN00eaIRCVmF')
      stripe?.redirectToCheckout({ 
        sessionId: res.id
      })
    })
  }

  
}
