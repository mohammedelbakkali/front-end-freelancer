import { Component, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { language } from 'src/app/models/language.model';
import { skill } from 'src/app/models/skill.model';
import { education } from 'src/app/models/education.model';
import { certification } from 'src/app/models/certification.model';
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
  valueForm4! : FormGroup;
  valueForm5! : FormGroup;
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
    private userService: UserService,
    private _fb :FormBuilder ,
  ){
    // the forms for each property
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
    this.valueForm4 = this._fb.group({
      country:'',
      college:'',
      title:'',
      major:'',
      year:''
    });
    this.valueForm5 = this._fb.group({
      certificate:'',
      from:'',
      year:''
    });

  }



  
  dispalyFunction()     //to enable the input to change the full name
  {
    this.dispaly=!this.dispaly;
  }
  

  arrayOfLang! :any[];
  arrayOfSkills!: any[];
  arrayOfEducation!: any[];
  arrayOfCertifications!: any[];

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
            certifications:res.user.certifications,

          }

          this.arrayOfLang =  res.user.languages;
          for(let i=0; i<this.arrayOfLang.length; i++) {
              this.langObj.name =   this.arrayOfLang[i].name;
              this.langObj.level =   this.arrayOfLang[i].level;
              this.langObj.userId =   this.arrayOfLang[i].userId;
              this.langObj._id =   this.arrayOfLang[i]._id;
              this.languageStaticTable.push(this.langObj); //filling the 'languageStaticTable' with the data in the DB 
              this.langObj = {
                name: '',
                level:'',
                userId : '',
                _id:''
              }
          }

          this.arrayOfSkills = res.user.skills;
          for(let i=0; i<this.arrayOfSkills.length; i++) {
            this.skillObj.name =   this.arrayOfSkills[i].name;
            this.skillObj.level =   this.arrayOfSkills[i].level;
            this.skillObj.userId =   this.arrayOfSkills[i].userId;
            this.skillObj._id =   this.arrayOfSkills[i]._id;
            this.skillsStaticTable.push(this.skillObj);   
            this.skillObj = {
              name: '',
              level:'',
              userId : '',
              _id:''
            }
          }
          
          this.arrayOfEducation = res.user.education;
          for(let i=0; i<this.arrayOfEducation.length; i++) {
            this.educObj.country =   this.arrayOfEducation[i].country;
            this.educObj.college =   this.arrayOfEducation[i].college;
            this.educObj.title =   this.arrayOfEducation[i].title;
            this.educObj.major =   this.arrayOfEducation[i].major;
            this.educObj.year =   this.arrayOfEducation[i].year;
            this.educObj.userId =   this.arrayOfEducation[i].userId;
            this.educObj._id =   this.arrayOfEducation[i]._id;
            this.educationStaticTable.push(this.educObj);   
            this.educObj = {
              country: '',
              college:'',
              title:'',
              major:'',
              year : 2016,
              userId : '',
              _id:''
            }
          }

          this.arrayOfCertifications = res.user.certification;
          for(let i=0; i<this.arrayOfCertifications?.length; i++) {
            this.certifObj.certificate =   this.arrayOfCertifications[i].country;
            this.certifObj.from =   this.arrayOfCertifications[i].college;
            this.certifObj.year =   this.arrayOfCertifications[i].year;
            this.certifObj.userId =   this.arrayOfCertifications[i].userId;
            this.certifObj._id =   this.arrayOfCertifications[i]._id;
            this.certificationStaticTable.push(this.certifObj);   
            this.certifObj = {
              certificate: '',
              from:'',
              year : 2016,
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

  
// =============================== DESCRIPTION ===============================================
 
formDisplay1:boolean = true; // to display the form


  UpdateData(){   //update description
    if(!this.valueForm1.valid){
      alert("Please enter a description");
      return ;
    }
  this.updateData(this.valueForm1.value);
  }

  updateData(desc: any) {
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

// =============================== LANGUAGE ==================================================
 
formDisplay2:boolean = true;  //to display the form

operationLang: boolean = true;

add='add'
update='update'

displayFormAdd2(){
  this.formDisplay2=false;
  this.operationLang=true;
}







  languageStaticTable:language[] = []; //this is to make the data change without refreshing the page
  langObj:language = {
    name: '',
    level:'',
    userId : '',
    _id:''
  }
 



  addLang() {

    if(!this.valueForm2.valid){
      alert("Please enter valid values");
      return ;
    }
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

  idLanguage!:any;  //to get the id of the language selected
  selectedItem: any = {};
  displayFormEdit(id: any ,language:language){
    this.idLanguage = String(id);   //here we pass the id that we got of the language we want to edit/delete
    this.selectedItem = { ...language , value: this.idLanguage  }; // here we make a copy of the selected language to populate the input with the language selected
    this.formDisplay2=false; //here we display the form
    this.operationLang =false; //and here we decide that we want to use the update method and not the add method
  }

  updateLanguage(id :any){
    return this.userService.updatelan(id ,this.valueForm2.value).subscribe(
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

  deleteLanguage(id: any){
    this.idLanguage = id;
    return this.userService.deletelan(this.idLanguage).subscribe({
      next: ()=>{
        const indexToRemove = this.languageStaticTable.findIndex(element => element._id === id);
        if (indexToRemove !== -1) {
          this.languageStaticTable.splice(indexToRemove, 1);
        }
      }
    }
    );
  }
  

// =============================== SKILLS ======================================================
  formDisplay3:boolean = true;  //to display the add form
  operationLang3: boolean = true; 

  skillsStaticTable:skill[] = [];
  skillObj:skill = {
    name: '',
    level:'',
    userId : '',
    _id:''
  }
  displayFormAdd3(){
    this.formDisplay3=false;
    this.operationLang3=true;
  }
  addSkill(){
    if(!this.valueForm3.valid){
      alert("Please enter valid values");
      return ;
    }
    const obj={
      name:this.valueForm3.value.name,
      level:this.valueForm3.value.level,
      userId:this.id
    }
    this.userService.addSkill(obj).subscribe(
      {     
        next: ()=>{
          this.skillObj.name = this.valueForm3.value.name;
          this.skillObj.level = this.valueForm3.value.level;
          this.skillObj.userId = this.valueForm3.value.userId;

         this.skillsStaticTable.push( this.skillObj);
         this.skillObj = {
            name: '',
            level:'',
            userId : '',
            _id:''
          }
        }
      }
    );
  }
  idSkill!:any;  //to get the id of the language selected
  selectedItemSkill: any = {};
  displayFormEdit1(id: any ,skill:skill){
    this.idSkill = String(id);   //here we pass the id that we got of the language we want to edit/delete
    this.selectedItemSkill = { ...skill , value: this.idSkill  }; // here we make a copy of the selected language to populate the input with the language selected
    this.formDisplay3=false; //here we display the form
    this.operationLang =false; //and here we decide that we want to use the update method and not the add method
  }
  updateSkill(id : any ){
    console.log(id)
    return this.userService.updateSkill(id ,this.valueForm3.value).subscribe(
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
  
  deleteSkill(id: any){
    this.idSkill = id;
    return this.userService.deleteSkill(this.idSkill).subscribe({
      next: ()=>{
        const indexToRemove = this.skillsStaticTable.findIndex(element => element._id === id);
        if (indexToRemove !== -1) {
          this.skillsStaticTable.splice(indexToRemove, 1);
        }
      }
  });
  }
// =============================== EDUCATION ===================================================
  formDisplay4:boolean = true;  //to display the form
  displayFormAd4(){
    this.formDisplay4=false;
    this.operationLang=true;
  }

  educationStaticTable:education[] = [];
  educObj:education = {
    country: '',
    college:'',
    title:'',
    major:'',
    year : 2016,
    userId : '',
    _id:''
  }
  addEducation(){
    if(!this.valueForm4.valid){
      alert("Please enter valid values");
      return ;
    }
    const obj={
      country :this.valueForm4.value.country,
      college:this.valueForm4.value.college,
      title: this.valueForm4.value.title,
      major:this.valueForm4.value.major,
      year:this.valueForm4.value.year,
      userId:this.id
    }
    this.userService.addEducation(obj).subscribe(
      {        
        next: (res)=>{
          this.educObj.country = this.valueForm4.value.country;
          this.educObj.college = this.valueForm4.value.college,
          this.educObj.title = this.valueForm4.value.title,
          this.educObj.major = this.valueForm4.value.major,
          this.educObj.year = this.valueForm4.value.year,
          this.educObj.userId = this.valueForm4.value.userId;

         this.educationStaticTable.push( this.educObj);
         this.educObj = {
            country: '',
            college:'',
            title:'',
            major:'',
            year : 2016,
            userId : '',
            _id:''
          }
        }
      }
    );
  }
  idEducation!:any; 
  selectedItemEduc: any = {};
  displayFormEdit2(id: any ,educ:education){
    this.idEducation = String(id);   //here we pass the id that we got of the language we want to edit/delete
    this.selectedItemEduc = { ...educ , value: this.idEducation }; // here we make a copy of the selected language to populate the input with the language selected
    this.formDisplay4=false; //here we display the form
    this.operationLang =false; //and here we decide that we want to use the update method and not the add method
  }
  updateEducation(id : any ){
    return this.userService.updateEducation(id ,this.valueForm4.value).subscribe(
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
  deleteEducation(id: any){
    this.idEducation = id;
    return this.userService.deleteEducation(this.idEducation).subscribe({
        next: ()=>{
          const indexToRemove = this.educationStaticTable.findIndex(element => element._id === id);
          if (indexToRemove !== -1) {
            this.educationStaticTable.splice(indexToRemove, 1);
          }
        }
    });
  }
// =============================== CERTIFICATION ===============================================
  formDisplay5:boolean = true;  //to display the form
  displayFormAd5(){
    this.formDisplay5=false;
    this.operationLang=true;
  }
  certificationStaticTable:certification[] = [];
  certifObj:certification = {
    certificate: '',
    from:'',
    year : 2016,
    userId : '',
    _id:''
  }
  addCertification(){
    if(!this.valueForm5.valid){
      alert("Please enter valid values");
      return ;
    }
    const obj={
      certificate :this.valueForm5.value.certificate,
      from:this.valueForm5.value.from,
      year: this.valueForm5.value.year,
      userId:this.id
    }
    this.userService.addCertification(obj).subscribe(
      {        
        next: (res)=>{
          this.certifObj.certificate = this.valueForm5.value.certificate;
          this.certifObj.from = this.valueForm5.value.from,
          this.certifObj.year = this.valueForm5.value.year,
          this.certifObj.userId = this.valueForm5.value.userId;

         this.certificationStaticTable.push( this.certifObj);
         this.certifObj = {
          certificate: '',
          from:'',
          year : 2016,
          userId : '',
          _id:''
          }
        }
      }
    );
  }
  idCertification!:any; 
  selectedItemCertif: any = {};
  displayFormEdit3(id: any ,certif:certification){
    this.idCertification = String(id);   //here we pass the id that we got of the language we want to edit/delete
    this.selectedItemCertif = { ...certif , value: this.idCertification }; // here we make a copy of the selected language to populate the input with the language selected
    this.formDisplay5=false; //here we display the form
    this.operationLang =false; //and here we decide that we want to use the update method and not the add method
  }
  updateCertification(id : any ){
    return this.userService.updateCertification(id ,this.valueForm5.value).subscribe(
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
  deleteCertification(id: any){
    this.idCertification = id;
    return this.userService.deleteCertification(this.idCertification).subscribe({
        next: ()=>{
          const indexToRemove = this.certificationStaticTable.findIndex(element => element._id === id); 
          //searching in the table for the element with the specified id and we need to find his "[i]"
          if (indexToRemove !== -1) {
          //if the result of findIndex is other than -1 means that we found the element
          //we remove the element from the table
            this.certificationStaticTable.splice(indexToRemove, 1);
          }
        }
    });
  }




}
