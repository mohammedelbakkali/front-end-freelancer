import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ChatService } from '../chat/chat.service';
@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent {
  
 ROOM_LIST = [
  {
    id: '0',
    name: 'Room 1',
    members: [
      {
        id: '1',
        name: 'Collin',
        image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
      },
      {
        id: '2',
        name: 'David',
        image: 'https://image.flaticon.com/icons/png/512/219/219988.png'
      },
      {
        id: '3',
        name: 'Andy',
        image:
          'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png'
      }
    ]
  },
  {
    id: '1',
    name: 'Room 2',
    members: [
      {
        id: '2',
        name: 'David',
        image: 'https://image.flaticon.com/icons/png/512/219/219988.png'
      },
      {
        id: '3',
        name: 'Andy',
        image:
          'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png'
      }
    ]
  },
  {
    id: '3',
    name: 'Room 3',
    members: [
      {
        id: '1',
        name: 'Collin',
        image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
      },
      {
        id: '3',
        name: 'Andy',
        image:
          'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png'
      }
    ]
  },
  {
    id: '4',
    name: 'Room 4',
    members: [
      {
        id: '1',
        name: 'Collin',
        image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
      }
    ]
  },
  {
    id: '5',
    name: 'Room 4',
    members: [
      {
        id: '1',
        name: 'Collin',
        image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
      }
    ]
  },
  {
    id: '6',
    name: 'Room 4',
    members: [
      {
        id: '1',
        name: 'Collin',
        image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
      }
    ]
  }
  ,
  {
    id: '6',
    name: 'Room 4',
    members: [
      {
        id: '1',
        name: 'Collin',
        image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
      }
    ]
  }
];
 MEMBER_INFO = [
  {
    Id: 1,
    Name: 'Collin',
    Path: 'https://image.flaticon.com/icons/png/512/236/236831.png'
  },
  {
    Id: 2,
    Name: 'David',
    Path: 'https://image.flaticon.com/icons/png/512/219/219988.png'
  },
  {
    Id: 3,
    Name: 'Omaha',
    Path: 'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png'
  },
  {
    Id: 4,
    Name: 'Delta',
    Path: 'https://image.flaticon.com/icons/png/512/219/219970.png'
  }
];


  roomList$ = of(this.ROOM_LIST);
  idUser!:any
  constructor(private router: Router , private serviceChat:ChatService) {
    this.idUser = localStorage.getItem('id');

  }

  ngOnInit() {
    this.getRooms();
  }

  ArrayRooms:any = []
  
  getRooms(){

     this.serviceChat.getUserData(this.idUser).subscribe({
         next:(res)=>{
           var obj ={
            id: '',
            name: '',
            members:[
              {
                id: '',
                name: '',
                image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
              },
              {
                id: '',
                name: '',
                image: ''
              }
            ]
           }
          
          for(var i=0; i<res.rooms.length; i++){
            console.log(res.rooms[i].userEmetteur)
                obj = {
                  id: res.rooms[i]._id,
                  name: res.rooms[i].userRecepteur.fullname
                  , members:[
                    {
                      id: res.rooms[i].userRecepteur._id,
                      name: res.rooms[i].userRecepteur.fullname,
                      image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
                    },
                    {
                      id: res.rooms[i].userEmetteur._id,
                      name: res.rooms[i].userEmetteur._id,
                      image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
                    }
                  ]
                  
                }

                
                this.ROOM_LIST.push(obj);
                obj ={
                  id: '',
                  name: '',
                  members:[
                    {
                      id: '',
                      name: '',
                      image: 'https://image.flaticon.com/icons/png/512/236/236831.png'
                    },
                    {
                      id: '',
                      name: '',
                      image: ''
                    }
                  ]
                 }
          }
         
         },
         error:()=>{}
     })
  }

  navigateTo(id: string) {
    this.router.navigate(['/account/dashboard/room', id]);
  }
  

}



export class Room {
  id!: string;
  name!: string;
  members!: Member[];
}

export class Member {
  id!: string;
  name!: string;
  image!: string;
}

