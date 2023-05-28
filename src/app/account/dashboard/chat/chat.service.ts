import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  api:string = "http://localhost:4000";
  constructor(private socket: Socket,private _http:HttpClient) {}

  sendMessage(message: any) {
    this.socket.emit('chat message', message);
  }

  getMessage() {
    return this.socket.fromEvent<any>('chat message');
  }

  createRoom(data:any):Observable<any>{
      return this._http.post("http://localhost:4000/room",data);
  }

  getRooms(idRoom:any):Observable<any>{
     return this._http.get(`http://localhost:4000/${idRoom}`);
  }

}