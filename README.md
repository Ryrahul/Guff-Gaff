# Guff Gaff

Guff Gaff is a backend for a proper chat application with private and group messaging using WebSockets. It provides a real-time communication between users.

## Features

- **WebSockets**: Uses WebSockets for real-time communication, allowing for instant messaging and updates.
- **Private Messaging**: Enables users to send private messages to each other.
- **Group Messaging**: Allows users to create and participate in group conversations.

## Getting Started

### Prerequisites

- Node.js version 18 or later

### Installation

1. Clone the repository:

```
git clone git@github.com:Ryrahul/Chat.git
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm run dev
```

## Usage

To use Guff Gaff, you can send WebSocket messages to the server. You can use a tool like Socket.IO or a programming language library to connect to the WebSocket server.

For example, to connect to the WebSocket server using Socket.IO, you can use the following code:

```javascript
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
```

## Contributing

Contributions are welcome!

## License

Guff Gaff is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
