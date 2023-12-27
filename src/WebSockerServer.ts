import { server as WebSocketServer } from "websocket";
import http from "http";
import { User } from "./User";

export class ChatWebSocketServer {
  private httpServer: http.Server;
  private wsServer: WebSocketServer;
  private users: Map<string, User>;
  private Setname(data: any, user: User) {
    user.userName = data.name`User ${user.userId} set their name to ${user.userName}`;
  }
  private SendMessage(data: any, user: User) {
    const receiver: User | undefined = this.users.get(data.receiverId);
    if (!receiver) {
      user.sendMessage(`User with ${data.receiverId} not found`);
    } else {
      receiver.sendPrivateMessage(receiver, data.message);
      console.log(`Message sent to ${receiver.userName} by ${user.userName}`);
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
            case "setMessage":
              this.SendMessage(data, user);
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
