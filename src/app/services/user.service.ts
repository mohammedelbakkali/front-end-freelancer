import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

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

  updatelan(data:any , id:any){
    return this._http.patch('http://localhost:4000/language/'+id,data);
 }

  deletelan(id:any){
    return this._http.delete('http://localhost:4000/language/'+id);
  }






}
