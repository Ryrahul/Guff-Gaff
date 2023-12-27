"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = require("websocket");
const http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(function (request, response) {
    console.log(new Date() + " Received request for " + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log(new Date() + " Server is listening on port 8080");
});
const wsServer = new websocket_1.server({
    httpServer: server,
    autoAcceptConnections: true,
});
wsServer.on("connect", (ws) => {
    console.log("A person has connected");
    ws.on("message", (data) => {
        console.log(`you received ${data.type === "utf8" && data.utf8Data}`);
        ws.send(JSON.stringify(`you have Received ${data.type === "utf8" && data.utf8Data}`));
    });
});
wsServer.on("close", () => {
    console.log("disconnected");
});
