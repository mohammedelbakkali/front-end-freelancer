import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigService {
   api:string = "http://localhost:4000/"
   private authToken = localStorage.getItem('token');
  constructor(private _http:HttpClient) { }

  
   getcategory():Observable<any>{
     return this._http.get(this.api+"category");
   }

   getOnecategory(_id:any):Observable<any>{
    return this._http.get(this.api+"category/"+_id);
  }

  postGig(data:any):Observable<any>{
    
    
    return this._http.post('http://localhost:4000/post',data);
  }

  addPack(data:any):Observable<any>{
    return this._http.post(this.api+"pack",data);
  }

  pushDescription(data:any,id:any):Observable<any>{
    const a  = {description:data}
      return this._http.patch(this.api+"post/"+ id ,a);
  }


   //===================

      getAllGigsOFUser():Observable<any>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`
          })
        };
         
         return this._http.get('http://localhost:4000/users/profile/'+localStorage.getItem('id'),httpOptions)
      }

      getAllGigs():Observable<any>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`
          })
        };
         
         return this._http.get('http://localhost:4000/post',httpOptions)
      }

      getOneGigById(id:any):Observable<any>{
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.authToken}`
            })
          };  
          return this._http.get(this.api+"post/"+id, httpOptions);
      }

      getSubCategory(subCategoryId:any):Observable<any>{
         return this._http.get('http://localhost:4000/subcategory/'+subCategoryId);
      }



}
