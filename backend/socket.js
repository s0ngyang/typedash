const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const rooms = {}; // Object to store room state

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('createRoom', (data) => {
    console.log('Received room data:', data);
    rooms[data.id] = {
      users: [], // Array to store user details
      // ...other relevant room state properties
    };
    socket.emit('roomCreated', {
      id: data.id,
    });
  });

  socket.on('showChallenge', (arg) => {
    console.log(arg);
    // socket.to(socket.id).emit('showChallenge', {challenge})
  });

  socket.on('joinRoom', (data) => {
    socket.join(data.id);

    // Add user to the room state
    const user = {
      id: socket.id,
      username: 'Guest',
    };
    rooms[data.id].users.push(user);
    console.log(rooms[data.id].users);
  });

  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);

    // Remove user from the room state
    const room = rooms[roomName];
    if (room) {
      room.users = room.users.filter((user) => user.id !== socket.id);
    }
  });
});

const port = process.env.PORT || 3000; // Replace with your desired port number
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = io;
