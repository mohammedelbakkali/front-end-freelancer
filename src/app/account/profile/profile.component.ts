import { Component, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  valueForm! : FormGroup;
  
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
    this.valueForm = this._fb.group({
      description:''
    })
  }

  
  dispalyFunction()
  {
    this.dispaly=!this.dispaly;
  }
  
  

  id = localStorage.getItem('id')

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
          
          
      },
      error:(err)=>{
         console.log(err)
      }
    })

  }

  UpdateData(){
    if(!this.valueForm.valid){
      alert("Please enter a description");
      return ;
    }
    const newDesc = {
      description: this.valueForm.value.description
    }

  this.addData(newDesc);
  }
  addData(desc: any) {
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

  
  
}
