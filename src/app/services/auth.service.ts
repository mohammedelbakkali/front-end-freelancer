import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    api:string = "http://localhost:4000/auth";
  constructor(private _http:HttpClient) { }

   signUp(data:User):Observable<any>{
       return this._http.post(`${this.api}/logup`,data);
   }
}
