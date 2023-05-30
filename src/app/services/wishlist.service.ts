import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _http: HttpClient) { }

  addWishlist(data:any) { 
    return this._http.post('http://localhost:4000/wishlist/',data);
  }
  getWishlist():Observable<any>{
     return this._http.get('http://localhost:4000/wishlist/')
  }
  deleteWishlist(id:any){
    return this._http.delete('http://localhost:4000/wishlist/'+id);
  }
}
