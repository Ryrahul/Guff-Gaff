import { server as WebSocketServer } from "websocket";
import http from "http";

export class ChatWebSocketServer {
  private httpServer: http.Server;
  private wsServer: WebSocketServer;
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

    this.wsServer.on("connect", (ws) => {
      console.log("A person has connected");
      ws.on("message", (data) => {
        console.log(`you received ${data.type === "utf8" && data.utf8Data}`);
        ws.send(
          JSON.stringify(
            `you have Received ${data.type === "utf8" && data.utf8Data}`,
          ),
        );
      });
    });

    this.wsServer.on("close", () => {
      console.log("disconnected");
    });
  }
}
