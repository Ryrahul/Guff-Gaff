import { server as WebSocketServer } from "websocket";
import http from "http";
import { User } from "./User";

export class ChatWebSocketServer {
  private httpServer: http.Server;
  private wsServer: WebSocketServer;
  private users: Map<string, User>;
  private rooms: Map<string, Set<User>>;
  private Setname(data: any, user: User) {
    user.userName=data.name
    console.log(`User ${user.userId} set their name to ${user.userName}`);
  }
  private SendMessage(data: any, user: User) {
    const receiver: User | undefined = this.users.get(data.receiverId);
    if (!receiver) {
      user.sendMessage(`User with ${data.receiverId} not found`);
    } else {
      receiver.sendPrivateMessage(user, data.message);
      console.log(`Message sent to ${receiver.userName} by ${user.userName}`);
    }
  }
  private JoinRoom(data:any,user:User){
    const room=data.room
    user.rooms.push(room)
    if(!this.rooms.has(room)){
      this.rooms.set(room,new Set())
      console.log(`New Room created with user ${user.userName}`)
    }
    else {
      this.rooms.get(room)?.add(user)
      console.log(`${user.userName} joined the ${room}`)
    }
  }
  private LeaveRoom(data:any,user:User){
    const room=data.room
    if(this.rooms.has(room)){
      this.rooms.get(room)?.delete(user)

  }
  user.rooms.filter((userRoom)=>userRoom!=room)
}
private GroupMessage(data:any,user:User){
  const room=data.room
  console.log(room)
  if(this.rooms.has(room)){
    const RoomUsers=this.rooms.get(room)
    RoomUsers?.forEach((roomUser)=>{
      if(roomUser!=user){
        console.log(`Message sent by ${user.userName} to ${room}:${data.message}`)
      }
            console.log(`Group message sent in room ${room} by ${user.userName}`);
    })
  }
}
  constructor() {
    this.httpServer = http.createServer(function (request, response) {
      console.log(new Date() + " Received request for " + request.url);
      response.writeHead(404);
      response.end();
    });
    this.httpServer.listen(8080, function () {
      console.log(new Date() + " Server is listening on port 8080");
    });
    this.wsServer = new WebSocketServer({
      httpServer: this.httpServer,
      autoAcceptConnections: true,
    });
    this.users = new Map();
    this.rooms=new Map()

    this.wsServer.on("connect", (ws) => {
      const user = new User(ws);
      this.users.set(user.userId, user);
      console.log(`A person wiht id ${user.userId} connected`);
      ws.on("message", (message) => {
        if (message.type === "utf8" && typeof message.utf8Data === "string") {
          const data = JSON.parse(message.utf8Data);
          switch (data.type) {
            case "setName":
              this.Setname(data, user);
              break;
            case "sendMessage":
              this.SendMessage(data, user);
              break;
            case "JoinRoom":
              this.JoinRoom(data,user)
              break;
            case "LeaveRoom":
              this.LeaveRoom(data,user)
              break;
            case "GroupMessage":
              this.GroupMessage(data,user)
              break;
          }
        }
      });
    });

    this.wsServer.on("close", () => {
      console.log("disconnected");
    });
  }
}
