import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
 
})
export class ChatComponent {
  message!: any;
  messages: any[] = [];

  // constructor(private chatService: ChatService) {
  //   chatService.getMessage().subscribe((message) => {
  //     this.messages.push(message);
  //   });
  // }
  
  @Input() 
  getData!:any;

  sendMessage() {

   const  data = {
        message: this.message,
 
    }

    this.chatService.sendMessage(data);
    this.message = '';
  }

  id$!: Observable<string>;
  chat!: Chat;
  currentUser = '001';
  idUser = localStorage.getItem('id');
  form: FormGroup;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(private fb: FormBuilder, private route: ActivatedRoute , private chatService: ChatService) {
    chatService.getMessage().subscribe((messageRes) => {
           
         
      console.log(messageRes)

      const message = {
        ...new Message(),
        ...{
          sendUser:'002',
          text: messageRes.message.text,
          ts: Math.floor(Date.now() / 1000)
        }
      }; 

               console.log("User recepteur  ",messageRes.message.userRes);
               console.log("User emitteur  ",this.idUser)
               this.chat.data.push(message);
              // if(messageRes.message.userRes==this.idUser){
                   
              // }
              
         
           
         
         

          //this.messages.push(message);
        });
    const dateSendingToServer = new DatePipe('en-US').transform(
      new Date(),
      'yyyy-MM-dd'
    );
    console.log(dateSendingToServer);
    this.form = this.fb.group({
      input: [dateSendingToServer]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id$ = params['id'];
      // Perform additional actions based on the item ID
    });
    // this.id$ = this.route.params.pipe(map(p => p.id));
    this.chat = CHAT;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSubmit() {

          


    const message = {
      ...new Message(),
      ...{
        sendUser: this.currentUser,
        userRes:this.getData,
        userEmit:this.idUser,
        text: this.form.value.input,
        ts: Math.floor(Date.now() / 1000)
      }
    };

    this.message=message;
    this.chat.data.push(message);
    this.sendMessage()
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}


// template: `
// <div>
//   <input [(ngModel)]="message" placeholder="Enter message" />
//   <button (click)="sendMessage()">Send</button>
// </div>
// <ul>
//   <li *ngFor="let msg of messages">{{ msg }}</li>
// </ul>

// `,



const CHAT = {
  id: '0',
  data: [
    {
      sendUser: '001',
      text: 'Hello',
      ts: 1622437560
    },
    {
      sendUser: '001',
      text: 'Morning!',
      ts: 1622437560
    },
    {
      sendUser: '002',
      text: 'Good!    QQ～',
      ts: 1622440800
    }
  ]
};

class Chat {
  id!: string;
  data!: Message[];
}

class Message {
  sendUser!: any;
  text!: string;
  ts!: number;
}