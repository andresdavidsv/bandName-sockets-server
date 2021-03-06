
const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http Server
    this.server = http.createServer(this.app)

    //Config Socket
    this.io = socketio(this.server, {/*Config*/ });
  }
  configSockets() {
    new Sockets(this.io);
  }
  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')))
    this.app.use(cors());
  }
  execute() {
    this.middlewares();
    this.configSockets();
    this.server.listen(this.port, () => {
      console.log('Server Listenend at Port', this.port);
    });
  }
}

module.exports = Server;