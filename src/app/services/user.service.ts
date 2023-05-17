import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _http : HttpClient) { }

  api : string  = "http://localhost:4000/users/profile";
  private authToken = localStorage.getItem('token');


  getProfile(id :any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this._http.get(this.api +"/"+id ,httpOptions);
  }


// =============================== DESCRIPTION SERVICE ==================================
  updateDesc(id :any, desc:  { description: string; } ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this._http.patch(this.api+"/"+id, desc , httpOptions);
  }

// =============================== LANGUAGE SERVICES ==================================
  addlan(data:any){
     return this._http.post('http://localhost:4000/language/',data);
  }

  updatelan(id:any ,data:any){
    return this._http.patch('http://localhost:4000/language/'+id,data);
 }

  deletelan(id:any){
    return this._http.delete('http://localhost:4000/language/'+id);
  }
// =============================== SKILL SERVICES ==================================
  addSkill(data:any){
    return this._http.post('http://localhost:4000/skill/',data);
  }

  updateSkill(id:any ,data:any){
    return this._http.patch('http://localhost:4000/skill/'+id,data);
  }

  deleteSkill(id:any){
    return this._http.delete('http://localhost:4000/skill/'+id);
  }
// =============================== EDUCATION SERVICES ==================================
  addEducation(data:any){
    return this._http.post('http://localhost:4000/education/',data);
  }

  updateEducation(id:any ,data:any){
    return this._http.patch('http://localhost:4000/education/'+id,data);
  }

  deleteEducation(id:any){
    return this._http.delete('http://localhost:4000/education/'+id);
  }

// =============================== CERTIFICATION SERVICES ==================================
addCertification(data:any){
  return this._http.post('http://localhost:4000/certification/',data);
}

updateCertification(id:any ,data:any){
  return this._http.patch('http://localhost:4000/certification/'+id,data);
}

deleteCertification(id:any){
  return this._http.delete('http://localhost:4000/certification/'+id);
}



}
