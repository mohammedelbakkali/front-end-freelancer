import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { UserSignIn } from '../models/userSignIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    api:string = "http://localhost:4000/auth";
  constructor(private _http:HttpClient) { }

   signUp(data:User):Observable<any>{
       return this._http.post(`${this.api}/logup`,data);
   }

   signIn(data:UserSignIn):Observable<any>{
    return this._http.post(`${this.api}/login`,data);
}
  logOut():Observable<any>{
    return this._http.get(`${this.api}/signout`);
  }
}
