import { connection } from "websocket";
import { uuid } from "uuidv4";

export class User {
  public userId: string;
  public userName: string | undefined;
  public connection: connection;

  constructor(connection: connection) {
    this.userId = uuid();
    this.userName = undefined;
    this.connection = connection;
  }
  public sendMessage(message: string) {
    this.connection.sendUTF(message);
  }

  public sendPrivateMessage(recipient: User, message: string) {
    this.connection.sendUTF(
      JSON.stringify({
        type: "privateMessage",
        data: {
          senderId: this.userId,
          senderName: this.userName || "Anonymous",
          message,
        },
      }),
    );
  }
}