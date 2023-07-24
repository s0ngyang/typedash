const app = require('./app');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'https://main--cosmic-fox-2ad203.netlify.app',
      'https://feature-multiplayer--cosmic-fox-2ad203.netlify.app',
    ],
    //methods: ['GET', 'POST'],
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
      challenge,
      players: [],
      ready: [],
      rankings: {},
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
      room.players.push({ id: socket.id, username });

      socket.join(roomID);
      socket.roomID = roomID;

      io.to(roomID).emit('playerJoined', {
        ready: room.ready.length,
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
      room.ready.push({ id: socket.id, username });
      io.to(socket.roomID).emit('receiveReady', room.ready.length);
      socket.emit('restartTest');
    }
  });

  socket.on('typingProgress', (progress) => {
    io.to(socket.roomID).emit('progressUpdate', {
      id: socket.id,
      progress,
    });
  });

  socket.on('testCompleted', (randomChallenge) => {
    rooms[socket.roomID].rankings[socket.id] =
      Object.keys(rooms[socket.roomID].rankings).length + 1;
    io.to(socket.roomID).emit('playerCompleted', rooms[socket.roomID].rankings);
    if (
      Object.keys(rooms[socket.roomID].rankings).length ===
      rooms[socket.roomID].players.length
    ) {
      rooms[socket.roomID] = {
        ...rooms[socket.roomID],
        challenge: randomChallenge(challenge.type),
        ready: [],
        rankings: {},
      };
      io.to(socket.roomID).emit('allCompleted', rooms[socket.id].challenge);
    }
  });

  socket.on('leaveRoom', () => {
    socket.leave(socket.roomID);
    if (!rooms[socket.roomID]) {
      return;
    }
    if (rooms[socket.roomID].players.length <= 1) {
      console.log('delete room');
      delete rooms[socket.roomID];
      io.to(socket.roomID).emit('playerLeft', []);
    } else {
      // Minus one ready player
      rooms[socket.roomID].ready = rooms[socket.roomID].ready.filter(
        (player) => player.id !== socket.id,
      );
      io.to(socket.roomID).emit(
        'receiveReady',
        rooms[socket.roomID].ready.length,
      );
      // Minus one player
      rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
        (player) => player.id !== socket.id,
      );
      io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);

      if (
        Object.keys(rooms[socket.roomID].rankings).length ===
        rooms[socket.roomID].players.length
      ) {
        io.to(socket.roomID).emit('allCompleted');
        rooms[socket.roomID] = {
          ...rooms[socket.roomID],
          ready: [],
          rankings: {},
        };
      }
    }
  });

  socket.on('disconnect', () => {
    if (rooms[socket.roomID]) {
      if (rooms[socket.roomID].players.length <= 1) {
        delete rooms[socket.roomID];
        io.to(socket.roomID).emit('playerLeft', []);
      } else {
        // Minus one ready player
        rooms[socket.roomID].ready = rooms[socket.roomID].ready.filter(
          (player) => player.id !== socket.id,
        );
        io.to(socket.roomID).emit(
          'receiveReady',
          rooms[socket.roomID].ready.length,
        );
        // Minus one player
        rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
          (player) => player.id !== socket.id,
        );
        io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);

        if (
          Object.keys(rooms[socket.roomID].rankings).length ===
          rooms[socket.roomID].players.length
        ) {
          io.to(socket.roomID).emit('allCompleted');
          rooms[socket.roomID] = {
            ...rooms[socket.roomID],
            ready: [],
            rankings: {},
          };
        }
      }
    }
  });
});

module.exports = httpServer;
