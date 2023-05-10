import { Component, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { language } from 'src/app/models/language.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit {
  showEdit!: boolean;
  subscription!: Subscription;
  panelOpenState = false;
  dispaly = true;
  value: boolean = true;
  valueForm1! : FormGroup; //form for each property
  valueForm2! : FormGroup;
  valueForm3! : FormGroup;
  user: User={
    fullname:'',
    username:'',
    email:'',
    dateOfBirth: new Date,
    gender: '',
    password: '',
    description:'',
  };
 





  constructor( 
    private userService: UserService,private _fb :FormBuilder ,
  ){
    this.valueForm1 = this._fb.group({
      description:''
    })

    this.valueForm2 = this._fb.group({
      name:'',
      level:'',
    })

    this.valueForm3 = this._fb.group({
      name:'',
      level:'',
    });

  }



  
  dispalyFunction()     //to enable the input to change the full name
  {
    this.dispaly=!this.dispaly;
  }
  

  arrayOfLang! :any[];
  idLanguage!:any;  //to get the id of the language selected

  id = localStorage.getItem('id')   //this is the user's id stored in localStorage

  ngOnInit(): void {
    this.userService.getProfile(localStorage.getItem('id')).subscribe({
      next:(res)=>{
          this.user ={
            fullname: res.user.fullname,
            username: res.user.username,
            email: res.user.email,
            dateOfBirth: res.user.dateOfBirth,
            gender: res.user.gender,
            password: res.user.password,
            description:res.user.description,
            languages:res.user.languages,
            skills:res.user.skills,
            education:res.user.education,
            certification:res.user.certification,

          }

          this.arrayOfLang =  res.user.languages;

          for(let i=0; i<this.arrayOfLang.length; i++) {
              console.log(this.arrayOfLang[i]);
              this.langObj.name =   this.arrayOfLang[i].name;
              this.langObj.level =   this.arrayOfLang[i].level;
              this.langObj.userId =   this.arrayOfLang[i].userId;
              this.langObj._id =   this.arrayOfLang[i]._id;
              this.languageStaticTable.push(this.langObj);
              this.langObj = {
                name: '',
                level:'',
                userId : '',
                _id:''
              }
          }
          
      },
      error:(err)=>{
         console.log(err)
      }
    })

  }

  
// =============================== DESCRIPTION ==================================
 
formDisplay:boolean = true; // to display the form


  UpdateData(){   //update description
    if(!this.valueForm1.valid){
      alert("Please enter a description");
      return ;
    }
  this.Data(this.valueForm1.value);
  }

  Data(desc: any) {
    this.userService.updateDesc(this.id, desc).subscribe(
      (res)=>{
        console.log('User profile updated successfully');
        console.log(res); // Log the updated user profile data
      },
      (err) => {
        console.log('Error updating user profile');
        console.log(err);
      }
    );
  }

// =============================== LANGUAGE ==================================
 
formDisplay1:boolean = true;  //to display the form
operationLang: boolean = true;

add='add'
update='update'

displayFormAdd(){
  this.formDisplay1=false;
  this.operationLang=true;
}
displayFormEdit(id:any){
  this.idLanguage = id;   //here we pass the id that we got of the language we want to edit/delete
  this.formDisplay1=false; //here we display the form
  this.operationLang =false; //and here we decide that we want to use the update method and not the add method
}


  languageStaticTable:language[] = []; //this is to make the data change without refreshing the page
  langObj:language = {
    name: '',
    level:'',
    userId : '',
    _id:''
  }


  addLang() {
    const obj={
      name :this.valueForm2.value.name,
      level:this.valueForm2.value.level,
      userId:this.id
    }

    this.userService.addlan(obj).subscribe(
      {
      
        next: (res)=>{
          this.langObj.name = this.valueForm2.value.name;
          this.langObj.level = this.valueForm2.value.level;
          this.langObj.userId = this.valueForm2.value.userId;

         this.languageStaticTable.push( this.langObj);
         this.langObj = {
          name: '',
          level:'',
          userId : '',
          _id:''
        }
          console.log(res);
        }
      }
    );
}


  updateLanguage(){
    return this.userService.updatelan(this.idLanguage,this.valueForm2.value).subscribe();
  }

  deleteLanguage(id: any){
    this.idLanguage = id;
    return this.userService.deletelan(this.idLanguage).subscribe();
  }
  

// =============================== SKILLS ==================================


  
}
