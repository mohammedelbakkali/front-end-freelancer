import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set(data:any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('id',data.user._id);
  }

  handle(data:any){
        this.set(data);
  }

  getToken(){
     return localStorage.getItem('token');
  }

  getId(){
    return localStorage.getItem('id');
  }
  
   remove(){
      localStorage.removeItem('token');
   }
   
   decode(payload : any){
           const p =  JSON.parse(window.atob(payload))
           console.log(p)
           return p;
   }
  
    payload(token:any){
      const payload= token.split('.')[1];
      console.log('payload', payload);
      return this.decode(payload); 
    }
   
    isValid(){
      const token = this.getToken();
      const id = this.getId();
      if(token){
        const payload = this.payload(token);
         console.log("id ------- :",id);
         console.log("id ------- :",payload);


        if(payload){
           return id == payload._id;
        }
      }
      return false;
    }

    getInfos(){
      const token = this.getToken;
      if(token){
          const payload = this.payload(token);
          return payload ? payload : null;
      }
    
       return null;
    }

    loggedIn(){
      return this.isValid();
    }

    

}
