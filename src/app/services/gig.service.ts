import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigService {
   api:string = "http://localhost:4000/"
  constructor(private _http:HttpClient) { }

  
   getcategory():Observable<any>{
     return this._http.get(this.api+"category");
   }

   getOnecategory(_id:any):Observable<any>{
    return this._http.get(this.api+"category/"+_id);
  }

  postGig(data:any):Observable<any>{
    return this._http.get(this.api+"post",data);
  }




}
