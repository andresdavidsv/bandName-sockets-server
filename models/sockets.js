class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    // On Conecction
    this.io.on('connection', (socket) => {
      // Listen Event
      socket.on('msg-to-server', (data) => {
        console.log(data);
        //All clients
        this.io.emit('msg-from-server', data);
        // Only client that dispatch one event
        // socket.emit('msg-from-server', data);
      })
    });
  }
}

module.exports = Sockets;