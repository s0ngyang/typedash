const app = require('express')();
const httpServer = require('http').createServer(app);
app.use(require('cors')());
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const crypto = require('crypto');
const randomID = () => crypto.randomBytes(8).toString('hex');

const rooms = {};

io.on('connection', (socket) => {
  socket.on('createRoom', (challenge) => {
    const roomID = randomID();
    rooms[roomID] = {
      challenge,
      players: [socket.id],
    };
    socket.roomID = roomID;
    socket.join(roomID);

    socket.emit('roomCreated', roomID);
    console.log(`room created, players: ${rooms[roomID].players}`);

    socket.emit('playerJoined', rooms[roomID].players);
  });

  socket.on('joinRoom', (roomID) => {
    // if room exists
    if (rooms[roomID]) {
      const room = rooms[roomID];
      if (room.players.includes(socket.id)) {
        return;
      }
      if (room.players.length >= 4) {
        socket.emit('roomFull');
        return;
      }
      room.players.push(socket.id);

      socket.join(roomID);
      socket.roomID = roomID;

      io.to(roomID).emit('playerJoined', room.players);
      console.log('player joined, players:', room.players);

      socket.emit('roomJoined', room.challenge);
    } else {
      socket.emit('invalidRoom');
    }
  });

  socket.on('disconnect', () => {
    if (rooms[socket.roomID]) {
      if (rooms[socket.roomID].players.length <= 1) {
        delete rooms[socket.roomID];
        console.log('delete, rooms:', rooms);
        io.to(socket.roomID).emit('playerLeft');
      } else {
        rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
          (id) => id !== socket.id,
        );
        io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);
        console.log('players left:', rooms[socket.roomID].players);
      }
    }
  });
});

const port = process.env.PORT || 3000; // Replace with your desired port number
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = io;
