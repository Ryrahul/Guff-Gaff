import { connection } from "websocket";
import { v4 as uuidv4 } from "uuid";
export class User {
  public userId: string;
  public userName: string | undefined;
  public connection: connection;
    public rooms: string[];

  constructor(connection: connection) {
    this.userId = uuidv4();
    this.userName = undefined;
    this.connection = connection;
    this.rooms=[]
    
  }
  public sendMessage(message: string) {
    if(this.connection.connected){
      console.log("yes is connected")
    this.connection.sendUTF(message);
    }
  else{
    console.log("not connected")
  }
  }

  public sendPrivateMessage(sender: User, message: string) {
    if(this.connection.connected){
      console.log("yes is connected")
    this.connection.sendUTF(
      JSON.stringify({
        type: "privateMessage",
        data: {
          senderId: sender.userId,
          senderName: sender.userName || "Anonymous",
          message,
        },
      }),
    );
  }
  else(
    console.log("Not connected")
  )
}

}
