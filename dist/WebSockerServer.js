"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWebSocketServer = void 0;
const websocket_1 = require("websocket");
const http_1 = __importDefault(require("http"));
class ChatWebSocketServer {
    constructor() {
        this.httpServer = http_1.default.createServer(function (request, response) {
            console.log(new Date() + " Received request for " + request.url);
            response.writeHead(404);
            response.end();
        });
        this.httpServer.listen(8080, function () {
            console.log(new Date() + " Server is listening on port 8080");
        });
        this.wsServer = new websocket_1.server({
            httpServer: this.httpServer,
            autoAcceptConnections: true,
        });
        this.wsServer.on("connect", (ws) => {
            console.log("A person has connected");
            ws.on("message", (data) => {
                console.log(`you received ${data.type === "utf8" && data.utf8Data}`);
                ws.send(JSON.stringify(`you have Received ${data.type === "utf8" && data.utf8Data}`));
            });
        });
        this.wsServer.on("close", () => {
            console.log("disconnected");
        });
    }
}
exports.ChatWebSocketServer = ChatWebSocketServer;
