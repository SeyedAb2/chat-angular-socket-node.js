import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  roomID?: string;
  messageText?:string;
  messageArray : {user:string, message:string}[] = [];
  phone?:string;
  selectedUser:any;
  currentUser:any;
  userList = [
    {
      id:1,
      name:"بابک مرادی",
      phone:"09121002030",
      image: "assets/user/user-1.jpg",
      roomId:{
        2:'room-1',
        3:'room-2',
        4:'room-3',
        5:'room-4',
      }
    },
    {
      id:2,
      name:"سیامک انصاری",
      phone:"09121002031",
      image: "assets/user/user-2.jpg",
      roomId:{
        1:'room-1',
        3:'room-4',
        4:'room-5',
        5:'room-6',
      }
    },
    {
      id:3,
      name:"مرحوم عبید زاکانی",
      phone:"09121002032",
      image: "assets/user/user-3.jpg",
      roomId:{
        1:'room-7',
        2:'room-3',
        4:'room-5',
        5:'room-6',
      }
    },
    {
      id:4,
      name:"پرزیدنت جوبایدن",
      phone:"09121002033",
      image: "assets/user/user-4.png",
      roomId:{
        1:'room-8',
        2:'room-7',
        3:'room-1',
        5:'room-4',
      }
    },
    {
      id:5,
      name:"آنجلیا جولی",
      phone:"09121002034",
      image: "assets/user/user-5.jpg",
      roomId:{
        1:'room-3',
        2:'room-2',
        3:'room-8',
        4:'room-5',
      }
    }
  ];
  constructor(private chatService: ChatService){
    this.chatService.getMessage().subscribe(
      (data:{user:string,message:string})=>{
        this.messageArray.push(data);
      }
    )
  }
  ngOnInit() : void{
    this.currentUser = this.userList[0];
  }

  selectUserHandler(phone:string):void {
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.roomID = this.selectedUser.roomID[this.selectedUser.id];
    this.messageArray = [];
    this.join(this.currentUser.name,this.roomID);
  }
  join(username:string , roomId:string | undefined):void{
    this.chatService.joinRoom({user:username, roomId:roomId});
  }
  sendMessage():void{
    this.chatService.sendMessage({
      data:this.currentUser.name,
      room:this.roomID,
      message:this.messageText
    })
    this.messageText = "";
  }
}
