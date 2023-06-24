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
const randomId = () => crypto.randomBytes(8).toString('hex');

const { InMemorySessionStore } = require('./sessionStore');
const sessionStore = new InMemorySessionStore();

const rooms = {};

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      //socket.userID = session.userID;
      //socket.username = session.username;
      return next();
    }
  }
  // create new session
  //socket.userID = randomId();
  //socket.username = username;
  next();
});

io.on('connection', (socket) => {
  socket.on('createRoom', (challenge) => {
    socket.sessionID = randomId();
    rooms[socket.sessionID] = {
      host: socket.userID,
      challenge,
      players: [socket.userID],
    };

    socket.join(socket.sessionID);

    socket.emit('roomCreated', socket.sessionID);
  });

  socket.on('joinRoom', (roomId) => {
    // if room exists and user is not host

    if (rooms[roomId] && rooms[roomId].host !== socket.userID) {
      const room = rooms[roomId];
      if (room.players.length >= 3) {
        socket.emit('roomFull');
      }
      room.players.push(socket.userID);
      socket.join(roomId);
      io.to(room.host).emit('playerJoined', socket.userID);
      socket.emit('roomJoined', room.challenge);
      //console.log(room.players);
    } else {
      socket.emit('invalidRoom');
    }
  });

  socket.on('disconnect', (roomName) => {
    if (userID === rooms[roomId].host) {
      // teardown socket room
      // remove rooms[roomId]
    }
    socket.leave(roomName);

    // Remove user from the room state
    const room = rooms[roomName];
    if (room) {
      room.users = room.users.filter((id) => id !== socket.userID);
    }
  });
});

const port = process.env.PORT || 3000; // Replace with your desired port number
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = io;
