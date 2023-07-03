const app = require('./app');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'https://main--cosmic-fox-2ad203.netlify.app',
    ],
    methods: ['GET', 'POST'],
  },
});

const crypto = require('crypto');
const randomID = () => crypto.randomBytes(8).toString('hex');

const rooms = {};

io.on('connection', (socket) => {
  // console.log(io.sockets.adapter.rooms);
  // console.log(sockets);
  // console.log(socket.rooms);
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on('createRoom', (challenge) => {
    const roomID = randomID();
    rooms[roomID] = {
      challenge: challenge,
      players: [],
      ready: [],
    };
    socket.emit('roomCreated', roomID);
  });

  socket.on('joinRoom', ({ roomID, username }) => {
    const room = rooms[roomID];
    // if room exists
    if (room) {
      if (room.players.length >= 4) {
        socket.emit('roomFull');
        return;
      }
      room.players.push({ id: socket.id, username: username });

      socket.join(roomID);
      socket.roomID = roomID;

      io.to(roomID).emit('playerJoined', {
        players: room.players,
        challenge: room.challenge,
      });
    } else {
      socket.emit('invalidRoom');
    }
  });

  socket.on('sendReady', (username) => {
    const room = rooms[socket.roomID];
    if (room.ready.length < room.players.length) {
      for (let index = 0; index < room.ready.length; index++) {
        const player = room.ready[index];
        if (player.id === socket.id) {
          return;
        }
      }
      room.ready.push({ id: socket.id, username: username });
      io.to(socket.roomID).emit('receiveReady', room.ready.length);
    }
  });

  socket.on('gameStart', () => {
    setInterval(() => {
      socket.to(socket.roomID).emit('progressUpdate', { playerId: socket.id });
    }, 1000);
  });

  socket.on('leaveRoom', () => {
    socket.leave(socket.roomID);
    rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
      (player) => player.id !== socket.id,
    );
    io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);

    rooms[socket.roomID].ready = rooms[socket.roomID].ready.filter(
      (player) => player.id !== socket.id,
    );
    io.to(socket.roomID).emit(
      'receiveReady',
      rooms[socket.roomID].ready.length,
    );
  });

  socket.on('typingProgress', ({ username, progress }) => {
    socket
      .to(socket.roomID)
      .emit('progressUpdate', { username: username, progress: progress });
  });

  socket.on('disconnect', () => {
    if (rooms[socket.roomID]) {
      if (rooms[socket.roomID].players.length <= 1) {
        delete rooms[socket.roomID];
        console.log('delete, rooms:', rooms);
        io.to(socket.roomID).emit('playerLeft', []);
      } else {
        rooms[socket.roomID].ready = rooms[socket.roomID].ready.filter(
          (player) => player.id !== socket.id,
        );
        io.to(socket.roomID).emit(
          'receiveReady',
          rooms[socket.roomID].ready.length,
        );

        rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
          (player) => player.id !== socket.id,
        );
        io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);
      }
    }
  });
});

module.exports = httpServer;
