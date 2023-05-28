import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  constructor(public _http : HttpClient) { }

  addreview(data:any){
  return this._http.post('http://localhost:4000/reviews/',data).subscribe({
       next:(res)=>{
        console.log(res);
       },
       error:(err)=>{
        console.log(err);
       }
  });
 }
}
