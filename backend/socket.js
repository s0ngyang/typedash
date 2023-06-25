// const app = require('./app');
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//   cors: {
//     origin: 'http://127.0.0.1:5173',
//     // origin: 'http://localhost:5173',
//     //methods: ['GET', 'POST'],
//   },
// });

// const crypto = require('crypto');
// const randomID = () => crypto.randomBytes(8).toString('hex');

// const rooms = {};

// io.on('connection', (socket) => {
//   socket.on('createRoom', (challenge) => {
//     const roomID = randomID();
//     rooms[roomID] = {
//       challenge,
//       players: [socket.id],
//       ready: [],
//     };
//     socket.roomID = roomID;
//     socket.join(roomID);

//     socket.emit('roomCreated', roomID);
//     console.log(`room created, players: ${rooms[roomID].players}`);

//     socket.emit('playerJoined', {
//       players: rooms[roomID].players,
//       challenge: rooms[roomID].challenge,
//     });
//   });

//   socket.on('joinRoom', (roomID) => {
//     // if room exists
//     if (rooms[roomID]) {
//       const room = rooms[roomID];
//       if (room.players.includes(socket.id)) {
//         return;
//       }
//       if (room.players.length >= 4) {
//         socket.emit('roomFull');
//         return;
//       }
//       room.players.push(socket.id);

//       socket.join(roomID);
//       socket.roomID = roomID;

//       io.to(roomID).emit('playerJoined', {
//         players: room.players,
//         challenge: room.challenge,
//       });
//       console.log('player joined, players:', room.players);
//       socket.emit('roomJoined', room.challenge);
//     } else {
//       socket.emit('invalidRoom');
//     }
//   });

//   socket.on('sendReady', () => {
//     const room = rooms[socket.roomID];
//     if (room.ready.length < room.players.length) {
//       for (let index = 0; index < room.ready.length; index++) {
//         const player = room.ready[index];
//         if (player === socket.id) {
//           return;
//         }
//       }
//       room.ready.push(socket.id);
//       io.to(socket.roomID).emit('receiveReady', room.ready.length);
//     }
//   });

//   // socket.on('gameStart', () => {
//   //   setInterval(() => {
//   //     socket.to(socket.roomID).emit('progressUpdate', { playerId: socket.id });
//   //   }, 1000);
//   // });

//   socket.on('leaveRoom', () => {
//     socket.leave(socket.roomID);
//     rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
//       (id) => id !== socket.id,
//     );
//     io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);

//     rooms[socket.roomID].ready = rooms[socket.roomID].ready.filter(
//       (id) => id !== socket.id,
//     );
//     io.to(socket.roomID).emit(
//       'receiveReady',
//       rooms[socket.roomID].ready.length,
//     );
//   });

//   socket.on('typingProgress', (progress) => {
//     socket
//       .to(socket.roomID)
//       .emit('progressUpdate', { playerId: socket.id, progress });
//   });

//   socket.on('disconnect', () => {
//     if (rooms[socket.roomID]) {
//       if (rooms[socket.roomID].players.length <= 1) {
//         delete rooms[socket.roomID];
//         console.log('delete, rooms:', rooms);
//         io.to(socket.roomID).emit('playerLeft');
//       } else {
//         rooms[socket.roomID].players = rooms[socket.roomID].players.filter(
//           (id) => id !== socket.id,
//         );
//         io.to(socket.roomID).emit('playerLeft', rooms[socket.roomID].players);

//         rooms[socket.roomID].ready = rooms[socket.roomID].ready.filter(
//           (id) => id !== socket.id,
//         );
//         io.to(socket.roomID).emit(
//           'receiveReady',
//           rooms[socket.roomID].ready.length,
//         );
//       }
//     }
//   });
// });

// const port = process.env.PORT || '3000';
// httpServer.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
