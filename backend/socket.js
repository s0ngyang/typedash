const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const rooms = {};

io.on('connection', (socket) => {
  // Handle connection logic for each client here
  console.log(`User connected: ${socket.id}`);

  socket.on('createRoom', (data) => {
    console.log('Received room data:', data);
    const { id, challenge } = data;
    rooms[id] = {
      host: id,
      challenge,
      players: [id],
    };
    socket.join(id);
    socket.emit('roomCreated', {
      id,
      challenge,
    });
  });

  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      const room = rooms[roomId];
      if (room.players.length >= 3) {
        socket.emit('roomFull');
      }
      room.players.push(socket.id);
      socket.join(roomId);
      io.to(room.host).emit('playerJoined', socket.id);
      socket.emit('roomJoined', room.challenge);
      console.log(room.players);
    } else {
      socket.emit('invalidRoom');
    }
  });
});

const port = process.env.PORT || 3000; // Replace with your desired port number
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = io;
