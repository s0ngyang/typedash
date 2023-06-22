const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // Handle connection logic for each client here
  console.log(`User connected: ${socket.id}`);

  socket.on('createRoom', (data) => {
    console.log('Received room data:', data);
    socket.emit('roomCreated', {
      url: `https://typedash.com/multiplayer/${data.id}`,
    });
  });
});

const port = process.env.PORT || 3000; // Replace with your desired port number
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = io;
